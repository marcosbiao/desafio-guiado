import { describe, it, expect, vi } from 'vitest';
import { dataMappingService } from '../dataMappingService';
import { APP_CONSTANTS } from '../../config/constants';
import { Timestamp } from 'firebase/firestore';

describe('dataMappingService', () => {
  describe('normalizeAttempt', () => {
    it('deve preencher valores padrão para uma tentativa vazia', () => {
      const emptyData = {};
      const normalized = dataMappingService.normalizeAttempt(emptyData);

      expect(normalized.id).toBeDefined();
      expect(normalized.userId).toBe('anonymous');
      expect(normalized.challengeId).toBe('unknown');
      expect(normalized.category).toBe(APP_CONSTANTS.ANALYSIS_CATEGORIES.INITIAL);
      expect(normalized.confidence).toBe(APP_CONSTANTS.CONFIDENCE_LEVELS.MEDIUM);
      expect(normalized.tipsUsed).toEqual([]);
      expect(normalized.feedback.good).toEqual([]);
    });

    it('deve preservar dados existentes e validar arrays', () => {
      const partialData = {
        userId: 'user-123',
        challengeId: 'desafio-1',
        tipsUsed: 'não é um array', // Deve ser corrigido para []
        feedback: {
          good: ['Bom trabalho']
        }
      };
      const normalized = dataMappingService.normalizeAttempt(partialData);

      expect(normalized.userId).toBe('user-123');
      expect(normalized.challengeId).toBe('desafio-1');
      expect(normalized.tipsUsed).toEqual([]);
      expect(normalized.feedback.good).toEqual(['Bom trabalho']);
      expect(normalized.feedback.review).toEqual([]);
    });
  });

  describe('mapFirestoreAttempt', () => {
    it('deve converter Timestamp do Firestore para Date do JS', () => {
      const mockDate = new Date('2026-04-05T00:00:00Z');
      const mockTimestamp = Timestamp.fromDate(mockDate);
      const mockDoc = {
        id: 'doc-id',
        data: () => ({
          userId: 'user-1',
          timestamp: mockTimestamp
        })
      };

      const mapped = dataMappingService.mapFirestoreAttempt(mockDoc);
      expect(mapped.timestamp.getTime()).toBe(mockDate.getTime());
      expect(mapped.id).toBe('doc-id');
    });
  });
});
