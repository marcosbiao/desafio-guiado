import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafioMatrizesMaiorValor: Challenge = {
  id: 'matrizes_maior_valor',
  categoryId: 'matrizes',
  title: 'Maior valor na matriz',
  subtitle: 'Escreva um programa em C que leia os valores de uma matriz 3x3 de inteiros e exiba o maior valor encontrado nela.',
  challengeVersion: '1.0.0',
  
  metadata: {
    content: 'Matrizes Bidimensionais e Pesquisa de Extremos',
    language: 'C (ANSI/C99)',
    level: 'Intermediário',
    time: '25 minutos',
    requirements: 'Declaração de matriz 3x3, loops duplos aninhados, inicialização segura de busca, comparação de extremos.',
    skill: 'Modelar algoritmos de localização de valores máximos dentro de estruturas de dados bidimensionais homogêneas.',
    version: '1.0.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Utilizar loops aninhados estruturados para varrer uma matriz 3x3 de forma exaustiva, identificando o maior valor armazenado de forma robusta.',
    pedagogicalGoal: 'Compreender a aplicação prática de inicialização dinâmica de hipóteses de extremo em arranjos bidimensionais cartesianos.',
    expectedDifficulty: 'alta',
    cognitiveOperation: 'aplicar',
    prerequisites: ['Declaração de Matriz 3x3', 'Laços Aninhados (for/while)', 'Busca de Máximos', 'Condicionais de Desigualdade']
  },

  domainTags: {
    skillTags: ['matrices', 'arrays', 'loops', 'conditionals'],
    topicTags: ['basic-c', 'data-structures', 'math-logic'],
    difficultyTag: 'high-complexity-logic',
    prerequisiteTags: ['basic-syntax', 'loops', 'arrays']
  },

  problem: 'Escreva um programa em C que leia do teclado os valores necessários para preencher uma matriz 3x3 (3 linhas e 3 colunas) de inteiros. Ao término de alimentar todo a tabela, faça uma varredura para localizar qual é o maior valor absoluto registrado nela. Exiba esse maior número una única vez na tela.',
  
  guidingQuestions: [
    'Por que inicializar a variável de verificação com zero pode falhar no domínio de matrizes compostas por números negativos?',
    'Como utilizar com segurança a primeira coordenada física real da nossa matriz (`matriz[0][0]`) como a hipótese inicial do maior número?',
    'Como coordenar os laços aninhados para percorrer cada célula e compará-la com o maior valor provisório registrado?',
    'Como organizar e situar o printf de resultado para omitir listagens redundantes dentro das repetições?'
  ],

  orientation: {
    input: '9 números inteiros de domínio amplo informados pelo console.',
    output: 'O maior número de todo o conjunto bidimensional analisado.',
    cases: 'Matriz com apenas números negativos: -20 -15 -8, -45 -12 -33, -9 -18 -4. O maior absoluto é o número -4.',
    structure: 'Isolamento de matriz 3x3 inteiro. Loops duplos para leitura. Atribuição de maior = matriz[0][0]. Segundo conjunto de laços aninhados (ou integrados) comparando if (matriz[i][j] > maior) maior = matriz[i][j]. Printf conclusivo.',
    expectedLogic: 'Criar int m[3][3], i, j, maior. Executar loops aninhados do scanf salvando em &m[i][j]. Registrar maior = m[0][0]. Iterar i e j de 0 a 2 verificando if (m[i][j] > maior). Em caso positivo, atualizar maior = m[i][j]. Exibir'
  },

  examples: [
    { input: '12 8 4 9 33 21 0 7 14', output: 'Maior valor: 33' },
    { input: '-10 -5 -15 -2 -20 -8 -12 -33 -6', output: 'Maior valor: -2' }
  ],

  concepts: [
    'Busca de limites de fronteiras em estruturas bi-coordenadas',
    'Robustez sintática em inicializadores de planos',
    'Convergência espacial com decisões lógicas'
  ],

  tips: [
    { 
      id: 1, 
      text: "Instancie sua matriz 3x3 com: 'int matriz[3][3];'. Declare também a variável para conter o elemento extremo: 'int maior;'.",
      pedagogicalGoal: "Definir variáveis de armazenamento e extremos bidimensionais."
    },
    { 
      id: 2, 
      text: "Sempre capte as 9 entradas do usuário usando scanf dentro de dois loopings aninhados (linhas do índice 0 a 2 e colunas do índice 0 a 2).",
      pedagogicalGoal: "Mapear loops duplos cartesianos de leitura."
    },
    { 
      id: 3, 
      text: "Para iniciar a pesquisa sem perigo de erros em conjuntos negativos, atribua o primeiro elemento físico lido: 'maior = matriz[0][0];'.",
      pedagogicalGoal: "Aprender a inicialização de pesquisa robusta com base em células iniciais estáticas."
    },
    { 
      id: 4, 
      text: "Crie a varredura e teste if (matriz[i][j] > maior). Se for verdadeiro, sua hipótese provisória cai e atualiza maior = matriz[i][j].",
      pedagogicalGoal: "Desenvolver lógica de filtragem comparativa de planos."
    }
  ],

  commonErrors: [
    { 
      title: "Inicializar 'maior' com valor fixo absoluto zero", 
      description: "Escrever maior = 0 falhará na hipótese de avaliarmos uma matriz composta puramente por valores negativos, apontando falsamente o número zero como o maior presente na coleção.",
      pedagogicalAdvice: "Sempre alinhar pesquisas de máximos ou mínimos partindo de células pertencentes aos próprios vetores ou matrizes estudadas."
    },
    { 
      title: "Utilização do mesmo iterador de repetição nos laços", 
      description: "Escrever 'for (i = 0...)' e logo após no bloco 'for (i = 0...)' criará um loop confuso que travará o console ou invadirá memória RAM.",
      pedagogicalAdvice: "Garanta a individualização absoluta de cada iterador em loops aninhados, por exemplo, 'i' no externo e 'j' no interno."
    },
    { 
      title: "Misturar índices de linha e coluna", 
      description: "Variar os índices e escrever 'matriz[j][i]' ou esquecer um deles causará desordem no sequenciamento bidimensional de varreduras.",
      pedagogicalAdvice: "Adote a regra estrita de indexação geométrica linear: matriz[iterador_linha][iterador_coluna]."
    },
    { 
      title: "Apresentar o saldo intermitente nos loops", 
      description: "Por o printf de resultado final no interior das repetições inundará de registros duplicados e irrelevantes a área terminal do usuário.",
      pedagogicalAdvice: "Resoluções e exibições conclusivas devem residir após o desenlace e fechamento absoluto de todas as repetições."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    int matriz[3][3];
    int i, j, maior;

    // Preenchimento dos 9 elementos de forma bidimensional
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            scanf("%d", &matriz[i][j]);
        }
    }

    // Inicialização da hipótese a partir do elemento inicial real
    maior = matriz[0][0];

    // Varredura completa para localização de extremo máximo
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (matriz[i][j] > maior) {
                maior = matriz[i][j]; // Atualiza o maior parcial
            }
        }
    }

    printf("Maior valor: %d\\n", maior);

    return 0;
}`,

  finalSummary: [
    'Busca de Extremos: Inicializar comparadores com a primeira gaveta real (matriz[0][0]) confere confiabilidade algorítmica robusta a qualquer escopo numérico.',
    'Geometria Plana: O casamento harmônico de laços duplos permite transitar metodicamente em superfícies bi-indexadas.',
    'Tratamento de Estado: Varrer e reatribuir hipóteses sob condições seletivas resolve com eficiência pesquisas críticas de dados.'
  ],

  nextChallengeId: 'matrizes_soma_diagonal_principal',

  expectedCriteria: [
    { id: 'crit1', description: 'Declaração adequada de matriz inteira de dimensões 3x3', importance: 'essencial' },
    { id: 'crit2', description: 'Uso de laços de repetição duplos e aninhados para o preenchimento por scanf', importance: 'essencial' },
    { id: 'crit3', description: 'Variável maior inicializada com o valor real do índice matriz[0][0]', importance: 'essencial' },
    { id: 'crit4', description: 'Laços subsequentes de varredura integrados com condicional de desigualdade if (matriz[i][j] > maior)', importance: 'essencial' },
    { id: 'crit5', description: 'Atualização do valor de maior se verdadeiro e printf de encerramento externo simples', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Má indexação extrema', likelyCause: 'Assentar a alocação inicial de maior com valor constante arbitrário 0' },
    { id: 'err2', description: 'Colisão de variáveis de repetição', likelyCause: 'Declarar o iterador interno j igual ao iterador externo i' },
    { id: 'err3', description: 'Apresentação redundante terminal', likelyCause: 'Posicionar o printf conclusivo no núcleo dos laços aninhados' }
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
      findMax: />\s*maior\b/.test(codeLower),
      safeInit: /maior\s*=\s*[a-zA-Z_][a-zA-Z0-9_]*\s*\[\s*0\s*\]\s*\[\s*0\s*\]/.test(codeLower),
      printf: /printf\s*\(/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Disponibilizou cabeçalho biblioteca stdio.h."); score++; }
    else { review.push("Assinale #include <stdio.h> no topo."); }

    if (checks.main) { good.push("Sintaxe int main() correta."); score++; }
    else { review.push("Diga int main() no ponto de início."); }

    if (checks.matrixDeclaration) { good.push("Declarou sua matriz de tamanho 3x3 para números inteiros."); score += 3; }
    else { review.push("Importe o vetor bidimensional com tamanho 3x3: int minha_matriz[3][3];"); }

    if (checks.doubleLoop) { good.push("Utilizou loop de repetição aninhado para processar a matriz."); score += 2; }
    else { review.push("Implemente repetições estruturadas aninhadas para navegar nas duas dimensões da matriz."); }

    if (checks.findMax) { good.push("Mapeou a condição de desigualdade procurando o maior elemento (> maior)."); score += 1; }
    else { review.push("Use um operador relacional de maior (>) para confrontar os elementos da matriz contra o acumulador."); }

    if (checks.safeInit) { good.push("Uso correto de inicialização segura a partir de matriz[0][0]."); score += 1; }
    else { review.push("É altamente recomendável inicializar maior com a primeira coordenada: maior = matriz[0][0]."); }

    if (checks.printf) { score++; }

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 9) category = 'solução adequada';
    else if (score >= 6) category = 'quase completa';
    else if (score >= 3) category = 'parcialmente correta';

    let difficulty = "Dificuldade em gerenciar buscas de extremos cartesianos em matrizes 2D";
    if (!checks.matrixDeclaration) difficulty = "Sem declaração de matriz 3x3";
    else if (!checks.doubleLoop) difficulty = "Sem laço duplo aninhado de preenchimento";
    else if (!checks.findMax) difficulty = "Sem teste relacional de maior elemento";

    let nextStep = "Comece com int m[3][3], maior e laços aninhados de 0 a 2 para scanf.";
    if (category === 'parcialmente correta') nextStep = "Inicialize maior = m[0][0] e crie a varredura testando if (m[i][j] > maior) para reatribuir.";
    if (category === 'quase completa') nextStep = "Assegure-se de retirar o printf de resultado final de dentro de qualquer loop.";
    if (category === 'solução adequada') nextStep = "Fabuloso! Estruturou perfeitamente um dos percursos de busca por extremos mais refinados.";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.doubleLoop ? ['logica'] : ['sintaxe_aparente'],
      `Análise Heurística do Extremo Matricial: ${score}/10 pontos.`
    );
  }
};
