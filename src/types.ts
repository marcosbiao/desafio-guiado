/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// --- Domínio Pedagógico ---

export type ChallengeCategory = 
  | 'tentativa inicial' 
  | 'parcialmente correta' 
  | 'quase completa' 
  | 'solução adequada';

export type AnalysisConfidence = 'baixa' | 'media' | 'alta';

export type ErrorType = 
  | 'interpretacao_enunciado'
  | 'logica'
  | 'sintaxe_aparente'
  | 'saida_incorreta'
  | 'caso_nao_tratado'
  | 'condicao_incompleta'
  | 'sem_erro_relevante';

export type AnalysisMode = 'gemini_primary' | 'gemini_fallback';

/**
 * Representa um evento de interação do usuário para fins de pesquisa.
 */
export type InteractionEventType = 
  | 'challenge_view'       // Visualizou o enunciado
  | 'tip_open'             // Abriu uma dica específica
  | 'editor_first_edit'    // Começou a digitar no editor
  | 'verify_click'         // Clicou em verificar
  | 'analysis_success'     // Recebeu feedback da IA
  | 'analysis_fallback'    // Usou análise local (fallback)
  | 'analysis_error'       // Erro na chamada da IA
  | 'solution_view'        // Visualizou a solução comentada
  | 'common_errors_view'   // Visualizou os erros comuns
  | 'history_open'         // Abriu o painel de histórico
  | 'session_start'        // Iniciou uma nova sessão de desafio
  | 'session_end';         // Encerrou a sessão (ex: ao sair da página)

export interface InteractionEvent {
  id: string;
  userId: string;
  challengeId: string;
  sessionId: string;
  type: InteractionEventType;
  timestamp: Date | any;
  metadata?: Record<string, string | number | boolean | null | undefined>;
}

/**
 * Representa uma sessão de uso contínuo de um desafio.
 */
export interface ChallengeSession {
  id: string;
  userId: string;
  challengeId: string;
  startTime: Date | any;
  endTime?: Date | any;
  lastActivity: Date | any;
  
  metrics: {
    verificationCount: number;
    tipsOpenedCount: number;
    tipsBeforeFirstVerification: number;
    solutionViewed: boolean;
    timeToFirstVerification?: number;
    totalTimeSpent?: number;
  };
}

export interface PedagogicalFeedback {
  good: string[];
  review: string[];
  nextStep: string;
}

export interface AnalysisResult {
  category: ChallengeCategory;
  confidence: AnalysisConfidence;
  difficultyHypothesis: string;
  feedback: PedagogicalFeedback;
  errorType: ErrorType[];
  suggestedNextStep: string;
  analysisSummary: string;
  analysisMode: AnalysisMode;
  modelUsed: string;
  promptVersion: string;
}

export interface Tip {
  id: number;
  text: string;
  pedagogicalGoal?: string; // O que esta dica tenta destravar
}

export interface CommonError {
  title: string;
  description: string;
  pedagogicalAdvice: string; // Como o aluno deve pensar para evitar este erro
}

export interface ExpectedSolutionCriteria {
  id: string;
  description: string;
  importance: 'essencial' | 'desejável';
}

export interface ErrorPattern {
  id: string;
  description: string;
  likelyCause: string;
}

export interface ChallengeOrientation {
  input: string;
  output: string;
  cases: string;
  structure: string;
  expectedLogic: string; // Descrição da lógica esperada
}

export interface PedagogicalMetadata {
  learningObjective: string;
  pedagogicalGoal: string;
  expectedDifficulty: 'baixa' | 'media' | 'alta';
  cognitiveOperation: 'lembrar' | 'entender' | 'aplicar' | 'analisar' | 'avaliar' | 'criar';
  prerequisites: string[];
}

export interface DomainTags {
  skillTags: string[];
  topicTags: string[];
  difficultyTag: string;
  prerequisiteTags: string[];
}

export interface ChallengeMetadata {
  content: string;
  language: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  time: string;
  requirements: string;
  skill: string;
  version: string;
}

export interface ChallengeExample {
  input: string;
  output: string;
  description?: string;
}

export interface Challenge {
  id: string;
  categoryId?: string;
  title: string;
  subtitle: string;
  challengeVersion: string;
  
  // Estrutura Pedagógica
  metadata: ChallengeMetadata;
  pedagogicalMetadata: PedagogicalMetadata;
  domainTags: DomainTags;
  
  // Conteúdo do Desafio
  problem: string; // Enunciado
  guidingQuestions: string[]; // Perguntas Orientadoras
  orientation: ChallengeOrientation; // Orientações
  examples: ChallengeExample[]; // Exemplos de Entrada/Saída
  concepts: string[]; // Conceitos Centrais
  
  // Apoios Pedagógicos
  tips: Tip[];
  commonErrors: CommonError[];
  
  // Solução e Fechamento
  solution: string; // Solução Comentada
  finalSummary: string[]; // Resumo Final
  nextChallengeId?: string; // Próximo Desafio Sugerido
  
  // Critérios de Análise
  expectedCriteria: ExpectedSolutionCriteria[];
  probableErrors: ErrorPattern[];
  
  templateCode: string;
  // Fallback local caso a IA falhe
  analyzeLocally: (code: string) => AnalysisResult;
}

// --- Dados do Usuário e Progresso ---

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'admin' | 'student';
  createdAt: any; // Firestore Timestamp ou Date
}

export interface Attempt {
  id: string;
  userId: string;
  challengeId: string;
  challengeVersion: string;
  sessionId: string; // Vínculo com a sessão de uso
  timestamp: any; // Firestore Timestamp (Hora da submissão)
  
  // Dados da Submissão
  code: string;
  tipsUsed: number[]; // IDs das dicas abertas ATÉ este momento
  
  // Resultado da Análise (Inferência da IA)
  category: ChallengeCategory;
  confidence: AnalysisConfidence;
  difficultyHypothesis: string; // Hipótese gerada pela IA sobre a dificuldade do aluno
  feedback: PedagogicalFeedback;
  errorType: ErrorType[];
  suggestedNextStep: string;
  analysisSummary: string; // Síntese da análise para rastreabilidade
  
  // Metadados Técnicos da Análise (Rastreabilidade de Sistema)
  analysisMode: AnalysisMode;
  modelUsed: string;
  promptVersion: string;
  
  // Variáveis de Processo no momento da tentativa
  processMetrics: {
    timeSinceSessionStart: number; // segundos
    verificationIndex: number;     // qual o número desta verificação na sessão
    tipsCountAtSubmission: number;
  };
  
  isLocal?: boolean;
}

// --- Contratos de API ---

export interface AnalysisRequest {
  code: string;
  challengeId: string;
  userId: string | null;
}

export interface AnalysisError {
  ok: false;
  errorCode: string;
  message: string;
}

// --- Exportação e Relatórios ---

export interface ExportMetadata {
  exportedAt: string;
  exportFormat: 'json' | 'csv';
  appVersion: string;
  totalAttempts: number;
  challengeFilter?: string;
  userId?: string;
}

export interface JsonExport {
  metadata: ExportMetadata;
  attempts: Attempt[];
}

// --- Estados de UI e Aplicação ---

/**
 * Representa o estado de uma operação assíncrona.
 */
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = null> {
  status: AsyncStatus;
  data: T | null;
  error: string | null;
}

export interface AuthState {
  user: UserProfile | null;
  isAuthReady: boolean;
  loading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export interface ChallengeUIState {
  isAnalyzing: boolean;
  showSolution: boolean;
  showErrors: boolean;
  showOrientation: boolean;
  lastAnalysisTime: number;
  error: string | null;
}
