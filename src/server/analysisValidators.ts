import type { AnalysisResult, ChallengeCategory, AnalysisConfidence, ErrorType, AnalysisMode } from "../types.ts";
import { PROMPT_VERSION } from "./analysisPrompt.ts";

/**
 * Valida o retorno do Gemini em relação ao esquema esperado.
 * Garante que os campos obrigatórios e os valores controlados estão corretos.
 */
export function validateGeminiResponse(
  rawResponse: any,
  modelUsed: string
): { ok: boolean; data?: AnalysisResult; error?: string } {
  try {
    const data = typeof rawResponse === 'string' ? JSON.parse(rawResponse) : rawResponse;

    // 1. Validação de Categoria
    const validCategories: ChallengeCategory[] = [
      'tentativa inicial',
      'parcialmente correta',
      'quase completa',
      'solução adequada'
    ];
    if (!validCategories.includes(data.category)) {
      data.category = 'tentativa inicial';
    }

    // 2. Validação de Confiança
    const validConfidences: AnalysisConfidence[] = ['baixa', 'media', 'alta'];
    if (!validConfidences.includes(data.confidence)) {
      data.confidence = 'media';
    }

    // 3. Validação de Tipos de Erro
    const validErrorTypes: ErrorType[] = [
      'interpretacao_enunciado',
      'logica',
      'sintaxe_aparente',
      'saida_incorreta',
      'caso_nao_tratado',
      'condicao_incompleta',
      'sem_erro_relevante'
    ];
    
    if (!Array.isArray(data.errorType)) {
      data.errorType = ['logica'];
    } else {
      data.errorType = data.errorType.filter((t: any) => validErrorTypes.includes(t));
      if (data.errorType.length === 0) data.errorType = ['logica'];
    }

    // 4. Validação de Strings e Objetos
    const result: AnalysisResult = {
      category: data.category,
      confidence: data.confidence,
      difficultyHypothesis: data.difficultyHypothesis || "Não foi possível determinar a dificuldade.",
      feedback: {
        good: Array.isArray(data.feedback?.good) ? data.feedback.good : [],
        review: Array.isArray(data.feedback?.review) ? data.feedback.review : [],
        nextStep: data.feedback?.nextStep || "Continue praticando!"
      },
      errorType: data.errorType,
      suggestedNextStep: data.suggestedNextStep || "Tente revisar seu código.",
      analysisSummary: data.analysisSummary || "Análise concluída.",
      analysisMode: 'gemini_primary',
      modelUsed: modelUsed,
      promptVersion: PROMPT_VERSION
    };

    return { ok: true, data: result };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}
