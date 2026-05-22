import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafioVetores2: Challenge = {
  id: 'desafio_vetores_contar_pares',
  categoryId: 'vetores',
  title: 'Contar valores pares em um vetor',
  subtitle: 'Escreva um programa em C que leia 5 números inteiros em um vetor e conte quantos desses números são pares.',
  challengeVersion: '1.0.0',
  
  metadata: {
    content: 'Vetores com Condicionais',
    language: 'C (ANSI/C99)',
    level: 'Iniciante',
    time: '15 minutos',
    requirements: 'Declaração de vetor, operador módulo (%), contador, laço de repetição.',
    skill: 'Unir estruturas lineares de dados a decisões modulares de filtragem.',
    version: '1.0.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Aplicar varredura completa em vetores de dados inteiros para classificar e contabilizar subconjuntos por critérios divisores aritméticos.',
    pedagogicalGoal: 'Consolidar o domínio do operador módulo (%) no teste condicional no escopo do percurso de arrays.',
    expectedDifficulty: 'media',
    cognitiveOperation: 'aplicar',
    prerequisites: ['Declaração de Vetor', 'Operador Resto da Divisão', 'Estruturas Condicionais', 'Variável de Contagem']
  },

  domainTags: {
    skillTags: ['arrays', 'variables', 'loops', 'conditionals'],
    topicTags: ['basic-c', 'data-structures', 'math-logic'],
    difficultyTag: 'medium-complexity-logic',
    prerequisiteTags: ['basic-syntax', 'loops']
  },

  problem: 'Escreva um programa em C que leia do teclado 5 números inteiros em um vetor de tamanho 5, faça uma busca e apresente a quantidade total de números inseridos que sejam pares.',
  
  guidingQuestions: [
    'Como testar se um número guardado em uma determinada posição do vetor é par?',
    'Qual variável usaremos para rastrear o progresso da contagem e como inicializá-la?',
    'Por que devemos usar o operador % na variável do vetor (numeros[i]) e não na variável contadora i?',
    'Onde deve ser colocada a mensagem final contendo o total de pares identificados?'
  ],

  orientation: {
    input: '5 números inteiros digitados sequencialmente.',
    output: 'A quantidade de números pares lidos do teclado.',
    cases: 'Caso com nenhum número par (ex: 1, 3, 5, 7, 9 retorna 0). Caso todos pares (ex: 2, 4, 6, 8, 10 retorna 5).',
    structure: 'Vetor de tamanho 5 preenchido via loop scanf. Varredura com teste if (numeros[i] % 2 == 0) incrementando contador inicialmente instanciado em zero.',
    expectedLogic: 'Vetor instanciado com tamanho 5. Preenchimento linear. Inicialização de variável pares em 0. Loop de avaliação do índice 0 a 4 com a verificação de módulo. Impressão final consolidada.'
  },

  examples: [
    { input: '2 7 8 10 15', output: 'Quantidade de pares: 3' },
    { input: '1 3 5 7 9', output: 'Quantidade de pares: 0' }
  ],

  concepts: [
    'Filtragem de dados contidos em arrays',
    'Contador Condicional no percurso de dados',
    'Operações aritméticas modulares de paridade'
  ],

  tips: [
    { 
      id: 1, 
      text: "Para saber se um número é perfeitamente par, aplique o operador modular % contra o divisor de valor 2 (numeros[i] % 2 == 0).",
      pedagogicalGoal: "Fixar a expressão lógica de checagem de paridade."
    },
    { 
      id: 2, 
      text: "Evite confundir as variáveis. A checagem de paridade se dá sobre a propriedade numeros[i], e não em cima do contador do loop i.",
      pedagogicalGoal: "Elucidar a diferença de dados e índices."
    },
    { 
      id: 3, 
      text: "Use uma variável contadora secundária iniciando expressamente em 0 para registrar quantos pares foram encontrados.",
      pedagogicalGoal: "Orientar sobre a estruturação correta de contadores."
    },
    { 
      id: 4, 
      text: "Apenas mostre o valor dos pares após percorrido todo o comprimento do vetor. Fora de suas chaves em loop.",
      pedagogicalGoal: "Garantir a saída final limpa e unificada."
    }
  ],

  commonErrors: [
    { 
      title: "Testar o índice i % 2", 
      description: "Escrever 'if (i % 2 == 0)' checará as posições ordinais do loop (0, 1, 2, 3...) ao invés do elemento armazenado em numeros[i].",
      pedagogicalAdvice: "Lembre-se: 'i' é a coordenada de acesso, ao passo que 'numeros[i]' é o valor guardado naquela coordenada específica."
    },
    { 
      title: "Esquecer a inicialização do contador em 0", 
      description: "Dizer apenas 'int pares;' faz com que a variável herde valores espúrios deixados de outros processos no pente de memória.",
      pedagogicalAdvice: "Sempre que for criar acumuladores ou contadores de incremento, declare expressamente seu valor inicial (tipicamente zero)."
    },
    { 
      title: "Imprimir as etapas parciais do contador", 
      description: "Deixar o printf dentro do laço de varredura imprimirá o contador intermediário a cada passo que o sistema achar um número de interesse.",
      pedagogicalAdvice: "Deixe a exibição final de dados localizada após o fechamento do bloco iterativo do loop."
    },
    { 
      title: "Index Out Of Bounds no vetor", 
      description: "Varrer arrays de comprimento 5 até índices maiores ou iguais a 5 (i <= 5) resultará em vazamento a referências ilegais em memória RAM.",
      pedagogicalAdvice: "Em C os vetores começam obrigatoriamente em 0 e terminam em tamanho-1."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    int numeros[5];
    int i, pares = 0; // Inicializando o contador de pares com zero

    // Leitura dos 5 números inteiros
    for (i = 0; i < 5; i++) {
        scanf("%d", &numeros[i]);
    }

    // Varredura para contar os elementos pares
    for (i = 0; i < 5; i++) {
        if (numeros[i] % 2 == 0) {
            pares++; // Incrementa se o número for par
        }
    }

    printf("Quantidade de pares: %d\\n", pares);

    return 0;
}`,

  finalSummary: [
    'Isolamento e Paridade: O operador % 2 == 0 é definitivo para análises com números inteiros de natureza discreta.',
    'Construção de Contadores: Iniciar com valor absoluto 0 assegura que suas contagens incrementais sejam precisas.',
    'Percurso de Arrays: Use o mesmo range ordinal de índices em ambas as frentes de leitura e verificação lógica.'
  ],

  nextChallengeId: 'desafio_matrizes_soma_2x2',

  expectedCriteria: [
    { id: 'crit1', description: 'Uso de array de tamanho 5 declarada no início', importance: 'essencial' },
    { id: 'crit2', description: 'Inicialização explícita do contador do paridade em zero', importance: 'essencial' },
    { id: 'crit3', description: 'Laço operando de forma indexada de 0 a 4', importance: 'essencial' },
    { id: 'crit4', description: 'Expressão condicional correta sobre numeros[i] % 2', importance: 'essencial' },
    { id: 'crit5', description: 'Printf consolidador externo posicionado ao fim', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Falta de inicialização inicial em zero', likelyCause: 'Declaração crua de atribuição de inteiros em C' },
    { id: 'err2', description: 'Dificuldade de escopo no laço repetitivo', likelyCause: 'Fechamento ou colocação de comandos fora do local adequado' },
    { id: 'err3', description: 'Teste lógico equivocado no índice em vez da array', likelyCause: 'Confusão semântica de marcadores' }
  ],

  templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
  
  analyzeLocally: (code: string): AnalysisResult => {
    const codeLower = code.toLowerCase();
    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
      main: /int\s+main\s*\(/.test(codeLower),
      arrayDecl: /[a-zA-Z0-9_]+\s*\[\s*5\s*\]/.test(codeLower),
      loops: /\b(for|while)\b/.test(codeLower),
      initZero: /pares\s*=\s*0\b/.test(codeLower),
      modCheck: /[a-zA-Z0-9_]+\s*\[\s*[a-zA-Z0-9_]+\s*\]\s*%\s*2\s*==\s*0/.test(codeLower),
      increment: /pares\s*\+\+|pares\s*=\s*pares\s*\+\s*1|pares\+=\s*1/.test(codeLower),
      printf: /printf\s*\(/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Importação de bibliotecas corretas."); score++; }
    else { review.push("Diga em seu código #include <stdio.h>."); }

    if (checks.main) { good.push("Int main() estruturado com sucesso."); score++; }
    else { review.push("Inicie a função int main()."); }

    if (checks.arrayDecl) { good.push("Tamanho de array de comprimento 5 detectado."); score += 2; }
    else { review.push("Sua declaração deve incluir um vetor capaz de conter 5 números inteiros."); }

    if (checks.initZero) { good.push("Iniciado o contador de valores de paridade com zero absoluto de forma segura."); score += 2; }
    else { review.push("Inicialize o contador da paridade com zero."); }

    if (checks.modCheck) { good.push("Módulo da divisão de operador numérico de paridade configurado!"); score += 2; }
    else { review.push("Escreva numeros[i] % 2 == 0 para detectar se o elemento avaliado é par."); }

    if (checks.increment) { good.push("Incrementação de paridade detectada."); score++; }
    else { review.push("Se for par, some um incremento em sua variável de contabilidade."); }

    if (checks.printf) { score++; }

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 9) category = 'solução adequada';
    else if (score >= 6) category = 'quase completa';
    else if (score >= 3) category = 'parcialmente correta';

    let difficulty = "Dificuldade na varredura de vetor com critérios de filtro";
    if (!checks.arrayDecl) difficulty = "Sem declaração adequada de arrays";
    else if (!checks.initZero) difficulty = "Sem inicializador de contagem segura";
    else if (!checks.modCheck) difficulty = "Falha lógica na representação de números pares";
    else if (!checks.increment) difficulty = "Sem incremento lógico reativo";

    let nextStep = "Comece declarando seu vetor interativo e o contador iniciando em zero.";
    if (category === 'parcialmente correta') nextStep = "Adicione um loop com for para percorrer todo o vetor, aplicando o teste de módulo % contra o divisor 2.";
    if (category === 'quase completa') nextStep = "Certifique-se de realizar o incremento do contador de pares apenas se o teste relacional for verdadeiro.";
    if (category === 'solução adequada') nextStep = "Perfeito! Você dominou o emprego combinado de laços de repetição, vetores e filtros condicionais.";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.arrayDecl ? ['logica'] : ['sintaxe_aparente'],
      `Análise Heurística de Paridade em Vetor: ${score}/10 pontos.`
    );
  }
};
