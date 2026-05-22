import { describe, it, expect, vi, beforeEach } from 'vitest';
import { exportService } from '../exportService';
import { fileUtils } from '../../utils/fileUtils';
import { Attempt } from '../../types';

vi.mock('../../utils/fileUtils');

describe('exportService', () => {
  const mockAttempts: Attempt[] = [
    {
      id: '1',
      userId: 'user-1',
      challengeId: 'desafio-1',
      challengeVersion: '1.0.0',
      sessionId: 'sess-1',
      timestamp: new Date('2026-04-05T10:00:00Z'),
      code: 'int main() { return 0; }',
      tipsUsed: [1],
      category: 'solução adequada',
      confidence: 'alta',
      difficultyHypothesis: 'nenhuma',
      feedback: { good: ['Bom'], review: [], nextStep: 'Fim' },
      errorType: [],
      suggestedNextStep: '',
      analysisSummary: 'OK',
      analysisMode: 'gemini_primary',
      modelUsed: 'gemini-3-flash-preview',
      promptVersion: '2.0.0',
      processMetrics: { timeSinceSessionStart: 100, verificationIndex: 1, tipsCountAtSubmission: 1 }
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('exportToJson', () => {
    it('deve chamar fileUtils.download com o JSON correto', () => {
      exportService.exportToJson(mockAttempts, 'user-1', 'desafio-1');

      expect(fileUtils.download).toHaveBeenCalled();
      const [content, fileName, mimeType] = vi.mocked(fileUtils.download).mock.calls[0];

      const parsed = JSON.parse(content);
      expect(parsed.metadata.totalAttempts).toBe(1);
      expect(parsed.metadata.userId).toBe('user-1');
      expect(parsed.metadata.challengeFilter).toBe('desafio-1');
      expect(parsed.attempts).toHaveLength(1);
      expect(parsed.attempts[0].code).toBe(mockAttempts[0].code);
      expect(mimeType).toBe('application/json');
    });

    it('deve lidar com lista de tentativas vazia', () => {
      exportService.exportToJson([], 'user-1');
      const [content] = vi.mocked(fileUtils.download).mock.calls[0];
      const parsed = JSON.parse(content);
      expect(parsed.attempts).toHaveLength(0);
      expect(parsed.metadata.totalAttempts).toBe(0);
    });
  });

  describe('exportToCsv', () => {
    it('deve chamar fileUtils.download com o CSV correto', () => {
      exportService.exportToCsv(mockAttempts, 'user-1', 'desafio-1');

      expect(fileUtils.download).toHaveBeenCalled();
      const [content, fileName, mimeType] = vi.mocked(fileUtils.download).mock.calls[0];

      expect(mimeType).toBe('text/csv;charset=utf-8;');
      const lines = content.split('\n');
      expect(lines.length).toBeGreaterThan(1); // Cabeçalho + 1 linha
      expect(lines[1]).toContain('user-1');
      expect(lines[1]).toContain('desafio-1');
      expect(lines[1]).toContain('"int main() { return 0; }"');
    });
  });
});
