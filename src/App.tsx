/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState, ErrorInfo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CHALLENGES } from './challenges';
import { useAuthState } from './hooks/useAuthState';
import { HomePage } from './components/home/HomePage';
import { ChallengePage } from './components/challenge/ChallengePage';
import { LoadingState } from './components/layout/LoadingState';
import { ErrorBoundary } from './components/common/ErrorBoundary';

/**
 * Componente Principal (Orquestrador).
 */
export default function App() {
  // 1. Estado Global de Autenticação via Hook
  const { user, isAuthReady, loading, login, logout } = useAuthState();

  // 2. Estado de Navegação
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number | null>(null);
  const isHome = currentChallengeIndex === null;

  // 3. Handlers de Navegação
  const handleSelectChallenge = (index: number) => {
    setCurrentChallengeIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentChallengeIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4. Renderização Condicional de Estados Iniciais
  if (loading || !isAuthReady) {
    return <LoadingState />;
  }

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {isHome ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HomePage 
              user={user} 
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
              onSelectChallenge={handleSelectChallenge} 
              onLogin={login} 
              onLogout={logout} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="challenge"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ChallengePage 
              challenge={CHALLENGES[currentChallengeIndex!]} 
              user={user} 
              isAuthReady={isAuthReady}
              onBack={handleBackToHome} 
              onLogout={logout} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}
