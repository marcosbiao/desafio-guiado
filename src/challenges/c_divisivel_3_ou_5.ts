import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafio4: Challenge = {
  id: 'desafio4_divisivel_3_ou_5',
  title: 'Desafio Guiado: Divisibilidade em C',
  subtitle: 'Verifique se um número inteiro é divisível por 3 ou por 5.',
  challengeVersion: '1.1.0',
  
  metadata: {
    content: 'estrutura condicional e operador módulo',
    language: 'C',
    level: 'Iniciante',
    time: '10 a 15 minutos',
    requirements: 'variáveis, scanf, printf, if, else, operador %',
    skill: 'usar operador módulo para verificar divisibilidade',
    version: '1.1.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Utilizar o operador lógico OU (||) para combinar múltiplas condições de divisibilidade.',
    pedagogicalGoal: 'Consolidar o uso do operador módulo (%) e introduzir a composição de expressões lógicas.',
    expectedDifficulty: 'baixa',
    cognitiveOperation: 'aplicar',
    prerequisites: ['Operador Módulo (%)', 'Operadores Lógicos (||)', 'Estrutura if/else']
  },

  domainTags: {
    skillTags: ['modulo-operator', 'logical-or', 'divisibility-logic'],
    topicTags: ['math-logic', 'basic-c'],
    difficultyTag: 'low-complexity-logic',
    prerequisiteTags: ['desafio1_condicionais_basico']
  },

  problem: 'Faça um programa para verificar se um determinado número inteiro é divisível por 3 ou 5.',
  
  guidingQuestions: [
    'Qual é a entrada do programa?',
    'O que significa um número ser divisível por 3?',
    'O que significa um número ser divisível por 5?',
    'Que operador pode ser usado para verificar o resto da divisão?',
    'O programa deve aceitar números divisíveis por 3, por 5 ou por ambos?'
  ],

  orientation: {
    input: 'Um número inteiro.',
    output: 'Mensagem indicando se é divisível por 3 ou 5.',
    cases: 'Divisível por 3, por 5, por ambos ou por nenhum.',
    structure: 'Uso do operador % e operador lógico || (OU).',
    expectedLogic: 'O aluno deve testar se (n % 3 == 0) OU (n % 5 == 0). Se qualquer uma for verdade, o número atende ao critério.'
  },

  examples: [
    { input: '9', output: 'O numero e divisivel por 3 ou 5.' },
    { input: '10', output: 'O numero e divisivel por 3 ou 5.' },
    { input: '7', output: 'O numero nao e divisivel por 3 nem por 5.' }
  ],

  concepts: [
    'Divisibilidade Matemática em C',
    'Operador Lógico OU (||)',
    'Composição de Condições'
  ],

  tips: [
    { 
      id: 1, 
      text: "Lembre que o operador % retorna o resto da divisão.",
      pedagogicalGoal: "Relembrar a ferramenta para testar divisibilidade."
    },
    { 
      id: 2, 
      text: "Para saber se um número é divisível por 3, verifique se numero % 3 é igual a 0.",
      pedagogicalGoal: "Aplicar o conceito de resto zero."
    },
    { 
      id: 3, 
      text: "Para saber se um número é divisível por 5, verifique se numero % 5 é igual a 0.",
      pedagogicalGoal: "Repetir a lógica para o segundo divisor."
    },
    { 
      id: 4, 
      text: "Pense com cuidado na lógica 'ou': basta uma das condições ser verdadeira. Use o operador ||.",
      pedagogicalGoal: "Introduzir a composição lógica OU."
    }
  ],

  commonErrors: [
    { 
      title: "Divisão comum", 
      description: "Usar divisão comum (/) em vez do operador de resto (%).",
      pedagogicalAdvice: "A divisão comum dá o quociente; para saber se 'cabe certinho', precisamos do resto (%)."
    },
    { 
      title: "Esquecer um divisor", 
      description: "Verificar apenas divisibilidade por 3 ou apenas por 5.",
      pedagogicalAdvice: "O enunciado pede para verificar ambos os casos possíveis."
    },
    { 
      title: "Lógica 'E'", 
      description: "Usar lógica 'e' (&&) quando o problema pede 'ou' (||).",
      pedagogicalAdvice: "Se usar &&, o número precisaria ser divisível por 15 (3 e 5 ao mesmo tempo). O OU é mais abrangente."
    },
    { 
      title: "Comparação direta", 
      description: "Comparar o número diretamente com 3 ou 5 (ex: n == 3) em vez de testar o resto.",
      pedagogicalAdvice: "O número 6 é divisível por 3, mas não é igual a 3. Use o resto da divisão."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    int numero;

    printf("Digite um numero inteiro: ");
    scanf("%d", &numero);

    // Verifica se o resto da divisão por 3 OU por 5 é zero
    if (numero % 3 == 0 || numero % 5 == 0) {
        printf("O numero e divisivel por 3 ou 5.\\n");
    } else {
        printf("O numero nao e divisivel por 3 nem por 5.\\n");
    }

    return 0;
}`,

  finalSummary: [
    'Operador Módulo: Essencial para problemas que envolvem múltiplos e divisores.',
    'Lógica OU: Permite que o programa aceite diferentes caminhos de sucesso.',
    'Composição: Você pode colocar várias comparações dentro de um único if.'
  ],

  nextChallengeId: 'desafio5_ordem_crescente',

  expectedCriteria: [
    { id: 'crit1', description: 'Uso do operador % para ambos os divisores', importance: 'essencial' },
    { id: 'crit2', description: 'Uso do operador lógico || (OU)', importance: 'essencial' },
    { id: 'crit3', description: 'Comparação correta com zero (== 0)', importance: 'essencial' },
    { id: 'crit4', description: 'Tratamento do caso negativo (else)', importance: 'desejável' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Uso de && em vez de ||', likelyCause: 'Confusão entre conjunção e disjunção lógica' },
    { id: 'err2', description: 'Falta de parênteses ou prioridade incorreta', likelyCause: 'Desconhecimento da precedência de operadores' },
    { id: 'err3', description: 'Saída de texto confusa (ex: imprimir apenas "sim" ou "não")', likelyCause: 'Falta de atenção à clareza da interface com o usuário' }
  ],

  templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
  analyzeLocally: (code: string): AnalysisResult => {
    const codeLower = code.toLowerCase();
    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
      main: /int\s+main\s*\(/.test(codeLower),
      variable: /int\s+[a-zA-Z_]/.test(codeLower),
      scanf: /scanf\s*\(/.test(codeLower),
      if: /\bif\s*\(/.test(codeLower),
      mod: /%/.test(codeLower),
      check3: /%\s*3/.test(codeLower),
      check5: /%\s*5/.test(codeLower),
      logicalOr: /\|\|/.test(codeLower) || (codeLower.match(/if/g) || []).length >= 2,
      printf: /printf\s*\(/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Biblioteca stdio.h incluída."); score++; }
    if (checks.main) { good.push("Função main declarada."); score++; }
    if (checks.variable) { good.push("Variável inteira declarada."); score++; }
    if (checks.scanf) { good.push("Leitura de dados implementada."); score++; }
    if (checks.mod) { good.push("Você já identificou que o problema envolve divisibilidade usando o operador %."); score++; }

    if (!checks.mod) review.push("O operador % é the principal recurso para resolver este problema.");
    if (!checks.check3 || !checks.check5) review.push("Parece faltar uma das verificações de divisibilidade (por 3 ou por 5).");
    if (!checks.logicalOr) review.push("Revise se sua lógica está usando 'ou' (||), e não uma condição mais restritiva.");

    if (checks.if) score++;
    if (checks.check3) score++;
    if (checks.check5) score++;
    if (checks.logicalOr) score++;
    if (checks.printf) score++;

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 10) category = 'solução adequada';
    else if (score >= 7) category = 'quase completa';
    else if (score >= 4) category = 'parcialmente correta';

    let difficulty = "Dificuldade em compreender divisibilidade";
    if (!checks.mod) difficulty = "Dificuldade em usar o operador %";
    else if (!checks.logicalOr) difficulty = "Dificuldade em interpretar a lógica ou";
    else if (!checks.check3 || !checks.check5) difficulty = "Dificuldade em combinar duas condições";
    else difficulty = "Dificuldade em produzir saída coerente";

    let nextStep = "Comece lendo o número inteiro com scanf.";
    if (checks.scanf && !checks.mod) nextStep = "Agora use o operador % para testar se o resto da divisão por 3 é zero.";
    if (checks.mod && !checks.logicalOr) nextStep = "Seu código usa condição, mas ainda não mostra claramente a verificação combinada por 3 ou por 5.";
    if (category === 'solução adequada') nextStep = "Parabéns! Você dominou o uso do operador módulo e lógica OU.";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.logicalOr ? ['logica'] : ['sintaxe_aparente'],
      `Análise heurística local: ${score}/10 pontos.`
    );
  }
};
