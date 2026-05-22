/**
 * Constantes globais do sistema para evitar valores mágicos.
 */
export const APP_CONSTANTS = {
  // Limites técnicos
  MAX_CODE_LENGTH: 50000,
  MIN_SUBSTANTIAL_CODE_LENGTH: 10,
  ANALYSIS_COOLDOWN_MS: 10000,

  // Nomes de coleções do Firestore
  COLLECTIONS: {
    ATTEMPTS: 'attempts',
    SESSIONS: 'sessions',
    EVENTS: 'events',
    USER_PROFILES: 'users',
  },

  // Categorias de análise permitidas
  ANALYSIS_CATEGORIES: {
    INITIAL: 'tentativa inicial',
    PARTIAL: 'parcialmente correta',
    ALMOST: 'quase completa',
    ADEQUATE: 'solução adequada'
  } as const,

  // Níveis de confiança da análise
  CONFIDENCE_LEVELS: {
    LOW: 'baixa',
    MEDIUM: 'media',
    HIGH: 'alta'
  } as const,

  // Tipos de erro pedagógico
  ERROR_TYPES: [
    'interpretacao_enunciado',
    'logica',
    'sintaxe_aparente',
    'saida_incorreta',
    'caso_nao_tratado',
    'condicao_incompleta',
    'sem_erro_relevante'
  ] as const,

  // Modos de análise
  ANALYSIS_MODES: {
    PRIMARY: 'gemini_primary',
    FALLBACK: 'gemini_fallback'
  } as const,

  // Versões de prompt
  PROMPT_VERSION: '2.0.0',
};
