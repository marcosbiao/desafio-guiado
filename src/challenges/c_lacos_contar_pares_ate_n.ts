import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafioLacosContarParesAteN: Challenge = {
  id: 'lacos_contar_pares_ate_n',
  categoryId: 'lacos',
  title: 'Contar números pares entre 1 e N',
  subtitle: 'Escreva um programa em C que leia um número inteiro positivo N e conte quantos números pares existem de 1 até N.',
  challengeVersion: '1.0.0',
  
  metadata: {
    content: 'Laços de Repetição e Condicionais',
    language: 'C (ANSI/C99)',
    level: 'Intermediário',
    time: '20 minutos',
    requirements: 'Leitura com scanf, laço de repetição, condição com operador módulo.',
    skill: 'Combinar laço de repetição com testes condicionais de divisibilidade.',
    version: '1.0.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Utilizar uma estrutura de repetição integrada com uma condicional para contar ocorrências que atendam a critérios matemáticos específicos.',
    pedagogicalGoal: 'Praticar o uso de condicionais dentro de um laço e o emprego de contadores baseados em condições.',
    expectedDifficulty: 'media',
    cognitiveOperation: 'aplicar',
    prerequisites: ['Laço de repetição', 'Operador módulo (%)', 'Estruturas Condicionais', 'Variável de Contagem']
  },

  domainTags: {
    skillTags: ['loops', 'variables', 'conditionals', 'input-output'],
    topicTags: ['basic-c', 'repetition', 'math-logic'],
    difficultyTag: 'medium-complexity-logic',
    prerequisiteTags: ['basic-syntax', 'loops']
  },

  problem: 'Escreva um programa em C que leia um número inteiro positivo N e conte quantos números pares existem de 1 até N. Exiba a quantidade final de números pares.',
  
  guidingQuestions: [
    'Como ler com segurança o valor de N contendo o limite?',
    'Por que o contador de números pares deve ser inicializado com 0?',
    'Como verificar se cada número gerado pelo laço de repetição é divisível por 2?',
    'Onde deve estar a resposta impressa pelo printf para garantir que apareça uma única vez ao término de todas as iterações?'
  ],

  orientation: {
    input: 'Um único número inteiro positivo N.',
    output: 'A quantidade final de números pares no intervalo de 1 a N.',
    cases: 'Se N for 5, os números avaliados são de 1 a 5. Os pares são 2 e 4, totalizando 2 pares.',
    structure: 'Laço determinado (for) de 1 até N, com teste condicional (if) e operador % 2 dentro do bloco.',
    expectedLogic: 'Criar as variáveis para N, iterador e contador de pares. Inicializar contador com 0. Ler N. Rodar o laço de 1 até N (mantenha i <= N). Em cada ciclo, se i % 2 for 0, incrementar o contador. Exibir o resultado final.'
  },

  examples: [
    { input: '5', output: 'Quantidade de pares: 2' },
    { input: '10', output: 'Quantidade de pares: 5' }
  ],

  concepts: [
    'Operador resto da divisão (%)',
    'Laços de repetição combinados com condicionais',
    'Contador incremental condicionado'
  ],

  tips: [
    { 
      id: 1, 
      text: "Você precisa percorrer todos os números inteiros de 1 até N. Um laço de repetição determinístico é o ideal para isso.",
      pedagogicalGoal: "Identificar a estrutura de repetição requerida."
    },
    { 
      id: 2, 
      text: "Para verificar se o número iterado 'i' é par, aplique o operador modular % contra o número 2 e compare com 0, ou seja, 'i % 2 == 0'.",
      pedagogicalGoal: "Compreender o cálculo de paridade em C."
    },
    { 
      id: 3, 
      text: "Use uma variável acumuladora (contador) que inicie em 0 e que seja incrementada com ++ somente no momento em que a condição for verdadeira.",
      pedagogicalGoal: "Modelar a lógica de filtragem com contadores."
    },
    { 
      id: 4, 
      text: "O resultado deve ser mostrado apenas após o fim de todas as iterações. Certifique-se de posicionar o printf após as chaves de encerramento do laço.",
      pedagogicalGoal: "Dominar o escopo espacial do fluxo de saída de programas."
    }
  ],

  commonErrors: [
    { 
      title: "Contar todos os números indiscriminadamente", 
      description: "Incrementar o contador em toda iteração do laço causará o resultado final ser igual a N, ignorando se o elemento é par.",
      pedagogicalAdvice: "Mantenha a instrução de incremento estritamente envelopada pelas chaves da sua estrutura condicional 'if'."
    },
    { 
      title: "Testar a condição de paridade fora do laço", 
      description: "Escrever a condicional fora das chaves de repetição impedirá que cada valor iterado 'i' seja validado sequencialmente.",
      pedagogicalAdvice: "Para avaliar todos os dados do conjunto, o teste lógico precisa ser executado a cada iteração individual dentro do laço."
    },
    { 
      title: "Esquecer de inicializar o contador com 0", 
      description: "Deixar o contador sem valor definido no início acumulará lixos de RAM, corrompendo o valor final aferido.",
      pedagogicalAdvice: "Sempre que usar uma variável como acumuladora ou contadora, garanta uma atribuição inicial explícita de valor nulo (ex: contador = 0;)."
    },
    { 
      title: "Condição de parada menor que N", 
      description: "Usar 'i < N' fará o loop parar antes de testar o próprio N, o que é um erro se N for par.",
      pedagogicalAdvice: "Certifique-se de que a condição inclua o limite superior através de operador <=."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    int n, i, contador = 0;

    scanf("%d", &n);

    // Varre de 1 até N inclusivo
    for (i = 1; i <= n; i++) {
        if (i % 2 == 0) {
            contador++; // Incrementa apenas se i for par
        }
    }

    printf("Quantidade de pares: %d\\n", contador);

    return 0;
}`,

  finalSummary: [
    'Convergência de Sintaxe: O encapsulamento de condicionais dentro de laços de repetição permite a filtragem refinada de conjuntos de dados.',
    'Padrão de Inicialização: Contadores devem ser sempre inicializados explicitamente para conferir integridade operacional.',
    'Condições Limítrofes: Usar o operador inclusive correto garante que nenhum elemento do domínio de teste seja esquecido.'
  ],

  nextChallengeId: 'lacos_media_cinco_numeros',

  expectedCriteria: [
    { id: 'crit1', description: 'Leitura correta de N usando scanf', importance: 'essencial' },
    { id: 'crit2', description: 'Laço iterando de 1 até N (inclusivo)', importance: 'essencial' },
    { id: 'crit3', description: 'Contador de pares inicializado com zero', importance: 'essencial' },
    { id: 'crit4', description: 'Estrutura de decisão if checando se o elemento % 2 é 0', importance: 'essencial' },
    { id: 'crit5', description: 'Incremento correto do contador e printf final externo ao laço', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Variável de contagem não inicializada', likelyCause: 'Esquecer de atribuir o valor 0 à variável' },
    { id: 'err2', description: 'Incremento incondicional', likelyCause: 'Posicionar o contador fora do escopo do if' },
    { id: 'err3', description: 'Loop com condição menor estrita (i < n)', likelyCause: 'Esquecer de incluir o limite da iteração com <=' }
  ],

  templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
  
  analyzeLocally: (code: string): AnalysisResult => {
    const codeLower = code.toLowerCase();
    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
      main: /int\s+main\s*\(/.test(codeLower),
      scanf: /scanf\s*\(/.test(codeLower),
      loops: /\b(for|while)\b/.test(codeLower),
      modCheck: /%\s*2\s*==\s*0/.test(codeLower),
      initZero: /(contador|pares|cont)\s*=\s*0\b/.test(codeLower),
      increment: /(contador|pares|cont)\s*(\+\+|\+=\s*1|=\s*[a-zA-Z0-9_]+\s*\+\s*1)/.test(codeLower),
      printf: /printf\s*\(/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Importação do cabeçalho de entrada e saída adequada."); score++; }
    else { review.push("Diga em seu código #include <stdio.h>."); }

    if (checks.main) { good.push("A definição da int main() está correta."); score++; }
    else { review.push("Defina o ponto de execução principal via int main()."); }

    if (checks.scanf) { good.push("Você utilizou o scanf para ler o limitador N."); score++; }
    else { review.push("Lembre-se de ler a variável do usuário com scanf."); }

    if (checks.loops) { good.push("Estrutura de repetição está configurada."); score += 2; }
    else { review.push("Certifique-se de usar um laço de repetição para percorrer o intervalo."); }

    if (checks.modCheck) { good.push("O teste de paridade com operador modular foi verificado."); score += 2; }
    else { review.push("Aplique o teste condicional utilizando o operador resto da divisão, ex: i % 2 == 0."); }

    if (checks.initZero) { good.push("Inicialização do contador de pares com zero detectado."); score += 2; }
    else { review.push("Declare sua variável contadora de pares atribuindo o valor inicial zero para evitar lixo de memória."); }

    if (checks.increment) { score++; }
    if (checks.printf) { score++; }

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 9) category = 'solução adequada';
    else if (score >= 6) category = 'quase completa';
    else if (score >= 3) category = 'parcialmente correta';

    let difficulty = "Lógica na coordenação de laço estruturado e contagem condicional";
    if (!checks.loops) difficulty = "Sem laço de repetição";
    else if (!checks.modCheck) difficulty = "Sem filtragem de números pares";
    else if (!checks.initZero) difficulty = "Sem reinicialização segura de contador";

    let nextStep = "Inicie declarando o int main(), lendo N com scanf e criando o contador com valor 0.";
    if (category === 'parcialmente correta') nextStep = "Crie uma instrução de loop 'for' ou 'while' que caminhe do valor 1 até o valor de N.";
    if (category === 'quase completa') nextStep = "Coloque o teste condicional 'if (i % 2 == 0)' dentro do laço incrementando seu contador.";
    if (category === 'solução adequada') nextStep = "Parabéns, seu fluxo atende plenamente ao padrão estruturado requisitado!";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.loops ? ['logica'] : ['sintaxe_aparente'],
      `Análise Heurística de Paridade: ${score}/10 pontos.`
    );
  }
};
