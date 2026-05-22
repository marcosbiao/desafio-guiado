import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafioMatrizesSomaPrimeiraLinha: Challenge = {
  id: 'matrizes_soma_primeira_linha',
  categoryId: 'matrizes',
  title: 'Soma da primeira linha da matriz',
  subtitle: 'Escreva um programa em C que leia os valores de uma matriz 3x3 de inteiros e exiba a soma apenas dos elementos da primeira linha (índice 0).',
  challengeVersion: '1.0.0',
  
  metadata: {
    content: 'Matrizes Bidimensionais e Seleção de Vetor Linha',
    language: 'C (ANSI/C99)',
    level: 'Intermediário',
    time: '20 minutos',
    requirements: 'Declaração de matriz 3x3, dois laços de repetição aninhados para preenchimento, e seleção indexada de linha.',
    skill: 'Estruturar tabelas bidimensionais e processar subconjuntos específicos de dados matriciais.',
    version: '1.0.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Declarar matrizes bidimensionais 3x3, preenchendo-as por completo e calculando somatórios restritos a um vetor-linha indexado.',
    pedagogicalGoal: 'Compreender a independência de índices de linha e coluna, extraindo agregados parciais sem percorrer células irrelevantes.',
    expectedDifficulty: 'media',
    cognitiveOperation: 'aplicar',
    prerequisites: ['Declaração de Matriz 3x3', 'Laços Aninhados', 'Indexação Bidimensional (matriz[i][j])', 'Varredura Parcial']
  },

  domainTags: {
    skillTags: ['matrices', 'arrays', 'loops', 'variables', 'accumulators'],
    topicTags: ['basic-c', 'data-structures', 'math-logic'],
    difficultyTag: 'medium-complexity-logic',
    prerequisiteTags: ['basic-syntax', 'loops', 'arrays']
  },

  problem: 'Escreva um programa em C que leia do teclado os valores inteiros necessários para preencher uma matriz 3x3 (3 linhas e 3 colunas). Ao final, o programa deve calcular a soma contendo unicamente os elementos que residem na primeira linha (índice 0 da matriz) e imprimir no console essa soma.',
  
  guidingQuestions: [
    'Como declarar uma matriz de inteiros com dimensões 3x3?',
    'Como configurar dois loops aninhados (i de 0 a 2, j de 0 a 2) para ler os 9 valores do teclado usando scanf?',
    'Qual número representa o índice da primeira linha em uma matriz em C?',
    'Como isolar o índice de linha no valor fixo zero e fazer variar apenas o índice de coluna para obter a soma desejada?'
  ],

  orientation: {
    input: '9 números inteiros separados por espaços ou enter para preencher a tabela de 3x3.',
    output: 'A soma de todos os números contidos na primeira linha da matriz.',
    cases: 'Se as entradas forem: 1 2 3 (linha 0), 4 5 6 (linha 1), 7 8 9 (linha 2); a soma dos valores da primeira linha é 1 + 2 + 3 = 6.',
    structure: 'Alocação de matriz 3x3 de inteiros. Loops de i de 0 a 2 e j de 0 a 2 para preenchimento. Acumulador soma_linha = 0. loop simples de colunas j de 0 a 2 somando matriz[0][j] (ou fazendo a soma de forma estática direta matriz[0][0] + matriz[0][1] + matriz[0][2]).',
    expectedLogic: 'Declarar int matriz[3][3], i, j, soma = 0. Executar laços aninhados colhendo as entradas em &matriz[i][j]. computar soma = matriz[0][0] + matriz[0][1] + matriz[0][2] (ou usando loop de coluna variando de 0 a 2, somando matriz[0][c]). Exibir soma.'
  },

  examples: [
    { input: '1 2 3 4 5 6 7 8 9', output: 'Soma da primeira linha: 6' },
    { input: '10 20 30 -5 12 9 0 0 4', output: 'Soma da primeira linha: 60' }
  ],

  concepts: [
    'Matrizes bidimensionais como estruturas tabulares ordinárias',
    'Extração de subconjuntos lineares (vetores linha)',
    'Navegação bi-indexada aninhada'
  ],

  tips: [
    { 
      id: 1, 
      text: "Declare uma matriz inteira com tamanho 3x3 usando a sintaxe apropriada: 'int matriz[3][3];'.",
      pedagogicalGoal: "Definir matrizes bidimensionais em C."
    },
    { 
      id: 2, 
      text: "Utilize dois loops 'for' aninhados para ler os elementos: o externo para linhas (i = 0 até i < 3) e o interno para colunas (j = 0 até j < 3). Diga 'scanf(\"%d\", &matriz[i][j]);'.",
      pedagogicalGoal: "Fixar o preenchimento indexado aninhado bidimensional."
    },
    { 
      id: 3, 
      text: "Para somar a primeira linha, o índice correspondente à linha é fixo em 0. Você pode usar um laço de colunas para somar: 'soma = matriz[0][0] + matriz[0][1] + matriz[0][2];' ou varrendo num loop simples.",
      pedagogicalGoal: "Realizar somas de vetores horizontais em tabelas."
    },
    { 
      id: 4, 
      text: "Posicione o printf mostrando o resultado total unicamente fora dos escopos de todos os laços.",
      pedagogicalGoal: "Localizar de forma limpa as saídas dos relatórios."
    }
  ],

  commonErrors: [
    { 
      title: "Somar todos os elementos da matriz", 
      description: "Escrever um loop duplo para somar todo o array desconsiderará a restrição de focar apenas na primeira linha (índice 0), apresentando uma soma maior que a pedida.",
      pedagogicalAdvice: "Preste bastante atenção no escopo do enunciado. Solicitações parciais exigem filtros estáticos nos índices de acesso."
    },
    { 
      title: "Utilizar a segunda linha (linha de índice 1)", 
      description: "Por confusão mental ou herança de intervalos base um, fazer as somas na linha 'matriz[1][j]' calculará o total da segunda linha, o que causará erro lógico instrucional.",
      pedagogicalAdvice: "Lembre-se sempre de que em C tudo começa em zero: primeira linha é índice [0], segunda linha é índice [1]."
    },
    { 
      title: "Inverter a ordem de acesso da célula", 
      description: "Escrever matriz[j][0] em vez de matriz[0][j] somará os elementos da primeira coluna em vez da primeira linha.",
      pedagogicalAdvice: "Na notação bidimensional convencional C/C++, o primeiro índice indica sempre a [linha] e o subsequente representa a [coluna]: matriz[linha][coluna]."
    },
    { 
      title: "Esquecer os colchetes separados na matriz", 
      description: "Tentar acessar elementos da matriz com notações como 'matriz[i, j]' ou 'matriz[i][j' causará falhas severas de compilação.",
      pedagogicalAdvice: "Cada dimensão exige um par de colchetes isolados e contíguos: matriz[i][j]."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    int matriz[3][3];
    int i, j, soma = 0;

    // Leitura dos 9 elementos da matriz
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            scanf("%d", &matriz[i][j]);
        }
    }

    // Calcula a soma da primeira linha (índice 0)
    for (j = 0; j < 3; j++) {
        soma = soma + matriz[0][j];
    }

    printf("Soma da primeira linha: %d\\n", soma);

    return 0;
}`,

  finalSummary: [
    'Varredura de Linha: Fixar o índice da linha em 0 e iterar apenas na dimensão das colunas extrai o vetor horizontal desejado com eficiência.',
    'Aninhamento de Controle: O encadeamento de dois loops rege a varredura e preenchimento ordenado de planos bidimensionais cartesianos.',
    'Indexação em Base Zero: Reconhecer que a chave de leitura inicial se assenta no índice [0] evita descontinuidades lógicas no programa.'
  ],

  nextChallengeId: 'matrizes_contar_pares',

  expectedCriteria: [
    { id: 'crit1', description: 'Declaração correta de matriz de tamanho 3x3 inteiro', importance: 'essencial' },
    { id: 'crit2', description: 'Uso de dois loops aninhados (i de 0 a 2, j de 0 a 2) para capturar os números', importance: 'essencial' },
    { id: 'crit3', description: 'Leitura indexada por meio de scanf("%d", &matriz[i][j])', importance: 'essencial' },
    { id: 'crit4', description: 'Soma restrita aos elementos da linha indexada em 0 (matriz[0][j] ou somando as três constantes diretamente)', importance: 'essencial' },
    { id: 'crit5', description: 'Printf externo aos loops mostrando a soma dos elementos', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Soma total de toda a matriz', likelyCause: 'Somar todos os elementos em repetição dupla sem restrição' },
    { id: 'err2', description: 'Somar a coluna no lugar da linha desejada', likelyCause: 'Inverter a posição dos iteradores (matriz[j][0]) no momento da acumulação' },
    { id: 'err3', description: 'Uso da linha indexada com valor 1', likelyCause: 'Assumir que a primeira linha corresponde ao índice 1' }
  ],

  templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
  
  analyzeLocally: (code: string): AnalysisResult => {
    const codeLower = code.toLowerCase();
    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
      main: /int\s+main\s*\(/.test(codeLower),
      loops: /\b(for|while)\b/.test(codeLower),
      doubleLoop: /(for|while)[\s\S]*?(for|while)/.test(codeLower),
      matrixDeclaration: /int\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\[\s*3\s*\]\s*\[\s*3\s*\]/.test(codeLower),
      indexZeroAccess: /\[\s*0\s*\]\s*\[\s*[a-zA-Z0-9_]+\s*\]|\[\s*0\s*\]\s*\[\s*0\s*\]\s*\+\s*[\s\S]*?\[\s*0\s*\]\s*\[\s*1\s*\]\s*\+\s*[\s\S]*?\[\s*0\s*\]\s*\[\s*2\s*\]/.test(codeLower),
      scanf: /scanf\s*\(/.test(codeLower),
      printf: /printf\s*\(/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Disponibilizou cabeçalho stdio.h."); score++; }
    else { review.push("Assinale #include <stdio.h> no topo."); }

    if (checks.main) { good.push("Int main() bem configurado."); score++; }
    else { review.push("Defina int main() no início."); }

    if (checks.matrixDeclaration) { good.push("Declarou matriz bidimensional de inteiros 3x3."); score += 3; }
    else { review.push("Declare sua matriz com tamanho 3x3, por exemplo: int tabela[3][3];"); }

    if (checks.doubleLoop) { good.push("Você empregou duplo laço de repetição aninhado para leitura."); score += 2; }
    else { review.push("Empregue dois laços aninhados para percorrer e ler com segurança os 9 elementos da matriz."); }

    if (checks.indexZeroAccess) { good.push("Identificamos a lógica de seleção de linha com índice de valor fixo zero."); score += 2; }
    else { review.push("Garanta que você some apenas os elementos da primeira linha (ex: somando usando o indexador [0][j] em um loop ou escrevendo matriz[0][0] + matriz[0][1] + matriz[0][2])."); }

    if (checks.printf) { score++; }

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 9) category = 'solução adequada';
    else if (score >= 6) category = 'quase completa';
    else if (score >= 3) category = 'parcialmente correta';

    let difficulty = "Dificuldade na varredura indexada parcial de matrizes 2D";
    if (!checks.matrixDeclaration) difficulty = "Sem declaração de matriz 3x3";
    else if (!checks.doubleLoop) difficulty = "Sem laço duplo aninhado de preenchimento";
    else if (!checks.indexZeroAccess) difficulty = "Sem restrição de soma à primeira linha (índice 0)";

    let nextStep = "Comece com 'int matriz[3][3]' e preencha-a usando dois laços aninhados rodando de 0 a 2.";
    if (category === 'parcialmente correta') nextStep = "Adicione um acumulador 'soma = 0' e calcule o somatório restringindo o acesso à linha indexada em zero.";
    if (category === 'quase completa') nextStep = "Apresente o resultado final no console usando um único printf fora dos loops.";
    if (category === 'solução adequada') nextStep = "Incrível! Compreendeu com maestria a manipulação segmentada de estruturas bidimensionais.";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.doubleLoop ? ['logica'] : ['sintaxe_aparente'],
      `Análise Heurística da Matriz Parcial: ${score}/10 pontos.`
    );
  }
};
