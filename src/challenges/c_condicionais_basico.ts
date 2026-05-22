import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafio1: Challenge = {
  id: 'desafio1_condicionais_basico',
  title: 'Desafio Guiado: Estrutura Condicional em C',
  subtitle: 'Classifique um número como positivo, negativo ou zero.',
  challengeVersion: '1.1.0',
  
  metadata: {
    content: 'Estrutura Condicional',
    language: 'C (ANSI/C99)',
    level: 'Iniciante',
    time: '10 a 15 minutos',
    requirements: 'Variáveis, leitura com scanf, saída com printf.',
    skill: 'Analisar um valor de entrada e decidir entre múltiplos casos.',
    version: '1.1.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Compreender e aplicar estruturas condicionais encadeadas para classificação de dados.',
    pedagogicalGoal: 'Introduzir o conceito de decisão mútua exclusiva e tratamento de múltiplos cenários lógicos.',
    expectedDifficulty: 'baixa',
    cognitiveOperation: 'aplicar',
    prerequisites: ['Variáveis Inteiras', 'Entrada de Dados (scanf)', 'Saída de Dados (printf)']
  },

  domainTags: {
    skillTags: ['input-output', 'variables', 'conditionals'],
    topicTags: ['math-logic', 'basic-c'],
    difficultyTag: 'low-complexity-logic',
    prerequisiteTags: ['basic-syntax', 'data-types']
  },

  problem: 'Escreva um programa em C que leia um número inteiro e informe se ele é positivo, negativo ou igual a zero.',
  
  guidingQuestions: [
    'Qual é a entrada do programa?',
    'Quais são os três casos possíveis?',
    'Como comparar um número com zero?'
  ],

  orientation: {
    input: 'Um único número inteiro digitado pelo usuário.',
    output: 'Uma mensagem de texto indicando a categoria do número.',
    cases: 'Três casos: Positivo (>0), Negativo (<0) e Zero (==0).',
    structure: 'Estrutura condicional encadeada (if / else if / else).',
    expectedLogic: 'O aluno deve ler um valor, testar se é maior que zero, se não for, testar se é menor que zero, e por fim tratar o caso neutro (zero).'
  },

  examples: [
    { input: '10', output: 'O numero e positivo.' },
    { input: '-5', output: 'O numero e negativo.' },
    { input: '0', output: 'O numero e igual a zero.' }
  ],

  concepts: [
    'Decisão Encadeada',
    'Operadores de Comparação',
    'Fluxo de Execução Condicional'
  ],

  tips: [
    { 
      id: 1, 
      text: "Pense na entrada: você precisará de uma variável para armazenar o número inteiro. Qual tipo de dado em C é usado para inteiros?",
      pedagogicalGoal: "Identificar o tipo de dado correto para a entrada."
    },
    { 
      id: 2, 
      text: "Lembre-se de usar a função 'scanf' para ler o valor digitado pelo usuário. Não esqueça do '&' antes do nome da variável!",
      pedagogicalGoal: "Garantir a leitura correta da entrada do usuário."
    },
    { 
      id: 3, 
      text: "Existem três situações possíveis: o número ser maior que zero (> 0), menor que zero (< 0) ou exatamente igual a zero (== 0).",
      pedagogicalGoal: "Mapear todos os cenários lógicos do problema."
    },
    { 
      id: 4, 
      text: "Organize sua lógica usando 'if' para a primeira condição, 'else if' para a segunda e 'else' para o caso que sobrar.",
      pedagogicalGoal: "Estruturar a decisão mútua exclusiva."
    }
  ],

  commonErrors: [
    { 
      title: "Esquecer o scanf", 
      description: "O programa não saberá qual número testar se você não ler a entrada do usuário.",
      pedagogicalAdvice: "Sempre comece garantindo que os dados de entrada foram capturados corretamente."
    },
    { 
      title: "Usar apenas if", 
      description: "Se você usar vários 'if' separados, o programa pode testar condições desnecessárias ou falhar em lógica complexa.",
      pedagogicalAdvice: "Use 'else if' quando os casos forem excludentes entre si."
    },
    { 
      title: "Esquecer o caso zero", 
      description: "Muitos iniciantes testam apenas positivo e negativo, esquecendo que o zero é um caso neutro importante.",
      pedagogicalAdvice: "Verifique se sua lógica cobre 100% dos valores possíveis para um inteiro."
    },
    { 
      title: "Erro de comparação", 
      description: "Lembre-se que para testar igualdade usamos '==', e não '=' (que é atribuição).",
      pedagogicalAdvice: "Revise a diferença entre atribuir um valor e comparar dois valores."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    int numero; // Declara uma variável inteira

    printf("Digite um numero: ");
    scanf("%d", &numero); // Lê o valor inteiro do teclado

    // Estrutura condicional para testar os 3 casos
    if (numero > 0) {
        printf("O numero e positivo.\\n");
    } 
    else if (numero < 0) {
        printf("O numero e negativo.\\n");
    } 
    else {
        // Se não é > 0 nem < 0, só pode ser zero
        printf("O numero e igual a zero.\\n");
    }

    return 0;
}`,

  finalSummary: [
    'Mapeamento de Casos: Antes de programar, identifique todos os cenários possíveis.',
    'Decisão Encadeada: Use else if quando os casos forem mutuamente exclusivos.',
    'Entrada e Saída: A precisão no scanf e clareza no printf são fundamentais.'
  ],

  nextChallengeId: 'desafio2_condicionais_paridade',

  expectedCriteria: [
    { id: 'crit1', description: 'Leitura de um inteiro com scanf', importance: 'essencial' },
    { id: 'crit2', description: 'Uso de estrutura if/else if/else', importance: 'essencial' },
    { id: 'crit3', description: 'Comparação correta com zero (> 0, < 0)', importance: 'essencial' },
    { id: 'crit4', description: 'Saída de texto coerente para cada caso', importance: 'desejável' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Inversão de operadores (> por <)', likelyCause: 'Confusão conceitual com símbolos matemáticos' },
    { id: 'err2', description: 'Uso de = em vez de ==', likelyCause: 'Confusão entre atribuição e comparação' },
    { id: 'err3', description: 'Falta de tratamento do zero', likelyCause: 'Foco apenas nos casos extremos (positivo/negativo)' }
  ],

  templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
  analyzeLocally: (code: string): AnalysisResult => {
    const codeLower = code.toLowerCase();
    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
      main: /int\s+main\s*\(/.test(codeLower),
      variable: /(int|float|double)\s+[a-zA-Z_][a-zA-Z0-9_]*/.test(codeLower),
      scanf: /scanf\s*\(/.test(codeLower),
      if: /\bif\s*\(/.test(codeLower),
      elseIf: /\belse\s+if\b/.test(codeLower) || (codeLower.match(/\bif\b/g) || []).length >= 2,
      else: /\belse\b/.test(codeLower),
      positiveCheck: />\s*0/.test(codeLower),
      negativeCheck: /<\s*0/.test(codeLower),
      zeroCheck: /==\s*0/.test(codeLower) || /\belse\b/.test(codeLower),
      printf: /printf\s*\(/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Você incluiu a biblioteca padrão de entrada e saída."); score++; }
    else { review.push("Falta incluir a biblioteca <stdio.h>."); }

    if (checks.main) { good.push("A função principal 'int main()' foi declarada corretamente."); score++; }
    else { review.push("Todo programa em C precisa de uma função 'int main()'."); }

    if (checks.variable) { good.push("Você declarou uma variável para armazenar o número."); score++; }
    else { review.push("Você precisa declarar uma variável (ex: int n;)."); }

    if (checks.scanf) { good.push("A leitura de dados com 'scanf' está presente."); score++; }
    else { review.push("Esqueceu de ler o valor do usuário com 'scanf'."); }

    if (checks.if) { good.push("Você iniciou a estrutura de decisão com 'if'."); score++; }
    else { review.push("O problema exige uma estrutura de decisão 'if'."); }

    if (checks.elseIf || checks.else) { good.push("Você está tratando múltiplos casos com else/else if."); score++; }
    else { review.push("Tente usar 'else if' e 'else' para tratar os três casos."); }

    if (checks.printf) { good.push("O programa utiliza 'printf' para exibir os resultados."); score++; }
    else { review.push("Use 'printf' para informar ao usuário o resultado."); }

    if (checks.positiveCheck) score++;
    if (checks.negativeCheck) score++;
    if (checks.zeroCheck) score++;

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 10) category = 'solução adequada';
    else if (score >= 7) category = 'quase completa';
    else if (score >= 4) category = 'parcialmente correta';

    let difficulty = "Dificuldade de compreensão inicial";
    if (!checks.scanf) difficulty = "Dificuldade na entrada de dados (scanf)";
    else if (!checks.if) difficulty = "Dificuldade em estruturar a condição (if)";
    else if (!checks.elseIf || !checks.else) difficulty = "Dificuldade em tratar todos os casos";
    else difficulty = "Dificuldade sintática ou lógica incompleta";

    let nextStep = "Comece declarando a variável e lendo o valor com scanf.";
    if (category === 'parcialmente correta') nextStep = "Agora foque em criar as condições if (n > 0) e else if (n < 0).";
    if (category === 'quase completa') nextStep = "Revise se todos os três casos (incluindo o zero) estão sendo tratados.";
    if (category === 'solução adequada') nextStep = "Parabéns! Sua solução parece completa.";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.if ? ['logica'] : ['sintaxe_aparente'],
      `Análise heurística local: ${score}/11 pontos.`
    );
  }
};
