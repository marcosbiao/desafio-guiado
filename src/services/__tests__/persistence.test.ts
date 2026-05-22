import { describe, it, expect, vi, beforeEach } from 'vitest';
import { localPersistenceService } from '../localPersistenceService';
import { attemptService } from '../attemptService';
import { firestoreService } from '../firestoreService';
import { addDoc } from 'firebase/firestore';

vi.mock('firebase/firestore');
vi.mock('../firestoreService');

describe('Persistência e Fallback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('localPersistenceService', () => {
    const mockAttempt = {
      id: '1',
      userId: 'user-1',
      challengeId: 'desafio-1',
      code: 'int main() {}',
      timestamp: new Date()
    };

    it('deve salvar e recuperar tentativas do LocalStorage', () => {
      localPersistenceService.saveAttempt('desafio-1', mockAttempt as any);
      const attempts = localPersistenceService.getAttempts('desafio-1');
      
      expect(attempts).toHaveLength(1);
      expect(attempts[0].id).toBe('1');
      expect(attempts[0].code).toBe('int main() {}');
    });

    it('deve limpar tentativas locais', () => {
      localPersistenceService.saveAttempt('desafio-1', mockAttempt as any);
      localStorage.removeItem('attempts_desafio-1'); // Limpeza manual para teste
      expect(localPersistenceService.getAttempts('desafio-1')).toHaveLength(0);
    });
  });

  describe('attemptService', () => {
    it('deve salvar tentativa remotamente chamando addDoc', async () => {
      const mockAttempt = {
        id: '1',
        userId: 'user-1',
        challengeId: 'desafio-1',
        code: 'int main() {}',
        timestamp: new Date()
      };

      vi.mocked(firestoreService.getUserAttemptsCollection).mockReturnValue({} as any);
      vi.mocked(addDoc).mockResolvedValue({ id: 'new-doc-id' } as any);

      await attemptService.saveAttempt('user-1', mockAttempt as any);

      expect(addDoc).toHaveBeenCalled();
    });

    it('deve lançar erro amigável quando o Firestore falha', async () => {
      vi.mocked(addDoc).mockRejectedValue(new Error('Permissão negada'));

      await expect(attemptService.saveAttempt('user-1', { code: 'int main() {}' } as any))
        .rejects.toThrow(/Permissão negada/);
    });
  });
});
