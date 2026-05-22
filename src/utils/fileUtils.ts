import { timeUtils } from './timeUtils';

/**
 * Utilitários para download e geração de nomes de arquivos no navegador.
 */
export const fileUtils = {
  
  /**
   * Faz o download de uma string como um arquivo.
   */
  download(content: string, fileName: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = fileName;
    link.click();
    
    // Limpeza após o download
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  },

  /**
   * Gera um nome de arquivo padronizado para exportações.
   * Ex: attempts_challengeId_20231027_1430.csv
   */
  generateExportFileName(prefix: string, extension: string, challengeId?: string): string {
    const dateStr = timeUtils.getCompactDateString();
    const timeStr = timeUtils.getCompactTimeString();
    
    const suffix = challengeId ? `_${challengeId}` : '_all';
    return `${prefix}${suffix}_${dateStr}_${timeStr}.${extension}`;
  }
};
