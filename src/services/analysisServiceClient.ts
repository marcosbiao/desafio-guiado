import { AnalysisResult, AnalysisRequest } from '../types';
import { appConfig } from '../config/appConfig';
import { errorService } from './errorService';

/**
 * Camada client para comunicação segura com o backend.
 */
export async function callAnalyzeApi(
  request: AnalysisRequest
): Promise<AnalysisResult> {
  try {
    const response = await fetch(appConfig.api.analyzeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    if (data.ok) {
      return data.data;
    } else {
      throw new Error(data.message || "Falha na análise.");
    }
  } catch (error: any) {
    return errorService.handleApiError(error, 'callAnalyzeApi');
  }
}
