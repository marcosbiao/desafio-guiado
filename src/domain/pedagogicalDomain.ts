import type { 
  Challenge, 
  ChallengeCategory, 
  AnalysisResult, 
  Attempt, 
  UserProfile, 
  AnalysisConfidence, 
  ErrorType, 
  AnalysisMode 
} from '../types.ts';

/**
 * Lógica de domínio pedagógico isolada da interface.
 * Facilita testes e manutenção das regras educacionais.
 */

/**
 * Cria um resultado de análise padronizado para uso local (fallback).
 */
export function createLocalAnalysisResult(
  category: ChallengeCategory,
  good: string[],
  review: string[],
  nextStep: string,
  difficultyHypothesis: string,
  errorType: ErrorType[] = ['logica'],
  summary: string = "Análise heurística local realizada com sucesso."
): AnalysisResult {
  return {
    category,
    confidence: 'media',
    difficultyHypothesis,
    feedback: {
      good,
      review,
      nextStep
    },
    errorType,
    suggestedNextStep: nextStep,
    analysisSummary: summary,
    analysisMode: 'gemini_fallback',
    modelUsed: 'local_heuristic',
    promptVersion: '1.0.0'
  };
}

/**
 * Formata uma tentativa para ser salva no banco de dados.
 * Centraliza a transformação de dados para garantir consistência e validade metodológica.
 */
export function formatAttempt(
  user: UserProfile | null,
  challenge: Challenge,
  code: string,
  analysis: AnalysisResult,
  usedTips: number[],
  sessionId: string,
  processMetrics: {
    timeSinceSessionStart: number;
    verificationIndex: number;
    tipsCountAtSubmission: number;
  }
): Attempt {
  return {
    id: crypto.randomUUID(),
    userId: user?.uid || 'anonymous',
    challengeId: challenge.id,
    challengeVersion: challenge.metadata.version,
    sessionId, // Vínculo com a sessão de uso contínuo
    timestamp: new Date(), // Hora da submissão (será convertido para Timestamp pelo Firestore)
    
    // Dados da Submissão
    code,
    tipsUsed: [...usedTips],
    
    // Resultado da Análise (Inferência da IA)
    category: analysis.category,
    confidence: analysis.confidence,
    difficultyHypothesis: analysis.difficultyHypothesis, // Hipótese da IA sobre a dificuldade do aluno
    feedback: analysis.feedback,
    errorType: analysis.errorType,
    suggestedNextStep: analysis.suggestedNextStep,
    analysisSummary: analysis.analysisSummary,
    
    // Metadados Técnicos da Análise (Rastreabilidade)
    analysisMode: analysis.analysisMode,
    modelUsed: analysis.modelUsed,
    promptVersion: analysis.promptVersion,
    
    // Variáveis de Processo capturadas no momento da submissão
    processMetrics
  };
}

/**
 * Determina se um desafio foi "vencido" com base na categoria.
 */
export function isChallengeSolved(category: ChallengeCategory): boolean {
  return category === 'solução adequada';
}

/**
 * Gera uma mensagem de incentivo com base na categoria da análise.
 */
export function getIncentiveMessage(category: ChallengeCategory): string {
  switch (category) {
    case 'solução adequada':
      return "Excelente trabalho! Você dominou este conceito.";
    case 'quase completa':
      return "Quase lá! Só mais um pequeno ajuste.";
    case 'parcialmente correta':
      return "Bom começo! Continue explorando as condições.";
    default:
      return "Não desista! Programação é prática constante.";
  }
}

/**
 * Filtra dicas que ainda não foram reveladas.
 */
export function getAvailableTips(challenge: Challenge, usedTips: number[]) {
  return challenge.tips.filter(tip => !usedTips.includes(tip.id));
}

/**
 * Valida se o código enviado não é vazio ou apenas comentários.
 */
export function isCodeSubstantial(code: string): boolean {
  const cleanCode = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim();
  return cleanCode.length > 10;
}
