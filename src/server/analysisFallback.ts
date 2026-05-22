import type { AnalysisResult, Challenge, ChallengeCategory, AnalysisConfidence, ErrorType, AnalysisMode } from "../types.ts";
import { PROMPT_VERSION } from "./analysisPrompt.ts";

/**
 * Fornece um fallback controlado quando a análise via Gemini falha.
 * Utiliza a análise heurística local do desafio, se disponível.
 */
export function getAnalysisFallback(
  code: string,
  challenge: Challenge,
  modelUsed: string
): AnalysisResult {
  try {
    // 1. Tentar análise heurística local do desafio
    const localResult = challenge.analyzeLocally(code);
    
    // 2. Mapear para o novo formato de AnalysisResult
    return {
      category: localResult.category as ChallengeCategory,
      confidence: 'media' as AnalysisConfidence,
      difficultyHypothesis: "Análise local baseada em heurísticas do desafio.",
      feedback: {
        good: localResult.feedback.good || [],
        review: localResult.feedback.review || [],
        nextStep: localResult.feedback.nextStep || "Continue revisando seu código."
      },
      errorType: ['logica'] as ErrorType[],
      suggestedNextStep: localResult.feedback.nextStep || "Revise seu código.",
      analysisSummary: "Análise realizada via fallback heurístico local.",
      analysisMode: 'gemini_fallback',
      modelUsed: modelUsed,
      promptVersion: PROMPT_VERSION
    };
  } catch (err) {
    // 3. Fallback genérico se tudo falhar
    return {
      category: 'tentativa inicial',
      confidence: 'baixa',
      difficultyHypothesis: "Não foi possível realizar a análise.",
      feedback: {
        good: [],
        review: ["Não foi possível analisar seu código no momento."],
        nextStep: "Tente novamente em alguns instantes."
      },
      errorType: ['logica'],
      suggestedNextStep: "Tente novamente mais tarde.",
      analysisSummary: "Falha crítica na análise. Fallback genérico ativado.",
      analysisMode: 'gemini_fallback',
      modelUsed: modelUsed,
      promptVersion: PROMPT_VERSION
    };
  }
}
