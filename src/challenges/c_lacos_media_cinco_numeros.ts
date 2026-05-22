import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafioLacosMediaCincoNumeros: Challenge = {
  id: 'lacos_media_cinco_numeros',
  categoryId: 'lacos',
  title: 'Calcular a média de uma sequência de números',
  subtitle: 'Escreva um programa em C que leia 5 números inteiros, calcule a soma desses números e mostre a média ao final.',
  challengeVersion: '1.0.0',
  
  metadata: {
    content: 'Laços de Repetição com Acumulador e Média',
    language: 'C (ANSI/C99)',
    level: 'Intermediário',
    time: '20 minutos',
    requirements: 'Leitura interativa em laço fixo, acumuladores aritméticos, conversão de tipo implícita/explícita.',
    skill: 'Estruturar leituras consecutivas e calcular médias reais sem perda de precisão.',
    version: '1.0.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Utilizar loops estruturados com número fixo de iterações para consolidar somatórios e computar valores decimais (médias).',
    pedagogicalGoal: 'Compreender o cálculo de médias fracionárias e evitar erros clássicos de truncamento de divisão de inteiros em C.',
    expectedDifficulty: 'media',
    cognitiveOperation: 'aplicar',
    prerequisites: ['Laço de repetição', 'Acumulador numérico', 'Entrada de dados', 'Operações decimais (float/double)']
  },

  domainTags: {
    skillTags: ['loops', 'variables', 'accumulators', 'input-output'],
    topicTags: ['basic-c', 'repetition', 'math-logic'],
    difficultyTag: 'medium-complexity-logic',
    prerequisiteTags: ['basic-syntax', 'loops']
  },

  problem: 'Escreva um programa em C que leia 5 números inteiros do teclado, calcule a soma acumulada de todos esses números e exiba a média aritmética fracionária (com precisão de duas casas decimais) gerada ao final do processo.',
  
  guidingQuestions: [
    'Como modelar um loop fixo capaz de repetir a leitura exatamente 5 vezes?',
    'Como ler as entradas dinamicamente do teclado dentro do corpo do laço sem sobrescrevê-las sem acumulação?',
    'Qual valor atribuir à soma antes de acumular os valores informados pelo usuário?',
    'Como evitar que a divisão em C descarte as casas decimais da média?'
  ],

  orientation: {
    input: '5 números inteiros informados sequencialmente através do console.',
    output: 'A média aritmética formatada em formato real/decimal correspondente.',
    cases: 'Se as entradas forem 4, 5, 6, 4, 3, a soma é 22 e a média resultante é 4.40.',
    structure: 'Laço fixo com iterador (ex: for de 1 a 5). Leituras pelo scanf no loop acumulando em variável soma = 0. Cálculo da média real dividindo por 5.0 pós-laço.',
    expectedLogic: 'Declarar variáveis para controle do loop, número digitado, soma e média. Inicializar soma = 0. Rodar laço de 1 a 5 lendo com scanf e adicionando imediatamente à soma. Fora do laço, computar media = soma / 5.0 e exibir com printf %.2f.'
  },

  examples: [
    { input: '1 2 3 4 5', output: 'Media: 3.00' },
    { input: '10 12 15 8 9', output: 'Media: 10.80' }
  ],

  concepts: [
    'Acumulação em laço fixo',
    'Cálculo de médias com tipos reais',
    'Prevenção de truncamento inteiro em C'
  ],

  tips: [
    { 
      id: 1, 
      text: "A leitura dos números e sua imediata soma devem acontecer obrigatoriamente dentro do laço de repetição.",
      pedagogicalGoal: "Fixar a necessidade de leitura em ciclo iterado."
    },
    { 
      id: 2, 
      text: "Lembre-se de iniciar sua variável de soma com zero; do contrário, ela começará com ruídos de memória.",
      pedagogicalGoal: "Orientar sobre limpeza de acumuladores."
    },
    { 
      id: 3, 
      text: "A média aritmética só deve ser calculada após o término de todas as leituras, fora do escopo do laço.",
      pedagogicalGoal: "Compreender o momento e o local para processamento consolidado."
    },
    { 
      id: 4, 
      text: "Em C, dividir um inteiro por outro inteiro resulta em um inteiro truncado. Use floats ou faça 'soma / 5.0' para obter precisão fracionária.",
      pedagogicalGoal: "Tratar representações de ponto flutuante em C."
    }
  ],

  commonErrors: [
    { 
      title: "Calcular a média a cada ciclo dentro do laço", 
      description: "Escrever a operação da média dentro do loop desperdiça processamento e calcula valores irrelevantes antes do término das leituras.",
      pedagogicalAdvice: "Mantenha o cálculo consolidado da média exclusivamente fora e após as chaves do laço."
    },
    { 
      title: "Esquecer de inicializar a variável soma com 0", 
      description: "Sem inicializador, seu programa somará valores novos a um lixo inicial aleatório em memória RAM.",
      pedagogicalAdvice: "Sempre que for somar de forma incremental, defina o valor inicial da variável expressamente como zero."
    },
    { 
      title: "Uso de divisão puramente inteira", 
      description: "Fazer 'soma / 5' sendo soma um 'int' truncará, ex: 22/5 será 4.00 em vez de 4.40.",
      pedagogicalAdvice: "Introduza precisão decimal dividindo por uma constante real '5.0' ou aplicando casting para tipo float."
    },
    { 
      title: "Declarar a leitura fora do laço de repetição", 
      description: "Colocar scanf antes ou depois do loop lerá apenas uma entrada, impossibilitando colher as 5 amostras planejadas.",
      pedagogicalAdvice: "Coloque o scanf de entrada dentro do corpo do laço para repetir a solicitação a cada contagem de ciclo."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    int i, numero, soma = 0;
    float media;

    // Repete exatamente 5 vezes
    for (i = 1; i <= 5; i++) {
        scanf("%d", &numero);
        soma = soma + numero; // Acumulação
    }

    // Divisão por 5.0 evita truncamento de inteiros
    media = soma / 5.0;

    printf("Media: %.2f\\n", media);

    return 0;
}`,

  finalSummary: [
    'Ciclo Fixo: Centralizar a captura de dados reduz o volume de variáveis declaradas de forma redundante.',
    'Ponto Flutuante: Entender a distinção de tipos em C evita erros comuns de frações de precisão perdida.',
    'Sequenciamento Lógico: Resguardar o fechamento de laços antes de resolver operações agregadas de dados.'
  ],

  nextChallengeId: 'lacos_maior_dez_numeros',

  expectedCriteria: [
    { id: 'crit1', description: 'Uso de laço estruturado rodando exatamente 5 iterações', importance: 'essencial' },
    { id: 'crit2', description: 'Scanf localizado e operando de forma interna ao loop', importance: 'essencial' },
    { id: 'crit3', description: 'Acumulador de soma inicializado de forma segura com 0', importance: 'essencial' },
    { id: 'crit4', description: 'Divisão por constante em ponto flutuante (5.0) ou casting para float', importance: 'essencial' },
    { id: 'crit5', description: 'Printf para exibição de média com formatação %.2f posicionado de forma isolada do loop', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Divisão inteira limitante', likelyCause: 'Dividir por constante inteira 5' },
    { id: 'err2', description: 'Cálculo da média no interior do corpo iterativo', likelyCause: 'Confusão sobre os momentos de coleta versus consolidação de dados' },
    { id: 'err3', description: 'Vazamentos por acumulador impreciso', likelyCause: 'Omitir a expressão soma = 0 ao instanciar as variáveis' }
  ],

  templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
  
  analyzeLocally: (code: string): AnalysisResult => {
    const codeLower = code.toLowerCase();
    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
      main: /int\s+main\s*\(/.test(codeLower),
      loops: /\b(for|while)\b/.test(codeLower),
      scanfInLoop: /(for|while)[\s\S]*?scanf\s*\(/.test(codeLower),
      initZero: /soma\s*=\s*0\b/.test(codeLower),
      isFloat: /(float|double)\b/.test(codeLower),
      decimalDiv: /(\/\s*5\.0\b|float\s*\(\s*soma\s*\)\s*\/\s*5|\bcast\b|\/\s*\(float\)\s*5)/.test(codeLower) || /(\/\s*5\b)/.test(codeLower),
      printf: /printf\s*\(/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Disponibilizou bibliteca stdio.h."); score++; }
    else { review.push("Assinale #include <stdio.h> no topo."); }

    if (checks.main) { good.push("A definição de int main() está adequada."); score++; }
    else { review.push("Diga int main() no seu ponto de largada."); }

    if (checks.loops) { good.push("Você usou um laço de controle de iterações."); score++; }
    else { review.push("Implemente uma estrutura de laço para rodar 5 vezes."); }

    if (checks.scanfInLoop) { good.push("Você colocou a leitura de variáveis de forma interna ao seu laço."); score += 2; }
    else { review.push("Utilize a leitura com scanf dentro do corpo do laço de repetição."); }

    if (checks.initZero) { good.push("Acumulador inicial de somas zerado com integridade."); score += 2; }
    else { review.push("Garanta que a variável int soma tenha inicialização em zero."); }

    if (checks.isFloat || checks.decimalDiv) { good.push("Tratamento decimal para a extração de médias ativado."); score += 2; }
    else { review.push("Cuidado com a divisão de tipos inteiros que descarta decimais. Use float e divida por 5.0."); }

    if (checks.printf) { score++; }

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 9) category = 'solução adequada';
    else if (score >= 6) category = 'quase completa';
    else if (score >= 3) category = 'parcialmente correta';

    let difficulty = "Dificuldade em gerir somatórios e médias decimais em loops";
    if (!checks.loops) difficulty = "Falta de loop estrutural";
    else if (!checks.scanfInLoop) difficulty = "Escopo de leitura fora do laço";
    else if (!checks.initZero) difficulty = "Soma corrompida por lixo de memória na alocação";

    let nextStep = "Comece escrevendo seu int main() e declarando suas variáveis, com soma = 0.";
    if (category === 'parcialmente correta') nextStep = "Adicione um laço for de 1 a 5 lendo os números sequencialmente.";
    if (category === 'quase completa') nextStep = "Componha a média real fora do loop multiplicando a divisão por float ou usando 5.0.";
    if (category === 'solução adequada') nextStep = "Ótimo trabalho! A média com precisão está correta e bem formatada!";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.loops ? ['logica'] : ['sintaxe_aparente'],
      `Análise Heurística de Média: ${score}/10 pontos.`
    );
  }
};
