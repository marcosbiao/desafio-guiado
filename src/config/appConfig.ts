import { APP_CONSTANTS } from './constants';

/**
 * Configuração centralizada da aplicação (Frontend).
 */
export const appConfig = {
  // Configuração de Análise
  analysis: {
    cooldownMs: APP_CONSTANTS.ANALYSIS_COOLDOWN_MS,
    maxCodeLength: APP_CONSTANTS.MAX_CODE_LENGTH,
    minSubstantialCodeLength: APP_CONSTANTS.MIN_SUBSTANTIAL_CODE_LENGTH,
    promptVersion: APP_CONSTANTS.PROMPT_VERSION,
  },

  // Configuração de Banco de Dados
  database: {
    collections: APP_CONSTANTS.COLLECTIONS,
  },

  // Configuração de API
  api: {
    analyzeUrl: '/api/analyze',
  },

  // Configuração de Ambiente
  isProduction: process.env.NODE_ENV === 'production',
  
  // Metadados da Aplicação
  version: '1.2.0',
  appName: 'C-Challenge Tutor',
};
