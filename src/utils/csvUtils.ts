/**
 * Utilitários para manipulação e escape de dados CSV.
 */
export const csvUtils = {
  
  /**
   * Escapa campos para o formato CSV seguindo a RFC 4180.
   * Envolve em aspas e escapa aspas internas duplicando-as.
   */
  escapeField(field: any): string {
    if (field === null || field === undefined) return '""';
    
    let value = String(field);
    
    // Se contiver aspas, vírgulas ou quebras de linha, precisa de aspas e escape
    if (value.includes('"') || value.includes(',') || value.includes('\n') || value.includes('\r')) {
      value = value.replace(/"/g, '""'); // Escapa aspas internas
      return `"${value}"`;
    }
    
    return `"${value}"`; // Sempre envolve em aspas para maior robustez
  },

  /**
   * Gera uma linha CSV a partir de um array de campos.
   */
  generateRow(fields: any[]): string {
    return fields.map(field => this.escapeField(field)).join(',');
  },

  /**
   * Converte um array de objetos para CSV com cabeçalho.
   */
  convertToCSV(data: any[]): string {
    if (!data || data.length === 0) return '';
    const headers = Object.keys(data[0]);
    const headerRow = this.generateRow(headers);
    const rows = data.map(obj => this.generateRow(headers.map(h => obj[h])));
    return [headerRow, ...rows].join('\n');
  }
};
