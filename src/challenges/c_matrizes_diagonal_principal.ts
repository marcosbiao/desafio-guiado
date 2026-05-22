import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafioMatrizes2: Challenge = {
  id: 'desafio_matrizes_diagonal_principal',
  categoryId: 'matrizes',
  title: 'Mostrar a diagonal principal de uma matriz 3x3',
  subtitle: 'Escreva um programa em C que leia uma matriz 3x3 e mostre os elementos da diagonal principal.',
  challengeVersion: '1.0.0',
  
  metadata: {
    content: 'Matrizes e Coordenadas',
    language: 'C (ANSI/C99)',
    level: 'Iniciante',
    time: '15 minutos',
    requirements: 'Declaração de matriz, loops aninhados, identificação de relação entre índices.',
    skill: 'Examinar propriedades geométricas de matrizes associando igualdades de índices.',
    version: '1.0.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Desenvolver algoritmos que leiam matrizes bidimensionais e mapeiem posições geométricas de índices síncronos (i == j).',
    pedagogicalGoal: 'Compreender a correlação matemática e ordenamento cartesiano de elementos específicos na diagonal principal da matriz.',
    expectedDifficulty: 'media',
    cognitiveOperation: 'aplicar',
    prerequisites: ['Declaração de Matriz 3x3', 'Laços Aninhados', 'Correlação entre Índices (i == j)']
  },

  domainTags: {
    skillTags: ['matrices', 'arrays', 'loops', 'variables', 'conditionals'],
    topicTags: ['basic-c', 'data-structures', 'math-logic'],
    difficultyTag: 'medium-complexity-logic',
    prerequisiteTags: ['basic-syntax', 'loops', 'arrays']
  },

  problem: 'Escreva um programa em C que leia uma matriz inteira com tamanho 3x3 (3 linhas e 3 colunas), armazene-a e em seguida exiba de forma consecutiva apenas os números posicionados na chamada diagonal principal da matriz (coordenadas onde a linha e a coluna possuem o mesmo índice).',
  
  guidingQuestions: [
    'Como expressar em C uma matriz homogênea de tamanho linear 3x3?',
    'Quais relações operacionais de posição determinam os elementos que representam a diagonal principal?',
    'Como podemos usar um único laço simples para exibir os elementos da diagonal principal em vez de percorrer duas dimensões desnecessariamente ao fim?',
    'Quais são os índices exatos de coordenadas dos três elementos da diagonal principal?'
  ],

  orientation: {
    input: '9 números inteiros inseridos de forma organizada para formar a matriz de três linhas e três colunas.',
    output: 'Os três elementos pertencentes à diagonal principal.',
    cases: 'Matriz unitária ou sequencial (ex: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] resulta nos elementos da diagonal 1, 5, 9).',
    structure: 'Alocação de matriz 3x3. Leitura com dobras com loops aninhados (i, j de 0 a 2). Exibição seletiva (exemplo com laço simples indexando matriz[i][i] ou teste i == j).',
    expectedLogic: 'Matriz[3][3] criada. Captura dos valores via loops aninhados de tamanho 3. Loop de percurso diagonal exibindo matriz[i][i] com i de 0 a 2. Saída ordenada.'
  },

  examples: [
    { input: '1 2 3 4 5 6 7 8 9', output: '1\n5\n9' },
    { input: '10 0 0 0 20 0 0 0 30', output: '10\n20\n30' }
  ],

  concepts: [
    'Relações de homologia cartesiana (igualdade de índices)',
    'Diagonal principal em conjuntos numéricos bidimensionais',
    'Otimização de percursos de tabelas bidimensionais'
  ],

  tips: [
    { 
      id: 1, 
      text: "A diagonal principal surge precisamente quando a coordenada de linha possui índice idêntico ao da coluna (linha == coluna).",
      pedagogicalGoal: "Explanar a definição conceitual de diagonal principal."
    },
    { 
      id: 2, 
      text: "Em uma matriz 3x3, os elementos de interesse estão alocados em [0][0], [1][1] e [2][2].",
      pedagogicalGoal: "Apontar de forma literal as posições de diagonal principal."
    },
    { 
      id: 3, 
      text: "Depois de ler os dados com loops aninhados tradicionais, você pode printar a diagonal usando um único laço simples com printf(\"%d\\n\", matriz[i][i]);.",
      pedagogicalGoal: "Demonstrar formas otimizadas de acesso."
    },
    { 
      id: 4, 
      text: "Certifique-se de usar testes limites < 3 em seus loops de coordenadas, já que os índices válidos da matriz vão de 0 a 2.",
      pedagogicalGoal: "Fixar limites de indexação base-zero."
    }
  ],

  commonErrors: [
    { 
      title: "Confundir diagonal principal com diagonal secundária", 
      description: "Tentar computar de forma cruzada partindo da outra ponta superior da matriz exibirá resultados desorganizados com a diagonal secundária.",
      pedagogicalAdvice: "Lembre-se: na diagonal principal, o índice de controle da linha é rigorosamente igual ao índice de controle da coluna (i == j)."
    },
    { 
      title: "Exibir o conteúdo de todos os elementos da tabela", 
      description: "Colocar printf na leitura ou rodar outro laço duplo irrestrito exibirá todos os nove elementos inseridos e falhará com o requisito do desafio.",
      pedagogicalAdvice: "Filtre a saída. Apenas exiba seletivamente quando a igualdade de coordenadas for comprovada."
    },
    { 
      title: "Violabilidade limite de índices (vazamentos)", 
      description: "Usar operador relacional <= 3 levará o sistema a tentar ler matriz[3][3], que está localizada fora do limite de espaço reservado, gerando lixo de RAM ou falhas de segmentação crítica.",
      pedagogicalAdvice: "Limite o teto dos loops de verificação em < 3 para arrays de tamanho físico 3."
    },
    { 
      title: "Usar matriz[i][j] sem correlacionar chaves", 
      description: "Exibir sem restringir 'i == j' ou sem indexar de forma simétrica com o mesmo iterador principal imprimirá elementos distantes da diagonal.",
      pedagogicalAdvice: "Sincronize o acesso. Ou empregue um único loop i varrendo matriz[i][i] ou teste com chaves condicionais 'if (i == j)'."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    int matriz[3][3];
    int i, j;

    // Loops aninhados para preencher a matriz 3x3
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            scanf("%d", &matriz[i][j]);
        }
    }

    // Exibe os elementos da diagonal principal
    // (onde o índice da linha é igual ao da coluna: [0][0], [1][1] e [2][2])
    for (i = 0; i < 3; i++) {
        printf("%d\\n", matriz[i][i]);
    }

    return 0;
}`,

  finalSummary: [
    'Geometria Matricial: Entender os relacionamentos cartesianos de i e j amplia a lógica geral para análise complexa de dados.',
    'Acesso Otimizado: Um único laço simples i < 3 é suficiente para exibir a diagonal de forma elegante e computacionalmente otimizada.',
    'Restrições Limítrofes: Manter loops abaixo do tamanho físico da array previne corrupções de memória.'
  ],

  nextChallengeId: '',

  expectedCriteria: [
    { id: 'crit1', description: 'Criação de matriz bidimensional de dimensões 3x3 inteira', importance: 'essencial' },
    { id: 'crit2', description: 'Dois laços de repetição aninhados para scanf de faturamento bidimensional', importance: 'essencial' },
    { id: 'crit3', description: 'Associação simétrica de índices (i == j ou matriz[i][i]) obtendo a diagonal', importance: 'essencial' },
    { id: 'crit4', description: 'Printf individualizado para exibição dos coeficientes da diagonal principal', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Index out of bounds', likelyCause: 'Uso de condicionais de loops <= 3 sobre limite 3' },
    { id: 'err2', description: 'Preenchimento incompleto de elementos', likelyCause: 'Não aninhamento adequado de laços secundários de preenchimento' },
    { id: 'err3', description: 'Impressão inteira da matriz', likelyCause: 'Ausência de refinamento seletivo de saída' }
  ],

  templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
  
  analyzeLocally: (code: string): AnalysisResult => {
    const codeLower = code.toLowerCase();
    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
      main: /int\s+main\s*\(/.test(codeLower),
      matrixDecl: /[a-zA-Z0-9_]+\s*\[\s*3\s*\]\s*\[\s*3\s*\]/.test(codeLower),
      loops: /\b(for|while)\b/.test(codeLower),
      scanfIndexed: /scanf\s*\(\s*["'][^"']*%d[^"']*["']\s*,\s*&\s*[a-zA-Z0-9_]+\s*\[\s*[a-zA-Z0-9_]+\s*\]\s*\[\s*[a-zA-Z0-9_]+\s*\]\s*\)/.test(codeLower),
      diagonalMatch: /matriz\s*\[\s*([a-zA-Z0-9_]+)\s*\]\s*\[\s*\1\s*\]/.test(codeLower) || /if\s*\(\s*([a-zA-Z0-9_]+)\s*==\s*([a-zA-Z0-9_]+)\s*\)/.test(codeLower),
      printf: /printf\s*\(/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Disponibilizou stdio.h no cabeçalho."); score++; }
    else { review.push("Utilize #include <stdio.h>."); }

    if (checks.main) { good.push("Int main() estruturado."); score++; }
    else { review.push("Assinale int main() em seu código."); }

    if (checks.matrixDecl) { good.push("Criação de matriz bidimensional de tamanho 3x3 encontrada."); score += 2; }
    else { review.push("Declare sua matriz com tamanho [3][3] (ex: int tabela[3][3];)."); }

    if (checks.scanfIndexed) { good.push("Loops aninhados leem as posições corretamente em matriz[i][j]."); score += 2; }
    else { review.push("Realize a leitura dos dados usando scanf indexados por as duas variáveis de loop, ex: &matriz[i][j]."); }

    if (checks.diagonalMatch) { good.push("Relação geométrica simétrica identificada determinando a diagonal principal."); score += 3; }
    else { review.push("Restrinja o acesso à diagonal principal usando matriz[i][i] ou checando if (i == j)."); }

    if (checks.printf) { score++; }

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 9) category = 'solução adequada';
    else if (score >= 6) category = 'quase completa';
    else if (score >= 3) category = 'parcialmente correta';

    let difficulty = "Dificuldade em isolar coeficientes em matrizes bidimensionais";
    if (!checks.matrixDecl) difficulty = "Sem declaração adequada de matriz bidimensional";
    else if (!checks.scanfIndexed) difficulty = "Sem preenchimento seguro de linhas e colunas";
    else if (!checks.diagonalMatch) difficulty = "Sem filtragem lógica geométrica da diagonal principal";

    let nextStep = "Comece declarando a matriz com dimensões 3x3.";
    if (category === 'parcialmente correta') nextStep = "Anote a captura de dados de 9 posições via loops aninhados utilizando scanf(\"%d\", &matriz[i][j]).";
    if (category === 'quase completa') nextStep = "Desenvolva um laço simples i < 3 que mostre com printf os elementos de matriz[i][i].";
    if (category === 'solução adequada') nextStep = "Parabéns! Você entende a geometria associativa das matrizes e resolveu o desafio perfeitamente.";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.matrixDecl ? ['logica'] : ['sintaxe_aparente'],
      `Análise Heurística de Diagonal: ${score}/10 pontos.`
    );
  }
};
