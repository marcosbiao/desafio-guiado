import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, Info } from 'lucide-react';
import { Challenge, UserProfile } from '../../types';
import { useChallengeState } from '../../hooks/useChallengeState';
import { ChallengeHeader } from './ChallengeHeader';
import { ChallengeMetadataCard } from './ChallengeMetadataCard';
import { CodeEditorPanel } from './CodeEditorPanel';
import { TipsPanel } from './TipsPanel';
import { CommonErrorsPanel } from './CommonErrorsPanel';
import { SolutionPanel } from './SolutionPanel';
import { FeedbackPanel } from './FeedbackPanel';
import { AttemptHistoryPanel } from './AttemptHistoryPanel';
import { PedagogicalTransparencyFooter, PrivacyNotice } from './ChallengeFooter';

interface ChallengePageProps {
  challenge: Challenge;
  user: UserProfile | null;
  isAuthReady: boolean;
  onBack: () => void;
  onLogout: () => void;
}

/**
 * Página principal do desafio.
 * Orquestra todos os componentes de UI e gerencia o estado via hook.
 */
export function ChallengePage({ challenge, user, isAuthReady, onBack, onLogout }: ChallengePageProps) {
  const state = useChallengeState(user, challenge, isAuthReady);

  return (
    <div className="min-h-screen bg-gray-50/50 selection:bg-indigo-100">
      <ChallengeHeader 
        challenge={challenge} 
        user={user} 
        onBack={onBack} 
        onLogout={onLogout} 
      />

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Coluna da Esquerda: Enunciado e Editor */}
        <div className="lg:col-span-7 space-y-10">
          <ChallengeMetadataCard challenge={challenge} />
          
          <section className="h-[650px]" aria-label="Editor de código">
            <CodeEditorPanel 
              code={state.code}
              setCode={state.setCode}
              onVerify={state.handleVerify}
              onReset={state.resetCode}
              onCancelReset={state.cancelReset}
              onInitiateReset={state.initiateReset}
              showResetConfirm={state.showResetConfirm}
              isAnalyzing={state.isAnalyzing}
              hasChangesSinceLastAnalysis={state.hasChangesSinceLastAnalysis}
            />
          </section>

          {/* Mensagens de Erro/Aviso */}
          <AnimatePresence>
            {state.error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-8 bg-red-50 border border-red-100 rounded-3xl flex items-start gap-5 text-red-800 shadow-sm"
              >
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-black tracking-tight mb-1">Atenção</h4>
                  <p className="text-sm leading-relaxed font-medium opacity-80">{state.error}</p>
                </div>
                <button 
                  onClick={() => state.setError(null)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-100/50 rounded-xl transition-all"
                >
                  Fechar
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feedback da IA */}
          <AnimatePresence mode="wait">
            {state.analysis && (
              <section aria-labelledby="feedback-title">
                <FeedbackPanel analysis={state.analysis} />
              </section>
            )}
          </AnimatePresence>

          {/* Aviso de Privacidade */}
          <PrivacyNotice />
        </div>

        {/* Coluna da Direita: Suporte e Histórico */}
        <div className="lg:col-span-5 space-y-10">
          <section aria-labelledby="tips-title">
            <TipsPanel 
              challenge={challenge} 
              usedTips={state.usedTips} 
              onUseTip={state.useTip} 
            />
          </section>
          
          <section aria-labelledby="common-errors-title">
            <CommonErrorsPanel 
              challenge={challenge} 
              isExpanded={state.showErrors} 
              onToggle={() => state.setShowErrors(!state.showErrors)} 
            />
          </section>
          
          <section aria-labelledby="solution-title">
            <SolutionPanel 
              challenge={challenge} 
              isExpanded={state.showSolution} 
              onToggle={() => state.setShowSolution(!state.showSolution)} 
            />
          </section>
          
          <section aria-labelledby="history-title" onMouseEnter={state.openHistory}>
            <AttemptHistoryPanel 
              attempts={state.attempts} 
              challengeId={challenge.id}
              userId={user?.uid}
            />
          </section>
        </div>
      </main>

      {/* Rodapé de Transparência Metodológica */}
      <PedagogicalTransparencyFooter />
    </div>
  );
}
