import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafioMatrizes1: Challenge = {
  id: 'desafio_matrizes_soma_2x2',
  categoryId: 'matrizes',
  title: 'Somar elementos de uma matriz 2x2',
  subtitle: 'Escreva um programa em C que leia os valores de uma matriz 2x2 e mostre a soma de todos os seus elementos.',
  challengeVersion: '1.0.0',
  
  metadata: {
    content: 'Matrizes (Bidimensionais)',
    language: 'C (ANSI/C99)',
    level: 'Iniciante',
    time: '15 minutos',
    requirements: 'Declaração de matriz, dois laços de repetição aninhados, acumulador.',
    skill: 'Gerenciar dados em múltiplas dimensões e calcular somatórios bidimensionais.',
    version: '1.0.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Utilizar matrizes bidimensionais controladas por laços iterativos aninhados e processamento numérico tabular.',
    pedagogicalGoal: 'Compreender a representação cartesiana (linhas e colunas) inerente às matrizes bidimensionais em C e a lógica de percurso aninhada.',
    expectedDifficulty: 'media',
    cognitiveOperation: 'aplicar',
    prerequisites: ['Declaração de Matriz 2D', 'Laços Aninhados', 'Variáveis de Controle', 'Acumulador numérico']
  },

  domainTags: {
    skillTags: ['matrices', 'arrays', 'loops', 'variables', 'accumulators'],
    topicTags: ['basic-c', 'data-structures', 'math-logic'],
    difficultyTag: 'medium-complexity-logic',
    prerequisiteTags: ['basic-syntax', 'loops', 'arrays']
  },

  problem: 'Escreva um programa em C que leia do teclado os valores de uma matriz de tamanho 2x2 (2 linhas e 2 colunas), calcule a soma total de todos os 4 elementos inseridos e em seguida mostre essa soma.',
  
  guidingQuestions: [
    'Como declarar uma matriz bidimensional de inteiros com 2 linhas e 2 colunas?',
    'Quantos laços aninhados são necessários para ler dados de forma estruturada em linhas e colunas?',
    'Com qual valor devemos inicializar a nossa variável que efetuará a soma acumulativa?',
    'Como referenciar de forma correta o elemento localizado na linha i e coluna j?'
  ],

  orientation: {
    input: '4 números inteiros inseridos consecutivamente para preencher a matriz.',
    output: 'O valor da soma de todos os elementos.',
    cases: 'Matriz com valores simples (ex: [[1, 2], [3, 4]] resulta na soma 10).',
    structure: 'Isolamento de matriz 2x2. Varredura usando laço externo (linhas) de 0 a 1 e laço interno (colunas) de 0 a 1. Leitura com scanf e acumulação em variável iniciada em zero.',
    expectedLogic: 'Declaração correta de matriz[2][2]. Inicialização de acumulador soma = 0. Uso de dois loops aninhados com iteradores separados (ex: i, j). Leitura com scanf em matriz[i][j]. Adicionar o valor lido a soma. Exibir soma.'
  },

  examples: [
    { input: '1 2 3 4', output: 'Soma: 10' },
    { input: '5 -1 0 6', output: 'Soma: 10' }
  ],

  concepts: [
    'Coordenação e percursos bi-indexados',
    'Matrizes bidimensionais como tabelas ou planos cartesianos',
    'Laços de repetição aninhados'
  ],

  tips: [
    { 
      id: 1, 
      text: "Uma matriz 2x2 possui 2 linhas e 2 colunas. Sua declaração padrão em C é 'int matriz[2][2];'.",
      pedagogicalGoal: "Fixar a nomenclatura sintática de matrizes bidimensionais."
    },
    { 
      id: 2, 
      text: "Normalmente, usamos dois laços de repetição aninhados para percorrer estruturas 2D: o laço externo controla as linhas e o laço interno as colunas.",
      pedagogicalGoal: "Apresentar a arquitetura clássica de varredura bidimensional."
    },
    { 
      id: 3, 
      text: "Use variáveis controladoras diferentes para a linha e a coluna (ex: i e j). Evite cruzar e repetir os mesmos iteradores no laço aninhado.",
      pedagogicalGoal: "Evitar bugs oriundos de conflitos de controle de índices."
    },
    { 
      id: 4, 
      text: "Tanto a leitura de dados quanto a acumulação matemática de soma podem ser realizadas confortavelmente dentro do bloco no loop mais interno.",
      pedagogicalGoal: "Otimizar o fluxo de preenchimento e processamento."
    }
  ],

  commonErrors: [
    { 
      title: "Usar apenas um índice para acessar a matriz", 
      description: "Escrever 'matriz[i]' em vez de 'matriz[i][j]' acessará o ponteiro da linha diretamente, gerando erro de compilação ou comportamento indefinido.",
      pedagogicalAdvice: "Ao lidar com matrizes bidimensionais, especifique sempre ambos os índices de posição: a linha e a coluna, separadas por colchetes independentes."
    },
    { 
      title: "Compartilhar a mesma variável contadora para as duas dimensões", 
      description: "Usar 'for (i = 0; ...)' em ambos laços fará o loop interno redefinir o cursor do laço externo constantemente, gerando erros severos de execução ou travamento por loops infinitos.",
      pedagogicalAdvice: "Garanta que cada nível de repetição possua sua própria variável contadora de controle exclusiva (comumente usa-se i e j)."
    },
    { 
      title: "Esquecer de inicializar a variável soma com zero", 
      description: "Ignorar a definição prévia de 'soma = 0;' agregará lixo de memória residual da pilha à resposta.",
      pedagogicalAdvice: "Lembre-se de sempre definir explicitamente os acumuladores com valor 0."
    },
    { 
      title: "Index Out Of Bounds na matriz", 
      description: "Acessar posições matriz[2][2] diretamente viola os domínios indexados em base zero (que vão de 0 a 1 em matrizes 2x2).",
      pedagogicalAdvice: "Use testes relacionais < 2 em seus iteradores para delimitar com precisão os limites cartesianos."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    int matriz[2][2];
    int i, j, soma = 0; // Inicializando o acumulador com zero

    // Loops aninhados para leitura e acumulação dos elementos da matriz
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 2; j++) {
            scanf("%d", &matriz[i][j]);
            soma = soma + matriz[i][j]; // Somando o elemento atual
        }
    }

    printf("Soma: %d\\n", soma);

    return 0;
}`,

  finalSummary: [
    'Modelagem 2D: Coordenar dados em matrizes bidimensionais nos aproxima das representações matriciais clássicas e tabulares.',
    'Sintaxe Independente: Ambos os colchetes são requeridos para endereçamento absoluto.',
    'Acomodação de Controle: Loops aninhados bem organizados com iteradores únicos estruturam qualquer percurso bidimensional.'
  ],

  nextChallengeId: 'desafio_matrizes_diagonal_principal',

  expectedCriteria: [
    { id: 'crit1', description: 'Instanciação da matriz bidimensional int matriz[2][2] ou equivalente', importance: 'essencial' },
    { id: 'crit2', description: 'Duplo loop aninhado estruturando percurso em linha e coluna', importance: 'essencial' },
    { id: 'crit3', description: 'Emprego de variáveis de loop independentes (ex: i e j)', importance: 'essencial' },
    { id: 'crit4', description: 'Uso de acumulador numérico iniciado expressamente com zero', importance: 'essencial' },
    { id: 'crit5', description: 'Exbição de resultado simples usando printf fora dos laços', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Loop infinito por compartilhamento de iteradores', likelyCause: 'Declaração e uso repetido da mesma variável de controle nos dois níveis' },
    { id: 'err2', description: 'Confusão de índices cartesianos de coordenadas', likelyCause: 'Tentativa de obter ou atribuir dados via colchete unificado de dimensão simples' },
    { id: 'err3', description: 'Lixo residual na soma final', likelyCause: 'Carência de inicialização expressa em zero' }
  ],

  templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
  
  analyzeLocally: (code: string): AnalysisResult => {
    const codeLower = code.toLowerCase();
    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
      main: /int\s+main\s*\(/.test(codeLower),
      matrixDecl: /[a-zA-Z0-9_]+\s*\[\s*2\s*\]\s*\[\s*2\s*\]/.test(codeLower),
      loops: /\b(for|while)\b/.test(codeLower),
      nestedLoops: (codeLower.match(/\b(for|while)\b/g) || []).length >= 2,
      initSoma: /soma\s*=\s*0\b/.test(codeLower),
      somaAccumulate: /matriz\s*\[\s*[a-zA-Z0-9_]+\s*\]\s*\[\s*[a-zA-Z0-9_]+\s*\]/.test(codeLower) && /soma\s*=\s*(soma\s*\+|[a-zA-Z0-9_\s[\]]+\+soma|soma\s*\+=)/.test(codeLower),
      printf: /printf\s*\(/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Estruturado include de biblioteca padrão."); score++; }
    else { review.push("Assinale #include <stdio.h>."); }

    if (checks.main) { good.push("Função int main() configurada."); score++; }
    else { review.push("Certifique-se de declarar o método int main()."); }

    if (checks.matrixDecl) { good.push("Declaração da matriz bidimensional de dimensões 2x2 foi detectada com sucesso!"); score += 2; }
    else { review.push("Diga em seu código a criação de um array em duas dimensões (ex: int matriz[2][2];)."); }

    if (checks.loops) { good.push("Você empregou laços para repetição do algoritmo."); score++; }
    else { review.push("Você precisará implementar estruturas de repetição."); }

    if (checks.nestedLoops) { good.push("Aninhamento de loops estruturado corretamente!"); score += 2; }
    else { review.push("Empregue dois loops aninhados (for dentro de for) para gerir as linhas e colunas de forma legível."); }

    if (checks.initSoma) { good.push("Houve a inicialização de seu acumulador com valor zero para prevenir ruídos."); score += 2; }
    else { review.push("Inicie sua variável acumuladora com 0 (ex: soma = 0;)."); }

    if (checks.printf) { score++; }

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 9) category = 'solução adequada';
    else if (score >= 6) category = 'quase completa';
    else if (score >= 3) category = 'parcialmente correta';

    let difficulty = "Dificuldade na varredura bidimensional de dados de matrizes";
    if (!checks.matrixDecl) difficulty = "Ausência de formato matricial cartesiano";
    else if (!checks.nestedLoops) difficulty = "Sem laços aninhados adequados";
    else if (!checks.initSoma) difficulty = "Soma sem zeramento de segurança prévia";
    else if (!checks.somaAccumulate) difficulty = "Dificuldade em acessar e somar elementos indexados em duas dimensões";

    let nextStep = "Anote a inicialização de sua matriz como 'int matriz[2][2]'.";
    if (category === 'parcialmente correta') nextStep = "Monte a estrutura de dois loops unificados com iteradores únicos (ex: i e j) de tamanho menor que 2.";
    if (category === 'quase completa') nextStep = "Verifique se a acumulação 'soma = soma + matriz[i][j]' está sendo computada adequadamente e de forma segura.";
    if (category === 'solução adequada') nextStep = "Incrível! Você dominou o funcionamento lógico de matrizes com loops aninhados e acumuladores.";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.matrixDecl ? ['logica'] : ['sintaxe_aparente'],
      `Análise Heurística de Matriz 2x2: ${score}/10 pontos.`
    );
  }
};
