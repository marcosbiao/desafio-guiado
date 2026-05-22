import { addDoc, serverTimestamp } from 'firebase/firestore';
import { InteractionEvent, InteractionEventType } from '../types';
import { firestoreService } from './firestoreService';

/**
 * Serviço para registro de eventos de interação para fins de pesquisa educacional.
 */
export const eventService = {
  
  /**
   * Registra um evento de interação no Firestore.
   */
  async logEvent(
    userId: string, 
    challengeId: string, 
    sessionId: string, 
    type: InteractionEventType, 
    metadata?: Record<string, string | number | boolean | null | undefined>
  ): Promise<void> {
    try {
      const eventRef = firestoreService.getEventsCollection();
      
      // Sanitização de metadados para evitar valores 'undefined' que quebram o Firestore
      const sanitizedMetadata: Record<string, string | number | boolean | null> = {};
      if (metadata) {
        Object.entries(metadata).forEach(([key, value]) => {
          if (value !== undefined) {
            sanitizedMetadata[key] = value;
          }
        });
      }

      const event: Omit<InteractionEvent, 'id'> = {
        userId,
        challengeId,
        sessionId,
        type,
        timestamp: serverTimestamp(),
        metadata: sanitizedMetadata
      };

      await addDoc(eventRef, event);
    } catch (error) {
      console.error("Erro ao registrar evento:", error);
    }
  }
};
