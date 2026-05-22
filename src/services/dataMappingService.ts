import { Timestamp } from 'firebase/firestore';
import { Attempt, UserProfile } from '../types';
import { APP_CONSTANTS } from '../config/constants';

/**
 * Serviço para mapeamento e normalização de dados entre Firestore e Frontend.
 */
export const dataMappingService = {
  
  /**
   * Normaliza um documento do Firestore para o tipo Attempt.
   */
  mapFirestoreAttempt(doc: any): Attempt {
    const data = doc.data();
    return this.normalizeAttempt({
      ...data,
      id: doc.id,
      timestamp: data.timestamp instanceof Timestamp ? data.timestamp.toDate() : data.timestamp
    });
  },

  /**
   * Normaliza uma tentativa vinda do LocalStorage.
   */
  mapLocalAttempt(data: any): Attempt {
    return this.normalizeAttempt({
      ...data,
      timestamp: typeof data.timestamp === 'string' ? new Date(data.timestamp) : data.timestamp
    });
  },

  /**
   * Garante que todos os campos obrigatórios existam e tenham valores seguros para pesquisa e rastreabilidade.
   */
  normalizeAttempt(data: any): Attempt {
    return {
      id: data.id || crypto.randomUUID(),
      userId: data.userId || 'anonymous',
      challengeId: data.challengeId || 'unknown',
      challengeVersion: data.challengeVersion || '1.0.0',
      sessionId: data.sessionId || 'unknown_session',
      timestamp: data.timestamp || new Date(),
      
      // Dados da Submissão
      code: data.code || '',
      tipsUsed: Array.isArray(data.tipsUsed) ? data.tipsUsed : [],
      
      // Resultado da Análise (Inferência da IA)
      category: data.category || APP_CONSTANTS.ANALYSIS_CATEGORIES.INITIAL,
      confidence: data.confidence || APP_CONSTANTS.CONFIDENCE_LEVELS.MEDIUM,
      difficultyHypothesis: data.difficultyHypothesis || '',
      feedback: {
        good: Array.isArray(data.feedback?.good) ? data.feedback.good : [],
        review: Array.isArray(data.feedback?.review) ? data.feedback.review : [],
        nextStep: data.feedback?.nextStep || ''
      },
      errorType: Array.isArray(data.errorType) ? data.errorType : [],
      suggestedNextStep: data.suggestedNextStep || '',
      analysisSummary: data.analysisSummary || '',
      
      // Metadados Técnicos (Rastreabilidade)
      analysisMode: data.analysisMode || 'gemini_fallback',
      modelUsed: data.modelUsed || 'unknown',
      promptVersion: data.promptVersion || APP_CONSTANTS.PROMPT_VERSION,
      
      // Variáveis de Processo
      processMetrics: {
        timeSinceSessionStart: data.processMetrics?.timeSinceSessionStart || 0,
        verificationIndex: data.processMetrics?.verificationIndex || 0,
        tipsCountAtSubmission: data.processMetrics?.tipsCountAtSubmission || 0
      }
    };
  },

  /**
   * Normaliza o perfil do usuário.
   */
  normalizeUserProfile(data: any): UserProfile {
    return {
      uid: data.uid,
      email: data.email || null,
      displayName: data.displayName || null,
      photoURL: data.photoURL || null,
      role: data.role || 'student',
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : data.createdAt
    };
  }
};
