/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Challenge, HeuristicResult } from './types';

export const CHALLENGES: Challenge[] = [
  {
    id: 'desafio1_condicionais_basico',
    title: 'Desafio Guiado: Estrutura Condicional em C',
    subtitle: 'Classifique um número como positivo, negativo ou zero.',
    metadata: {
      content: 'Estrutura Condicional',
      language: 'C (ANSI/C99)',
      level: 'Iniciante',
      time: '10 a 15 minutos',
      requirements: 'Variáveis, leitura com scanf, saída com printf.',
      skill: 'Analisar um valor de entrada e decidir entre múltiplos casos.'
    },
    problem: 'Escreva um programa em C que leia um número inteiro e informe se ele é positivo, negativo ou igual a zero.',
    guidingQuestions: [
      'Qual é a entrada do programa?',
      'Quais são os três casos possíveis?',
      'Como comparar um número com zero?'
    ],
    orientation: {
      input: 'Um único número inteiro digitado pelo usuário.',
      output: 'Uma mensagem de texto indicando a categoria do número.',
      cases: 'Três casos: Positivo (>0), Negativo (<0) e Zero (==0).',
      structure: 'Estrutura condicional encadeada (if / else if / else).'
    },
    tips: [
      { id: 1, text: "Pense na entrada: você precisará de uma variável para armazenar o número inteiro. Qual tipo de dado em C é usado para inteiros?" },
      { id: 2, text: "Lembre-se de usar a função 'scanf' para ler o valor digitado pelo usuário. Não esqueça do '&' antes do nome da variável!" },
      { id: 3, text: "Existem três situações possíveis: o número ser maior que zero (> 0), menor que zero (< 0) ou exatamente igual a zero (== 0)." },
      { id: 4, text: "Organize sua lógica usando 'if' para a primeira condição, 'else if' para a segunda e 'else' para o caso que sobrar." }
    ],
    commonErrors: [
      { title: "Esquecer o scanf", description: "O programa não saberá qual número testar se você não ler a entrada do usuário." },
      { title: "Usar apenas if", description: "Se você usar vários 'if' separados, o programa pode testar condições desnecessárias ou falhar em lógica complexa. 'else if' é mais eficiente aqui." },
      { title: "Esquecer o caso zero", description: "Muitos iniciantes testam apenas positivo e negativo, esquecendo que o zero é um caso neutro importante." },
      { title: "Erro de comparação", description: "Lembre-se que para testar igualdade usamos '==', e não '=' (que é atribuição)." }
    ],
    solution: `#include <stdio.h>

int main() {
    int numero; // Declara uma variável inteira

    printf("Digite um numero: ");
    scanf("%d", &numero); // Lê o valor inteiro do teclado

    // Estrutura condicional para testar os 3 casos
    if (numero > 0) {
        printf("O numero e positivo.\\n");
    } 
    else if (numero < 0) {
        printf("O numero e negativo.\\n");
    } 
    else {
        // Se não é > 0 nem < 0, só pode ser zero
        printf("O numero e igual a zero.\\n");
    }

    return 0;
}`,
    finalSummary: [
      'Mapeamento de Casos: Antes de programar, identifique todos os cenários possíveis.',
      'Decisão Encadeada: Use else if quando os casos forem mutuamente exclusivos.',
      'Entrada e Saída: A precisão no scanf e clareza no printf são fundamentais.'
    ],
    nextChallengeSuggestion: 'Adapte o programa para verificar se um número é positivo par, positivo ímpar, negativo ou zero.',
    templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
    analyze: (code: string): HeuristicResult => {
      const codeLower = code.toLowerCase();
      const checks = {
        stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
        main: /int\s+main\s*\(/.test(codeLower),
        variable: /(int|float|double)\s+[a-zA-Z_][a-zA-Z0-9_]*/.test(codeLower),
        scanf: /scanf\s*\(/.test(codeLower),
        if: /\bif\s*\(/.test(codeLower),
        elseIf: /\belse\s+if\b/.test(codeLower) || (codeLower.match(/\bif\b/g) || []).length >= 2,
        else: /\belse\b/.test(codeLower),
        positiveCheck: />\s*0/.test(codeLower),
        negativeCheck: /<\s*0/.test(codeLower),
        zeroCheck: /==\s*0/.test(codeLower) || /\belse\b/.test(codeLower),
        printf: /printf\s*\(/.test(codeLower)
      };

      const good: string[] = [];
      const review: string[] = [];
      let score = 0;

      if (checks.stdio) { good.push("Você incluiu a biblioteca padrão de entrada e saída."); score++; }
      else { review.push("Falta incluir a biblioteca <stdio.h>."); }

      if (checks.main) { good.push("A função principal 'int main()' foi declarada corretamente."); score++; }
      else { review.push("Todo programa em C precisa de uma função 'int main()'."); }

      if (checks.variable) { good.push("Você declarou uma variável para armazenar o número."); score++; }
      else { review.push("Você precisa declarar uma variável (ex: int n;)."); }

      if (checks.scanf) { good.push("A leitura de dados com 'scanf' está presente."); score++; }
      else { review.push("Esqueceu de ler o valor do usuário com 'scanf'."); }

      if (checks.if) { good.push("Você iniciou a estrutura de decisão com 'if'."); score++; }
      else { review.push("O problema exige uma estrutura de decisão 'if'."); }

      if (checks.elseIf || checks.else) { good.push("Você está tratando múltiplos casos com else/else if."); score++; }
      else { review.push("Tente usar 'else if' e 'else' para tratar os três casos."); }

      if (checks.printf) { good.push("O programa utiliza 'printf' para exibir os resultados."); score++; }
      else { review.push("Use 'printf' para informar ao usuário o resultado."); }

      if (checks.positiveCheck) score++;
      if (checks.negativeCheck) score++;
      if (checks.zeroCheck) score++;

      let category: HeuristicResult['category'] = 'tentativa inicial';
      if (score >= 10) category = 'solução adequada';
      else if (score >= 7) category = 'quase completa';
      else if (score >= 4) category = 'parcialmente correta';

      let difficulty = "Dificuldade de compreensão inicial";
      if (!checks.scanf) difficulty = "Dificuldade na entrada de dados (scanf)";
      else if (!checks.if) difficulty = "Dificuldade em estruturar a condição (if)";
      else if (!checks.elseIf || !checks.else) difficulty = "Dificuldade em tratar todos os casos";
      else difficulty = "Dificuldade sintática ou lógica incompleta";

      let nextStep = "Comece declarando a variável e lendo o valor com scanf.";
      if (category === 'parcialmente correta') nextStep = "Agora foque em criar as condições if (n > 0) e else if (n < 0).";
      if (category === 'quase completa') nextStep = "Revise se todos os três casos (incluindo o zero) estão sendo tratados.";
      if (category === 'solução adequada') nextStep = "Parabéns! Sua solução parece completa.";

      return { category, feedback: { good, review, nextStep }, difficulty };
    }
  },
  {
    id: 'desafio2_condicionais_paridade',
    title: 'Desafio Guiado: Condicionais com múltiplos casos em C',
    subtitle: 'Classifique um número como positivo par, positivo ímpar, negativo ou zero.',
    metadata: {
      content: 'estruturas condicionais e operador módulo',
      language: 'C',
      level: 'iniciante',
      time: '15 a 20 minutos',
      requirements: 'variáveis, scanf, printf, if, else if, else',
      skill: 'combinar decisões encadeadas para classificar corretamente diferentes casos de entrada'
    },
    problem: 'Adapte o programa para verificar se um número é positivo par, positivo ímpar, negativo ou zero.',
    guidingQuestions: [
      'Qual é a entrada do programa?',
      'Quais são as quatro classificações possíveis?',
      'Como identificar se o número é positivo?',
      'Como verificar se um número positivo é par ou ímpar?',
      'Por que zero precisa ser tratado separadamente?'
    ],
    orientation: {
      input: 'Um único número inteiro.',
      output: 'Quatro saídas possíveis: positivo par, positivo ímpar, negativo e zero.',
      cases: 'O teste de positividade deve ocorrer antes da verificação de paridade.',
      structure: 'Estrutura condicional encadeada com operador %.'
    },
    tips: [
      { id: 1, text: "Pense primeiro em quantas classificações diferentes o problema pede." },
      { id: 2, text: "Antes de verificar par ou ímpar, descubra se o número é positivo, negativo ou zero." },
      { id: 3, text: "Para verificar se um número é par, observe se o resto da divisão por 2 é igual a 0." },
      { id: 4, text: "Neste desafio, apenas números positivos devem ser classificados como par ou ímpar." }
    ],
    commonErrors: [
      { title: "Verificar paridade antes", description: "Verificar paridade antes de separar os casos principais." },
      { title: "Esquecer o zero", description: "Esquecer de tratar zero separadamente." },
      { title: "Negativos como par/ímpar", description: "Classificar números negativos como par ou ímpar, mesmo sem necessidade no enunciado." },
      { title: "Operador % incorreto", description: "Usar o operador % de modo incorreto." },
      { title: "Mensagens incoerentes", description: "Exibir mensagens incoerentes com as condições." }
    ],
    solution: `#include <stdio.h>

int main() {
    int n;

    printf("Digite um numero: ");
    scanf("%d", &n);

    if (n > 0) {
        if (n % 2 == 0) {
            printf("O numero e positivo par.\\n");
        } else {
            printf("O numero e positivo impar.\\n");
        }
    } else if (n < 0) {
        printf("O numero e negativo.\\n");
    } else {
        printf("O numero e igual a zero.\\n");
    }

    return 0;
}`,
    finalSummary: [
      'Problemas com múltiplas classificações exigem decomposição em casos.',
      'Nem toda decisão deve ser feita ao mesmo tempo.',
      'Primeiro separe os grandes grupos do problema.',
      'O operador % é útil para verificar paridade.'
    ],
    nextChallengeSuggestion: 'Modifique o programa para classificar um número como positivo múltiplo de 2, positivo múltiplo de 3, negativo ou zero.',
    templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
    analyze: (code: string): HeuristicResult => {
      const codeLower = code.toLowerCase();
      const checks = {
        stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
        main: /int\s+main\s*\(/.test(codeLower),
        variable: /(int|float|double)\s+[a-zA-Z_][a-zA-Z0-9_]*/.test(codeLower),
        scanf: /scanf\s*\(/.test(codeLower),
        if: /\bif\s*\(/.test(codeLower),
        elseIf: /\belse\s+if\b/.test(codeLower),
        else: /\belse\b/.test(codeLower),
        mod: /%\s*2/.test(codeLower),
        positiveCheck: />\s*0/.test(codeLower),
        negativeCheck: /<\s*0/.test(codeLower),
        zeroCheck: /==\s*0/.test(codeLower) || /\belse\b/.test(codeLower),
        printf: /printf\s*\(/.test(codeLower)
      };

      const good: string[] = [];
      const review: string[] = [];
      let score = 0;

      if (checks.stdio) { good.push("Você incluiu a biblioteca padrão."); score++; }
      if (checks.main) { good.push("Função main declarada."); score++; }
      if (checks.variable) { good.push("Variável declarada."); score++; }
      if (checks.scanf) { good.push("Leitura com scanf presente."); score++; }
      if (checks.if) { good.push("Você já identificou a necessidade de usar decisão condicional."); score++; }
      if (checks.mod) { good.push("Boa tentativa. O uso do operador de resto é importante neste problema."); score++; }
      
      if (!checks.mod) review.push("Ainda não diferencia positivo par de positivo ímpar.");
      if (!checks.zeroCheck) review.push("Parece faltar o tratamento explícito do caso zero.");
      if (!checks.elseIf && !checks.else) review.push("Revise se seu programa contempla exatamente as quatro classificações pedidas.");

      if (checks.positiveCheck) score++;
      if (checks.negativeCheck) score++;
      if (checks.zeroCheck) score++;
      if (checks.printf) score++;

      let category: HeuristicResult['category'] = 'tentativa inicial';
      if (score >= 10) category = 'solução adequada';
      else if (score >= 7) category = 'quase completa';
      else if (score >= 4) category = 'parcialmente correta';

      let difficulty = "Dificuldade em compreender todos os casos do problema";
      if (!checks.mod) difficulty = "Dificuldade em usar o operador %";
      else if (!checks.if) difficulty = "Dificuldade em encadear condições";
      else if (!checks.zeroCheck) difficulty = "Dificuldade em tratar zero separadamente";
      else difficulty = "Dificuldade em produzir saídas coerentes";

      let nextStep = "Comece separando os casos principais: positivo, negativo e zero.";
      if (checks.positiveCheck && !checks.mod) nextStep = "Agora, dentro do caso positivo, use o operador % para verificar se é par ou ímpar.";
      if (category === 'solução adequada') nextStep = "Parabéns! Sua solução está correta.";

      return { category, feedback: { good, review, nextStep }, difficulty };
    }
  },
  {
    id: 'desafio3_emprestimo_salario',
    title: 'Desafio Guiado: Decisão com porcentagem em C',
    subtitle: 'Verifique se a prestação de um empréstimo pode ser concedida com base no salário.',
    metadata: {
      content: 'estrutura condicional e comparação com porcentagem',
      language: 'C',
      level: 'iniciante',
      time: '15 a 20 minutos',
      requirements: 'variáveis, leitura com scanf, saída com printf, operadores aritméticos, if e else',
      skill: 'comparar valores e tomar decisão com base em uma regra percentual'
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
      structure: 'Uso de variáveis float/double para precisão e estrutura if/else.'
    },
    tips: [
      { id: 1, text: "Identifique primeiro quais são os dados de entrada e qual é a regra de decisão." },
      { id: 2, text: "Lembre que 20% do salário pode ser representado por salario * 0.20." },
      { id: 3, text: "A condição principal compara o valor da prestação com esse limite percentual." },
      { id: 4, text: "Observe com atenção que o enunciado fala em 'maior que 20%' e não 'maior ou igual'." }
    ],
    commonErrors: [
      { title: "Comparação direta", description: "Comparar a prestação diretamente com o salário inteiro, sem calcular os 20%." },
      { title: "Erro no percentual", description: "Usar 20 em vez de 0.20 ou 20/100." },
      { title: "Lógica invertida", description: "Inverter a lógica da condição (conceder quando deveria negar)." },
      { title: "Tratamento de igualdade", description: "Tratar igualdade como não concedido, mesmo sem o enunciado pedir isso." },
      { title: "Falta de entrada", description: "Ler apenas um dos valores de entrada." },
      { title: "Mensagem incorreta", description: "Exibir mensagens diferentes das pedidas pelo problema." }
    ],
    solution: `#include <stdio.h>

int main() {
    float salario, prestacao;

    printf("Digite o salario: ");
    scanf("%f", &salario);
    printf("Digite o valor da prestacao: ");
    scanf("%f", &prestacao);

    // Calcula o limite de 20% do salário
    if (prestacao > salario * 0.2) {
        printf("Emprestimo nao concedido\\n");
    } else {
        printf("Emprestimo concedido\\n");
    }

    return 0;
}`,
    finalSummary: [
      'Alguns problemas exigem transformar uma regra verbal em expressão matemática.',
      'Porcentagem pode ser usada dentro de condições.',
      'A clareza na comparação é essencial para a decisão correta.',
      'Ler corretamente o enunciado evita erros com igualdade e desigualdade.'
    ],
    nextChallengeSuggestion: 'Modifique o programa para verificar se a prestação ultrapassa 30% do salário e, nesse caso, mostrar também o valor máximo permitido.',
    templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
    analyze: (code: string): HeuristicResult => {
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

      let category: HeuristicResult['category'] = 'tentativa inicial';
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

      return { category, feedback: { good, review, nextStep }, difficulty };
    }
  },
  {
    id: 'desafio4_divisivel_3_ou_5',
    title: 'Desafio Guiado: Divisibilidade em C',
    subtitle: 'Verifique se um número inteiro é divisível por 3 ou por 5.',
    metadata: {
      content: 'estrutura condicional e operador módulo',
      language: 'C',
      level: 'iniciante',
      time: '10 a 15 minutos',
      requirements: 'variáveis, scanf, printf, if, else, operador %',
      skill: 'usar operador módulo para verificar divisibilidade'
    },
    problem: 'Faça um programa para verificar se um determinado número inteiro é divisível por 3 ou 5.',
    guidingQuestions: [
      'Qual é a entrada do problema?',
      'O que significa um número ser divisível por 3?',
      'O que significa um número ser divisível por 5?',
      'Que operador pode ser usado para verificar o resto da divisão?',
      'O programa deve aceitar números divisíveis por 3, por 5 ou por ambos?'
    ],
    orientation: {
      input: 'Um número inteiro.',
      output: 'Mensagem indicando se é divisível por 3 ou 5.',
      cases: 'Divisível por 3, por 5, por ambos ou por nenhum.',
      structure: 'Uso do operador % e operador lógico || (OU).'
    },
    tips: [
      { id: 1, text: "Lembre que o operador % retorna o resto da divisão." },
      { id: 2, text: "Para saber se um número é divisível por 3, verifique se numero % 3 é igual a 0." },
      { id: 3, text: "Para saber se um número é divisível por 5, verifique se numero % 5 é igual a 0." },
      { id: 4, text: "Pense com cuidado na lógica 'ou': basta uma das condições ser verdadeira." }
    ],
    commonErrors: [
      { title: "Divisão comum", description: "Usar divisão comum (/) em vez do operador de resto (%)." },
      { title: "Esquecer um divisor", description: "Verificar apenas divisibilidade por 3 ou apenas por 5." },
      { title: "Lógica 'E'", description: "Usar lógica 'e' (&&) quando o problema pede 'ou' (||)." },
      { title: "Comparação direta", description: "Comparar o número diretamente com 3 ou 5 (ex: n == 3) em vez de testar o resto." },
      { title: "Saída vaga", description: "Exibir uma saída sem deixar claro o resultado da verificação." }
    ],
    solution: `#include <stdio.h>

int main() {
    int numero;

    printf("Digite um numero inteiro: ");
    scanf("%d", &numero);

    // Verifica se o resto da divisão por 3 OU por 5 é zero
    if (numero % 3 == 0 || numero % 5 == 0) {
        printf("O numero e divisivel por 3 ou 5.\\n");
    } else {
        printf("O numero nao e divisivel por 3 nem por 5.\\n");
    }

    return 0;
}`,
    finalSummary: [
      'O operador módulo é fundamental em problemas de divisibilidade.',
      'Resto zero indica divisibilidade.',
      'A leitura correta do operador lógico do problema é essencial.',
      'A lógica "ou" aceita qualquer uma das condições verdadeiras.'
    ],
    nextChallengeSuggestion: 'Modifique o programa para classificar um número como divisível apenas por 3, apenas por 5, por ambos ou por nenhum.',
    templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
    analyze: (code: string): HeuristicResult => {
      const codeLower = code.toLowerCase();
      const checks = {
        stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
        main: /int\s+main\s*\(/.test(codeLower),
        variable: /int\s+[a-zA-Z_]/.test(codeLower),
        scanf: /scanf\s*\(/.test(codeLower),
        if: /\bif\s*\(/.test(codeLower),
        mod: /%/.test(codeLower),
        check3: /%\s*3/.test(codeLower),
        check5: /%\s*5/.test(codeLower),
        logicalOr: /\|\|/.test(codeLower) || (codeLower.match(/if/g) || []).length >= 2,
        printf: /printf\s*\(/.test(codeLower)
      };

      const good: string[] = [];
      const review: string[] = [];
      let score = 0;

      if (checks.stdio) { good.push("Biblioteca stdio.h incluída."); score++; }
      if (checks.main) { good.push("Função main declarada."); score++; }
      if (checks.variable) { good.push("Variável inteira declarada."); score++; }
      if (checks.scanf) { good.push("Leitura de dados implementada."); score++; }
      if (checks.mod) { good.push("Você já identificou que o problema envolve divisibilidade usando o operador %."); score++; }

      if (!checks.mod) review.push("O operador % é o principal recurso para resolver este problema.");
      if (!checks.check3 || !checks.check5) review.push("Parece faltar uma das verificações de divisibilidade (por 3 ou por 5).");
      if (!checks.logicalOr) review.push("Revise se sua lógica está usando 'ou' (||), e não uma condição mais restritiva.");

      if (checks.if) score++;
      if (checks.check3) score++;
      if (checks.check5) score++;
      if (checks.logicalOr) score++;
      if (checks.printf) score++;

      let category: HeuristicResult['category'] = 'tentativa inicial';
      if (score >= 10) category = 'solução adequada';
      else if (score >= 7) category = 'quase completa';
      else if (score >= 4) category = 'parcialmente correta';

      let difficulty = "Dificuldade em compreender divisibilidade";
      if (!checks.mod) difficulty = "Dificuldade em usar o operador %";
      else if (!checks.logicalOr) difficulty = "Dificuldade em interpretar a lógica ou";
      else if (!checks.check3 || !checks.check5) difficulty = "Dificuldade em combinar duas condições";
      else difficulty = "Dificuldade em produzir saída coerente";

      let nextStep = "Comece lendo o número inteiro com scanf.";
      if (checks.scanf && !checks.mod) nextStep = "Agora use o operador % para testar se o resto da divisão por 3 é zero.";
      if (checks.mod && !checks.logicalOr) nextStep = "Seu código usa condição, mas ainda não mostra claramente a verificação combinada por 3 ou por 5.";
      if (category === 'solução adequada') nextStep = "Parabéns! Você dominou o uso do operador módulo e lógica OU.";

      return { category, feedback: { good, review, nextStep }, difficulty };
    }
  },
  {
    id: 'desafio5_ordem_crescente_tres_numeros',
    title: 'Desafio Guiado: Ordenação simples em C',
    subtitle: 'Receba três números e mostre-os em ordem crescente.',
    metadata: {
      content: 'estruturas condicionais e comparação entre valores',
      language: 'C',
      level: 'iniciante',
      time: '15 a 20 minutos',
      requirements: 'variáveis, scanf, printf, operadores relacionais, if, else if, else',
      skill: 'comparar múltiplos valores e organizar saídas em ordem crescente'
    },
    problem: 'Faça um programa que receba três números e mostre-os em ordem crescente.',
    guidingQuestions: [
      'Quantos valores o programa deve ler?',
      'O que significa mostrar os números em ordem crescente?',
      'Quais comparações entre os números podem ajudar a descobrir qual é o menor?',
      'Depois de encontrar o menor, como decidir a posição dos outros dois?',
      'Como exibir os três valores já ordenados?'
    ],
    orientation: {
      input: 'O programa deve ler três números.',
      output: 'A saída deve mostrar esses valores do menor para o maior.',
      cases: 'Diferentes combinações entre os três valores (ex: a < b < c, a < c < b, etc.).',
      structure: 'Estruturas condicionais encadeadas para identificar a ordem correta.'
    },
    tips: [
      { id: 1, text: "Comece pensando em como descobrir qual dos três números é o menor." },
      { id: 2, text: "Depois de identificar o menor, compare os dois restantes para definir a ordem final." },
      { id: 3, text: "Você pode resolver o problema com condicionais encadeadas e combinações de comparações." },
      { id: 4, text: "Verifique se sua solução cobre diferentes ordens de entrada, como crescente, decrescente e misturada." }
    ],
    commonErrors: [
      { title: "Comparações insuficientes", description: "Comparar apenas dois números e esquecer o terceiro." },
      { title: "Ordem fixa", description: "Mostrar os números em uma ordem fixa, sem realmente testá-los." },
      { title: "Lógica incompleta", description: "Montar uma lógica que funciona apenas para alguns casos." },
      { title: "Confusão de ordem", description: "Confundir ordem crescente com ordem decrescente." },
      { title: "Falta de saída", description: "Não exibir os três números na saída." },
      { title: "Casos não tratados", description: "Usar comparações insuficientes para distinguir as diferentes possibilidades." }
    ],
    solution: `#include <stdio.h>

int main() {
    int a, b, c;

    printf("Digite tres numeros: ");
    scanf("%d %d %d", &a, &b, &c);

    if (a <= b && a <= c) {
        if (b <= c) {
            printf("%d %d %d\\n", a, b, c);
        } else {
            printf("%d %d %d\\n", a, c, b);
        }
    } else if (b <= a && b <= c) {
        if (a <= c) {
            printf("%d %d %d\\n", b, a, c);
        } else {
            printf("%d %d %d\\n", b, c, a);
        }
    } else {
        if (a <= b) {
            printf("%d %d %d\\n", c, a, b);
        } else {
            printf("%d %d %d\\n", c, b, a);
        }
    }

    return 0;
}`,
    finalSummary: [
      'Ordenar valores exige observar relações entre eles.',
      'Em problemas pequenos, a ordenação pode ser feita com condicionais.',
      'Uma boa estratégia é identificar primeiro o menor valor.',
      'Depois disso, a posição dos outros números fica mais fácil de determinar.',
      'Testar diferentes entradas ajuda a validar a lógica construída.'
    ],
    nextChallengeSuggestion: 'Modifique o programa para receber três números e mostrá-los em ordem decrescente.',
    templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
    analyze: (code: string): HeuristicResult => {
      const codeLower = code.toLowerCase();
      const checks = {
        stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
        main: /int\s+main\s*\(/.test(codeLower),
        variables: /(int|float|double)\s+[a-zA-Z_].*,.*,.*[a-zA-Z_]/.test(codeLower) || (codeLower.match(/(int|float|double)\s+[a-zA-Z_]/g) || []).length >= 3,
        scanf: /scanf\s*\(/.test(codeLower),
        if: /\bif\s*\(/.test(codeLower),
        elseIf: /\belse\s+if\b/.test(codeLower) || (codeLower.match(/\bif\b/g) || []).length >= 3,
        printf: /printf\s*\(/.test(codeLower),
        comparisons: /[<>=]/.test(codeLower),
        multiplePrintf: (codeLower.match(/printf/g) || []).length >= 3
      };

      const good: string[] = [];
      const review: string[] = [];
      let score = 0;

      if (checks.stdio) { good.push("Inclusão de stdio.h correta."); score++; }
      if (checks.main) { good.push("Função main presente."); score++; }
      if (checks.variables) { good.push("Você declarou três variáveis para os números."); score++; }
      if (checks.scanf) { good.push("Uso de scanf para entrada de dados."); score++; }
      if (checks.if) { good.push("Você já identificou que o problema exige comparar mais de um valor."); score++; }
      if (checks.comparisons) { good.push("Você está usando operadores relacionais para comparar os valores."); score++; }

      if (!checks.variables) review.push("Você precisa de três variáveis para armazenar os números de entrada.");
      if (!checks.elseIf && !checks.if) review.push("Seu código lê os números, mas ainda não deixa clara a lógica de ordenação.");
      if (!checks.multiplePrintf && !codeLower.includes("%d %d %d")) review.push("Revise se sua solução exibe todos os três números na ordem correta.");

      if (checks.printf) score++;
      if (checks.elseIf) score++;
      if (checks.multiplePrintf || codeLower.includes("%d %d %d")) score++;
      if (checks.comparisons) score++;

      let category: HeuristicResult['category'] = 'tentativa inicial';
      if (score >= 10) category = 'solução adequada';
      else if (score >= 7) category = 'quase completa';
      else if (score >= 4) category = 'parcialmente correta';

      let difficulty = "Dificuldade em comparar três valores ao mesmo tempo";
      if (!checks.if) difficulty = "Dificuldade em estruturar condicionais encadeadas";
      else if (!checks.comparisons) difficulty = "Dificuldade em identificar o menor valor";
      else if (!checks.multiplePrintf) difficulty = "Dificuldade em produzir a saída na ordem pedida";
      else difficulty = "Dificuldade em garantir que todos os casos sejam tratados";

      let nextStep = "Comece declarando as três variáveis e lendo os valores com scanf.";
      if (checks.variables && !checks.if) nextStep = "Boa tentativa. O ponto central deste problema é descobrir a posição relativa entre os três valores.";
      if (checks.if && !checks.elseIf) nextStep = "Seu programa está próximo do esperado, mas ainda precisa organizar corretamente a saída em ordem crescente.";
      if (category === 'solução adequada') nextStep = "Parabéns! Você conseguiu ordenar os três números corretamente.";

      return { category, feedback: { good, review, nextStep }, difficulty };
    }
  },
  {
    id: 'desafio6_triangulo_classificacao',
    title: 'Desafio Guiado: Verificação e classificação de triângulos em C',
    subtitle: 'Verifique se três valores podem formar um triângulo e, se puderem, classifique-o.',
    metadata: {
      content: 'estruturas condicionais, comparação entre valores e classificação por casos',
      language: 'C',
      level: 'iniciante a intermediário',
      time: '20 a 30 minutos',
      requirements: 'variáveis, scanf, printf, if, else if, else, operadores relacionais e lógicos',
      skill: 'verificar condições de validade e, em seguida, classificar corretamente diferentes casos'
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
      input: 'O programa deve ler três valores que representam lados.',
      output: 'Mensagem informando se é um triângulo e qual o seu tipo (equilátero, isósceles ou escaleno).',
      cases: 'Validade (A+B>C && A+C>B && B+C>A) e Classificação (3 iguais, 2 iguais ou todos diferentes).',
      structure: 'Estrutura condicional aninhada: primeiro valida, depois classifica.'
    },
    tips: [
      { id: 1, text: "Resolva o problema em duas partes: validade e classificação." },
      { id: 2, text: "Primeiro verifique a condição de existência do triângulo usando os três lados." },
      { id: 3, text: "Só depois da validação analise se os lados são todos iguais, dois iguais ou todos diferentes." },
      { id: 4, text: "Revise se sua lógica não classifica lados inválidos como se fossem triângulo." }
    ],
    commonErrors: [
      { title: "Falta de validação", description: "Classificar o triângulo sem antes verificar se os lados formam um triângulo." },
      { title: "Validação incompleta", description: "Verificar apenas uma das desigualdades e esquecer as outras." },
      { title: "Confusão de tipos", description: "Confundir isósceles com equilátero." },
      { title: "Equilátero mal definido", description: "Tratar qualquer caso com dois lados iguais como equilátero." },
      { title: "Esquecer escaleno", description: "Esquecer o caso em que todos os lados são diferentes." },
      { title: "Saída indevida", description: "Exibir uma classificação mesmo quando os valores não formam triângulo." }
    ],
    solution: `#include <stdio.h>

int main() {
    float a, b, c;

    printf("Digite os tres lados do triangulo: ");
    scanf("%f %f %f", &a, &b, &c);

    // Verifica a condição de existência
    if (a < b + c && b < a + c && c < a + b) {
        // Classificação
        if (a == b && b == c) {
            printf("Triangulo Equilatero\\n");
        } else if (a == b || b == c || a == c) {
            printf("Triangulo Isosceles\\n");
        } else {
            printf("Triangulo Escaleno\\n");
        }
    } else {
        printf("Nao forma um triangulo\\n");
    }

    return 0;
}`,
    finalSummary: [
      'Alguns problemas exigem validação antes da classificação.',
      'No caso do triângulo, a verificação da existência vem antes do tipo.',
      'Resolver por etapas ajuda a organizar a lógica.',
      'A classificação depende da igualdade entre os lados, mas só depois da validade ser confirmada.',
      'Estruturas condicionais são úteis para modelar esse tipo de raciocínio.'
    ],
    nextChallengeSuggestion: 'Modifique o programa para, além de classificar o triângulo, informar também se ele é retângulo, acutângulo ou obtusângulo.',
    templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
    analyze: (code: string): HeuristicResult => {
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

      let category: HeuristicResult['category'] = 'tentativa inicial';
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

      return { category, feedback: { good, review, nextStep }, difficulty };
    }
  }
];
