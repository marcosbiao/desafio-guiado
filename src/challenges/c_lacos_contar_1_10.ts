import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafioLacos1: Challenge = {
  id: 'desafio_lacos_contar_1_ten',
  categoryId: 'lacos',
  title: 'Contar de 1 até 10',
  subtitle: 'Escreva um programa em C que mostre na tela os números de 1 até 10.',
  challengeVersion: '1.0.0',
  
  metadata: {
    content: 'Laços de Repetição',
    language: 'C (ANSI/C99)',
    level: 'Iniciante',
    time: '10 minutos',
    requirements: 'Variáveis de controle, laço de repetição, saída com printf.',
    skill: 'Repetir uma ação com valor controlado.',
    version: '1.0.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Utilizar uma variável de controle e um laço para repetir uma exibição controlada.',
    pedagogicalGoal: 'Compreender a inicialização, condição de parada e incremento do laço de repetição.',
    expectedDifficulty: 'baixa',
    cognitiveOperation: 'aplicar',
    prerequisites: ['Variáveis Inteiras', 'Saída de Dados (printf)', 'Operadores Relacionais']
  },

  domainTags: {
    skillTags: ['loops', 'variables', 'input-output'],
    topicTags: ['basic-c', 'repetition'],
    difficultyTag: 'low-complexity-logic',
    prerequisiteTags: ['basic-syntax']
  },

  problem: 'Escreva um programa em C que mostre na tela os números de 1 até 10, cada um em uma linha.',
  
  guidingQuestions: [
    'Qual é a inicialização recomendada para o contador?',
    'Qual é a condição de parada para que o 10 também seja impresso?',
    'Onde deve ser colocado o printf para mostrar cada incremento?'
  ],

  orientation: {
    input: 'Nenhuma entrada é necessária.',
    output: 'Os números de 1 a 10 exibidos consecutivamente.',
    cases: 'Caso único onde i varia de 1 a 10.',
    structure: 'Laço de repetição determinado (for) ou condicional (while).',
    expectedLogic: 'Criar uma variável acumuladora/contador e um laço (como for) iniciado em 1, com incrementos de uma unidade até o valor menor ou igual a 10, imprimindo em cada passo.'
  },

  examples: [
    { input: 'Nenhuma', output: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10' }
  ],

  concepts: [
    'Variável de Controle',
    'Laços de Repetição (for e while)',
    'Critério de Incremento'
  ],

  tips: [
    { 
      id: 1, 
      text: "Você precisa repetir uma mesma ação várias vezes. Qual estrutura em C nos permite fazer isso sem reescrever linhas de código?",
      pedagogicalGoal: "Identificar a necessidade de uso de comandos de repetição."
    },
    { 
      id: 2, 
      text: "Pense em uma variável de controle que começa em 1 e aumenta a cada repetição até chegar em 10.",
      pedagogicalGoal: "Modelar a lógica do contador numérico."
    },
    { 
      id: 3, 
      text: "A condição do laço deve permitir que o número 10 também seja exibido. Use operador <= em sua condição.",
      pedagogicalGoal: "Definir condição estrita e inclusiva de parada."
    },
    { 
      id: 4, 
      text: "Uma estrutura comum é usar o 'for' com o formato: for (i = 1; i <= 10; i++).",
      pedagogicalGoal: "Utilizar a estrutura for adequadamente."
    }
  ],

  commonErrors: [
    { 
      title: "Começar em 0", 
      description: "Começar o contador em 0 sem necessidade exibirá o zero, o que está fora do intervalo solicitado (1 a 10).",
      pedagogicalAdvice: "Inicie o contador baseando-se exatamente nos limites pretendidos do problema."
    },
    { 
      title: "Esquecer o 10 na condição", 
      description: "Usar 'i < 10' em vez de 'i <= 10' fará com que o código mostre números de 1 a 9 e pare antes de exibir o 10.",
      pedagogicalAdvice: "Revise com cuidado as condições limite de inclusão."
    },
    { 
      title: "Esquecer o incremento", 
      description: "Deixar de incrementar o valor do contador criará um loop infinito, travando a execução.",
      pedagogicalAdvice: "Sempre verifique se a variável de controle converge para o fim lógico do teste condicional."
    },
    { 
      title: "Imprimir fora do laço", 
      description: "Colocar o printf fora do laço trará apenas o valor terminal gerado.",
      pedagogicalAdvice: "Para exibir todos os estados intermediários do laço, certifique-se de que a exibição ocorra dentro do bloco repetidor."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    int i;

    // Um laço simples variando de 1 a 10
    for (i = 1; i <= 10; i++) {
        printf("%d\\n", i);
    }

    return 0;
}`,

  finalSummary: [
    'Inicialização: Controla onde a contagem de ciclos começa.',
    'Parada Segura: Condição bem delimitada (> ou <=) protege contra repetições infinitas.',
    'Variável de Controle: Atualizar o contador no local correto garante o fluxo esperado.'
  ],

  nextChallengeId: 'desafio_lacos_somar_n',

  expectedCriteria: [
    { id: 'crit1', description: 'Uso de estrutura de repetição (for/while)', importance: 'essencial' },
    { id: 'crit2', description: 'Inicialização do contador em 1', importance: 'essencial' },
    { id: 'crit3', description: 'Condição que inclui <= 10 ou equivalente', importance: 'essencial' },
    { id: 'crit4', description: 'printf dentro do laço exibindo as atualizações', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Loop infinito por falta de incremento', likelyCause: 'Ausência ou má localização da modificação de controle' },
    { id: 'err2', description: 'Condição estrita (i < 10) omitindo o limite', likelyCause: 'Confusão com intervalos matemáticos abertos' },
    { id: 'err3', description: 'Inclusão do zero (i = 0)', likelyCause: 'Padrão tradicional de arrays aplicados sem critério pedagógico' }
  ],

  templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
  
  analyzeLocally: (code: string): AnalysisResult => {
    const codeLower = code.toLowerCase();
    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
      main: /int\s+main\s*\(/.test(codeLower),
      loops: /\b(for|while)\b/.test(codeLower),
      variable: /(int)\s+[a-zA-Z_][a-zA-Z0-9_]*/.test(codeLower),
      startsAtOne: /=\s*1\b/.test(codeLower),
      endsAtTen: /(<=\s*10|<=10|<11)\b/.test(codeLower),
      hasIncrement: /(\+\+|i\s*=\s*i\s*\+\s*1|i\+=\s*1)/.test(codeLower),
      printf: /printf\s*\(/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Você incluiu a biblioteca de entrada e saída."); score++; }
    else { review.push("Adicione #include <stdio.h> para utilizar o printf."); }

    if (checks.main) { good.push("A definição de int main() está adequada."); score++; }
    else { review.push("Não encontrei a função int main() declarada."); }

    if (checks.loops) { good.push("Excelente, você usou uma estrutura de laço."); score += 2; }
    else { review.push("Você deve utilizar uma estrutura de repetição, como for ou while."); }

    if (checks.variable) { good.push("Variável criada para o loop."); score++; }
    else { review.push("Utilize uma variável inteira como variável de controle."); }

    if (checks.startsAtOne) { good.push("O iniciador do laço está corretamente definido em 1."); score += 2; }
    else { review.push("Certifique-se de que o loop inicie em 1, como sugerido."); }

    if (checks.endsAtTen) { good.push("A condição de parada abrange e para no número 10."); score += 2; }
    else { review.push("Garanta que o loop continue até 10 usando um operador relacional inclusivo."); }

    if (checks.hasIncrement) { good.push("Incremento do contador detectado."); score++; }
    else { review.push("Verifique se seu contador está sendo incrementado com ++."); }

    if (checks.printf) { score++; }

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 9) category = 'solução adequada';
    else if (score >= 6) category = 'quase completa';
    else if (score >= 3) category = 'parcialmente correta';

    let difficulty = "Dificuldade em estruturar o laço";
    if (!checks.loops) difficulty = "Falta de estrutura de repetição";
    else if (!checks.startsAtOne) difficulty = "Indefinição de limite inicial";
    else if (!checks.endsAtTen) difficulty = "Erro na especificação de fim de intervalo";
    else if (!checks.hasIncrement) difficulty = "Probabilidade de loop infinito";

    let nextStep = "Comece inserindo uma estrutura 'for' com inicialização em i = 1.";
    if (category === 'parcialmente correta') nextStep = "Adicione a condição 'i <= 10' dentro dos parênteses da função de laço.";
    if (category === 'quase completa') nextStep = "Verifique se a impressão dentro do bloco do laço está bem posicionada de forma a quebrar linhas.";
    if (category === 'solução adequada') nextStep = "Parabéns, você dominou a construção básica de um laço de repetição!";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.loops ? ['logica'] : ['sintaxe_aparente'],
      `Análise Heurística de Laço: ${score}/10 pontos.`
    );
  }
};
