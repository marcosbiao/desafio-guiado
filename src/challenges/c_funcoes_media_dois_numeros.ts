import type { Challenge, AnalysisResult, ErrorType } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafioFuncoesMediaDoisNumeros: Challenge = {
  id: 'funcoes_media_dois_numeros',
  categoryId: 'funcoes',
  title: 'Média aritmética com função e procedimento',
  subtitle: 'Escreva um programa em C que leia dois números no escopo principal, calcule a média em uma função e mostre o resultado por meio de um procedimento.',
  challengeVersion: '1.0.0',
  
  metadata: {
    content: 'Funções e procedimentos em C',
    language: 'C (ANSI/C99)',
    level: 'Intermediário',
    time: '20 minutos',
    requirements: 'Leitura de dois números no main, função com retorno float, cálculo de média aritmética, procedimento void e chamada do procedimento no escopo principal.',
    skill: 'Implementar cálculo modular com função de retorno e procedimento de saída.',
    version: '1.0.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Implementar uma solução modular em C usando função para calcular a média aritmética e procedimento para exibir o resultado.',
    pedagogicalGoal: 'Consolidar a separação entre entrada, processamento e saída em um problema simples de média.',
    expectedDifficulty: 'media',
    cognitiveOperation: 'aplicar',
    prerequisites: [
      'Variáveis float',
      'Entrada de dados com scanf',
      'Saída de dados com printf',
      'Expressões aritméticas',
      'Funções com parâmetros',
      'Retorno com return',
      'Procedimento void',
      'Escopo principal'
    ]
  },

  domainTags: {
    skillTags: ['functions', 'procedures', 'float', 'arithmetic-expression', 'input-output'],
    topicTags: ['basic-c', 'modularization', 'arithmetic', 'input-output'],
    difficultyTag: 'medium-basic-functions',
    prerequisiteTags: ['basic-syntax', 'variables', 'arithmetic', 'functions']
  },

  problem: 'Escreva um algoritmo que calcula a média aritmética entre dois números fornecidos pelo usuário. Utilize uma função para o cálculo da média aritmética e um procedimento para mostrar o valor obtido. A leitura dos números deve ser realizada no escopo principal. O procedimento deve ser invocado do escopo principal.',
  
  guidingQuestions: [
    'Por que os números devem ser lidos no main?',
    'Qual deve ser o tipo de retorno da função que calcula a média?',
    'A função deve imprimir ou retornar o valor calculado?',
    'O procedimento deve ser chamado de onde?',
    'Como evitar que o cálculo da média perca a parte decimal?'
  ],

  orientation: {
    input: 'Dois números informados pelo usuário no escopo principal.',
    output: 'A média aritmética dos dois valores, exibida pelo procedimento.',
    cases: 'Se as entradas forem 7.0 e 9.0, a média calculada será 8.00 e o procedimento deverá exibir esse valor.',
    structure: 'O main declara n1, n2 e media, lê os dois números, chama calcularMedia, armazena o retorno em media e chama mostrarMedia a partir do próprio main.',
    expectedLogic: 'A função calcularMedia recebe dois valores float e retorna (n1 + n2) / 2. O procedimento mostrarMedia recebe a média já calculada e exibe o valor com printf. A leitura dos números e a chamada do procedimento ficam no main.'
  },

  examples: [
    {
      input: '7 9',
      output: 'Media: 8.00',
      description: 'A média entre 7 e 9 é 8.'
    },
    {
      input: '5.5 8.5',
      output: 'Media: 7.00',
      description: 'O uso de float preserva a parte decimal.'
    }
  ],

  concepts: [
    'Função com retorno float',
    'Procedimento void',
    'Média aritmética',
    'Parâmetros',
    'Escopo principal',
    'Separação entre cálculo e exibição'
  ],

  tips: [
    {
      id: 1,
      text: 'A leitura dos dois números deve ficar no main. A função deve receber esses valores por parâmetro.',
      pedagogicalGoal: 'Reforçar a responsabilidade do escopo principal.'
    },
    {
      id: 2,
      text: 'Como a média pode ter casas decimais, prefira usar float nos valores e no retorno da função.',
      pedagogicalGoal: 'Evitar perda de precisão.'
    },
    {
      id: 3,
      text: 'A função de cálculo deve retornar o resultado. Ela não precisa usar printf.',
      pedagogicalGoal: 'Diferenciar cálculo e saída.'
    },
    {
      id: 4,
      text: 'O procedimento mostrarMedia deve ser void e deve ser chamado no main após a média ser calculada.',
      pedagogicalGoal: 'Consolidar a integração entre função, procedimento e main.'
    }
  ],

  commonErrors: [
    {
      title: 'Declarar a média como int',
      description: 'A média entre dois números pode ter parte decimal.',
      pedagogicalAdvice: 'Use float para os números, para a média e para o retorno da função.'
    },
    {
      title: 'Imprimir dentro da função de cálculo',
      description: 'A função deve calcular e retornar, não mostrar o resultado.',
      pedagogicalAdvice: 'Deixe o printf dentro do procedimento mostrarMedia.'
    },
    {
      title: 'Não armazenar o retorno da função',
      description: 'Se o retorno não for armazenado ou usado, o resultado calculado se perde.',
      pedagogicalAdvice: 'Use media = calcularMedia(n1, n2).'
    },
    {
      title: 'Chamar o procedimento dentro da função',
      description: 'O enunciado pede que o procedimento seja invocado do escopo principal.',
      pedagogicalAdvice: 'Chame mostrarMedia(media) dentro do main.'
    },
    {
      title: 'Usar fórmula incompleta',
      description: 'Somar os dois valores não basta para calcular a média.',
      pedagogicalAdvice: 'Use (n1 + n2) / 2.'
    }
  ],

  solution: `#include <stdio.h>

float calcularMedia(float n1, float n2) {
    return (n1 + n2) / 2;
}

void mostrarMedia(float media) {
    printf("Media: %.2f\\n", media);
}

int main() {
    float n1, n2, media;

    scanf("%f", &n1);
    scanf("%f", &n2);

    media = calcularMedia(n1, n2);

    mostrarMedia(media);

    return 0;
}`,

  finalSummary: [
    'A leitura dos valores ficou no escopo principal.',
    'A função ficou responsável apenas pelo cálculo da média.',
    'O procedimento ficou responsável apenas pela exibição.',
    'O uso de float preserva resultados com casas decimais.'
  ],

  nextChallengeId: 'funcoes_distancia_entre_pontos',

  expectedCriteria: [
    { id: 'crit_float', description: 'Usa float para os valores e para a média.', importance: 'essencial' },
    { id: 'crit_leitura_main', description: 'Lê os dois números no main.', importance: 'essencial' },
    { id: 'crit_funcao_media', description: 'Define uma função com retorno float para calcular a média.', importance: 'essencial' },
    { id: 'crit_formula', description: 'Calcula a média usando a soma dos dois valores dividida por 2.', importance: 'essencial' },
    { id: 'crit_return', description: 'Retorna a média calculada.', importance: 'essencial' },
    { id: 'crit_procedimento', description: 'Define um procedimento void para mostrar a média.', importance: 'essencial' },
    { id: 'crit_chamada_main', description: 'Chama o procedimento a partir do main.', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err_int_media', description: 'Uso de int para armazenar a média.', likelyCause: 'Desconsiderar que a média pode ter parte decimal.' },
    { id: 'err_sem_return', description: 'Função de cálculo sem retorno.', likelyCause: 'Confusão entre função e procedimento.' },
    { id: 'err_printf_na_funcao', description: 'Printf dentro da função calcularMedia.', likelyCause: 'Mistura entre cálculo e exibição.' },
    { id: 'err_procedimento_fora_main', description: 'Procedimento chamado dentro da função de cálculo.', likelyCause: 'Não observação da exigência do enunciado.' },
    { id: 'err_formula_incompleta', description: 'Soma dos valores sem divisão por 2.', likelyCause: 'Fórmula de média incompleta.' }
  ],

  templateCode: `#include <stdio.h>

float calcularMedia(float n1, float n2) {
    // calcule e retorne a média
}

void mostrarMedia(float media) {
    // mostre a média
}

int main() {
    float n1, n2, media;

    // leia os dois números no escopo principal

    // chame a função e armazene o retorno

    // chame o procedimento no escopo principal

    return 0;
}`,
  
  analyzeLocally: (code: string): AnalysisResult => {
    type ParsedFunction = {
      returnType: 'int' | 'void' | 'float' | 'double';
      name: string;
      params: string;
      body: string;
    };

    const source = code.toLowerCase();
    const codeWithoutComments = source.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, ' ');

    const parseFunctions = (input: string): ParsedFunction[] => {
      const functions: ParsedFunction[] = [];
      const functionPattern = /\b(int|void|float|double)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)\s*\{/g;
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
            returnType: match[1] as ParsedFunction['returnType'],
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

    const hasTwoFloatParams = (params: string): boolean => {
      const paramParts = getParamParts(params);
      const explicitFloatParams = paramParts.filter(param => /\bfloat\b/.test(param)).length;
      const compactFloatParams = /^\s*float\s+[a-zA-Z_][a-zA-Z0-9_]*\s*,\s*[a-zA-Z_][a-zA-Z0-9_]*/.test(params);

      return paramParts.length >= 2 && (explicitFloatParams >= 2 || compactFloatParams);
    };

    const hasKnownCalcName = (name: string): boolean =>
      /^(media|calcularmedia|calculamedia)$/.test(name) || /^(calcular|calcula)[a-zA-Z0-9_]*media$/.test(name);

    const hasKnownProcedureName = (name: string): boolean =>
      /^(mostrarmedia|exibirmedia|imprimirmedia)$/.test(name) || /(mostrar|exibir|imprimir)/.test(name);

    const hasMediaFormula = (body: string, params: string[]): boolean => {
      const hasDivisionByTwo = /\/\s*(2(\.0+)?f?|2\.0f?)\b/.test(body);
      const genericAddition = /[a-zA-Z_][a-zA-Z0-9_]*\s*\+\s*[a-zA-Z_][a-zA-Z0-9_]*/.test(body);

      if (params.length < 2) {
        return genericAddition && hasDivisionByTwo;
      }

      const [first, second] = params;
      const paramAddition =
        new RegExp(`\\b${first}\\b\\s*\\+\\s*\\b${second}\\b`).test(body) ||
        new RegExp(`\\b${second}\\b\\s*\\+\\s*\\b${first}\\b`).test(body);

      return paramAddition && hasDivisionByTwo;
    };

    const hasIncompleteFormula = (body: string): boolean =>
      /[a-zA-Z_][a-zA-Z0-9_]*\s*\+\s*[a-zA-Z_][a-zA-Z0-9_]*/.test(body) && !/\/\s*2/.test(body);

    const functions = parseFunctions(codeWithoutComments);
    const mainFunction = functions.find(fn => fn.name === 'main');
    const floatFunctions = functions.filter(fn => fn.returnType === 'float' && fn.name !== 'main');
    const intFunctions = functions.filter(fn => fn.returnType === 'int' && fn.name !== 'main');
    const voidFunctions = functions.filter(fn => fn.returnType === 'void' && fn.name !== 'main');

    const calcFunction =
      floatFunctions.find(fn => hasKnownCalcName(fn.name) && hasTwoFloatParams(fn.params)) ??
      floatFunctions.find(fn => hasTwoFloatParams(fn.params)) ??
      floatFunctions.find(fn => hasKnownCalcName(fn.name)) ??
      floatFunctions[0];

    const calcVoidCandidate = voidFunctions.find(fn =>
      hasKnownCalcName(fn.name) || hasMediaFormula(fn.body, getParamNames(fn.params)) || hasIncompleteFormula(fn.body)
    );

    const calcIntCandidate = intFunctions.find(fn =>
      hasKnownCalcName(fn.name) || hasMediaFormula(fn.body, getParamNames(fn.params)) || hasIncompleteFormula(fn.body)
    );

    const procedureFunction =
      voidFunctions.find(fn => hasKnownProcedureName(fn.name) && /printf\s*\(/.test(fn.body)) ??
      voidFunctions.find(fn => /printf\s*\(/.test(fn.body) && !hasMediaFormula(fn.body, getParamNames(fn.params))) ??
      voidFunctions.find(fn => hasKnownProcedureName(fn.name)) ??
      voidFunctions.find(fn => fn !== calcVoidCandidate);

    const mainBody = mainFunction?.body ?? '';
    const mainScanfCalls: string[] = mainBody.match(/scanf\s*\([\s\S]*?\)\s*;/g) ?? [];
    const scanfFormatCount = mainScanfCalls.reduce(
      (total: number, call: string) => total + (call.match(/%(?:l)?f|%d/g) ?? []).length,
      0
    );
    const inputVariables = new Set([...mainBody.matchAll(/&\s*([a-zA-Z_][a-zA-Z0-9_]*)/g)].map(match => match[1]));
    const calcParamNames = calcFunction ? getParamNames(calcFunction.params) : [];
    const calcBody = calcFunction?.body ?? '';
    const callsCalcFunction = Boolean(calcFunction && new RegExp(`\\b${calcFunction.name}\\s*\\(`).test(mainBody));
    const callsProcedure = Boolean(procedureFunction && new RegExp(`\\b${procedureFunction.name}\\s*\\(`).test(mainBody));
    const callsProcedureInsideCalc = Boolean(procedureFunction && calcBody && new RegExp(`\\b${procedureFunction.name}\\s*\\(`).test(calcBody));

    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeWithoutComments),
      main: /\bint\s+main\s*\(/.test(codeWithoutComments),
      floatUsage: /\bfloat\b/.test(codeWithoutComments),
      twoMainInputs: mainScanfCalls.length >= 2 || scanfFormatCount >= 2 || inputVariables.size >= 2,
      floatFunction: Boolean(calcFunction),
      functionWithTwoFloatParams: Boolean(calcFunction && hasTwoFloatParams(calcFunction.params)),
      formula: Boolean(calcFunction && hasMediaFormula(calcBody, calcParamNames)),
      returnInCalcFunction: Boolean(calcFunction && /\breturn\b/.test(calcBody)),
      voidProcedure: Boolean(procedureFunction),
      printf: /printf\s*\(/.test(codeWithoutComments),
      callsCalcFunction,
      callsProcedure,
      intMedia: /(?:^|[;{}])\s*int\s+[^;()]*\bmedia\b[^;]*;/.test(codeWithoutComments) || Boolean(calcIntCandidate),
      calcDeclaredVoid: Boolean(calcVoidCandidate),
      printfInsideCalcFunction: Boolean((calcFunction && /printf\s*\(/.test(calcBody)) || (calcVoidCandidate && /printf\s*\(/.test(calcVoidCandidate.body))),
      procedureInsideCalc: callsProcedureInsideCalc || Boolean(calcVoidCandidate && procedureFunction && new RegExp(`\\b${procedureFunction.name}\\s*\\(`).test(calcVoidCandidate.body)),
      procedureCreatedButNotCalled: Boolean(procedureFunction && !callsProcedure),
      incompleteFormula: Boolean((calcFunction && hasIncompleteFormula(calcBody)) || (calcIntCandidate && hasIncompleteFormula(calcIntCandidate.body)) || (calcVoidCandidate && hasIncompleteFormula(calcVoidCandidate.body)))
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

    if (checks.floatUsage) { good.push('Usou float para preservar casas decimais.'); score += 2; }
    else { addReview('Use float para os números, para a média e para o retorno da função.'); }

    if (checks.twoMainInputs) { good.push('A leitura dos dois números aparece no main.'); score += 2; }
    else { addReview('A leitura dos dois números precisa permanecer no main, conforme o enunciado.'); }

    if (checks.floatFunction) { good.push('Criou uma função com retorno float para calcular a média.'); score += 2; }
    else if (checks.calcDeclaredVoid) { addReview('A função que calcula a média deve retornar float.'); }
    else { addReview('Crie uma função com retorno float para calcular a média.'); }

    if (checks.functionWithTwoFloatParams) { good.push('A função de cálculo recebe dois parâmetros float.'); score += 2; }
    else { addReview('A função de cálculo precisa receber dois parâmetros float.'); }

    if (checks.formula) { good.push('A fórmula soma os dois valores e divide por 2.'); score += 3; }
    else if (checks.incompleteFormula) { addReview('A média precisa somar os dois valores e dividir por 2.'); }
    else { addReview('Implemente a média com a expressão (n1 + n2) / 2.'); }

    if (checks.returnInCalcFunction) { good.push('A função retorna o valor calculado.'); score += 2; }
    else { addReview('A função deve retornar o valor calculado, não imprimir diretamente.'); }

    if (checks.voidProcedure) { good.push('Criou um procedimento void para mostrar a média.'); score += 2; }
    else { addReview('Crie um procedimento void para exibir a média com printf.'); }

    if (checks.printf) { good.push('Usou printf para exibir o resultado.'); score++; }
    else { addReview('Use printf no procedimento para mostrar a média.'); }

    if (checks.callsCalcFunction) { good.push('O main chama a função de média.'); score += 2; }
    else { addReview('No main, chame a função de média e armazene o retorno em uma variável.'); }

    if (checks.callsProcedure) { good.push('O procedimento é chamado a partir do main.'); score += 2; }
    else { addReview('O procedimento deve ser chamado no main, depois que a média for calculada.'); }

    if (checks.intMedia) {
      score -= 2;
      addReview('A média não deve ser armazenada como int, pois pode ter parte decimal.');
    }

    if (checks.calcDeclaredVoid) {
      score -= 2;
      addReview('A função que calcula a média deve retornar float.');
    }

    if (checks.printfInsideCalcFunction) {
      score -= 2;
      addReview('A função deve retornar o valor calculado, não imprimir diretamente.');
    }

    if (checks.procedureInsideCalc) {
      score -= 2;
      addReview('O procedimento deve ser chamado no main, depois que a média for calculada.');
    }

    if (checks.procedureCreatedButNotCalled) {
      score -= 2;
      addReview('O procedimento foi criado, mas também precisa ser chamado no main.');
    }

    if (checks.incompleteFormula) {
      score -= 2;
      addReview('A média precisa somar os dois valores e dividir por 2.');
    }

    let category: AnalysisResult['category'] = 'tentativa inicial';
    const solutionIsAdequate =
      checks.stdio &&
      checks.main &&
      checks.floatUsage &&
      checks.twoMainInputs &&
      checks.floatFunction &&
      checks.functionWithTwoFloatParams &&
      checks.formula &&
      checks.returnInCalcFunction &&
      checks.voidProcedure &&
      checks.callsCalcFunction &&
      checks.callsProcedure &&
      !checks.intMedia &&
      !checks.calcDeclaredVoid &&
      !checks.printfInsideCalcFunction &&
      !checks.procedureInsideCalc;

    if (solutionIsAdequate) category = 'solução adequada';
    else if (score >= 16) category = 'quase completa';
    else if (score >= 8) category = 'parcialmente correta';

    let difficulty = 'Dificuldade em separar entrada, cálculo de média e exibição em subprogramas.';
    if (!checks.main) difficulty = 'Estrutura principal do programa ainda incompleta.';
    else if (!checks.floatUsage || checks.intMedia) difficulty = 'Uso de tipos inteiros em um cálculo que pode produzir casas decimais.';
    else if (!checks.twoMainInputs) difficulty = 'Leitura dos valores fora da responsabilidade esperada do main.';
    else if (checks.calcDeclaredVoid || !checks.returnInCalcFunction) difficulty = 'Confusão entre função com retorno e procedimento sem retorno.';
    else if (!checks.formula) difficulty = 'Fórmula de média aritmética incompleta.';
    else if (!checks.voidProcedure || !checks.callsProcedure || checks.procedureInsideCalc) difficulty = 'Integração incompleta do procedimento de saída com o main.';

    let nextStep = 'Comece estruturando o main para declarar n1, n2 e media como float.';
    if (checks.main && !checks.twoMainInputs) nextStep = 'Mantenha os dois scanf no main e envie esses valores para a função por parâmetro.';
    if (checks.intMedia) nextStep = 'Troque a variável media e a função de cálculo para float.';
    if (checks.calcDeclaredVoid) nextStep = 'A função que calcula a média deve retornar float.';
    if (checks.floatFunction && !checks.functionWithTwoFloatParams) nextStep = 'Ajuste a função para receber dois parâmetros float.';
    if (checks.functionWithTwoFloatParams && !checks.formula) nextStep = 'A média precisa somar os dois valores e dividir por 2.';
    if (checks.formula && !checks.returnInCalcFunction) nextStep = 'Retorne o resultado calculado com return em vez de imprimir dentro da função.';
    if (checks.returnInCalcFunction && !checks.voidProcedure) nextStep = 'Crie um procedimento void que receba a média e use printf para mostrá-la.';
    if (checks.voidProcedure && !checks.callsProcedure) nextStep = 'Chame o procedimento no main, depois de armazenar o retorno da função.';
    if (category === 'solução adequada') nextStep = 'Ótimo trabalho! A solução separa leitura, cálculo e exibição em responsabilidades claras.';

    const errorTypes: ErrorType[] = [];
    if (!checks.main || !checks.stdio) errorTypes.push('sintaxe_aparente');
    if (!checks.twoMainInputs || checks.procedureInsideCalc) errorTypes.push('interpretacao_enunciado');
    if (!checks.formula || !checks.returnInCalcFunction || checks.calcDeclaredVoid || checks.intMedia) errorTypes.push('logica');
    if (!checks.printf || checks.printfInsideCalcFunction || !checks.callsProcedure) errorTypes.push('saida_incorreta');

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      errorTypes.length > 0 ? errorTypes : ['sem_erro_relevante'],
      `Análise heurística de funções e procedimentos para média: ${Math.max(score, 0)}/22 critérios observados.`
    );
  }
};
