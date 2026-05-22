/**
 * Utilitários para manipulação e formatação de datas e horários.
 */
export const timeUtils = {
  
  /**
   * Converte um timestamp (Firestore ou Date) para string ISO.
   */
  formatToIso(timestamp: any): string {
    if (!timestamp) return new Date().toISOString();
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toISOString();
  },

  /**
   * Gera uma string compacta de data para nomes de arquivos (ex: 20231027).
   */
  getCompactDateString(date: Date = new Date()): string {
    return date.toISOString().split('T')[0].replace(/-/g, '');
  },

  /**
   * Gera uma string compacta de hora para nomes de arquivos (ex: 1430).
   */
  getCompactTimeString(date: Date = new Date()): string {
    return date.getHours().toString().padStart(2, '0') + 
           date.getMinutes().toString().padStart(2, '0');
  }
};
