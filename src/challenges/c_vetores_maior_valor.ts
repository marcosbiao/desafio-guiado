import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafioVetores1: Challenge = {
  id: 'desafio_vetores_maior_valor',
  categoryId: 'vetores',
  title: 'Mostrar o maior valor de um vetor',
  subtitle: 'Escreva um programa em C que leia 5 números inteiros em um vetor e mostre o maior valor armazenado.',
  challengeVersion: '1.0.0',
  
  metadata: {
    content: 'Vetores (Unidimensionais)',
    language: 'C (ANSI/C99)',
    level: 'Iniciante',
    time: '15 minutos',
    requirements: 'Declaração de vetor, laços de repetição, condições de comparação, índices.',
    skill: 'Estruturar conjuntos lineares homogêneos e encontrar valores extremos.',
    version: '1.0.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Declarar, preencher e analisar dados tabulares lineares por meio de varreduras indexadas para extrair o valor máximo absoluto.',
    pedagogicalGoal: 'Compreender o armazenamento estático contíguo de dados e busca de padrão por atribuição de hipótese.',
    expectedDifficulty: 'media',
    cognitiveOperation: 'aplicar',
    prerequisites: ['Declaração de Vetor', 'Estruturas de Repetição', 'Estruturas Condicionais', 'Índices de Arrays']
  },

  domainTags: {
    skillTags: ['arrays', 'variables', 'loops', 'conditionals'],
    topicTags: ['basic-c', 'data-structures', 'math-logic'],
    difficultyTag: 'medium-complexity-logic',
    prerequisiteTags: ['basic-syntax', 'loops']
  },

  problem: 'Escreva um programa em C que leia do teclado 5 números inteiros, armazene-os em um vetor de tamanho 5, identifique qual é o maior valor e mostre-o no console.',
  
  guidingQuestions: [
    'Como declarar corretamente um vetor capaz de conter 5 números inteiros?',
    'Como utilizar a variável do loop para indexar as leituras do scanf?',
    'Por que declarar a hipótese inicial do maior valor como sendo o primeiro elemento (vetor[0]) é melhor do que iniciá-lo em zero?',
    'Como testar se o elemento atual do vetor supera o maior valor provisório registrado?'
  ],

  orientation: {
    input: '5 números inteiros digitados de forma consecutiva.',
    output: 'O maior número inteiro contido no conjunto.',
    cases: 'Valores contendo negativos (ex: -10, -5, -2, -20, -1 resulta no maior -1).',
    structure: 'Isolamento de um vetor de tamanho 5. Preenchimento via loop com contador de 0 a 4. Algoritmo de busca do máximo por verificação iterativa a partir do índice 0.',
    expectedLogic: 'Vetor de 5 posições instanciado. Leitura indexada em laço. Inicialização de variável maior com vetor[0]. Novo laço que compare se vetor[i] > maior de 1 a 4. Atualização de maior. Saída fora do loop.'
  },

  examples: [
    { input: '12 85 41 2 9', output: 'Maior valor: 85' },
    { input: '-3 -15 -9 -2 -7', output: 'Maior valor: -2' }
  ],

  concepts: [
    'Estrutura de dados homogênea estática',
    'Acesso associativo por índice ordinal (base zero)',
    'Busca progressiva de extremos discretos'
  ],

  tips: [
    { 
      id: 1, 
      text: "O vetor precisa guardar 5 números inteiros. Você declara ele definindo seu tamanho em colchetes, ex: int numeros[5];",
      pedagogicalGoal: "Orientar sobre a sintaxe básica de vetores em C."
    },
    { 
      id: 2, 
      text: "Para carregar o vetor, use um laço que vá do índice 0 até o índice 4 (i < 5). Leia cada termo como &numeros[i].",
      pedagogicalGoal: "Fixar a indexação padrão baseada em zero."
    },
    { 
      id: 3, 
      text: "Não inicialize seu comparador em zero, caso contrário o cálculo falhará se o usuário inserir apenas valores negativos. Iniciá-lo com numeros[0] é sempre seguro.",
      pedagogicalGoal: "Ensinar robustez algorítmica face a domínios numéricos amplos."
    },
    { 
      id: 4, 
      text: "Verifique elemento por elemento do vetor[i] contra o seu maior valor provisório e atualize-o sempre que achar um superior.",
      pedagogicalGoal: "Sistematizar a busca de ponto máximo."
    }
  ],

  commonErrors: [
    { 
      title: "Inicializar o maior com zero", 
      description: "Se o vetor contiver [-5, -12, -8, -100, -2], o algoritmo afirmará erroneamente que o maior é 0 (que sequer foi fornecido como entrada).",
      pedagogicalAdvice: "Sempre selecione o primeiro elemento efetivo do seu conjunto como ponto inicial ideal para buscas de valor extremo."
    },
    { 
      title: "Acessar posição fora do vetor", 
      description: "Em C, um vetor de 5 elementos possui índices de 0 a 4. Tentar ler ou acessar 'numeros[5]' causará corrupção de memória ou quebra do programa (Buffer Overflow).",
      pedagogicalAdvice: "Seja rigoroso com os limites dos laços: use i < tamanho do vetor (e não i <= tamanho)."
    },
    { 
      title: "Comparar o índice i em vez do valor", 
      description: "Usar 'if (i > maior)' testará os índices (0, 1, 2, 3, 4) em vez de inspecionar os valores dentro da array 'numeros[i]'.",
      pedagogicalAdvice: "Reflicta sobre a diferença entre a localização espacial da informação (índice) e a substância da informação (o valor contido na posição)."
    },
    { 
      title: "Leitura sem armazenar", 
      description: "Invocações diretas de scanf de forma isolada perdem as referências após a leitura subsequente dos dados.",
      pedagogicalAdvice: "Utilize vetores precisamente para que os múltiplos dados persistam em memória durante o ciclo."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    int numeros[5];
    int i, maior;

    // Preenche o vetor com 5 números inteiros
    for (i = 0; i < 5; i++) {
        scanf("%d", &numeros[i]);
    }

    // Define o primeiro elemento como ponto inicial para comparação
    maior = numeros[0];

    // Percorre as demais posições verificando se há algum elemento maior
    for (i = 1; i < 5; i++) {
        if (numeros[i] > maior) {
            maior = numeros[i];
        }
    }

    printf("Maior valor: %d\\n", maior);

    return 0;
}`,

  finalSummary: [
    'Espaço Homogêneo: Limitações físicas e de índices dão estabilidade ao programa.',
    'Sintaxe Indexada: Mantenha clara a separação conceitual entre o marcador ordinal de índice [i] e o valor ali hospedado.',
    'Comparação de Extremo: Partir de um membro real do grupo garante precisão ao lidar com negativos.'
  ],

  nextChallengeId: 'desafio_vetores_contar_pares',

  expectedCriteria: [
    { id: 'crit1', description: 'Instanciação de array de dimensão 5', importance: 'essencial' },
    { id: 'crit2', description: 'Preenchimento adequado usando laço e scanf indexado', importance: 'essencial' },
    { id: 'crit3', description: 'Uso de elemento de vetor na inicialização da comparação', importance: 'essencial' },
    { id: 'crit4', description: 'Segundo laço ou laço continuado comparando vetor[i] contra a variável maior', importance: 'essencial' },
    { id: 'crit5', description: 'Resultado impresso com printf após conclusão de varredura', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Index out of bounds', likelyCause: 'Erro lógico nos intervalos dos loops' },
    { id: 'err2', description: 'Assunção ingênua de base zero para maior número', likelyCause: 'Desconsideração de domínio com números negativos' },
    { id: 'err3', description: 'Sobrescrita do iterador ou confusão de indexação', likelyCause: 'Uso de expressões comparando apenas a posição nua i' }
  ],

  templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
  
  analyzeLocally: (code: string): AnalysisResult => {
    const codeLower = code.toLowerCase();
    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
      main: /int\s+main\s*\(/.test(codeLower),
      arrayDecl: /[a-zA-Z0-9_]+\s*\[\s*5\s*\]/.test(codeLower),
      loops: /\b(for|while)\b/.test(codeLower),
      scanfIndexed: /scanf\s*\(\s*["'][^"']*%d[^"']*["']\s*,\s*&\s*[a-zA-Z0-9_]+\s*\[\s*[a-zA-Z0-9_]+\s*\]\s*\)/.test(codeLower),
      hasIndexComparison: /[a-zA-Z0-9_]+\s*\[\s*[a-zA-Z0-9_]+\s*\]\s*>\s*[a-zA-Z0-9_]+/.test(codeLower) || /[a-zA-Z0-9_]+\s*>\s*[a-zA-Z0-9_]+\s*\[\s*[a-zA-Z0-9_]+\s*\]/.test(codeLower),
      maiorInitVal: /[a-zA-Z0-9_]+\s*=\s*[a-zA-Z0-9_]+\s*\[\s*0\s*\]/.test(codeLower),
      printf: /printf\s*\(/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Importou stdio.h."); score++; }
    else { review.push("Assinale #include <stdio.h>."); }

    if (checks.main) { good.push("Int main() estruturado."); score++; }
    else { review.push("Consolide a escrita padrão com int main()."); }

    if (checks.arrayDecl) { good.push("Declaração do vetor de tamanho 5 foi dectado."); score += 2; }
    else { review.push("Diga em seu código a declaração de um vetor contendo 5 posições (ex: int numeros[5];)."); }

    if (checks.scanfIndexed) { good.push("Captura de vetor indexado identificada."); score += 2; }
    else { review.push("Para os valores, use &numeros[i] como argumento de leitura em seu loop."); }

    if (checks.maiorInitVal) { good.push("Sua lógica atribuiu de forma segura a hipótese inicial ao primeiro termo (indice 0)."); score += 2; }
    else { review.push("Lembre-se de iniciar sua variável comparadora em maior = numeros[0] para maior segurança lógica."); }

    if (checks.hasIndexComparison) { good.push("Teste condicional sequencial para detecção de maior valor encontrado."); score++; }
    else { review.push("Verifique a inclusão da estrutura condicional de maior valor dentro do laço de varredura."); }

    if (checks.printf) { score++; }

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 9) category = 'solução adequada';
    else if (score >= 6) category = 'quase completa';
    else if (score >= 3) category = 'parcialmente correta';

    let difficulty = "Dificuldade em gerir estruturas indexadas";
    if (!checks.arrayDecl) difficulty = "Sem declaração adequada de arrays";
    else if (!checks.scanfIndexed) difficulty = "Sem inserção de dados em vetor";
    else if (!checks.maiorInitVal) difficulty = "Hipótese de maior instável sem inicialização real do array";
    else if (!checks.hasIndexComparison) difficulty = "Defeito lógico no teste condicional";

    let nextStep = "Anote a declaração de seu vetor de 5 elementos como ponto inicial.";
    if (category === 'parcialmente correta') nextStep = "Crie o primeiro laço for de 0 a 4 para ler todas as posições do seu vetor com scanf.";
    if (category === 'quase completa') nextStep = "Assegure-se de comparar numeros[i] > maior e atualizar a variável maior temporariamente.";
    if (category === 'solução adequada') nextStep = "Belo trabalho! Exercitar a transição de conjuntos ordenados e varredura é essencial para programar bem.";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.arrayDecl ? ['logica'] : ['sintaxe_aparente'],
      `Análise Heurística de Vetor: ${score}/10 pontos.`
    );
  }
};
