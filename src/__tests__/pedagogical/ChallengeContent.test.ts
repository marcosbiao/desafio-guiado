import { describe, it, expect } from 'vitest';
import { CHALLENGES } from '../../challenges/index';

describe('Conteúdo Pedagógico dos Desafios', () => {
  it('todos os desafios devem ter campos obrigatórios', () => {
    CHALLENGES.forEach(challenge => {
      expect(challenge.id).toBeDefined();
      expect(challenge.title).toBeDefined();
      expect(challenge.problem).toBeDefined();
      expect(challenge.solution).toBeDefined();
      expect(Array.isArray(challenge.tips)).toBe(true);
      expect(Array.isArray(challenge.commonErrors)).toBe(true);
    });
  });

  it('desafios específicos devem ter o conteúdo esperado', () => {
    const desafio1 = CHALLENGES.find(c => c.id === 'desafio1_condicionais_basico');
    expect(desafio1?.title).toContain('Estrutura Condicional');
    expect(desafio1?.tips.some(t => t.text.includes('if'))).toBe(true);
  });

  it('não deve haver IDs duplicados nos desafios', () => {
    const ids = CHALLENGES.map(c => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('a solução deve ser um código C válido (básico)', () => {
    CHALLENGES.forEach(challenge => {
      expect(challenge.solution).toContain('int main');
      expect(challenge.solution).toContain('printf');
    });
  });
});
