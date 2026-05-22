import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafioLacos2: Challenge = {
  id: 'desafio_lacos_somar_n',
  categoryId: 'lacos',
  title: 'Somar números de 1 até N',
  subtitle: 'Escreva um programa em C que leia um número positivo N e calcule a soma de todos os números de 1 até N.',
  challengeVersion: '1.0.0',
  
  metadata: {
    content: 'Laços de Repetição com Acumulador',
    language: 'C (ANSI/C99)',
    level: 'Iniciante',
    time: '15 minutos',
    requirements: 'Leitura com scanf, laço com acumulador, variáveis locais.',
    skill: 'Acumular valores dinamicamente usando uma variável de acumulação.',
    version: '1.0.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Utilizar um acumulador matemático dentro de uma estrutura de repetição dependente de entrada dinâmica do usuário.',
    pedagogicalGoal: 'Introduzir o conceito de acumulador numérico e variáveis que retêm estados incrementais.',
    expectedDifficulty: 'media',
    cognitiveOperation: 'aplicar',
    prerequisites: ['Variáveis Inteiras', 'Leitura com scanf', 'Saída de Dados', 'Laços de Repetição']
  },

  domainTags: {
    skillTags: ['loops', 'variables', 'accumulators', 'input-output'],
    topicTags: ['basic-c', 'repetition', 'math-logic'],
    difficultyTag: 'medium-complexity-logic',
    prerequisiteTags: ['basic-syntax', 'data-types']
  },

  problem: 'Escreva um programa em C que leia um número inteiro positivo N e calcule a soma de todos os números inteiros de 1 até N. Mostre apenas o valor da soma acumulada ao final.',
  
  guidingQuestions: [
    'Como ler com segurança o valor limite N?',
    'Por que é crucial iniciar a variável da soma acumulada com valor 0?',
    'Como somar a variável contadora à variável acumuladora a cada etapa do ciclo?',
    'Onde deve ficar o printf para mostrar apenas a resposta final do cálculo?'
  ],

  orientation: {
    input: 'Um único número inteiro positivo N digitado pelo teclado.',
    output: 'O valor da soma de 1 até N.',
    cases: 'Qualquer N inteiro positivo (ex: N = 5 resulta em 15, que é 1+2+3+4+5).',
    structure: 'Laço determinado (for) de 1 a N, atualizando uma variável de acumulador inicializada em zero.',
    expectedLogic: 'Declarar variáveis para N, contador e acumulador. Iniciar o acumulador com 0. Ler N. Rodar um laço de 1 a N, adicionando o valor atual do contador ao acumulador. Exibir o acumulador após o término de todas as iterações.'
  },

  examples: [
    { input: '5', output: 'Soma: 15' },
    { input: '10', output: 'Soma: 55' }
  ],

  concepts: [
    'Acumulador numérico',
    'Leitura Dinâmica com scanf',
    'Laços controlados por entrada do usuário'
  ],

  tips: [
    { 
      id: 1, 
      text: "Você precisará guardar uma soma parcial que muda a cada iteração. Crie uma variável para isso em seu programa.",
      pedagogicalGoal: "Identificar a necessidade de um acumulador."
    },
    { 
      id: 2, 
      text: "Lembre-se que variáveis de soma em C precisam ser inicializadas com 0, senão elas conterão lixo de memória residual.",
      pedagogicalGoal: "Explicar os problemas de falta de inicialização em C."
    },
    { 
      id: 3, 
      text: "A cada repetição do laço, adicione o valor do contador (ex: 'i') à variável da soma.",
      pedagogicalGoal: "Garantir a acumulação correta."
    },
    { 
      id: 4, 
      text: "O objetivo é mostrar apenas o resultado consolidado e final. Portanto, posicione o printf final fora e após o bloco de repetição.",
      pedagogicalGoal: "Posicionar corretamente os comandos de entrada e saída."
    }
  ],

  commonErrors: [
    { 
      title: "Esquecer de inicializar a variável soma", 
      description: "Se não definir 'soma = 0', ela virá com lixo eletrônico de memória, tornando o resultado impredizível ou inválido.",
      pedagogicalAdvice: "Sempre inicialize acumuladores com o elemento neutro da operação matemática (zero para somas)."
    },
    { 
      title: "printf dentro do laço de repetição", 
      description: "Colocar a exibição dentro do bloco do laço fará com que o programa imprima todas as etapas parciais da soma, o que polui o terminal e falha nos requisitos de formatação padrão.",
      pedagogicalAdvice: "Mantenha a exibição de resultados consolidados sempre isolada e posicionada após o fechamento da estrutura de repetição."
    },
    { 
      title: "Somar sempre o mesmo número", 
      description: "Fazer 'soma = soma + n' em vez de usar 'soma = soma + i' acumulará o mesmo limite superior repetidas vezes.",
      pedagogicalAdvice: "Certifique-se de que a expressão use a variável iteradora que varia linearmente em cada ciclo."
    },
    { 
      title: "Limite menor que N", 
      description: "Usar 'i < n' fará com que a soma ignore o último valor solicitado.",
      pedagogicalAdvice: "Defina o limitador relacional do laço com 'i <= n' de forma inclusiva."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    int n, i, soma = 0; // soma inicializada com zero

    // Lê a entrada do usuário
    scanf("%d", &n);

    // Soma todos os números de 1 até n
    for (i = 1; i <= n; i++) {
        soma = soma + i;
    }

    // Exibe o resultado final após o loop
    printf("Soma: %d\\n", soma);

    return 0;
}`,

  finalSummary: [
    'Inicialização do Acumulador: Crucial para evitar adulteração de resultados por resíduos na RAM.',
    'Escopo do printf: Exiba as informações consolidadas integralmente fora do bloco iterativo.',
    'Iterador versus Limite: Use as variáveis corretas para as operações internas das expressões.'
  ],

  nextChallengeId: 'desafio_vetores_maior_valor',

  expectedCriteria: [
    { id: 'crit1', description: 'Uso de scanf para carregar o valor de N', importance: 'essencial' },
    { id: 'crit2', description: 'Declaração e inicialização de acumulador em 0', importance: 'essencial' },
    { id: 'crit3', description: 'Laço condicionado a continuar até <= N', importance: 'essencial' },
    { id: 'crit4', description: 'Acumulação progressiva (soma = soma + i)', importance: 'essencial' },
    { id: 'crit5', description: 'printf para o resultado posicionado de forma externa ao laço', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Lixo de RAM por não inicializar soma', likelyCause: 'Ausência de inicialização expressa no início' },
    { id: 'err2', description: 'printf interno ao loop', likelyCause: 'Mau posicionamento de chaves ou escopo lógico' },
    { id: 'err3', description: 'Uso incorreto da variável limitadora em vez da variável de controle na soma', likelyCause: 'Desatenção temporária sobre as identidades das variáveis' }
  ],

  templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
  
  analyzeLocally: (code: string): AnalysisResult => {
    const codeLower = code.toLowerCase();
    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
      main: /int\s+main\s*\(/.test(codeLower),
      scanf: /scanf\s*\(/.test(codeLower),
      loops: /\b(for|while)\b/.test(codeLower),
      somaInit: /soma\s*=\s*0\b/.test(codeLower),
      somaAccumulate: /soma\s*=\s*(soma\s*\+\s*[a-zA-Z0-9_]+|[a-zA-Z0-9_]+\s*\+\s*soma|soma\s*\+=\s*[a-zA-Z0-9_]+)/.test(codeLower),
      printf: /printf\s*\(/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Importação de stdio.h correta."); score++; }
    else { review.push("Assinale #include <stdio.h> no topo do seu código."); }

    if (checks.main) { good.push("Configuração da função principal declarada de forma correta."); score++; }
    else { review.push("Certifique-se de iniciar com int main()."); }

    if (checks.scanf) { good.push("Você utilizou o scanf para o entrada de dados."); score++; }
    else { review.push("Lembre-se de ler N usando scanf(\"%d\", &n);."); }

    if (checks.loops) { good.push("Você implementou a repetição com laço."); score += 2; }
    else { review.push("Utilize uma estrutura iterativa para percorrer os intervalos."); }

    if (checks.somaInit) { good.push("Variável acumuladora inicializada com zero com sucesso."); score += 2; }
    else { review.push("Certifique-se de que a variável de soma seja explicitamente inicializada com 0."); }

    if (checks.somaAccumulate) { good.push("Instrução de acumulação incremental presente."); score += 2; }
    else { review.push("Atualize a soma adicionando a variável de controle da iteração."); }

    if (checks.printf) { score++; }

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 9) category = 'solução adequada';
    else if (score >= 6) category = 'quase completa';
    else if (score >= 3) category = 'parcialmente correta';

    let difficulty = "Dificuldade na criação de acumuladores";
    if (!checks.scanf) difficulty = "Sem leitura dinâmica do usuário";
    else if (!checks.loops) difficulty = "Ausência de controle com laços";
    else if (!checks.somaInit) difficulty = "Sem tratamento contra lixo de memória na soma";
    else if (!checks.somaAccumulate) difficulty = "Dificuldade em acumular incrementalmente";

    let nextStep = "Comece escrevendo seu int main() e lendo N.";
    if (category === 'parcialmente correta') nextStep = "Assegure-se de declarar 'int soma = 0;' antes de rodar o seu laço.";
    if (category === 'quase completa') nextStep = "Revise se o printf de exibição da resposta foi colocado fora das chaves do laço.";
    if (category === 'solução adequada') nextStep = "Parabéns! Você resolveu com maestria o desafio de soma de intervalos com acumuladores.";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.loops ? ['logica'] : ['sintaxe_aparente'],
      `Análise Heurística de Acumulação: ${score}/10 pontos.`
    );
  }
};
