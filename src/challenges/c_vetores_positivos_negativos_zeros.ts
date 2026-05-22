import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafioVetoresPositivosNegativosZeros: Challenge = {
  id: 'vetores_positivos_negativos_zeros',
  categoryId: 'vetores',
  title: 'Positivos, negativos e zeros',
  subtitle: 'Escreva um programa em C que leia 8 números inteiros em um vetor. Ao final, identifique e mostre a quantidade de números positivos, negativos e zeros digitados.',
  challengeVersion: '1.0.0',
  
  metadata: {
    content: 'Classificação e Estatística de Sensores de Dados',
    language: 'C (ANSI/C99)',
    level: 'Intermediário',
    time: '25 minutos',
    requirements: 'Declaração de vetor de tamanho 8, loops de leitura, encadeamento condicional complexo (if / else if / else), contadores múltiplos.',
    skill: 'Agregar e classificar conjuntos numéricos homogêneos por faixas lógicas independentes.',
    version: '1.0.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Implementar loops estruturados de classificação multicritério de arrays utilizando ramificações condicionais exclusivas.',
    pedagogicalGoal: 'Masterizar o uso de encadeamentos condicionais (if-else if-else) associados a múltiplos acumuladores de contagem paralela em estruturas homogêneas.',
    expectedDifficulty: 'alta',
    cognitiveOperation: 'aplicar',
    prerequisites: ['Declaração de Vetores', 'Loops', 'Encadeamento Condicional (else if)', 'Vários Contadores']
  },

  domainTags: {
    skillTags: ['arrays', 'variables', 'loops', 'conditionals'],
    topicTags: ['basic-c', 'data-structures', 'math-logic'],
    difficultyTag: 'high-complexity-logic',
    prerequisiteTags: ['basic-syntax', 'loops', 'conditionals']
  },

  problem: 'Escreva um programa em C que declare um vetor de inteiros com capacidade de 8 elementos. Receba os 8 dados informados do teclado gravando-os em correspondência indexada. Ao término, percorra seu arranjo separando e contando quantos elementos são estritamente maiores que zero (positivos), quantos são menores que zero (negativos) e quantos elementos são idênticos a zero. Apresente os três resultados consolidados ao final.',
  
  guidingQuestions: [
    'Como inicializar simultaneamente 3 variáveis de contagem e garantir que todas iniciem de maneira confiável em zero?',
    'Por que as condições são mutualmente exclusivas (um número não pode ser simultaneamente positivo, negativo e zero)?',
    'Qual estrutura condicional em C (if / else if / else) é a mais indicada para coordenar seleções mutuamente exclusivas?',
    'Onde dispor a exibição final contendo todos os três contadores consolidados?'
  ],

  orientation: {
    input: '8 números inteiros digitados de forma consecutiva.',
    output: 'Três saídas detalhando a quantidade de elementos positivos, negativos e nulos.',
    cases: 'Caso: 5, -8, 0, 12, -3, 0, 4, -9. Positivos: 3, Negativos: 3, Zeros: 2.',
    structure: 'Instanciação de um vetor int de tamanho 8. Laço para entrada de dados. Três contadores: p = 0, n = 0, z = 0. Segundo laço (ou integrado) varrendo de 0 a 7 e testando: se vetor[i] > 0 incrementa p; senão, se vetor[i] < 0 incrementa n; senão incrementa z. Prints finais isolados.',
    expectedLogic: 'Declarar int vetor[8], pos = 0, neg = 0, zeros = 0, i. Rodar laço colhendo dados. Ler indices. Aplicar if (vetor[i] > 0) pos++; else if (vetor[i] < 0) neg++; else zeros++;. Exibir no final.'
  },

  examples: [
    { input: '5 -8 0 12 -3 0 4 -9', output: 'Positivos: 3\nNegativos: 3\nZeros: 2' },
    { input: '0 0 0 0 -1 -1 1 1', output: 'Positivos: 2\nNegativos: 2\nZeros: 4' }
  ],

  concepts: [
    'Classificação populacional por faixas numéricas de domínio',
    'Condições excludentes simultâneas',
    'Estruturação de contadores paralelos sincronizados'
  ],

  tips: [
    { 
      id: 1, 
      text: "Crie o vetor e declare 3 contadores com nomes fáceis de ler, garantindo que inicie todos com zero: 'int pos = 0, neg = 0, zeros = 0;'.",
      pedagogicalGoal: "Orientar sobre a instanciação simultânea correta de contadores."
    },
    { 
      id: 2, 
      text: "Para classificar as posições, use um encadeamento 'if / else if / else'. Isso garante que apenas um contador seja incrementado por elemento do vetor.",
      pedagogicalGoal: "Fixar o emprego de condicionais excludentes."
    },
    { 
      id: 3, 
      text: "A primeira condição valida maiores que zero: 'if (vetor[i] > 0)'. A segunda, menores que zero: 'else if (vetor[i] < 0)'. A última se encarrega dos nulos: 'else'.",
      pedagogicalGoal: "Segmentar limites com if-else if-else."
    },
    { 
      id: 4, 
      text: "Todos os resultados estatísticos devem ser expostos fora do loop com 3 comandos de printf separados.",
      pedagogicalGoal: "Localizar e formatar comandos de escrita terminal."
    }
  ],

  commonErrors: [
    { 
      title: "Uso de 'ifs' independentes em vez de encadeados", 
      description: "Escrever 3 queries de 'if' soltas ao invés de usar 'else if' força o processador a fazer testes desnecessários em cada ciclo, reduzindo o desempenho do programa.",
      pedagogicalAdvice: "Para situações lógicas mutuamente excludentes, opte sempre pelas chaves encadeadas do 'if - else if - else'."
    },
    { 
      title: "Esquecer de inicializar algum contador", 
      description: "Esquecer de impor '=' zero em qualquer um dos três buffers induzirá erros estatísticos grosseiros.",
      pedagogicalAdvice: "Crie um checklist mental: contadores e somatórios exigem atribuição inicial nula obrigatória."
    },
    { 
      title: "Desprezar o número deitador zero na classificação", 
      description: "Escrever apenas 'if (vetor[i] > 0)' e 'if (vetor[i] < 0)' esquecendo do divisor nulo anulará as estatísticas das parcelas neutras.",
      pedagogicalAdvice: "Lembre-se de que o zero é o elemento neutro e precisa de tratamento idêntico na amostragem geral."
    },
    { 
      title: "Estouro e descompasso na varredura", 
      description: "Laço transpassando tamanho 8 causará perturbações lógicas ao testar células ilegais de memória.",
      pedagogicalAdvice: "Sempre delimite loops controlando coleções com o operador (<) tamanho total da coleção."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    int vetor[8];
    int i;
    int positivos = 0, negativos = 0, zeros = 0;

    // Leitura das 8 posições
    for (i = 0; i < 8; i++) {
        scanf("%d", &vetor[i]);
    }

    // Varredura para classificação e contagem de parcelas
    for (i = 0; i < 8; i++) {
        if (vetor[i] > 0) {
            positivos++; // Elemento maior que zero
        } else if (vetor[i] < 0) {
            negativos++; // Elemento menor que zero
        } else {
            zeros++;     // Elemento igual a zero
        }
    }

    printf("Positivos: %d\\n", positivos);
    printf("Negativos: %d\\n", negativos);
    printf("Zeros: %d\\n", zeros);

    return 0;
}`,

  finalSummary: [
    'Análise de Domínio: Classificar populações de variáveis com encadeamentos mutuamente exclusivos otimiza ciclos de processamento.',
    'Sincronia Agregada: Usar contadores individuais paralelos consolida estatísticas complexas em passagens únicas por arrays.',
    'Robustez Sintática: Limitar iterações de vetores à faixa rígida de 0 até tamanho-1 resguarda integridade estrutural.'
  ],

  nextChallengeId: 'matrizes_soma_primeira_linha',

  expectedCriteria: [
    { id: 'crit1', description: 'Declaração correta de vetor de 8 elementos inteiros', importance: 'essencial' },
    { id: 'crit2', description: 'Três contadores de classificação declarados e com valor zero atribuído', importance: 'essencial' },
    { id: 'crit3', description: 'Laço lendo as 8 entradas via scanf indexado', importance: 'essencial' },
    { id: 'crit4', description: 'Condicional encadeada usando if, else if e else para avaliar paridade de elementos contra zero', importance: 'essencial' },
    { id: 'crit5', description: 'Incremento correto dos respectivos contadores e printf triplo externo de saldo', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Não inicialização de contadores específicos', likelyCause: 'Ausência de atribuição inicial zero a algum buffer de soma' },
    { id: 'err2', description: 'Omitir tratamento de parcelas nulas', likelyCause: 'Deixar de classificar ou esquecer de incrementar no caso de zeros' },
    { id: 'err3', description: 'Exbição em repetição exaustiva em loop', likelyCause: 'Posicionar impressora de saída dos resultados no bojo da repetição' }
  ],

  templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
  
  analyzeLocally: (code: string): AnalysisResult => {
    const codeLower = code.toLowerCase();
    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
      main: /int\s+main\s*\(/.test(codeLower),
      loops: /\b(for|while)\b/.test(codeLower),
      arrayDeclaration: /int\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\[\s*8\s*\]/.test(codeLower),
      hasPositives: />\s*0\b/.test(codeLower),
      hasNegatives: /<\s*0\b/.test(codeLower),
      hasElseIf: /else\s+if/.test(codeLower),
      threeCounters: /(positivos|pos|p)\s*=\s*0[\s\S]*?(negativos|neg|n)\s*=\s*0[\s\S]*?(zeros|zero|z)\s*=\s*0/i.test(codeLower) || /(pos|neg|zero[\s\S]*?=\s*0)/.test(codeLower),
      printf: /printf\s*\(/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Importação do cabeçalho de entrada e saída correta."); score++; }
    else { review.push("Diga #include <stdio.h>."); }

    if (checks.main) { good.push("A definição de int main() está adequada."); score++; }
    else { review.push("Assinale int main() em seu código."); }

    if (checks.arrayDeclaration) { good.push("Vetor inteiro de tamanho 8 mapeado com precisão."); score += 2; }
    else { review.push("Declare o vetor com tamanho 8: int arr[8];"); }

    if (checks.loops) { good.push("Repetições estruturadas identificadas."); score += 2; }
    else { review.push("Projete circuitos de repetições com for para ler e classificar o array."); }

    if (checks.hasPositives && checks.hasNegatives) { good.push("Lógica de separação de positivos e negativos identificada."); score += 2; }
    else { review.push("Use comparadores > 0 e < 0 para segregar as amostras do vetor."); }

    if (checks.threeCounters || checks.hasElseIf) { good.push("Utilizou múltiplos contadores com condicionais exclusivas."); score += 2; }
    else { review.push("Garanta que você possua 3 contadores de soma e que sejam inicializados com zero."); }

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 9) category = 'solução adequada';
    else if (score >= 6) category = 'quase completa';
    else if (score >= 3) category = 'parcialmente correta';

    let difficulty = "Lógica de classificação de conjuntos homogêneos e múltiplos buffers";
    if (!checks.arrayDeclaration) difficulty = "Falta de array int de tamanho 8";
    else if (!checks.loops) difficulty = "Sem laço iterador";
    else if (!checks.hasPositives || !checks.hasNegatives) difficulty = "Sem mapeamento correto de limites de paridade";

    let nextStep = "Comece com int vetor[8] e 3 contadores com valor inicial 0.";
    if (category === 'parcialmente correta') nextStep = "Crie uma estrutura 'for' de zero a sete para ler usando scanf(&vetor[i]).";
    if (category === 'quase completa') nextStep = "Faça a triagem com if (vetor[i] > 0) pos++; else if (vetor[i] < 0) neg++; else zeros++;.";
    if (category === 'solução adequada') nextStep = "Fabuloso! Realizou um dos exercícios estatísticos de vetores mais completos.";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.loops ? ['logica'] : ['sintaxe_aparente'],
      `Análise Heurística da Distribuição Vetorial: ${score}/10 pontos.`
    );
  }
};
