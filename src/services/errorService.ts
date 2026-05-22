import { auth } from '../firebase';

/**
 * Tipos de operações do Firestore para rastreabilidade de erros.
 */
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

/**
 * Estrutura detalhada de erro do Firestore para diagnóstico.
 */
export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

/**
 * Serviço para tratamento e diagnóstico de erros técnicos.
 */
export const errorService = {
  
  /**
   * Trata erros do Firestore, capturando contexto de autenticação e operação.
   */
  handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
    const errInfo: FirestoreErrorInfo = {
      error: error instanceof Error ? error.message : String(error),
      authInfo: {
        userId: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        emailVerified: auth.currentUser?.emailVerified,
        isAnonymous: auth.currentUser?.isAnonymous,
        tenantId: auth.currentUser?.tenantId,
        providerInfo: auth.currentUser?.providerData?.map(provider => ({
          providerId: provider.providerId,
          displayName: provider.displayName,
          email: provider.email,
          photoUrl: provider.photoURL
        })) || []
      },
      operationType,
      path
    };
    
    console.error('Firestore Error Details:', JSON.stringify(errInfo, null, 2));
    
    // Lança um erro com a mensagem original, mas loga o contexto completo
    throw new Error(errInfo.error);
  },

  /**
   * Trata erros de API (fetch).
   */
  handleApiError(error: unknown, context: string): never {
    console.error(`API Error [${context}]:`, error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error("Falha de conexão com o servidor. Verifique sua internet.");
    }
    throw error;
  }
};
