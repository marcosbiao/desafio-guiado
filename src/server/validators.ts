import type { Challenge } from "../types.ts";
import { CHALLENGES } from "../challenges/index.ts";

/**
 * Validadores de entrada para o backend.
 * Garante que os dados recebidos são íntegros antes do processamento.
 */
export const validators = {
  /**
   * Valida o payload da requisição de análise.
   */
  validateAnalysisRequest(body: any): { ok: boolean; errorCode?: string; message?: string; challenge?: Challenge } {
    const { code, challengeId } = body;

    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return {
        ok: false,
        errorCode: "INVALID_INPUT",
        message: "O código fonte é obrigatório e deve ser uma string válida."
      };
    }

    if (code.length > 50000) {
      return {
        ok: false,
        errorCode: "PAYLOAD_TOO_LARGE",
        message: "O código enviado excede o limite de 50.000 caracteres."
      };
    }

    if (!challengeId) {
      return {
        ok: false,
        errorCode: "INVALID_INPUT",
        message: "O ID do desafio é obrigatório."
      };
    }

    const challenge = CHALLENGES.find(c => c.id === challengeId);
    if (!challenge) {
      return {
        ok: false,
        errorCode: "CHALLENGE_NOT_FOUND",
        message: "O desafio especificado não existe no sistema."
      };
    }

    return { ok: true, challenge };
  }
};
