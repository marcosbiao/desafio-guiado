import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafioVetoresMediaSeisValores: Challenge = {
  id: 'vetores_media_seis_valores',
  categoryId: 'vetores',
  title: 'Média de 6 valores reais',
  subtitle: 'Escreva um programa em C que leia 6 números reais e guarde-os em um vetor. Ao final, calcule e exiba a média aritmética desses valores.',
  challengeVersion: '1.0.0',
  
  metadata: {
    content: 'Vetores Reais e Estatística Básica',
    language: 'C (ANSI/C99)',
    level: 'Intermediário',
    time: '20 minutos',
    requirements: 'Declaração de vetor de ponto flutuante, loops para leitura e acumulação, formatação de saída real.',
    skill: 'Estruturar arranjos lineares para armazenamento de números reais e calcular valores agregados.',
    version: '1.0.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Declarar vetores do tipo float/double, manipulando índices consecutivos em loops de leitura e computação agregada.',
    pedagogicalGoal: 'Compreender a diferença funcional de alocação sequencial e consolidação de médias de dados estatísticos flutuantes.',
    expectedDifficulty: 'media',
    cognitiveOperation: 'aplicar',
    prerequisites: ['Arrays Reais (float)', 'Laço de repetição indexado', 'Acumuladores fracionários', 'Fórmula de Média']
  },

  domainTags: {
    skillTags: ['arrays', 'variables', 'loops', 'input-output'],
    topicTags: ['basic-c', 'data-structures', 'math-logic'],
    difficultyTag: 'medium-complexity-logic',
    prerequisiteTags: ['basic-syntax', 'loops']
  },

  problem: 'Escreva um programa em C que declare um vetor de tamanho 6 capaz de aceitar números reais (float ou double). Leia as 6 entradas decimais do teclado, armazene-as nas respectivas posições do vetor, e então calcule e exiba a média aritmética simples resultante formatada com duas casas decimais.',
  
  guidingQuestions: [
    'Como declarar corretamente um vetor de floats para armazenar exatamente 6 elementos?',
    'Quais são os limites válidos de índices para esse vetor de tamanho 6 em C?',
    'Como projetar laços de repetição sincronizados para primeiro preencher o array e depois computar os somatórios de forma separada?',
    'Que especificador de formato utilizar no printf para apresentar a média final restrita a 2 casas após a vírgula?'
  ],

  orientation: {
    input: '6 números reais separados por espaços ou quebras de linhas.',
    output: 'A média aritmética dos 6 valores informados formatada com %.2f.',
    cases: 'Se as entradas são: 2.5, 3.5, 4.0, 5.0, 6.0, 7.5, a soma é 28.5 e a média é 4.75.',
    structure: 'Alocação de um vetor float de tamanho 6. Loop for de 0 a 5 com scanf para preenchimento. Loop subsequente para somar os valores (ou acumulando diretamente dentro do primeiro loop de leitura). Cálculo final da média simples e exibição externa.',
    expectedLogic: 'Criar float valores[6], soma = 0, media. Rodar laço de i = 0 até i < 6. Ler utilizando scanf("%f", &valores[i]) e somar. Ao final do loop, calcular media = soma / 6.0. Exibir a média %.2f.'
  },

  examples: [
    { input: '2.5 3.5 4.0 5.0 6.0 7.5', output: 'Media: 4.75' },
    { input: '1.0 1.0 1.0 1.0 1.0 1.0', output: 'Media: 1.00' }
  ],

  concepts: [
    'Vetores homogêneos de ponto flutuante',
    'Acesso e posicionamento por índice (0 a N-1)',
    'Formatação e arredondamento real com %.2f'
  ],

  tips: [
    { 
      id: 1, 
      text: "Como o problema exige números reais, lembre-se de declarar o vetor e as variáveis de soma e média como do tipo 'float' ou 'double'.",
      pedagogicalGoal: "Fixar a definição correta de tipos de dados matemáticos."
    },
    { 
      id: 2, 
      text: "Em C, os vetores começam obrigatoriamente no índice 0. Para um vetor de tamanho 6, os índices válidos vão estritamente de 0 até 5. Use 'for (i = 0; i < 6; i++)'.",
      pedagogicalGoal: "Compreender limites de indexação."
    },
    { 
      id: 3, 
      text: "No scanf, para ler dados dentro de vetores você deve usar o operador de endereço '&' acoplado à posição, ex: '&vetor[i]' com o formatador '%f' para float.",
      pedagogicalGoal: "Sintaxe estrita de recepção de vetores."
    },
    { 
      id: 4, 
      text: "Você pode somar os elementos em um loop separado após ler tudo, ou ir acumulando na variável soma no mesmo laço à medida que lê.",
      pedagogicalGoal: "Reconhecer flexibilidades lógicas na computação agregada."
    }
  ],

  commonErrors: [
    { 
      title: "Ultrapassar os limites do índice do vetor", 
      description: "Tentar preencher o vetor usando loops de '1 até 6' ou acessar 'vetor[6]' tentará ler/escrever em uma posição inválida de memória RAM, gerando comportamentos bizarros.",
      pedagogicalAdvice: "Mantenha o limitador do seu loop sempre como 'i < TAM_VETOR', iniciando i em zero."
    },
    { 
      title: "Armazenar em variáveis comuns sem vetor", 
      description: "Declarar variáveis soltas como n1, n2, n3 em vez de um vetor de floats de 6 posições infringe a diretriz de aplicar e consolidar estruturas vetoriais homogenas.",
      pedagogicalAdvice: "Siga expressamente o enunciado declarando e indexando um vetor real único de tamanho 6."
    },
    { 
      title: "Esquecer a indicação de endereço no scanf do vetor", 
      description: "Fazer scanf('%f', vetor[i]) sem usar o caractere '&' causará falha de compilação grave ou invasão indesejada de RAM.",
      pedagogicalAdvice: "Mesmo indexados, elementos numéricos primitivos individuais requerem precedeção de '&' no scanf, ex: &vetor[i]."
    },
    { 
      title: "Exibição cumulativa da média", 
      description: "Imprimir a média com printf dentro das chaves de repetição mostrará as parciais do cálculo em vez da resposta terminal isolada.",
      pedagogicalAdvice: "Instruções de resumo final e respostas estáticas devem residir estritamente abaixo do encerramento das repetições."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    float vetor[6];
    float soma = 0.0, media;
    int i;

    // Leitura das 6 posições
    for (i = 0; i < 6; i++) {
        scanf("%f", &vetor[i]);
    }

    // Soma cumulativa dos valores armazenados
    for (i = 0; i < 6; i++) {
        soma = soma + vetor[i];
    }

    media = soma / 6.0;

    printf("Media: %.2f\\n", media);

    return 0;
}`,

  finalSummary: [
    'Indexação Homogênea: Vetores em C começam no índice zero, o que requer loops que variem de 0 até tamanho - 1.',
    'Sintaxe Segura: Receber conteúdos com &array[i] protege conexões internas de memória.',
    'Agregações Matemáticas: Consolidar somas sequenciais sob controle vetorial viabiliza extrações estatísticas de grande escala.'
  ],

  nextChallengeId: 'vetores_maiores_que_dez',

  expectedCriteria: [
    { id: 'crit1', description: 'Declaração correta do vetor de floats com tamanho 6', importance: 'essencial' },
    { id: 'crit2', description: 'Uso de loop variando de 0 até 5 para as iterações', importance: 'essencial' },
    { id: 'crit3', description: 'Leitura segura via scanf("%f", &vetor[i]) ou similar', importance: 'essencial' },
    { id: 'crit4', description: 'Acumulador de soma de elementos em float/double', importance: 'essencial' },
    { id: 'crit5', description: 'Cálculo de média correta e printf final com precisão de duas casas decimais', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Deslocamento de limite do vetor (exclusão de zero ou alcance do índice 6)', likelyCause: 'Confusão com intervalos ordinais base um' },
    { id: 'err2', description: 'Leitura inadequada sem marcador de endereço', likelyCause: 'Esquecer o caracter & no scanf do vetor indexado' },
    { id: 'err3', description: 'Média de tipo truncada por perda de precisão', likelyCause: 'Dividir float soma por constante inteira num laço misto' }
  ],

  templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
  
  analyzeLocally: (code: string): AnalysisResult => {
    const codeLower = code.toLowerCase();
    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
      main: /int\s+main\s*\(/.test(codeLower),
      loops: /\b(for|while)\b/.test(codeLower),
      arrayDeclaration: /(float|double)\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\[\s*6\s*\]/.test(codeLower),
      scanfVetor: /scanf\s*\(\s*["'][^"']*%f[^"']*["']\s*,\s*&\s*[a-zA-Z_][a-zA-Z0-9_]*\s*\[\s*[a-zA-Z0-9_]+\s*\]\s*\)/.test(codeLower),
      printf: /printf\s*\(/.test(codeLower),
      precisionFormat: /%\s*\.2f/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Disponibilizou cabeçalho stdio.h."); score++; }
    else { review.push("Assinale #include <stdio.h> no topo."); }

    if (checks.main) { good.push("Int main() bem estruturado."); score++; }
    else { review.push("Diga int main() no início de seu código."); }

    if (checks.arrayDeclaration) { good.push("Declarou vetor real de tamanho 6 conforme solicitado."); score += 3; }
    else { review.push("Declare o vetor com tamanho 6 e tipo real, por exemplo: float valores[6];"); }

    if (checks.loops) { good.push("Utilizou loop estrutural indexado."); score += 2; }
    else { review.push("Sempre manipule vetores utilizando uma estrutura loop parametrizada por contador."); }

    if (checks.scanfVetor) { good.push("A leitura com scanf salvando no endereço indexado do array está adequada."); score += 2; }
    else { review.push("O scanf de array precisa do formato %f e endereço &vetor[i]."); }

    if (checks.printf) { score++; }

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 9) category = 'solução adequada';
    else if (score >= 6) category = 'quase completa';
    else if (score >= 3) category = 'parcialmente correta';

    let difficulty = "Dificuldade na declaração e preenchimento de vetores em C";
    if (!checks.arrayDeclaration) difficulty = "Sem declaração de vetor real de 6 posições";
    else if (!checks.loops) difficulty = "Sem laço iterador para vetores";
    else if (!checks.scanfVetor) difficulty = "Leitura inadequada em endereçamento do array";

    let nextStep = "Comece declarando 'float vetor[6];' e um loop for iterando com 'i = 0' até 'i < 6'.";
    if (category === 'parcialmente correta') nextStep = "Escreva o scanf de leitura salvando dados no endereço indexador do vetor: &vetor[i].";
    if (category === 'quase completa') nextStep = "Some os elementos lidos e depois do loop divida a soma por 6.0 calculando a média, exibindo %.2f.";
    if (category === 'solução adequada') nextStep = "Excelente! Mapeou e indexou os vetores de ponto flutuante com maestria.";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.loops ? ['logica'] : ['sintaxe_aparente'],
      `Análise Heurística de Médias Vetoriais: ${score}/10 pontos.`
    );
  }
};
