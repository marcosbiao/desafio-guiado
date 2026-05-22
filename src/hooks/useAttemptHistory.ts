import { useState, useEffect } from 'react';
import { Attempt, UserProfile } from '../types';
import { attemptService } from '../services/attemptService';
import { localPersistenceService } from '../services/localPersistenceService';

/**
 * Hook para gerenciar o histórico de tentativas de um desafio.
 * Suporta sincronização remota (Firestore) e fallback local (LocalStorage).
 */
export function useAttemptHistory(user: UserProfile | null, challengeId: string, isAuthReady: boolean) {
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    if (!isAuthReady) return;

    let unsubscribeAttempts: () => void = () => {};

    if (user) {
      // Sincronizar com Firestore e mesclar com local
      unsubscribeAttempts = attemptService.subscribeToAttempts(
        user.uid, 
        challengeId, 
        (remoteAttempts) => {
          const localAttempts = localPersistenceService.getAttempts(challengeId);
          // Mescla e remove duplicatas por ID (se houver)
          const merged = [...remoteAttempts];
          localAttempts.forEach(local => {
            if (!merged.find(r => r.id === local.id)) {
              merged.push(local);
            }
          });
          // Ordena por timestamp decrescente
          merged.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          setAttempts(merged.slice(0, 10));
        }
      );
    } else {
      // Fallback para LocalStorage
      const localAttempts = localPersistenceService.getAttempts(challengeId);
      setAttempts(localAttempts);
    }

    return () => unsubscribeAttempts();
  }, [user, challengeId, isAuthReady]);

  const saveAttempt = async (newAttempt: Attempt) => {
    if (user) {
      try {
        await attemptService.saveAttempt(user.uid, newAttempt);
      } catch (error) {
        console.error("Erro ao salvar tentativa no Firestore:", error);
        // Fallback local em caso de erro no Firestore para não perder o dado
        localPersistenceService.saveAttempt(challengeId, newAttempt);
        throw error; // Relança para que o coordenador saiba da falha
      }
    } else {
      // Persistência local para usuários anônimos
      localPersistenceService.saveAttempt(challengeId, newAttempt);
      // Atualiza estado local para feedback imediato
      setAttempts(prev => [newAttempt, ...prev].slice(0, 10));
    }
  };

  return { attempts, saveAttempt };
}
