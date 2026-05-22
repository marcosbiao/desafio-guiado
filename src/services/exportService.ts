import { Attempt, JsonExport, ExportMetadata } from '../types';
import { attemptMappers } from '../utils/attemptMappers';
import { fileUtils } from '../utils/fileUtils';
import { csvUtils } from '../utils/csvUtils';

/**
 * Serviço para orquestração da exportação de dados em diferentes formatos.
 */
export const exportService = {
  
  /**
   * Exporta tentativas para o formato JSON.
   */
  exportToJson(attempts: Attempt[], userId?: string, challengeId?: string): void {
    const metadata: ExportMetadata = {
      exportedAt: new Date().toISOString(),
      exportFormat: 'json',
      appVersion: '1.0.0',
      totalAttempts: attempts.length,
      challengeFilter: challengeId,
      userId
    };

    const data: JsonExport = {
      metadata,
      attempts: attempts.map(a => attemptMappers.mapToJson(a))
    };

    const content = JSON.stringify(data, null, 2);
    const fileName = fileUtils.generateExportFileName('attempts', 'json', challengeId);
    
    fileUtils.download(content, fileName, 'application/json');
  },

  /**
   * Exporta tentativas para o formato CSV.
   */
  exportToCsv(attempts: Attempt[], userId?: string, challengeId?: string): void {
    const header = csvUtils.generateRow(attemptMappers.getCsvHeaderFields());
    const rows = attempts.map(attempt => csvUtils.generateRow(attemptMappers.mapToCsvFields(attempt)));
    
    const content = [header, ...rows].join('\n');
    const fileName = fileUtils.generateExportFileName('attempts', 'csv', challengeId);
    
    fileUtils.download(content, fileName, 'text/csv;charset=utf-8;');
  }
};
