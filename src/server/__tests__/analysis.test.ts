import { describe, it, expect, vi, beforeEach } from 'vitest';
import { validateGeminiResponse } from '../analysisValidators';
import { getAnalysisFallback } from '../analysisFallback';
import { Challenge } from '../../types';

describe('Camada de Análise (IA)', () => {
  const mockChallenge: Challenge = {
    id: 'desafio-1',
    title: 'Desafio 1',
    subtitle: 'Sub',
    challengeVersion: '1.0.0',
    metadata: { content: '', language: 'C', level: 'Iniciante', time: '', requirements: '', skill: '', version: '' },
    pedagogicalMetadata: { learningObjective: '', pedagogicalGoal: '', expectedDifficulty: 'baixa', cognitiveOperation: 'lembrar', prerequisites: [] },
    domainTags: { skillTags: [], topicTags: [], difficultyTag: '', prerequisiteTags: [] },
    problem: 'Enunciado',
    guidingQuestions: [],
    orientation: { input: '', output: '', cases: '', structure: '', expectedLogic: '' },
    examples: [],
    concepts: [],
    tips: [],
    commonErrors: [],
    solution: 'int main() {}',
    finalSummary: [],
    expectedCriteria: [],
    probableErrors: [],
    templateCode: '',
    analyzeLocally: () => ({} as any)
  };

  describe('validateGeminiResponse', () => {
    it('deve validar um JSON correto do Gemini', () => {
      const raw = JSON.stringify({
        category: 'solução adequada',
        confidence: 'alta',
        difficultyHypothesis: 'Nenhuma',
        feedback: { good: ['Bom'], review: [], nextStep: 'Fim' },
        errorType: ['sem_erro_relevante'],
        suggestedNextStep: 'Próximo',
        analysisSummary: 'OK'
      });

      const result = validateGeminiResponse(raw, 'gemini-flash');
      expect(result.ok).toBe(true);
      expect(result.data?.category).toBe('solução adequada');
      expect(result.data?.confidence).toBe('alta');
    });

    it('deve aplicar valores padrão para JSON incompleto', () => {
      const raw = JSON.stringify({
        category: 'categoria invalida',
        feedback: { good: ['Bom'] }
      });

      const result = validateGeminiResponse(raw, 'gemini-flash');
      expect(result.ok).toBe(true);
      expect(result.data?.category).toBe('tentativa inicial'); // Default
      expect(result.data?.confidence).toBe('media'); // Default
      expect(result.data?.feedback.nextStep).toBeDefined();
    });

    it('deve retornar erro para JSON malformado', () => {
      const result = validateGeminiResponse('invalid json', 'gemini-flash');
      expect(result.ok).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('getAnalysisFallback', () => {
    it('deve retornar um resultado de fallback válido', () => {
      const result = getAnalysisFallback('int main() {}', mockChallenge, 'gemini-flash');
      expect(result.analysisMode).toBe('gemini_fallback');
      expect(result.category).toBeDefined();
      expect(result.feedback.nextStep).toBeDefined();
    });
  });
});
