import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafio6: Challenge = {
  id: 'desafio6_triangulo_classificacao',
  title: 'Desafio Guiado: Verificação e classificação de triângulos em C',
  subtitle: 'Verifique se três valores podem formar um triângulo e, se puderem, classifique-o.',
  challengeVersion: '1.1.0',
  
  metadata: {
    content: 'estruturas condicionais, comparação entre valores e classificação por casos',
    language: 'C',
    level: 'Intermediário',
    time: '20 a 30 minutos',
    requirements: 'variáveis, scanf, printf, if, else if, else, operadores relacionais e lógicos',
    skill: 'verificar condições de validade e, em seguida, classificar corretamente diferentes casos',
    version: '1.1.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Implementar algoritmos de dois estágios: validação de entrada seguida de classificação categórica.',
    pedagogicalGoal: 'Praticar a composição de condições complexas (desigualdade triangular) e o uso de lógica de exclusão para classificação.',
    expectedDifficulty: 'alta',
    cognitiveOperation: 'analisar',
    prerequisites: ['Operadores Lógicos (&&, ||)', 'Condicionais Aninhadas', 'Geometria Básica']
  },

  domainTags: {
    skillTags: ['validation-logic', 'classification-logic', 'complex-conditionals'],
    topicTags: ['geometry-algorithms', 'basic-c'],
    difficultyTag: 'high-complexity-logic',
    prerequisiteTags: ['desafio5_ordem_crescente_tres_numeros']
  },

  problem: 'Dados três valores, A, B, C, verificar se eles podem ser valores dos lados de um triângulo e, se forem, se é um triângulo escaleno, equilátero ou isósceles.',
  
  guidingQuestions: [
    'O que o programa deve receber como entrada?',
    'O que precisa ser verificado antes de classificar o triângulo?',
    'Qual é a condição que permite decidir se três lados formam um triângulo?',
    'Como identificar um triângulo equilátero?',
    'Como distinguir isósceles e escaleno depois de confirmar que os lados formam um triângulo?'
  ],

  orientation: {
    input: 'O programa deve ler três valores reais (float ou double) que representam os lados.',
    output: 'Mensagem informando se é um triângulo e qual o seu tipo (equilátero, isósceles ou escaleno).',
    cases: 'Validade (A+B>C && A+C>B && B+C>A) e Classificação (3 iguais, 2 iguais ou todos diferentes).',
    structure: 'Estrutura condicional aninhada: primeiro valida a existência, depois classifica o tipo.',
    expectedLogic: 'O aluno deve usar um if externo para a desigualdade triangular. Dentro deste if, usa if/else if/else para as 3 categorias de triângulo. Um else final para o if externo trata o caso "Não forma triângulo".'
  },

  examples: [
    { input: '3 3 3', output: 'Triangulo Equilatero' },
    { input: '3 4 5', output: 'Triangulo Escaleno' },
    { input: '1 1 10', output: 'Nao forma um triangulo' }
  ],

  concepts: [
    'Validação de Pré-condição',
    'Lógica de Classificação Hierárquica',
    'Operadores Lógicos Compostos'
  ],

  tips: [
    { 
      id: 1, 
      text: "Resolva o problema em duas partes: validade (pode ser triângulo?) e classificação (que tipo é?).",
      pedagogicalGoal: "Dividir o problema em estágios lógicos."
    },
    { 
      id: 2, 
      text: "Primeiro verifique a condição de existência do triângulo: a soma de dois lados deve ser sempre maior que o terceiro.",
      pedagogicalGoal: "Aplicar a desigualdade triangular."
    },
    { 
      id: 3, 
      text: "Só depois da validação analise se os lados são todos iguais (equilátero), dois iguais (isósceles) ou todos diferentes (escaleno).",
      pedagogicalGoal: "Estruturar a classificação interna."
    },
    { 
      id: 4, 
      text: "Revise se sua lógica não classifica lados inválidos (como 1, 1, 10) como se fossem triângulo.",
      pedagogicalGoal: "Garantir a integridade da validação inicial."
    }
  ],

  commonErrors: [
    { 
      title: "Falta de validação", 
      description: "Classificar o triângulo sem antes verificar se os lados formam um triângulo.",
      pedagogicalAdvice: "Nem todo conjunto de 3 números forma um triângulo. A validação é o primeiro passo essencial."
    },
    { 
      title: "Validação incompleta", 
      description: "Verificar apenas uma das desigualdades (ex: A+B>C) e esquecer as outras duas.",
      pedagogicalAdvice: "A condição deve ser verdadeira para todas as combinações de lados."
    },
    { 
      title: "Confusão de tipos", 
      description: "Confundir isósceles com equilátero ou vice-versa.",
      pedagogicalAdvice: "Equilátero: 3 iguais. Isósceles: pelo menos 2 iguais. Escaleno: 0 iguais."
    },
    { 
      title: "Saída indevida", 
      description: "Exibir uma classificação mesmo quando os valores não formam triângulo.",
      pedagogicalAdvice: "Use a estrutura else para garantir que a classificação só ocorra em casos válidos."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    float a, b, c;

    printf("Digite os tres lados do triangulo: ");
    scanf("%f %f %f", &a, &b, &c);

    // 1º Estágio: Verifica a condição de existência (Desigualdade Triangular)
    if (a < b + c && b < a + c && c < a + b) {
        
        // 2º Estágio: Classificação
        if (a == b && b == c) {
            printf("Triangulo Equilatero\\n");
        } else if (a == b || b == c || a == c) {
            printf("Triangulo Isosceles\\n");
        } else {
            // Se não é equilátero nem isósceles, é escaleno
            printf("Triangulo Escaleno\\n");
        }

    } else {
        // Caso a validação inicial falhe
        printf("Nao forma um triangulo\\n");
    }

    return 0;
}`,

  finalSummary: [
    'Estágios de Decisão: Validar antes de processar é uma boa prática de programação.',
    'Lógica de Exclusão: Se não é equilátero nem isósceles, por eliminação é escaleno.',
    'Robustez: O uso de && garante que todas as condições geométricas sejam atendidas.'
  ],

  nextChallengeId: undefined, // Fim da trilha atual

  expectedCriteria: [
    { id: 'crit1', description: 'Verificação da desigualdade triangular (3 condições)', importance: 'essencial' },
    { id: 'crit2', description: 'Uso de if aninhado para classificação', importance: 'essencial' },
    { id: 'crit3', description: 'Identificação correta de equilátero (a==b && b==c)', importance: 'essencial' },
    { id: 'crit4', description: 'Tratamento do caso "não forma triângulo"', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Usar || em vez de && na validação triangular', likelyCause: 'Confusão lógica sobre a necessidade de todas as condições serem verdadeiras' },
    { id: 'err2', description: 'Classificar como isósceles antes de testar equilátero (se usar apenas if)', likelyCause: 'Dificuldade em entender que equilátero é um caso especial de isósceles' },
    { id: 'err3', description: 'Uso de = em vez de == nas comparações', likelyCause: 'Erro sintático recorrente em iniciantes' }
  ],

  templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
  analyzeLocally: (code: string): AnalysisResult => {
    const codeLower = code.toLowerCase();
    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
      main: /int\s+main\s*\(/.test(codeLower),
      variables: /(float|double|int)\s+[a-zA-Z_].*,.*,.*[a-zA-Z_]/.test(codeLower) || (codeLower.match(/(float|double|int)\s+[a-zA-Z_]/g) || []).length >= 3,
      scanf: /scanf\s*\(/.test(codeLower),
      if: /\bif\s*\(/.test(codeLower),
      existence: /<.*[+].*&&.*<.*[+].*&&.*<.*[+]/.test(codeLower) || (codeLower.match(/[+]/g) || []).length >= 3,
      equilateral: /==.*&&.*==/.test(codeLower) || (codeLower.match(/==/g) || []).length >= 2,
      isosceles: /\|\|/.test(codeLower) || (codeLower.match(/==/g) || []).length >= 1,
      printf: /printf\s*\(/.test(codeLower),
      else: /\belse\b/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Inclusão de stdio.h correta."); score++; }
    if (checks.main) { good.push("Função main presente."); score++; }
    if (checks.variables) { good.push("Você declarou três variáveis para os lados."); score++; }
    if (checks.scanf) { good.push("Uso de scanf para entrada de dados."); score++; }
    if (checks.if) { good.push("Você já percebeu que o problema envolve mais de uma etapa de decisão."); score++; }
    if (checks.existence) { good.push("Você incluiu a verificação da condição de existência do triângulo."); score++; }

    if (!checks.existence) review.push("Boa tentativa. Antes de decidir o tipo de triângulo, é preciso confirmar que os lados realmente formam um triângulo.");
    if (!checks.equilateral && !checks.isosceles) review.push("Seu código parece tentar classificar o triângulo, mas ainda não diferencia corretamente os tipos.");
    if (!checks.else) review.push("Parece faltar o tratamento do caso em que os valores não formam triângulo.");

    if (checks.printf) score++;
    if (checks.equilateral) score++;
    if (checks.isosceles) score++;
    if (checks.else) score++;

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 10) category = 'solução adequada';
    else if (score >= 7) category = 'quase completa';
    else if (score >= 4) category = 'parcialmente correta';

    let difficulty = "Dificuldade em organizar o problema em etapas";
    if (!checks.existence) difficulty = "Dificuldade em compreender a condição de existência do triângulo";
    else if (!checks.equilateral && !checks.isosceles) difficulty = "Dificuldade em diferenciar as classificações do triângulo";
    else if (!checks.else) difficulty = "Dificuldade em tratar corretamente casos inválidos";
    else difficulty = "Dificuldade em combinar operadores relacionais e lógicos";

    let nextStep = "Comece verificando se a soma de dois lados é sempre maior que o terceiro lado.";
    if (checks.existence && !checks.equilateral) nextStep = "Agora que você validou o triângulo, use if/else if para verificar se os lados são iguais.";
    if (category === 'solução adequada') nextStep = "Parabéns! Você validou e classificou o triângulo corretamente.";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.existence ? ['logica'] : ['sintaxe_aparente'],
      `Análise heurística local: ${score}/12 pontos.`
    );
  }
};
