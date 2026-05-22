import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafio3: Challenge = {
  id: 'desafio3_emprestimo_salario',
  title: 'Desafio Guiado: Decisão com porcentagem em C',
  subtitle: 'Verifique se a prestação de um empréstimo pode ser concedida com base no salário.',
  challengeVersion: '1.1.0',
  
  metadata: {
    content: 'estrutura condicional e comparação com porcentagem',
    language: 'C',
    level: 'Iniciante',
    time: '15 a 20 minutos',
    requirements: 'variáveis, leitura com scanf, saída com printf, operadores aritméticos, if e else',
    skill: 'comparar valores e tomar decisão com base em uma regra percentual',
    version: '1.1.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Traduzir regras de negócio expressas em porcentagem para expressões relacionais em C.',
    pedagogicalGoal: 'Praticar o uso de operadores aritméticos combinados com estruturas de decisão simples (if/else).',
    expectedDifficulty: 'baixa',
    cognitiveOperation: 'aplicar',
    prerequisites: ['Operadores Aritméticos', 'Estrutura if/else', 'Tipos de Ponto Flutuante (float/double)']
  },

  domainTags: {
    skillTags: ['percentage-calculation', 'relational-operators', 'float-handling'],
    topicTags: ['business-logic', 'basic-c'],
    difficultyTag: 'low-complexity-math',
    prerequisiteTags: ['desafio1_condicionais_basico']
  },

  problem: 'Leia o salário de um trabalhador e o valor da prestação de um empréstimo. Se a prestação for maior que 20% do salário, imprima: Empréstimo não concedido. Caso contrário, imprima: Empréstimo concedido.',
  
  guidingQuestions: [
    'Quais são os dois valores de entrada do problema?',
    'O que significa dizer que a prestação é maior que 20% do salário?',
    'Como calcular 20% do salário?',
    'O que acontece se a prestação for exatamente igual a 20% do salário?',
    'Qual mensagem deve ser exibida em cada caso?'
  ],

  orientation: {
    input: 'O programa deve ler dois valores numéricos: salário e prestação.',
    output: 'Exibir "Empréstimo não concedido" ou "Empréstimo concedido".',
    cases: 'Se prestação > (salário * 0.2), não concedido. Caso contrário, concedido.',
    structure: 'Uso de variáveis float/double para precisão e estrutura if/else.',
    expectedLogic: 'O aluno deve ler dois valores reais, calcular o limite (20% do salário) e comparar a prestação com esse limite usando o operador >.'
  },

  examples: [
    { input: 'Salário: 2000, Prestação: 300', output: 'Emprestimo concedido' },
    { input: 'Salário: 2000, Prestação: 500', output: 'Emprestimo nao concedido' },
    { input: 'Salário: 1000, Prestação: 200', output: 'Emprestimo concedido' }
  ],

  concepts: [
    'Cálculo Percentual em Código',
    'Operadores Relacionais (> e <=)',
    'Precisão de Ponto Flutuante'
  ],

  tips: [
    { 
      id: 1, 
      text: "Identifique primeiro quais são os dados de entrada e qual é a regra de decisão.",
      pedagogicalGoal: "Diferenciar variáveis de entrada de variáveis de controle."
    },
    { 
      id: 2, 
      text: "Lembre que 20% do salário pode ser representado por salario * 0.20 ou (salario * 20) / 100.",
      pedagogicalGoal: "Converter porcentagem em expressão aritmética."
    },
    { 
      id: 3, 
      text: "A condição principal compara o valor da prestação com esse limite percentual.",
      pedagogicalGoal: "Estruturar a comparação lógica."
    },
    { 
      id: 4, 
      text: "Observe com atenção que o enunciado fala em 'maior que 20%' e não 'maior ou igual'.",
      pedagogicalGoal: "Atentar para a precisão dos operadores relacionais."
    }
  ],

  commonErrors: [
    { 
      title: "Comparação direta", 
      description: "Comparar a prestação diretamente com o salário inteiro, sem calcular os 20%.",
      pedagogicalAdvice: "A regra de negócio exige uma transformação do salário antes da comparação."
    },
    { 
      title: "Erro no percentual", 
      description: "Usar 20 em vez de 0.20 ou 20/100.",
      pedagogicalAdvice: "Em C, 20% é uma fração da unidade (0.2)."
    },
    { 
      title: "Lógica invertida", 
      description: "Inverter a lógica da condição (conceder quando deveria negar).",
      pedagogicalAdvice: "Leia o enunciado com calma: se for MAIOR, NÃO concede."
    },
    { 
      title: "Tratamento de igualdade", 
      description: "Tratar igualdade como não concedido, mesmo sem o enunciado pedir isso.",
      pedagogicalAdvice: "O limite é exclusivo: apenas valores estritamente maiores que 20% bloqueiam o empréstimo."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    float salario, prestacao;

    printf("Digite o salario: ");
    scanf("%f", &salario);
    printf("Digite o valor da prestacao: ");
    scanf("%f", &prestacao);

    // Calcula o limite de 20% do salário e compara
    if (prestacao > salario * 0.2) {
        printf("Emprestimo nao concedido\\n");
    } else {
        printf("Emprestimo concedido\\n");
    }

    return 0;
}`,

  finalSummary: [
    'Tradução de Regras: Algumas condições exigem cálculos matemáticos prévios.',
    'Tipos de Dados: Para valores monetários ou percentuais, use float ou double.',
    'Precisão Relacional: A escolha entre > e >= altera o resultado em casos de limite.'
  ],

  nextChallengeId: 'desafio4_divisivel_3_ou_5',

  expectedCriteria: [
    { id: 'crit1', description: 'Uso de float ou double para valores', importance: 'essencial' },
    { id: 'crit2', description: 'Cálculo correto de 20% (0.2 ou / 100)', importance: 'essencial' },
    { id: 'crit3', description: 'Uso do operador > para a condição de bloqueio', importance: 'essencial' },
    { id: 'crit4', description: 'Mensagens de saída idênticas às solicitadas', importance: 'desejável' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Uso de int para salário (perda de precisão)', likelyCause: 'Hábito de usar apenas int para números' },
    { id: 'err2', description: 'Esquecer o & no scanf para float', likelyCause: 'Desatenção à sintaxe de ponteiros do scanf' },
    { id: 'err3', description: 'Cálculo de porcentagem com divisão inteira (20/100 resultando em 0)', likelyCause: 'Falta de conhecimento sobre tipos em expressões aritméticas' }
  ],

  templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
  analyzeLocally: (code: string): AnalysisResult => {
    const codeLower = code.toLowerCase();
    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
      main: /int\s+main\s*\(/.test(codeLower),
      variables: /(float|double|int)\s+[a-zA-Z_].*,.*[a-zA-Z_]/.test(codeLower) || (codeLower.match(/(float|double|int)\s+[a-zA-Z_]/g) || []).length >= 2,
      scanf2: (codeLower.match(/scanf\s*\(/g) || []).length >= 1, // Simplificado, idealmente checa se lê 2 valores
      if: /\bif\s*\(/.test(codeLower),
      percentCalc: /0\.2|20\s*\/\s*100|0\.20/.test(codeLower),
      comparison: />/.test(codeLower),
      printf: /printf\s*\(/.test(codeLower),
      msgConcedido: /concedido/.test(codeLower),
      msgNaoConcedido: /nao\s+concedido|não\s+concedido/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Inclusão de stdio.h correta."); score++; }
    if (checks.main) { good.push("Função main presente."); score++; }
    if (checks.variables) { good.push("Você declarou variáveis para salário e prestação."); score++; }
    if (checks.scanf2) { good.push("Uso de scanf para entrada de dados."); score++; }
    if (checks.if) { good.push("Você já identificou a necessidade de comparar dois valores."); score++; }
    if (checks.percentCalc) { good.push("Cálculo de 20% identificado no código."); score++; }

    if (!checks.percentCalc) review.push("Seu código parece ler os dados corretamente, mas ainda não expressa a regra dos 20%.");
    if (!checks.comparison) review.push("Falta a comparação entre a prestação e o limite calculado.");
    if (!checks.msgConcedido || !checks.msgNaoConcedido) review.push("Parece faltar uma das mensagens esperadas para os dois casos possíveis.");

    if (checks.printf) score++;
    if (checks.msgConcedido) score++;
    if (checks.msgNaoConcedido) score++;
    if (checks.comparison) score++;

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 10) category = 'solução adequada';
    else if (score >= 7) category = 'quase completa';
    else if (score >= 4) category = 'parcialmente correta';

    let difficulty = "Dificuldade em interpretar a regra percentual";
    if (!checks.percentCalc) difficulty = "Dificuldade em transformar porcentagem em expressão aritmética";
    else if (!checks.if) difficulty = "Dificuldade em montar a condição corretamente";
    else if (!checks.msgConcedido) difficulty = "Dificuldade em produzir saídas coerentes";
    else difficulty = "Dificuldade em distinguir maior de maior ou igual";

    let nextStep = "Comece declarando as variáveis e lendo o salário e a prestação.";
    if (checks.variables && !checks.percentCalc) nextStep = "Boa tentativa. O ponto central deste problema é calcular ou representar corretamente 20% do salário.";
    if (checks.percentCalc && !checks.comparison) nextStep = "Seu programa está próximo do esperado, mas ainda precisa tornar explícita a comparação entre prestação e limite.";
    if (category === 'solução adequada') nextStep = "Excelente! Você aplicou a lógica percentual corretamente.";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.comparison ? ['logica'] : ['sintaxe_aparente'],
      `Análise heurística local: ${score}/10 pontos.`
    );
  }
};
