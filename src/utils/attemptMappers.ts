import { Attempt } from '../types';
import { timeUtils } from './timeUtils';

/**
 * Mapeadores para transformar tentativas em diferentes formatos de exportação.
 */
export const attemptMappers = {
  
  /**
   * Mapeia uma tentativa para um formato JSON limpo e normalizado para exportação.
   */
  mapToJson(attempt: Attempt): any {
    return {
      id: attempt.id,
      userId: attempt.userId,
      challengeId: attempt.challengeId,
      challengeVersion: attempt.challengeVersion || '1.0.0',
      sessionId: attempt.sessionId || 'unknown',
      timestamp: timeUtils.formatToIso(attempt.timestamp),
      code: attempt.code,
      category: attempt.category,
      confidence: attempt.confidence || 'media',
      difficultyHypothesis: attempt.difficultyHypothesis || '',
      feedback: {
        good: attempt.feedback?.good || [],
        review: attempt.feedback?.review || [],
        nextStep: attempt.feedback?.nextStep || ''
      },
      analysisSummary: attempt.analysisSummary || '',
      errorType: attempt.errorType || [],
      analysisMode: attempt.analysisMode || 'unknown',
      modelUsed: attempt.modelUsed || 'unknown',
      promptVersion: attempt.promptVersion || '1.0.0',
      tipsUsed: attempt.tipsUsed || [],
      processMetrics: {
        timeSinceSessionStart: attempt.processMetrics?.timeSinceSessionStart || 0,
        verificationIndex: attempt.processMetrics?.verificationIndex || 0,
        tipsCountAtSubmission: attempt.processMetrics?.tipsCountAtSubmission || 0
      }
    };
  },

  /**
   * Mapeia uma tentativa para um array de campos CSV.
   */
  mapToCsvFields(attempt: Attempt): any[] {
    const feedback = attempt.feedback || { good: [], review: [], nextStep: '' };
    
    return [
      attempt.id,
      attempt.userId,
      attempt.challengeId,
      attempt.challengeVersion || '1.0.0',
      attempt.sessionId || 'unknown',
      timeUtils.formatToIso(attempt.timestamp),
      attempt.category,
      attempt.confidence || 'media',
      attempt.difficultyHypothesis || '',
      attempt.analysisMode || 'unknown',
      attempt.modelUsed || 'unknown',
      attempt.promptVersion || '1.0.0',
      String(attempt.tipsUsed?.length || 0),
      String(attempt.processMetrics?.timeSinceSessionStart || 0),
      String(attempt.processMetrics?.verificationIndex || 0),
      (attempt.errorType || []).join('; '),
      attempt.analysisSummary || '',
      attempt.code,
      (feedback.good || []).join('; '),
      (feedback.review || []).join('; '),
      feedback.nextStep || ''
    ];
  },

  /**
   * Retorna os nomes das colunas para o cabeçalho do CSV.
   */
  getCsvHeaderFields(): string[] {
    return [
      'attempt_id',
      'user_id',
      'challenge_id',
      'challenge_version',
      'session_id',
      'timestamp',
      'category',
      'confidence',
      'difficulty_hypothesis',
      'analysis_mode',
      'model_used',
      'prompt_version',
      'tips_count',
      'time_since_start_sec',
      'verification_index',
      'error_type',
      'analysis_summary',
      'code',
      'feedback_good',
      'feedback_review',
      'feedback_next_step'
    ];
  }
};
