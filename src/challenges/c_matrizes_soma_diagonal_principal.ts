import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafioMatrizesSomaDiagonalPrincipal: Challenge = {
  id: 'matrizes_soma_diagonal_principal',
  categoryId: 'matrizes',
  title: 'Soma da diagonal principal',
  subtitle: 'Escreva um programa em C que leia os valores de uma matriz 3x3 de inteiros, calcule e exiba a soma de todos os elementos que estão na diagonal principal.',
  challengeVersion: '1.0.0',
  
  metadata: {
    content: 'Matrizes Bidimensionais e Geometria Linear',
    language: 'C (ANSI/C99)',
    level: 'Intermediário',
    time: '25 minutos',
    requirements: 'Declaração de matriz 3x3, loops duplos de leitura, extração geométrica de diagonais, acumuladores.',
    skill: 'Estruturar conjuntos matriciais e isolar elementos baseados em subconjuntos geométricos específicos de diagonal.',
    version: '1.0.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Implementar a lógica de extração e somatório dos elementos constitutivos da diagonal principal de matrizes 3x3 por condicionamento geométrico.',
    pedagogicalGoal: 'Compreender o conceito de diagonal principal, onde as coordenadas de linha coincidem rigidamente com as de coluna (i == j), operando filtros espaciais.',
    expectedDifficulty: 'alta',
    cognitiveOperation: 'aplicar',
    prerequisites: ['Declaração de Matriz 3x3', 'Instruções de Repetição', 'Equação de Diagonais (linha == coluna)', 'Somatório Acumulado']
  },

  domainTags: {
    skillTags: ['matrices', 'arrays', 'loops', 'conditionals'],
    topicTags: ['basic-c', 'data-structures', 'math-logic'],
    difficultyTag: 'high-complexity-logic',
    prerequisiteTags: ['basic-syntax', 'loops', 'arrays']
  },

  problem: 'Escreva um programa em C que declare e preencha do teclado os valores de uma matriz 3x3 (3 linhas e 3 colunas) de inteiros. Posteriormente, calcule a soma de todos os elementos contidos na sua diagonal principal, isto é, as posições onde o número de linha é igual ao número de coluna (matriz[0][0], matriz[1][1] e matriz[2][2]) e imprima o resultado final.',
  
  guidingQuestions: [
    'Como declarar uma matriz bidimensional de inteiros de tamanho 3x3?',
    'Como mapear os laços aninhados para ler os 9 valores do teclado por meio de scanf?',
    'Qual relação matemática caracteriza os elementos pertencentes à diagonal principal?',
    'Qual a vantagem computadorizada de somar usando um laço simples do tipo `matriz[i][i]` frente a varrer toda a matriz verificando `i == j`?'
  ],

  orientation: {
    input: '9 números inteiros separados por espaços ou quebras de linhas no console.',
    output: 'O valor consolidado da soma dos três elementos de diagonal.',
    cases: 'Matriz com entradas: 1 2 3, 4 5 6, 7 8 9. A diagonal contém 1, 5 e 9, resultando na soma igual a 15.',
    structure: 'Declaração de matriz 3x3 de inteiros. Loops de i de 0 a 2 e j de 0 a 2 para preenchimento. Acumulador soma_diag = 0. loop simples de i de 0 a 2 somando matriz[i][i] (ou utilizando loop duplo testando if (i == j) soma_diag += matriz[i][j]). Print final pós-loops.',
    expectedLogic: 'Criar int m[3][3], i, j, soma = 0. Executar loops aninhados do scanf salvando em &m[i][j]. computar a soma por meio de um loop de i = 0 a 2 adicionando m[i][i] (ou testando if (i == j) nos dois laços). Imprimir soma no final.'
  },

  examples: [
    { input: '1 2 3 4 5 6 7 8 9', output: 'Soma da diagonal principal: 15' },
    { input: '5 10 15 20 6 30 40 50 7', output: 'Soma da diagonal principal: 18' }
  ],

  concepts: [
    'Convergência espacial em matrizes quadradas',
    'Relação de igualdade indexada (coordenadas congruentes)',
    'Otimização de rotas de processamento (laços simples)'
  ],

  tips: [
    { 
      id: 1, 
      text: "Instancie a matriz inteira em C: 'int matriz[3][3];'. Garanta também o acumulador de somas com valor nulo: 'int soma = 0;'.",
      pedagogicalGoal: "Definir com precisão a área de armazenamento e balanço."
    },
    { 
      id: 2, 
      text: "Use loops aninhados parametrizados por 'i' e 'j' variando de 0 a 2 para colher os 9 elementos com scanf.",
      pedagogicalGoal: "Estruturar o preenchimento de matriz quadradas."
    },
    { 
      id: 3, 
      text: "Na diagonal principal, os índices de linha e coluna são coincidentes: (0,0), (1,1) e (2,2). Você pode somá-los diretamente usando um loop simples: 'soma = soma + matriz[i][i]'.",
      pedagogicalGoal: "Identificar a relação matemática i == j e compor loops otimizados."
    },
    { 
      id: 4, 
      text: "Imprima a soma calculada fora de loops e blocos de repetição em formato de printf simples.",
      pedagogicalGoal: "Gerir e arranjar a impressão do saldo estatístico."
    }
  ],

  commonErrors: [
    { 
      title: "Somar os elementos da diagonal secundária", 
      description: "Por confusão com os sentidos geométricos, somar coordenadas como (0,2), (1,1) e (2,0) calculará a diagonal secundária, infringindo o enunciado de focar na principal.",
      pedagogicalAdvice: "A diagonal principal transita exatamente do canto superior esquerdo para o inferior direito, onde os índices de linha e coluna são perfeitamente idênticos."
    },
    { 
      title: "Utilizar iteradores idênticos nos loops aninhados", 
      description: "Empregar o contador 'i' simultaneamente no laço externo e no laço interno congelará ou inutilizará o preenchimento por scanf.",
      pedagogicalAdvice: "Mantenha a regra clássica de separar os iteradores: 'i' gerencia as linhas e 'j' gerencia as colunas de forma autônoma."
    },
    { 
      title: "Soma total de toda a matriz", 
      description: "Escrever loops aninhados somando todo os 9 elementos desrespeita a regra instrucional de restringir o cálculo aos elementos de diagonal.",
      pedagogicalAdvice: "Atente-se e aplique condições seletivas nos índices ou extraia diretamente nas posições de igualdade."
    },
    { 
      title: "Erros de tamanho de limites do loop", 
      description: "Varrer loops até <= 3 causará estouro estático de índice ao tentar ler a posição 3 do vetor ou da matriz.",
      pedagogicalAdvice: "Matrizes 3x3 em C possuem gavetas válidas que variam estritamente de 0 até 2. Nunca tente ler no índice 3."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    int matriz[3][3];
    int i, j, soma = 0;

    // Leitura bidimensional de dados via scanf
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            scanf("%d", &matriz[i][j]);
        }
    }

    // Soma simplificada e otimizada da diagonal principal (i == j)
    for (i = 0; i < 3; i++) {
        soma = soma + matriz[i][i];
    }

    printf("Soma da diagonal principal: %d\\n", soma);

    return 0;
}`,

  finalSummary: [
    'Geometria Matricial: Diagonais principais reúnem células onde os índices de coordenadas x e y coincidem de forma congruente (linha == coluna).',
    'Otimização Computacional: Extrair diagonais usando um único loop simples (matriz[i][i]) poupa ciclos de varredura se comparado a testar duplo loops.',
    'Sintaxe Segura: Manter as rotas de looping amparadas na faixa estrita de 0 até tamanho-1 previne estouros de barramento.'
  ],

  expectedCriteria: [
    { id: 'crit1', description: 'Declaração correta de matriz de tamanho 3x3 inteira', importance: 'essencial' },
    { id: 'crit2', description: 'Duplo laço de repetição aninhado capturando as 9 entradas no scanf', importance: 'essencial' },
    { id: 'crit3', description: 'Variável soma declarada e inicializada em zero', importance: 'essencial' },
    { id: 'crit4', description: 'Cálculo de soma da diagonal utilizando igualdade de coordenadas (loop simples matriz[i][i] ou loop duplo testando i == j)', importance: 'essencial' },
    { id: 'crit5', description: 'Printf final de encerramento externo exibindo a soma acumulada', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Soma de diagonal errada (secundária)', likelyCause: 'Somar as células coordenadas inversas do plano' },
    { id: 'err2', description: 'Soma indiscriminada de todo o plano bidimensional', likelyCause: 'Acumular todos os 9 elementos sem controle ou restrição aos índices coincidentes' },
    { id: 'err3', description: 'Estouro de faixas operacionais', likelyCause: 'Permitir que laços alcancem ou busquem o índice em valor 3' }
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
      diagonalLogic: /\[\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\]\s*\[\s*\1\s*\]/.test(codeLower) || /==\s*[j|y]\b/.test(codeLower) || /\[\s*0\s*\]\s*\[\s*0\s*\]\s*\+\s*[\s\S]*?\[\s*1\s*\]\s*\[\s*1\s*\]\s*\+\s*[\s\S]*?\[\s*2\s*\]\s*\[\s*2\s*\]/.test(codeLower),
      initZero: /(soma|soma_diag|total)\s*=\s*0\b/.test(codeLower),
      printf: /printf\s*\(/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Disponibilizou cabeçalho stdio.h."); score++; }
    else { review.push("Assinale #include <stdio.h> no topo."); }

    if (checks.main) { good.push("A definição de int main() está correta."); score++; }
    else { review.push("Diga int main() em seu ponto de largada."); }

    if (checks.matrixDeclaration) { good.push("Matriz de dimensões 3x3 inteira declarada."); score += 3; }
    else { review.push("Defina o vetor bidimensional com tamanho 3x3: int tabela[3][3];"); }

    if (checks.doubleLoop) { good.push("Loops de leitura aninhados para receber a matriz identificados."); score += 2; }
    else { review.push("Utilize loops aninhados para recolher ordenadamente as 9 células pelo scanf."); }

    if (checks.diagonalLogic) { good.push("Lógica de extração e soma da diagonal principal identificada."); score += 2; }
    else { review.push("Garanta que você some apenas as gavetas coincidentes de diagonal, como [i][i] ou testando se i == j."); }

    if (checks.printf) { score++; }

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 9) category = 'solução adequada';
    else if (score >= 6) category = 'quase completa';
    else if (score >= 3) category = 'parcialmente correta';

    let difficulty = "Dificuldade na extração geométrica de diagonais em matrizes quadradas";
    if (!checks.matrixDeclaration) difficulty = "Sem declaração de matriz 3x3";
    else if (!checks.doubleLoop) difficulty = "Sem laço de preenchimento duplo";
    else if (!checks.diagonalLogic) difficulty = "Sem isolamento de células de diagonal principal (i == j)";

    let nextStep = "Comece declarando m[3][3], soma = 0 e loops aninhados capturando as entradas.";
    if (category === 'parcialmente correta') nextStep = "Adicione um laço simples de i = 0 a 2 e some m[i][i] ao acumulador.";
    if (category === 'quase completa') nextStep = "Exiba o resultado da soma usando um printf simples fora de todas as chaves repetidoras.";
    if (category === 'solução adequada') nextStep = "Trabalho primoroso! Dominou com competência as análises geométricas de matrizes quadradas.";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.doubleLoop ? ['logica'] : ['sintaxe_aparente'],
      `Análise Heurística da Diagonal Principal: ${score}/10 pontos.`
    );
  }
};
