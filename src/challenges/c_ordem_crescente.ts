import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafio5: Challenge = {
  id: 'desafio5_ordem_crescente_tres_numeros',
  title: 'Desafio Guiado: Ordenação simples em C',
  subtitle: 'Receba três números e mostre-os em ordem crescente.',
  challengeVersion: '1.1.0',
  
  metadata: {
    content: 'estruturas condicionais e comparação entre valores',
    language: 'C',
    level: 'Iniciante',
    time: '15 a 20 minutos',
    requirements: 'variáveis, scanf, printf, operadores relacionais, if, else if, else',
    skill: 'comparar múltiplos valores e organizar saídas em ordem crescente',
    version: '1.1.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Resolver problemas de ordenação básica utilizando lógica de comparação exaustiva.',
    pedagogicalGoal: 'Desenvolver o pensamento algorítmico para lidar com múltiplas variáveis e suas relações de ordem.',
    expectedDifficulty: 'media',
    cognitiveOperation: 'analisar',
    prerequisites: ['Operadores Relacionais', 'Estruturas Condicionais Aninhadas', 'Lógica de Comparação']
  },

  domainTags: {
    skillTags: ['sorting-logic', 'multiple-comparisons', 'nested-ifs'],
    topicTags: ['algorithms', 'basic-c'],
    difficultyTag: 'medium-complexity-logic',
    prerequisiteTags: ['desafio2_condicionais_paridade']
  },

  problem: 'Faça um programa que receba três números e mostre-os em ordem crescente.',
  
  guidingQuestions: [
    'Quantos valores o programa deve ler?',
    'O que significa mostrar os números em ordem crescente?',
    'Quais comparações entre os números podem ajudar a descobrir qual é o menor?',
    'Depois de encontrar o menor, como decidir a posição dos outros dois?',
    'Como exibir os três valores já ordenados?'
  ],

  orientation: {
    input: 'O programa deve ler três números inteiros.',
    output: 'A saída deve mostrar esses valores do menor para o maior, separados por espaço.',
    cases: 'Diferentes combinações entre os três valores (ex: a < b < c, a < c < b, b < a < c, etc.).',
    structure: 'Estruturas condicionais encadeadas para identificar a ordem correta.',
    expectedLogic: 'O aluno deve identificar o menor de todos (ex: se a <= b e a <= c). Uma vez fixado o menor, resta comparar os outros dois para definir a 2ª e 3ª posições.'
  },

  examples: [
    { input: '10 5 8', output: '5 8 10' },
    { input: '1 2 3', output: '1 2 3' },
    { input: '3 2 1', output: '1 2 3' }
  ],

  concepts: [
    'Algoritmos de Comparação',
    'Permutações Lógicas',
    'Estruturação de Casos Excludentes'
  ],

  tips: [
    { 
      id: 1, 
      text: "Comece pensando em como descobrir qual dos três números é o menor.",
      pedagogicalGoal: "Isolar o primeiro elemento da sequência ordenada."
    },
    { 
      id: 2, 
      text: "Depois de identificar o menor, compare os dois restantes para definir a ordem final.",
      pedagogicalGoal: "Reduzir o problema de 3 variáveis para 2 variáveis."
    },
    { 
      id: 3, 
      text: "Você pode resolver o problema com condicionais encadeadas (if dentro de if) para cada caso do menor valor.",
      pedagogicalGoal: "Aplicar aninhamento para refinamento de decisão."
    },
    { 
      id: 4, 
      text: "Verifique se sua solução cobre diferentes ordens de entrada, como crescente, decrescente e valores iguais.",
      pedagogicalGoal: "Validar a robustez do algoritmo."
    }
  ],

  commonErrors: [
    { 
      title: "Comparações insuficientes", 
      description: "Comparar apenas dois números e esquecer o terceiro.",
      pedagogicalAdvice: "Para ordenar 3 valores, você precisa garantir que cada um foi comparado com os outros."
    },
    { 
      title: "Ordem fixa", 
      description: "Mostrar os números em uma ordem fixa, sem realmente testá-los.",
      pedagogicalAdvice: "O programa deve funcionar para QUALQUER ordem de entrada, não apenas uma."
    },
    { 
      title: "Lógica incompleta", 
      description: "Montar uma lógica que funciona apenas para alguns casos (ex: esquece quando o segundo é o menor).",
      pedagogicalAdvice: "Tente desenhar no papel todas as 6 combinações possíveis de 3 números."
    },
    { 
      title: "Confusão de ordem", 
      description: "Confundir ordem crescente (menor para o maior) com ordem decrescente.",
      pedagogicalAdvice: "Crescente: 1, 2, 3. Decrescente: 3, 2, 1."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    int a, b, c;

    printf("Digite tres numeros: ");
    scanf("%d %d %d", &a, &b, &c);

    // Estratégia: Identificar o menor e depois ordenar os outros dois
    if (a <= b && a <= c) {
        if (b <= c) {
            printf("%d %d %d\\n", a, b, c);
        } else {
            printf("%d %d %d\\n", a, c, b);
        }
    } else if (b <= a && b <= c) {
        if (a <= c) {
            printf("%d %d %d\\n", b, a, c);
        } else {
            printf("%d %d %d\\n", b, c, a);
        }
    } else {
        // Se não é A nem B o menor, só pode ser C
        if (a <= b) {
            printf("%d %d %d\\n", c, a, b);
        } else {
            printf("%d %d %d\\n", c, b, a);
        }
    }

    return 0;
}`,

  finalSummary: [
    'Decomposição: Dividir o problema em "quem é o menor" simplifica a lógica seguinte.',
    'Exaustão: Em problemas de ordenação manual, é preciso cobrir todas as permutações.',
    'Operadores Lógicos: O uso de && (E) ajuda a verificar múltiplas condições simultâneas.'
  ],

  nextChallengeId: 'desafio6_triangulo_classificacao',

  expectedCriteria: [
    { id: 'crit1', description: 'Leitura de 3 variáveis inteiras', importance: 'essencial' },
    { id: 'crit2', description: 'Uso de operadores lógicos (&&) para encontrar o menor', importance: 'essencial' },
    { id: 'crit3', description: 'Tratamento de todos os 6 casos de ordenação', importance: 'essencial' },
    { id: 'crit4', description: 'Uso correto de <= para lidar com números iguais', importance: 'desejável' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Esquecer de tratar o caso onde o segundo ou terceiro número é o menor', likelyCause: 'Foco excessivo no primeiro caso de teste' },
    { id: 'err2', description: 'Uso de if/if/if sem else, gerando múltiplas saídas', likelyCause: 'Falta de compreensão sobre exclusividade de casos' },
    { id: 'err3', description: 'Inverter a ordem de impressão das variáveis', likelyCause: 'Confusão mental durante a escrita dos printf' }
  ],

  templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
  analyzeLocally: (code: string): AnalysisResult => {
    const codeLower = code.toLowerCase();
    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
      main: /int\s+main\s*\(/.test(codeLower),
      variables: /(int|float|double)\s+[a-zA-Z_].*,.*,.*[a-zA-Z_]/.test(codeLower) || (codeLower.match(/(int|float|double)\s+[a-zA-Z_]/g) || []).length >= 3,
      scanf: /scanf\s*\(/.test(codeLower),
      if: /\bif\s*\(/.test(codeLower),
      elseIf: /\belse\s+if\b/.test(codeLower) || (codeLower.match(/\bif\b/g) || []).length >= 3,
      printf: /printf\s*\(/.test(codeLower),
      comparisons: /[<>=]/.test(codeLower),
      multiplePrintf: (codeLower.match(/printf/g) || []).length >= 3
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Inclusão de stdio.h correta."); score++; }
    if (checks.main) { good.push("Função main presente."); score++; }
    if (checks.variables) { good.push("Você declarou três variáveis para os números."); score++; }
    if (checks.scanf) { good.push("Uso de scanf para entrada de dados."); score++; }
    if (checks.if) { good.push("Você já identificou que o problema exige comparar mais de um valor."); score++; }
    if (checks.comparisons) { good.push("Você está usando operadores relacionais para comparar os valores."); score++; }

    if (!checks.variables) review.push("Você precisa de três variáveis para armazenar os números de entrada.");
    if (!checks.elseIf && !checks.if) review.push("Seu código lê os números, mas ainda não deixa clara a lógica de ordenação.");
    if (!checks.multiplePrintf && !codeLower.includes("%d %d %d")) review.push("Revise se sua solução exibe todos os três números na ordem correta.");

    if (checks.printf) score++;
    if (checks.elseIf) score++;
    if (checks.multiplePrintf || codeLower.includes("%d %d %d")) score++;
    if (checks.comparisons) score++;

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 10) category = 'solução adequada';
    else if (score >= 7) category = 'quase completa';
    else if (score >= 4) category = 'parcialmente correta';

    let difficulty = "Dificuldade em comparar três valores ao mesmo tempo";
    if (!checks.if) difficulty = "Dificuldade em estruturar condicionais encadeadas";
    else if (!checks.comparisons) difficulty = "Dificuldade em identificar o menor valor";
    else if (!checks.multiplePrintf) difficulty = "Dificuldade em produzir a saída na ordem pedida";
    else difficulty = "Dificuldade em garantir que todos os casos sejam tratados";

    let nextStep = "Comece declarando as três variáveis e lendo os valores com scanf.";
    if (checks.variables && !checks.if) nextStep = "Boa tentativa. O ponto central deste problema é descobrir a posição relativa entre os três valores.";
    if (checks.if && !checks.elseIf) nextStep = "Seu programa está próximo do esperado, mas ainda precisa organizar corretamente a saída em ordem crescente.";
    if (category === 'solução adequada') nextStep = "Parabéns! Você conseguiu ordenar os três números corretamente.";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.comparisons ? ['logica'] : ['sintaxe_aparente'],
      `Análise heurística local: ${score}/10 pontos.`
    );
  }
};
