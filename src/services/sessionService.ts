import { setDoc, updateDoc, serverTimestamp, increment } from 'firebase/firestore';
import { ChallengeSession } from '../types';
import { firestoreService } from './firestoreService';
import { errorService, OperationType } from './errorService';

/**
 * Serviço para gerenciamento de sessões de uso de desafios.
 */
export const sessionService = {
  
  /**
   * Inicia uma nova sessão de desafio.
   */
  async startSession(userId: string, challengeId: string): Promise<string> {
    const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    
    try {
      const sessionRef = firestoreService.getSessionDoc(sessionId);
      
      const session: Omit<ChallengeSession, 'id'> = {
        userId,
        challengeId,
        startTime: serverTimestamp(),
        lastActivity: serverTimestamp(),
        metrics: {
          verificationCount: 0,
          tipsOpenedCount: 0,
          tipsBeforeFirstVerification: 0,
          solutionViewed: false
        }
      };

      await setDoc(sessionRef, session);
      return sessionId;
    } catch (error) {
      console.error("Erro ao iniciar sessão:", error);
      return sessionId;
    }
  },

  /**
   * Atualiza métricas da sessão em tempo real.
   */
  async updateMetrics(sessionId: string, updates: Partial<ChallengeSession['metrics']>): Promise<void> {
    try {
      const sessionRef = firestoreService.getSessionDoc(sessionId);
      
      const firestoreUpdates: any = {
        lastActivity: serverTimestamp()
      };

      if (updates.verificationCount !== undefined) {
        firestoreUpdates['metrics.verificationCount'] = increment(1);
      }
      if (updates.tipsOpenedCount !== undefined) {
        firestoreUpdates['metrics.tipsOpenedCount'] = increment(1);
      }
      if (updates.solutionViewed !== undefined) {
        firestoreUpdates['metrics.solutionViewed'] = true;
      }
      if (updates.tipsBeforeFirstVerification !== undefined) {
        firestoreUpdates['metrics.tipsBeforeFirstVerification'] = updates.tipsBeforeFirstVerification;
      }

      await updateDoc(sessionRef, firestoreUpdates);
    } catch (error) {
      errorService.handleFirestoreError(error, OperationType.UPDATE, `sessions/${sessionId}`);
    }
  },

  /**
   * Finaliza a sessão registrando o tempo total.
   */
  async endSession(sessionId: string): Promise<void> {
    try {
      const sessionRef = firestoreService.getSessionDoc(sessionId);
      await updateDoc(sessionRef, {
        endTime: serverTimestamp(),
        lastActivity: serverTimestamp()
      });
    } catch (error) {
      errorService.handleFirestoreError(error, OperationType.UPDATE, `sessions/${sessionId}`);
    }
  }
};
