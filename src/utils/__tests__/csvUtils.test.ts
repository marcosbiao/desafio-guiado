import { describe, it, expect } from 'vitest';
import { csvUtils } from '../csvUtils';

describe('csvUtils', () => {
  describe('escapeField', () => {
    it('deve escapar campos com vírgulas', () => {
      const field = 'Campo, com vírgula';
      const escaped = csvUtils.escapeField(field);
      expect(escaped).toBe('"Campo, com vírgula"');
    });

    it('deve escapar campos com aspas duplas', () => {
      const field = 'Campo com "aspas"';
      const escaped = csvUtils.escapeField(field);
      expect(escaped).toBe('"Campo com ""aspas"""');
    });

    it('deve escapar campos com quebras de linha', () => {
      const field = 'Campo com\nquebra de linha';
      const escaped = csvUtils.escapeField(field);
      expect(escaped).toBe('"Campo com\nquebra de linha"');
    });

    it('deve retornar string vazia para valores nulos ou indefinidos', () => {
      expect(csvUtils.escapeField(null)).toBe('""');
      expect(csvUtils.escapeField(undefined)).toBe('""');
    });
  });

  describe('convertToCSV', () => {
    it('deve converter um array de objetos para CSV com cabeçalho', () => {
      const data = [
        { id: 1, name: 'João', bio: 'C, C++' },
        { id: 2, name: 'Maria', bio: 'Python' }
      ];
      const csv = csvUtils.convertToCSV(data);
      const lines = csv.split('\n');

      expect(lines[0]).toBe('"id","name","bio"');
      expect(lines[1]).toBe('"1","João","C, C++"');
      expect(lines[2]).toBe('"2","Maria","Python"');
    });

    it('deve retornar string vazia para dados vazios', () => {
      expect(csvUtils.convertToCSV([])).toBe('');
    });
  });
});
