import { useState, useCallback, useEffect, useRef } from 'react';
import { Challenge, AnalysisResult, Attempt, UserProfile, ChallengeUIState } from '../types';
import { useLocalDraft } from './useLocalDraft';
import { useAttemptHistory } from './useAttemptHistory';
import { callAnalyzeApi } from '../services/analysisServiceClient';
import { formatAttempt, isCodeSubstantial } from '../domain/pedagogicalDomain';
import { sessionService } from '../services/sessionService';
import { eventService } from '../services/eventService';
import { appConfig } from '../config/appConfig';

/**
 * Hook coordenador para o estado de um desafio específico.
 */
export function useChallengeState(user: UserProfile | null, challenge: Challenge, isAuthReady: boolean) {
  const { cooldownMs, minSubstantialCodeLength } = appConfig.analysis;
  // 1. Estado de Rascunho e Histórico
  const { code, setCode } = useLocalDraft(challenge.id, challenge.templateCode);
  const { attempts, saveAttempt } = useAttemptHistory(user, challenge.id, isAuthReady);

  // 2. Estado da UI do Desafio
  const [usedTips, setUsedTips] = useState<number[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [uiState, setUiState] = useState<ChallengeUIState>({
    isAnalyzing: false,
    showSolution: false,
    showErrors: false,
    showOrientation: false,
    lastAnalysisTime: 0,
    error: null
  });

  const [lastAnalyzedCode, setLastAnalyzedCode] = useState<string>("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // 3. Gerenciamento de Sessão de Pesquisa
  const [sessionId, setSessionId] = useState<string>("");
  const sessionStartTimeRef = useRef<number>(Date.now());
  const verificationsInSessionRef = useRef<number>(0);
  const tipsBeforeFirstVerificationRef = useRef<number>(0);
  const hasSubstantialEditRef = useRef<boolean>(false);

  // Inicializa a sessão ao carregar o desafio
  useEffect(() => {
    if (!isAuthReady) return;

    let currentSessionId = "";
    
    const initSession = async () => {
      // Se não houver usuário, apenas gera um ID de sessão local para consistência do estado
      if (!user) {
        setSessionId(`anon_sess_${Date.now()}`);
        return;
      }

      currentSessionId = await sessionService.startSession(user.uid, challenge.id);
      setSessionId(currentSessionId);
      
      // Evento de entrada no desafio
      eventService.logEvent(user.uid, challenge.id, currentSessionId, 'challenge_view');
    };

    initSession();

    return () => {
      if (currentSessionId && user) {
        sessionService.endSession(currentSessionId);
        eventService.logEvent(user.uid, challenge.id, currentSessionId, 'session_end');
      }
    };
  }, [user, challenge.id, isAuthReady]);

  /**
   * Solicita análise pedagógica ao backend.
   */
  const handleVerify = useCallback(async () => {
    const now = Date.now();
    if (now - uiState.lastAnalysisTime < cooldownMs) {
      setUiState(prev => ({ 
        ...prev, 
        error: `Aguarde ${Math.ceil((cooldownMs - (now - uiState.lastAnalysisTime)) / 1000)}s para uma nova análise.` 
      }));
      return;
    }

    if (!isCodeSubstantial(code)) {
      setUiState(prev => ({ ...prev, error: `Escreva pelo menos ${minSubstantialCodeLength} caracteres de código antes de solicitar orientação.` }));
      return;
    }

    setUiState(prev => ({ ...prev, isAnalyzing: true, error: null, lastAnalysisTime: now }));
    
    // Log de intenção de verificação
    if (user && sessionId && sessionId.startsWith('sess_')) {
      eventService.logEvent(user.uid, challenge.id, sessionId, 'verify_click');
    }

    try {
      // 1. Tentar análise via API (IA)
      let result: AnalysisResult;
      let analysisModeUsed: 'gemini_primary' | 'gemini_fallback' = 'gemini_primary';

      try {
        result = await callAnalyzeApi({
          code,
          challengeId: challenge.id,
          userId: user?.uid || null
        });
        
        if (user && sessionId && sessionId.startsWith('sess_')) {
          eventService.logEvent(user.uid, challenge.id, sessionId, 'analysis_success', { 
            category: result.category,
            model: result.modelUsed 
          });
        }
      } catch (apiErr: any) {
        console.error("Erro na chamada da API de análise:", apiErr);
        const errorMessage = apiErr.message || "Não foi possível realizar a análise pedagógica no momento.";
        throw new Error(errorMessage);
      }

      setAnalysis(result);
      setLastAnalyzedCode(code);
      
      // Atualiza métricas de sessão
      verificationsInSessionRef.current += 1;
      if (verificationsInSessionRef.current === 1) {
        tipsBeforeFirstVerificationRef.current = usedTips.length;
        if (user && sessionId && sessionId.startsWith('sess_')) {
          sessionService.updateMetrics(sessionId, { 
            tipsBeforeFirstVerification: usedTips.length 
          });
        }
      }
      
      if (user && sessionId && sessionId.startsWith('sess_')) {
        sessionService.updateMetrics(sessionId, { verificationCount: 1 });
      }

      // 3. Salvar tentativa no histórico usando lógica de domínio enriquecida
      const processMetrics = {
        timeSinceSessionStart: Math.floor((Date.now() - sessionStartTimeRef.current) / 1000),
        verificationIndex: verificationsInSessionRef.current,
        tipsCountAtSubmission: usedTips.length
      };

      const newAttempt = formatAttempt(
        user, 
        challenge, 
        code, 
        result, 
        usedTips, 
        sessionId, 
        processMetrics
      );
      
      await saveAttempt(newAttempt);

    } catch (err: any) {
      console.error("Erro na verificação:", err);
      setUiState(prev => ({ ...prev, error: err.message || "Falha na comunicação com o servidor de análise." }));
      
      if (user && sessionId && sessionId.startsWith('sess_')) {
        eventService.logEvent(user.uid, challenge.id, sessionId, 'analysis_error', { message: err.message });
      }
    } finally {
      setUiState(prev => ({ ...prev, isAnalyzing: false }));
    }
  }, [code, challenge, user, uiState.lastAnalysisTime, usedTips, saveAttempt, sessionId]);

  /**
   * Adiciona uma dica à lista de dicas usadas.
   */
  const useTip = (tipId: number) => {
    if (!usedTips.includes(tipId)) {
      setUsedTips([...usedTips, tipId]);
      
      if (user && sessionId && sessionId.startsWith('sess_')) {
        eventService.logEvent(user.uid, challenge.id, sessionId, 'tip_open', { tipId });
        sessionService.updateMetrics(sessionId, { tipsOpenedCount: 1 });
      }
    }
  };
  
  // Monitora primeira edição substancial
  useEffect(() => {
    if (!hasSubstantialEditRef.current && isCodeSubstantial(code)) {
      hasSubstantialEditRef.current = true;
      if (user && sessionId && sessionId.startsWith('sess_')) {
        eventService.logEvent(user.uid, challenge.id, sessionId, 'editor_first_edit');
      }
    }
  }, [code, user, sessionId, challenge.id]);

  /**
   * Reseta o código para o template inicial.
   */
  const resetCode = () => {
    setCode(challenge.templateCode);
    setShowResetConfirm(false);
  };

  const cancelReset = () => setShowResetConfirm(false);
  const initiateReset = () => setShowResetConfirm(true);

  // Helpers para atualizar UIState
  const setShowSolution = (val: boolean) => {
    setUiState(prev => ({ ...prev, showSolution: val }));
    if (val && user && sessionId && sessionId.startsWith('sess_')) {
      eventService.logEvent(user.uid, challenge.id, sessionId, 'solution_view');
      sessionService.updateMetrics(sessionId, { solutionViewed: true });
    }
  };
  
  const setShowErrors = (val: boolean) => {
    setUiState(prev => ({ ...prev, showErrors: val }));
    if (val && user && sessionId && sessionId.startsWith('sess_')) {
      eventService.logEvent(user.uid, challenge.id, sessionId, 'common_errors_view');
    }
  };
  const setShowOrientation = (val: boolean) => setUiState(prev => ({ ...prev, showOrientation: val }));
  
  const setError = (val: string | null) => setUiState(prev => ({ ...prev, error: val }));

  const openHistory = () => {
    if (user && sessionId && sessionId.startsWith('sess_')) {
      eventService.logEvent(user.uid, challenge.id, sessionId, 'history_open');
    }
  };

  return {
    // Estado
    code,
    setCode,
    attempts,
    usedTips,
    analysis,
    hasChangesSinceLastAnalysis: code !== lastAnalyzedCode && lastAnalyzedCode !== "",
    ...uiState,
    
    // Ações
    handleVerify,
    useTip,
    resetCode,
    cancelReset,
    initiateReset,
    showResetConfirm,
    setShowSolution,
    setShowErrors,
    setShowOrientation,
    setError,
    openHistory
  };
}
