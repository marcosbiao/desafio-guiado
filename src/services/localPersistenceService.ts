import { Attempt } from '../types';
import { dataMappingService } from './dataMappingService';

/**
 * Serviço para persistência local (fallback) quando o usuário não está autenticado ou o Firestore falha.
 */
export const localPersistenceService = {
  
  /**
   * Salva uma tentativa localmente.
   */
  saveAttempt(challengeId: string, attempt: Attempt): void {
    const key = `attempts_${challengeId}`;
    const existing = this.getAttempts(challengeId);
    
    // Converte para string ISO para salvar em JSON
    const toSave = {
      ...attempt,
      isLocal: true,
      timestamp: attempt.timestamp instanceof Date ? attempt.timestamp.toISOString() : attempt.timestamp
    };

    const updated = [toSave, ...existing].slice(0, 10);
    localStorage.setItem(key, JSON.stringify(updated));
  },

  /**
   * Recupera tentativas salvas localmente para um desafio.
   */
  getAttempts(challengeId: string): Attempt[] {
    const key = `attempts_${challengeId}`;
    const saved = localStorage.getItem(key);
    if (!saved) return [];

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed.map(a => dataMappingService.mapLocalAttempt(a)) : [];
    } catch (error) {
      console.error("Erro ao ler LocalStorage:", error);
      return [];
    }
  },

  /**
   * Salva o rascunho atual do aluno no editor.
   */
  saveDraft(challengeId: string, code: string): void {
    localStorage.setItem(`draft_${challengeId}`, code);
  },

  /**
   * Recupera o rascunho atual do aluno no editor.
   */
  getDraft(challengeId: string): string | null {
    return localStorage.getItem(`draft_${challengeId}`);
  },

  /**
   * Recupera todas as tentativas de todos os desafios armazenadas localmente.
   */
  getAllLocalAttempts(): Attempt[] {
    const allAttempts: Attempt[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('attempts_')) {
        const saved = localStorage.getItem(key);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              parsed.forEach(a => allAttempts.push(dataMappingService.mapLocalAttempt(a)));
            }
          } catch (e) {
            console.error("Erro ao ler LocalStorage para chave", key, e);
          }
        }
      }
    }
    return allAttempts;
  }
};
