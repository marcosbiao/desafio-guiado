import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafio2: Challenge = {
  id: 'desafio2_condicionais_paridade',
  title: 'Desafio Guiado: Condicionais com múltiplos casos em C',
  subtitle: 'Classifique um número como positivo par, positivo ímpar, negativo ou zero.',
  challengeVersion: '1.1.0',
  
  metadata: {
    content: 'estruturas condicionais e operador módulo',
    language: 'C',
    level: 'Iniciante',
    time: '15 a 20 minutos',
    requirements: 'variáveis, scanf, printf, if, else if, else',
    skill: 'combinar decisões encadeadas para classificar corretamente diferentes casos de entrada',
    version: '1.1.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Aplicar lógica de aninhamento de condicionais e o operador de resto da divisão (%).',
    pedagogicalGoal: 'Desenvolver a habilidade de decompor um problema complexo em subproblemas lógicos (positividade -> paridade).',
    expectedDifficulty: 'media',
    cognitiveOperation: 'analisar',
    prerequisites: ['Estrutura if/else simples', 'Operadores Aritméticos', 'Conceito de Paridade']
  },

  domainTags: {
    skillTags: ['nested-conditionals', 'modulo-operator', 'logic-branching'],
    topicTags: ['math-logic', 'basic-c'],
    difficultyTag: 'medium-complexity-logic',
    prerequisiteTags: ['desafio1_condicionais_basico']
  },

  problem: 'Adapte o programa para verificar se um número é positivo par, positivo ímpar, negativo ou zero.',
  
  guidingQuestions: [
    'Qual é a entrada do programa?',
    'Quais são as quatro classificações possíveis?',
    'Como identificar se o número é positivo?',
    'Como verificar se um número positivo é par ou ímpar?',
    'Por que zero precisa ser tratado separadamente?'
  ],

  orientation: {
    input: 'Um único número inteiro.',
    output: 'Quatro saídas possíveis: positivo par, positivo ímpar, negativo e zero.',
    cases: 'O teste de positividade deve ocorrer antes da verificação de paridade para números positivos.',
    structure: 'Estrutura condicional encadeada com operador %.',
    expectedLogic: 'O programa deve primeiro separar os três grandes grupos (positivo, negativo, zero). Dentro do grupo positivo, deve haver uma nova decisão para par ou ímpar.'
  },

  examples: [
    { input: '4', output: 'O numero e positivo par.' },
    { input: '7', output: 'O numero e positivo impar.' },
    { input: '-3', output: 'O numero e negativo.' }
  ],

  concepts: [
    'Condicionais Aninhadas',
    'Operador Módulo (%)',
    'Decomposição de Problemas'
  ],

  tips: [
    { 
      id: 1, 
      text: "Pense primeiro em quantas classificações diferentes o problema pede.",
      pedagogicalGoal: "Mapear a complexidade da saída esperada."
    },
    { 
      id: 2, 
      text: "Antes de verificar par ou ímpar, descubra se o número é positivo, negativo ou zero.",
      pedagogicalGoal: "Estabelecer a hierarquia de decisões."
    },
    { 
      id: 3, 
      text: "Para verificar se um número é par, observe se o resto da divisão por 2 é igual a 0 (n % 2 == 0).",
      pedagogicalGoal: "Aplicar o operador módulo para paridade."
    },
    { 
      id: 4, 
      text: "Neste desafio, apenas números positivos devem ser classificados como par ou ímpar.",
      pedagogicalGoal: "Restringir a lógica de paridade ao contexto solicitado."
    }
  ],

  commonErrors: [
    { 
      title: "Verificar paridade antes", 
      description: "Tentar verificar se é par ou ímpar antes de saber se o número é positivo.",
      pedagogicalAdvice: "Siga a ordem lógica do enunciado: primeiro a natureza do número (positivo/negativo), depois a paridade."
    },
    { 
      title: "Esquecer o zero", 
      description: "Não tratar o caso zero separadamente, deixando-o cair em 'negativo' ou 'par'.",
      pedagogicalAdvice: "O zero é um caso especial que deve ser tratado de forma explícita."
    },
    { 
      title: "Negativos como par/ímpar", 
      description: "Classificar números negativos como par ou ímpar, o que não foi pedido.",
      pedagogicalAdvice: "Atenção ao escopo do desafio: a paridade só interessa para os positivos."
    },
    { 
      title: "Operador % incorreto", 
      description: "Usar n / 2 em vez de n % 2 para verificar o resto.",
      pedagogicalAdvice: "Lembre-se: / é divisão (quociente), % é o resto da divisão."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    int n;

    printf("Digite um numero: ");
    scanf("%d", &n);

    if (n > 0) {
        // Se for positivo, verificamos a paridade
        if (n % 2 == 0) {
            printf("O numero e positivo par.\\n");
        } else {
            printf("O numero e positivo impar.\\n");
        }
    } else if (n < 0) {
        printf("O numero e negativo.\\n");
    } else {
        printf("O numero e igual a zero.\\n");
    }

    return 0;
}`,

  finalSummary: [
    'Aninhamento: Usar um if dentro de outro permite refinar a classificação.',
    'Operador Módulo: O símbolo % é a ferramenta padrão para testar divisibilidade.',
    'Ordem Lógica: Resolver os grandes grupos primeiro simplifica a lógica interna.'
  ],

  nextChallengeId: 'desafio3_emprestimo_salario',

  expectedCriteria: [
    { id: 'crit1', description: 'Uso do operador % 2 para paridade', importance: 'essencial' },
    { id: 'crit2', description: 'Aninhamento de if dentro do caso positivo', importance: 'essencial' },
    { id: 'crit3', description: 'Tratamento correto do caso zero', importance: 'essencial' },
    { id: 'crit4', description: 'Mensagens de saída distintas para os 4 casos', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Uso de n % 2 == 1 para ímpar (pode falhar em negativos em alguns compiladores)', likelyCause: 'Falta de conhecimento sobre comportamento de % com negativos' },
    { id: 'err2', description: 'Falta de chaves em if/else aninhados', likelyCause: 'Desatenção à sintaxe de blocos' },
    { id: 'err3', description: 'Lógica redundante (ex: testar n > 0 e n % 2 == 0 em ifs separados no mesmo nível)', likelyCause: 'Dificuldade em estruturar hierarquia de decisão' }
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
      elseIf: /\belse\s+if\b/.test(codeLower),
      else: /\belse\b/.test(codeLower),
      mod: /%\s*2/.test(codeLower),
      positiveCheck: />\s*0/.test(codeLower),
      negativeCheck: /<\s*0/.test(codeLower),
      zeroCheck: /==\s*0/.test(codeLower) || /\belse\b/.test(codeLower),
      printf: /printf\s*\(/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Você incluiu a biblioteca padrão."); score++; }
    if (checks.main) { good.push("Função main declarada."); score++; }
    if (checks.variable) { good.push("Variável declarada."); score++; }
    if (checks.scanf) { good.push("Leitura com scanf presente."); score++; }
    if (checks.if) { good.push("Você já identificou a necessidade de usar decisão condicional."); score++; }
    if (checks.mod) { good.push("Boa tentativa. O uso do operador de resto é importante neste problema."); score++; }
    
    if (!checks.mod) review.push("Ainda não diferencia positivo par de positivo ímpar.");
    if (!checks.zeroCheck) review.push("Parece faltar o tratamento explícito do caso zero.");
    if (!checks.elseIf && !checks.else) review.push("Revise se seu programa contempla exatamente as quatro classificações pedidas.");

    if (checks.positiveCheck) score++;
    if (checks.negativeCheck) score++;
    if (checks.zeroCheck) score++;
    if (checks.printf) score++;

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 10) category = 'solução adequada';
    else if (score >= 7) category = 'quase completa';
    else if (score >= 4) category = 'parcialmente correta';

    let difficulty = "Dificuldade em compreender todos os casos do problema";
    if (!checks.mod) difficulty = "Dificuldade em usar o operador %";
    else if (!checks.if) difficulty = "Dificuldade em encadear condições";
    else if (!checks.zeroCheck) difficulty = "Dificuldade em tratar zero separadamente";
    else difficulty = "Dificuldade em produzir saídas coerentes";

    let nextStep = "Comece separando os casos principais: positivo, negativo e zero.";
    if (checks.positiveCheck && !checks.mod) nextStep = "Agora, dentro do caso positivo, use o operador % para verificar se é par ou ímpar.";
    if (category === 'solução adequada') nextStep = "Parabéns! Sua solução está correta.";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.mod ? ['logica'] : ['sintaxe_aparente'],
      `Análise heurística local: ${score}/10 pontos.`
    );
  }
};
