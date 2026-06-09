import type { Challenge, AnalysisResult, ErrorType } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafioFuncoesMaiorTresNumeros: Challenge = {
  id: 'funcoes_maior_tres_numeros',
  categoryId: 'funcoes',
  title: 'Maior de três números com função e procedimento',
  subtitle: 'Escreva um programa em C que leia três números inteiros no escopo principal, use uma função para descobrir o maior deles e chame um procedimento para informar o resultado.',
  challengeVersion: '1.0.0',
  
  metadata: {
    content: 'Funções e procedimentos em C',
    language: 'C (ANSI/C99)',
    level: 'Intermediário',
    time: '20 minutos',
    requirements: 'Leitura de três inteiros no main, função com três parâmetros inteiros, retorno inteiro, procedimento void e chamada de subprogramas.',
    skill: 'Separar leitura, processamento e saída usando função com retorno e procedimento.',
    version: '1.0.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Implementar uma solução modular em C usando uma função para retornar o maior entre três inteiros e um procedimento para exibir o resultado.',
    pedagogicalGoal: 'Consolidar a diferença entre função com retorno, procedimento sem retorno e responsabilidade do escopo principal.',
    expectedDifficulty: 'media',
    cognitiveOperation: 'aplicar',
    prerequisites: [
      'Variáveis inteiras',
      'Entrada de dados com scanf',
      'Saída de dados com printf',
      'Estruturas condicionais',
      'Funções com parâmetros',
      'Retorno com return',
      'Procedimento void'
    ]
  },

  domainTags: {
    skillTags: ['functions', 'procedures', 'parameters', 'return', 'conditionals'],
    topicTags: ['basic-c', 'modularization', 'input-output', 'decision-logic'],
    difficultyTag: 'medium-modularization',
    prerequisiteTags: ['basic-syntax', 'conditionals', 'variables']
  },

  problem: 'Escreva um algoritmo que encontra o maior de três números inteiros fornecidos pelo usuário. Utilize uma função para determinar o maior elemento dentre os três números e um procedimento para informar ao usuário qual é o maior elemento. A leitura dos números deve ser realizada no escopo principal.',
  
  guidingQuestions: [
    'Quais ações devem ficar no escopo principal?',
    'Por que a leitura dos três números não deve ficar dentro da função?',
    'Que tipo de retorno a função precisa ter para devolver o maior valor?',
    'O procedimento deve calcular, retornar ou apenas informar o maior número?',
    'Em que momento o main deve chamar a função e o procedimento?'
  ],

  orientation: {
    input: 'Três números inteiros informados pelo usuário no escopo principal.',
    output: 'Mensagem informando qual é o maior elemento entre os três valores.',
    cases: 'Se as entradas forem 8, 12 e 5, a função deve retornar 12 e o procedimento deve exibir esse valor.',
    structure: 'O main declara e lê n1, n2 e n3. A função maiorTres recebe os três valores, compara os números e retorna o maior. O main armazena esse retorno em uma variável maior e chama o procedimento informarMaior para mostrar o resultado.',
    expectedLogic: 'Inicializar uma variável maior com o primeiro número. Comparar o segundo número com maior. Se for maior, atualizar. Comparar o terceiro número com maior. Se for maior, atualizar. Retornar maior. Depois, no main, chamar o procedimento para exibir o resultado.'
  },

  examples: [
    {
      input: '8 12 5',
      output: 'Maior elemento: 12',
      description: 'O segundo número é o maior.'
    },
    {
      input: '20 7 20',
      output: 'Maior elemento: 20',
      description: 'Há empate no maior valor, mas o valor correto continua sendo 20.'
    }
  ],

  concepts: [
    'Função com retorno',
    'Procedimento void',
    'Parâmetros formais',
    'Chamada de função',
    'Separação de responsabilidades',
    'Comparação entre valores inteiros'
  ],

  tips: [
    {
      id: 1,
      text: 'Comece separando as responsabilidades: o main lê os dados, a função calcula o maior valor e o procedimento mostra o resultado.',
      pedagogicalGoal: 'Evitar mistura entre leitura, processamento e saída.'
    },
    {
      id: 2,
      text: 'A função que descobre o maior valor precisa retornar um int, pois o maior elemento também é um número inteiro.',
      pedagogicalGoal: 'Reforçar a escolha do tipo de retorno.'
    },
    {
      id: 3,
      text: 'Uma estratégia simples é iniciar maior com o primeiro número e depois comparar com o segundo e o terceiro.',
      pedagogicalGoal: 'Orientar a lógica incremental de comparação.'
    },
    {
      id: 4,
      text: 'O procedimento de saída deve ser void. Ele recebe o maior valor por parâmetro e usa printf para informar o resultado.',
      pedagogicalGoal: 'Diferenciar função de cálculo e procedimento de exibição.'
    }
  ],

  commonErrors: [
    {
      title: 'Ler os números dentro da função',
      description: 'O enunciado pede que a leitura dos números seja feita no escopo principal.',
      pedagogicalAdvice: 'Deixe os scanf no main e envie os valores para a função por parâmetro.'
    },
    {
      title: 'Criar uma função void para calcular o maior',
      description: 'Uma função usada para determinar o maior elemento precisa devolver esse valor ao ponto de chamada.',
      pedagogicalAdvice: 'Use int como tipo de retorno e finalize a função com return maior.'
    },
    {
      title: 'Imprimir o resultado dentro da função de cálculo',
      description: 'Isso mistura processamento com saída e reduz a clareza da modularização.',
      pedagogicalAdvice: 'A função calcula e retorna. O procedimento recebe e mostra.'
    },
    {
      title: 'Comparar apenas dois números',
      description: 'O maior deve ser determinado entre os três valores fornecidos.',
      pedagogicalAdvice: 'Depois de comparar com o segundo valor, compare também com o terceiro.'
    },
    {
      title: 'Chamar o procedimento sem passar o maior valor',
      description: 'O procedimento precisa receber o valor calculado para conseguir exibi-lo.',
      pedagogicalAdvice: 'Depois de fazer maior = maiorTres(n1, n2, n3), chame informarMaior(maior).'
    }
  ],

  solution: `#include <stdio.h>

int maiorTres(int a, int b, int c) {
    int maior = a;

    if (b > maior) {
        maior = b;
    }

    if (c > maior) {
        maior = c;
    }

    return maior;
}

void informarMaior(int maior) {
    printf("Maior elemento: %d\\n", maior);
}

int main() {
    int n1, n2, n3, maior;

    scanf("%d", &n1);
    scanf("%d", &n2);
    scanf("%d", &n3);

    maior = maiorTres(n1, n2, n3);

    informarMaior(maior);

    return 0;
}`,

  finalSummary: [
    'A leitura ficou no main, como solicitado no enunciado.',
    'A função recebeu três valores, comparou e retornou o maior.',
    'O procedimento ficou responsável apenas por mostrar o resultado.',
    'A solução separa entrada, processamento e saída em partes claras.'
  ],

  nextChallengeId: 'funcoes_media_dois_numeros',

  expectedCriteria: [
    { id: 'crit_leitura_main', description: 'Realiza a leitura dos três números no main.', importance: 'essencial' },
    { id: 'crit_funcao_int', description: 'Define uma função com retorno int para determinar o maior valor.', importance: 'essencial' },
    { id: 'crit_tres_parametros', description: 'A função recebe três parâmetros inteiros.', importance: 'essencial' },
    { id: 'crit_compara_tres', description: 'A lógica compara os três valores e não apenas dois.', importance: 'essencial' },
    { id: 'crit_return_maior', description: 'A função retorna o maior valor encontrado.', importance: 'essencial' },
    { id: 'crit_procedimento_void', description: 'Define um procedimento void para informar o maior valor.', importance: 'essencial' },
    { id: 'crit_chamada_main', description: 'O main chama a função, armazena o retorno e chama o procedimento.', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err_leitura_fora_main', description: 'Leitura dos números dentro da função ou do procedimento.', likelyCause: 'Confusão sobre responsabilidade do escopo principal.' },
    { id: 'err_sem_return', description: 'Função de cálculo sem retorno.', likelyCause: 'Confusão entre função e procedimento.' },
    { id: 'err_so_dois_numeros', description: 'Comparação envolvendo apenas dois dos três números.', likelyCause: 'Lógica condicional incompleta.' },
    { id: 'err_printf_na_funcao', description: 'Impressão dentro da função de cálculo.', likelyCause: 'Mistura entre processamento e saída.' },
    { id: 'err_procedimento_nao_chamado', description: 'Procedimento de saída criado, mas não chamado no main.', likelyCause: 'Falha na integração dos subprogramas.' }
  ],

  templateCode: `#include <stdio.h>

int maiorTres(int a, int b, int c) {
    // calcule e retorne o maior valor
}

void informarMaior(int maior) {
    // mostre o maior valor
}

int main() {
    int n1, n2, n3, maior;

    // leia os três números no escopo principal

    // chame a função e armazene o retorno

    // chame o procedimento

    return 0;
}`,
  
  analyzeLocally: (code: string): AnalysisResult => {
    type ParsedFunction = {
      returnType: 'int' | 'void';
      name: string;
      params: string;
      body: string;
    };

    const source = code.toLowerCase();
    const codeWithoutComments = source.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, ' ');

    const parseFunctions = (input: string): ParsedFunction[] => {
      const functions: ParsedFunction[] = [];
      const functionPattern = /\b(int|void)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)\s*\{/g;
      let match: RegExpExecArray | null;

      while ((match = functionPattern.exec(input)) !== null) {
        const openingBraceIndex = functionPattern.lastIndex - 1;
        let depth = 0;
        let closingBraceIndex = -1;

        for (let i = openingBraceIndex; i < input.length; i++) {
          if (input[i] === '{') {
            depth++;
          } else if (input[i] === '}') {
            depth--;
            if (depth === 0) {
              closingBraceIndex = i;
              break;
            }
          }
        }

        if (closingBraceIndex > openingBraceIndex) {
          functions.push({
            returnType: match[1] as 'int' | 'void',
            name: match[2],
            params: match[3],
            body: input.slice(openingBraceIndex + 1, closingBraceIndex)
          });
          functionPattern.lastIndex = closingBraceIndex + 1;
        }
      }

      return functions;
    };

    const getParamParts = (params: string): string[] =>
      params
        .split(',')
        .map(param => param.trim())
        .filter(param => param.length > 0 && param !== 'void');

    const getParamNames = (params: string): string[] =>
      getParamParts(params)
        .map(param => {
          const normalized = param.replace(/\[[^\]]*\]/g, '').replace(/\*/g, ' ').trim();
          return normalized.match(/([a-zA-Z_][a-zA-Z0-9_]*)$/)?.[1] ?? '';
        })
        .filter(Boolean);

    const hasThreeIntParams = (params: string): boolean => {
      const paramParts = getParamParts(params);
      const explicitIntParams = paramParts.filter(param => /\bint\b/.test(param)).length;
      const compactIntParams = /^\s*int\s+[a-zA-Z_][a-zA-Z0-9_]*\s*,\s*[a-zA-Z_][a-zA-Z0-9_]*\s*,\s*[a-zA-Z_][a-zA-Z0-9_]*/.test(params);

      return paramParts.length >= 3 && (explicitIntParams >= 3 || compactIntParams);
    };

    const hasKnownCalcName = (name: string): boolean =>
      /^(maiortres|calcularmaior|maior)$/.test(name) || /maior/.test(name);

    const hasKnownProcedureName = (name: string): boolean =>
      /^(informarmaior|mostrarmaior|exibirmaior)$/.test(name) || /(informar|mostrar|exibir)/.test(name);

    const hasComparison = (body: string): boolean =>
      /\bif\s*\(/.test(body) || /\?/.test(body) || /[a-zA-Z_][a-zA-Z0-9_]*\s*[<>]=?\s*[a-zA-Z_][a-zA-Z0-9_]*/.test(body);

    const comparisonCount = (body: string): number =>
      (body.match(/[<>]=?/g) ?? []).length + (body.match(/\?/g) ?? []).length;

    const functions = parseFunctions(codeWithoutComments);
    const mainFunction = functions.find(fn => fn.name === 'main');
    const intFunctions = functions.filter(fn => fn.returnType === 'int' && fn.name !== 'main');
    const voidFunctions = functions.filter(fn => fn.returnType === 'void' && fn.name !== 'main');

    const calcFunction =
      intFunctions.find(fn => hasKnownCalcName(fn.name) && hasThreeIntParams(fn.params)) ??
      intFunctions.find(fn => hasThreeIntParams(fn.params)) ??
      intFunctions.find(fn => hasKnownCalcName(fn.name)) ??
      intFunctions[0];

    const calcVoidCandidate = voidFunctions.find(fn =>
      hasThreeIntParams(fn.params) && (hasKnownCalcName(fn.name) || hasComparison(fn.body))
    );

    const procedureFunction =
      voidFunctions.find(fn => hasKnownProcedureName(fn.name) && /printf\s*\(/.test(fn.body)) ??
      voidFunctions.find(fn => /printf\s*\(/.test(fn.body)) ??
      voidFunctions.find(fn => hasKnownProcedureName(fn.name)) ??
      voidFunctions[0];

    const mainBody = mainFunction?.body ?? '';
    const mainScanfCalls: string[] = mainBody.match(/scanf\s*\([\s\S]*?\)\s*;/g) ?? [];
    const scanfFormatCount = mainScanfCalls.reduce((total: number, call: string) => total + (call.match(/%d/g) ?? []).length, 0);
    const inputVariables = new Set([...mainBody.matchAll(/&\s*([a-zA-Z_][a-zA-Z0-9_]*)/g)].map(match => match[1]));
    const calcParamNames = calcFunction ? getParamNames(calcFunction.params) : [];
    const calcBody = calcFunction?.body ?? '';
    const allCalcParamsUsed = calcParamNames.length >= 3 && calcParamNames.slice(0, 3).every(param => new RegExp(`\\b${param}\\b`).test(calcBody));
    const hasTwoComparisons = comparisonCount(calcBody) >= 2;
    const callsCalcFunction = Boolean(calcFunction && new RegExp(`\\b${calcFunction.name}\\s*\\(`).test(mainBody));
    const callsProcedure = Boolean(procedureFunction && new RegExp(`\\b${procedureFunction.name}\\s*\\(`).test(mainBody));

    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeWithoutComments),
      main: /\bint\s+main\s*\(/.test(codeWithoutComments),
      scanf: /scanf\s*\(/.test(codeWithoutComments),
      threeMainInputs: mainScanfCalls.length >= 3 || scanfFormatCount >= 3 || inputVariables.size >= 3,
      intFunction: Boolean(calcFunction),
      functionWithThreeIntParams: Boolean(calcFunction && hasThreeIntParams(calcFunction.params)),
      hasComparison: Boolean(calcFunction && hasComparison(calcBody)),
      comparesThreeValues: Boolean(calcFunction && allCalcParamsUsed && hasTwoComparisons),
      returnInCalcFunction: Boolean(calcFunction && /\breturn\b/.test(calcBody)),
      voidProcedure: Boolean(procedureFunction),
      printf: /printf\s*\(/.test(codeWithoutComments),
      callsCalcFunction,
      callsProcedure,
      calcDeclaredVoid: Boolean(calcVoidCandidate),
      scanfOutsideMain: functions.some(fn => fn.name !== 'main' && /scanf\s*\(/.test(fn.body)),
      printfInsideCalcFunction: Boolean((calcFunction && /printf\s*\(/.test(calcBody)) || (calcVoidCandidate && /printf\s*\(/.test(calcVoidCandidate.body))),
      onlyTwoNumbersCompared: Boolean(calcFunction && hasComparison(calcBody) && !allCalcParamsUsed),
      procedureCreatedButNotCalled: Boolean(procedureFunction && !callsProcedure)
    };

    const good: string[] = [];
    const review: string[] = [];

    const addReview = (message: string) => {
      if (!review.includes(message)) review.push(message);
    };

    let score = 0;

    if (checks.stdio) { good.push('Incluiu o cabeçalho stdio.h.'); score++; }
    else { addReview('Inclua #include <stdio.h> para usar scanf e printf.'); }

    if (checks.main) { good.push('Declarou o escopo principal com int main.'); score++; }
    else { addReview('Organize o ponto de entrada do programa com int main().'); }

    if (checks.scanf) { good.push('Usou scanf para entrada de dados.'); score++; }
    else { addReview('Use scanf para ler os três valores inteiros.'); }

    if (checks.threeMainInputs) { good.push('A leitura dos três números aparece no main.'); score += 2; }
    else { addReview('A leitura dos números precisa permanecer no main, conforme o enunciado.'); }

    if (checks.intFunction) { good.push('Criou uma função de cálculo com retorno int.'); score += 2; }
    else if (checks.calcDeclaredVoid) { addReview('A função que calcula o maior deve retornar int, não void.'); }
    else { addReview('Crie uma função com retorno int para determinar o maior valor.'); }

    if (checks.functionWithThreeIntParams) { good.push('A função de cálculo recebe três parâmetros inteiros.'); score += 2; }
    else { addReview('A função de cálculo precisa receber três parâmetros inteiros.'); }

    if (checks.hasComparison) { good.push('Há lógica condicional para comparar valores.'); score++; }
    else { addReview('Use if ou operador ternário para comparar os valores.'); }

    if (checks.comparesThreeValues) { good.push('A comparação considera os três valores recebidos.'); score += 2; }
    else if (checks.onlyTwoNumbersCompared) { addReview('Inclua uma comparação com o terceiro número.'); }
    else { addReview('Garanta que a função compare os três números, não apenas dois deles.'); }

    if (checks.returnInCalcFunction) { good.push('A função retorna o maior valor encontrado.'); score += 2; }
    else { addReview('Finalize a função de cálculo com return maior.'); }

    if (checks.voidProcedure) { good.push('Criou um procedimento void para informar o resultado.'); score += 2; }
    else { addReview('Crie um procedimento void para mostrar o maior valor recebido por parâmetro.'); }

    if (checks.printf) { good.push('Usou printf para exibir o resultado.'); score++; }
    else { addReview('Use printf no procedimento para informar o maior elemento.'); }

    if (checks.callsCalcFunction) { good.push('O main chama a função de cálculo.'); score += 2; }
    else { addReview('Depois das leituras, chame a função no main e armazene o retorno.'); }

    if (checks.callsProcedure) { good.push('O main chama o procedimento de saída.'); score += 2; }
    else { addReview('Depois de chamar a função, armazene o retorno e passe esse valor ao procedimento.'); }

    if (checks.calcDeclaredVoid) {
      score -= 2;
      addReview('A função que calcula o maior deve retornar int, não void.');
    }

    if (checks.scanfOutsideMain) {
      score -= 2;
      addReview('Deixe os scanf no main e envie os valores para a função por parâmetro.');
    }

    if (checks.printfInsideCalcFunction) {
      score -= 2;
      addReview('O procedimento deve apenas mostrar o valor recebido por parâmetro, enquanto a função calcula e retorna.');
    }

    if (checks.onlyTwoNumbersCompared) {
      score -= 1;
      addReview('Inclua uma comparação com o terceiro número.');
    }

    if (checks.procedureCreatedButNotCalled) {
      score -= 2;
      addReview('O procedimento de saída foi criado, mas também precisa ser chamado no main.');
    }

    let category: AnalysisResult['category'] = 'tentativa inicial';
    const solutionIsAdequate =
      checks.stdio &&
      checks.main &&
      checks.threeMainInputs &&
      checks.intFunction &&
      checks.functionWithThreeIntParams &&
      checks.comparesThreeValues &&
      checks.returnInCalcFunction &&
      checks.voidProcedure &&
      checks.callsCalcFunction &&
      checks.callsProcedure &&
      !checks.calcDeclaredVoid &&
      !checks.scanfOutsideMain &&
      !checks.printfInsideCalcFunction;

    if (solutionIsAdequate) category = 'solução adequada';
    else if (score >= 14) category = 'quase completa';
    else if (score >= 7) category = 'parcialmente correta';

    let difficulty = 'Dificuldade em separar entrada, processamento e saída com subprogramas.';
    if (!checks.main) difficulty = 'Estrutura principal do programa ainda incompleta.';
    else if (!checks.threeMainInputs) difficulty = 'Leitura dos três valores fora da responsabilidade esperada do main.';
    else if (checks.calcDeclaredVoid || !checks.returnInCalcFunction) difficulty = 'Confusão entre função com retorno e procedimento sem retorno.';
    else if (!checks.comparesThreeValues) difficulty = 'Lógica de comparação incompleta para três valores.';
    else if (!checks.voidProcedure || !checks.callsProcedure) difficulty = 'Integração incompleta do procedimento de saída.';

    let nextStep = 'Comece estruturando o main para declarar e ler n1, n2 e n3.';
    if (checks.main && !checks.threeMainInputs) nextStep = 'Mantenha os três scanf no main e passe esses valores como parâmetros.';
    if (checks.calcDeclaredVoid) nextStep = 'Troque a função de cálculo para retorno int e finalize com return maior.';
    if (checks.intFunction && !checks.functionWithThreeIntParams) nextStep = 'Ajuste a função para receber três parâmetros inteiros.';
    if (checks.functionWithThreeIntParams && !checks.comparesThreeValues) nextStep = 'Inclua uma comparação com o terceiro número.';
    if (checks.comparesThreeValues && !checks.returnInCalcFunction) nextStep = 'Finalize a função de cálculo retornando o maior valor encontrado.';
    if (checks.returnInCalcFunction && !checks.voidProcedure) nextStep = 'Crie um procedimento void que receba o maior valor e use printf para mostrá-lo.';
    if (checks.voidProcedure && !checks.callsProcedure) nextStep = 'Depois de chamar a função, armazene o retorno e passe esse valor ao procedimento.';
    if (category === 'solução adequada') nextStep = 'Ótimo trabalho! A solução separa leitura, cálculo e saída em subprogramas bem definidos.';

    const errorTypes: ErrorType[] = [];
    if (!checks.main || !checks.stdio) errorTypes.push('sintaxe_aparente');
    if (!checks.threeMainInputs || checks.scanfOutsideMain) errorTypes.push('interpretacao_enunciado');
    if (!checks.comparesThreeValues || !checks.returnInCalcFunction || checks.calcDeclaredVoid) errorTypes.push('logica');
    if (!checks.printf || checks.printfInsideCalcFunction || !checks.callsProcedure) errorTypes.push('saida_incorreta');
    if (checks.onlyTwoNumbersCompared) errorTypes.push('condicao_incompleta');

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      errorTypes.length > 0 ? errorTypes : ['sem_erro_relevante'],
      `Análise heurística de funções e procedimentos: ${Math.max(score, 0)}/21 critérios observados.`
    );
  }
};
