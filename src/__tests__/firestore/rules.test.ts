import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { initializeTestEnvironment, RulesTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Mock do Firestore Rules Test
// Nota: Para rodar estes testes de verdade, o Firebase Emulator deve estar ativo.
// Aqui estamos configurando a estrutura para quando o desenvolvedor rodar localmente.

describe.skip('Firestore Rules', () => {
  let testEnv: RulesTestEnvironment;
  const PROJECT_ID = 'test-project';
  const rules = readFileSync(resolve(__dirname, '../../../firestore.rules'), 'utf8');

  beforeEach(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: { rules }
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  it('deve permitir que o dono leia seus próprios dados de perfil', async () => {
    const aliceContext = testEnv.authenticatedContext('alice', { email: 'alice@example.com', email_verified: true });
    const aliceDoc = aliceContext.firestore().doc('users/alice');
    
    // Simula a existência do documento (o emulador lidaria com isso)
    // Aqui estamos apenas validando a lógica da regra
    await assertSucceeds(aliceDoc.get());
  });

  it('deve impedir que um usuário leia dados de outro usuário', async () => {
    const bobContext = testEnv.authenticatedContext('bob', { email: 'bob@example.com', email_verified: true });
    const aliceDoc = bobContext.firestore().doc('users/alice');
    
    await assertFails(aliceDoc.get());
  });

  it('deve permitir que o dono crie uma tentativa válida', async () => {
    const aliceContext = testEnv.authenticatedContext('alice', { email: 'alice@example.com', email_verified: true });
    const aliceAttempt = aliceContext.firestore().doc('users/alice/attempts/attempt-1');
    
    await assertSucceeds(aliceAttempt.set({
      userId: 'alice',
      challengeId: 'desafio1_condicionais_basico',
      challengeVersion: '1.0.0',
      timestamp: new Date(),
      code: 'int main() {}',
      category: 'tentativa inicial',
      confidence: 'media',
      tipsUsed: [],
      feedback: { good: [], review: [], nextStep: '' },
      difficultyHypothesis: '',
      errorType: [],
      suggestedNextStep: '',
      analysisSummary: '',
      analysisMode: 'gemini_primary',
      modelUsed: 'test',
      promptVersion: '1.0.0'
    }));
  });

  it('deve impedir a criação de tentativa para outro userId', async () => {
    const aliceContext = testEnv.authenticatedContext('alice', { email: 'alice@example.com', email_verified: true });
    const bobAttempt = aliceContext.firestore().doc('users/bob/attempts/attempt-1');
    
    await assertFails(bobAttempt.set({
      userId: 'bob',
      challengeId: 'desafio1_condicionais_basico',
      // ... outros campos
    }));
  });

  it('deve impedir o update de tentativas (imutabilidade)', async () => {
    const aliceContext = testEnv.authenticatedContext('alice', { email: 'alice@example.com', email_verified: true });
    const aliceAttempt = aliceContext.firestore().doc('users/alice/attempts/attempt-1');
    
    await assertFails(aliceAttempt.update({ code: 'hack' }));
  });
});
