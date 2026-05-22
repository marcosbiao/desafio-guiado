import { useState, useEffect } from 'react';
import { localPersistenceService } from '../services/localPersistenceService';

/**
 * Hook para gerenciar o rascunho local do código no editor.
 * Garante que o progresso do aluno não seja perdido ao navegar.
 */
export function useLocalDraft(challengeId: string, initialCode: string) {
  const [code, setCode] = useState(initialCode);

  // Carregar rascunho ao mudar de desafio
  useEffect(() => {
    const savedDraft = localPersistenceService.getDraft(challengeId);
    if (savedDraft) {
      setCode(savedDraft);
    } else {
      setCode(initialCode);
    }
  }, [challengeId, initialCode]);

  // Persistir rascunho localmente
  const updateCode = (newCode: string) => {
    setCode(newCode);
    localPersistenceService.saveDraft(challengeId, newCode);
  };

  return { code, setCode: updateCode };
}
