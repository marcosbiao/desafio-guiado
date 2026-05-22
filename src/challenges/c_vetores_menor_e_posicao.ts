import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafioVetoresMenorEPosicao: Challenge = {
  id: 'vetores_menor_e_posicao',
  categoryId: 'vetores',
  title: 'Menor valor e sua posição',
  subtitle: 'Escreva um programa em C que leia 10 números inteiros em um vetor. Ao final, encontre e exiba o menor valor e a posição (índice) onde ele se encontra.',
  challengeVersion: '1.0.0',
  
  metadata: {
    content: 'Análise de Mínimos e Indexação Sequencial em Vetores',
    language: 'C (ANSI/C99)',
    level: 'Intermediário',
    time: '25 minutos',
    requirements: 'Declaração de vetor inteiro de tamanho 10, loops de varredura, comparação de extremos, registro de índices.',
    skill: 'Desenvolver algoritmos de rastreamento de extremos localizados em arranjos unidimensionais homogêneos.',
    version: '1.0.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Localizar o menor valor de um conjunto de dados tabulado e reter em variável adicional o índice (posição) associado de forma dinâmica.',
    pedagogicalGoal: 'Compreender a diferença primordial entre ler o valor contido no vetor (vetor[i]) e localizar a chave indexadora (i) de alocação física.',
    expectedDifficulty: 'alta',
    cognitiveOperation: 'aplicar',
    prerequisites: ['Declaração de Vetores', 'Loops em Arrays', 'Pesquisa de Mínimos', 'Rastreamento de Índice']
  },

  domainTags: {
    skillTags: ['arrays', 'variables', 'loops', 'conditionals'],
    topicTags: ['basic-c', 'data-structures', 'math-logic'],
    difficultyTag: 'high-complexity-logic',
    prerequisiteTags: ['basic-syntax', 'loops', 'conditionals']
  },

  problem: 'Escreva um programa em C que declare um vetor de tamanho 10 para números inteiros. Leia os 10 valores correspondentes salvando-os no vetor. Ao finalizar as leituras, percorra o vetor estruturado para localizar qual é o menor valor absoluto e exiba tanto esse menor número quanto o índice (posição de 0 a 9) onde ele foi registrado.',
  
  guidingQuestions: [
    'Como inicializar as variáveis temporárias de teste de mínimo utilizando o primeiro elemento (vetor[0]) e seu índice correspondente (0)?',
    'Por que declarar a variável menor com o valor de vetor[0] é mais seguro do que atribuir um valor qualquer como zero?',
    'Como coordenar as condicionais para atualizar simultaneamente a variável menor e a variável posicao?',
    'Como mostrar o resultado formatado de menor valor e posição após o encerramento do processamento das chaves do laço?'
  ],

  orientation: {
    input: '10 números inteiros isolados informados pelo console.',
    output: 'Dois valores informados separadamente: o menor número e o índice correspondente no vetor.',
    cases: 'Se as entradas forem: 12, 4, 85, -2, 9, 14, 21, 5, 0, 7; o menor é -2 na posição (índice) 3.',
    structure: 'Isolamento de um vetor int de tamanho 10. Loop de leitura de 0 a 9. Atribuição de menor = vetor[0] e posicao = 0. Novo laço loop varrendo de index 1 a 9 testando se vetor[i] < menor. Se verdadeiro, menor = vetor[i] e posicao = i. Exibição conclusiva pós-loop.',
    expectedLogic: 'Criar int valores[10], menor, posicao, i. Rodar loop salvando valores. Determinar menor = valores[0] e posicao = 0. Iterar de i = 1 até i < 10 testando se valores[i] < menor. Se sim, atribuir menor = valores[i] e posicao = i. Imprimir menor e posicao.'
  },

  examples: [
    { input: '12 4 85 -2 9 14 21 5 0 7', output: 'Menor valor: -2\nPosicao: 3' },
    { input: '3 6 8 2 10 22 55 9 1 12', output: 'Menor valor: 1\nPosicao: 8' }
  ],

  concepts: [
    'Rastreamento de indexadores físicos (estruturas associativas)',
    'Busca estruturada de extremos de limite inferiores',
    'Segurança de inicializadores dinâmicos homogêneos'
  ],

  tips: [
    { 
      id: 1, 
      text: "Instancie o vetor com tamanho 10: 'int vetor[10];'. Em seguida, faça um loop de 0 até 9 para alimentar o arranjo.",
      pedagogicalGoal: "Fixar a fase de abastecimento ordenado do vetor."
    },
    { 
      id: 2, 
      text: "Para iniciar a busca, assuma que o menor número está na primeira gaveta, ou seja, faça: 'menor = vetor[0];' e guarde que a melhor posição atual é a inicial: 'posicao = 0;'.",
      pedagogicalGoal: "Ensinar a inicialização segura baseada na primeira posição física."
    },
    { 
      id: 3, 
      text: "Crie um loop para testar do índice 1 a 9. Se encontrar um número menor que sua hipótese ('vetor[i] < menor'), você deve atualizar ambas as variáveis: 'menor = vetor[i];' e 'posicao = i;'.",
      pedagogicalGoal: "Gerenciar atualizações simultâneas de estado lógico e físico."
    },
    { 
      id: 4, 
      text: "O printf final deve reportar o menor valor encontrado e também a posição numérica onde ele reside (a variável posicao). Use formatadores '%d'.",
      pedagogicalGoal: "Formatar a exibição conclusiva de relatórios de varredura."
    }
  ],

  commonErrors: [
    { 
      title: "Tratar a posição como o próprio elemento", 
      description: "Escrever posicao = vetor[i] em vez de posicao = i registrará o próprio conteúdo numérico na variável de índice, corrompendo a resposta final de localização.",
      pedagogicalAdvice: "Lembre-se: 'vetor[i]' é o dado guardado na gaveta, enquanto 'i' representa o número de identificação daquela gaveta específica."
    },
    { 
      title: "Inicializar a variável menor com o número zero", 
      description: "Começar menor = 0 resultará em falhas de detecção se o usuário inserir apenas valores positivos maiores que 0 (como 5, 20, 80), alegando equivocadamente que o menor é 0.",
      pedagogicalAdvice: "Para encontrar o menor elemento, inicie a variável menor sempre com um elemento real contido no próprio vetor."
    },
    { 
      title: "Atualizar menor sem atualizar a posição", 
      description: "Escrever menor = vetor[i] dentro de um if mas esquecer de atribuir posicao = i fará com que o índice final exibido fique incorreto ou estree o valor default 0.",
      pedagogicalAdvice: "Sempre que as condições de menor de conjunto forem superadas, sincronize imediatamente a variável de valor com o seu respectivo indexador."
    },
    { 
      title: "Estouro ou limite de loops encurtado", 
      description: "Rodar o laço até <= 10 causará invasão de RAM ao ler vetor[10]. E parar antes de < 9 esquecerá de testar a última célula do array.",
      pedagogicalAdvice: "O padrão ótimo em C para varrer vetores de tamanho N é sempre i = 0; i < N; i++."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    int vetor[10];
    int i, menor, posicao;

    // Leitura das 10 entradas inteiras
    for (i = 0; i < 10; i++) {
        scanf("%d", &vetor[i]);
    }

    // Inicialização segura a partir do primeiro elemento
    menor = vetor[0];
    posicao = 0;

    // Varredura de verificação do menor na faixa restante (1 a 9)
    for (i = 1; i < 10; i++) {
        if (vetor[i] < menor) {
            menor = vetor[i]; // Atualiza o menor valor provisório
            posicao = i;      // Atualiza o índice da posição provisória
        }
    }

    printf("Menor valor: %d\\n", menor);
    printf("Posicao: %d\\n", posicao);

    return 0;
}`,

  finalSummary: [
    'Indexação Física: Entender que o índice representa a chave de posicionamento do vetor diferencia soluções robustas de amadoras.',
    'Sincronia Operacional: Sincronizar atualizações de valores e indexadores no if garante a integridade de pesquisas espaciais.',
    'Imunidade Lógica: Partir de amostras legítimas e restrições de limite para buscar extremos protege o código contra surpresas de RAM.'
  ],

  nextChallengeId: 'vetores_positivos_negativos_zeros',

  expectedCriteria: [
    { id: 'crit1', description: 'Declaração adequada do vetor de inteiros com tamanho 10', importance: 'essencial' },
    { id: 'crit2', description: 'Leitura indexada por scanf em loop de tamanho 10', importance: 'essencial' },
    { id: 'crit3', description: 'Variável menor iniciada com vetor[0] e posicao inicializada em 0', importance: 'essencial' },
    { id: 'crit4', description: 'Varredura e comparação se vetor[i] < menor em repetição subsequente', importance: 'essencial' },
    { id: 'crit5', description: 'Atualização concomitante de menor e posicao em caso de correspondência e printf final externo', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Menor valor fixado em zero por padrão', likelyCause: 'Omitir a leitura isolada da primeira gaveta como hipótese' },
    { id: 'err2', description: 'Gravação inválida do índice na variável de posição', likelyCause: 'Confundir e atribuir vetor[i] ao invés do próprio iterador i na variável posicao' },
    { id: 'err3', description: 'Invasão ilegal de fronteira espacial', likelyCause: 'Estender o loop com testes lógicos limitados por i <= 10' }
  ],

  templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
  
  analyzeLocally: (code: string): AnalysisResult => {
    const codeLower = code.toLowerCase();
    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
      main: /int\s+main\s*\(/.test(codeLower),
      loops: /\b(for|while)\b/.test(codeLower),
      arrayDeclaration: /int\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\[\s*10\s*\]/.test(codeLower),
      findMin: /<\s*menor\b/.test(codeLower),
      safeInit: /menor\s*=\s*[a-zA-Z_][a-zA-Z0-9_]*\s*\[\s*0\s*\]/.test(codeLower),
      indexTrack: /posicao\s*=\s*i\b|pos\s*=\s*i\b/.test(codeLower),
      printf: /printf\s*\(/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Importação do arquivo de cabeçalhos stdio.h correta."); score++; }
    else { review.push("Diga #include <stdio.h>."); }

    if (checks.main) { good.push("Ponto de entrada do sistema int main() bem configurado."); score++; }
    else { review.push("Assinale int main() em seu código."); }

    if (checks.arrayDeclaration) { good.push("Declarou vetor inteiro de tamanho 10 como solicitado."); score += 2; }
    else { review.push("Configure o vetor de inteiros com 10 posições: int vetor[10];"); }

    if (checks.loops) { good.push("Utilizou loop estrutural indexado."); score += 2; }
    else { review.push("Mapeie uma repetição com for indo de 0 a 9 para transitar no arranjo."); }

    if (checks.findMin) { good.push("Construiu o teste comparativo de menor absoluto (< menor)."); score++; }
    else { review.push("Use um operador de menor (<) para procurar qual o menor valor no vetor."); }

    if (checks.safeInit) { good.push("Implementou menor inicializado dinamicamente com vetor[0]."); score += 2; }
    else { review.push("Sugerimos definir menor = vetor[0] no início da varredura comparativa."); }

    if (checks.indexTrack) { good.push("O código grava de forma correta o índice correspondente à menor posição."); score++; }
    else { review.push("Lembre-se de gravar em uma variável de controle de posição o índice correspondente: posicao = i."); }

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 9) category = 'solução adequada';
    else if (score >= 6) category = 'quase completa';
    else if (score >= 3) category = 'parcialmente correta';

    let difficulty = "Lógica de busca e localização indexada de extremos";
    if (!checks.arrayDeclaration) difficulty = "Sem declaração de array int de tamanho 10";
    else if (!checks.safeInit) difficulty = "Risco de lixo em inicialização extrema de menor";
    else if (!checks.indexTrack) difficulty = "Localização vazia ou deslocada de endereço";

    let nextStep = "Inicie montando seu int main(), criando int vetor[10] e lendo com scanf em loop.";
    if (category === 'parcialmente correta') nextStep = "Inicie menor = vetor[0] e posicao = 0, abrindo um laço secundário de i = 1 até i < 10.";
    if (category === 'quase completa') nextStep = "Coloque o if (vetor[i] < menor) atualizando simultaneamente menor = vetor[i] e posicao = i.";
    if (category === 'solução adequada') nextStep = "Incrível! Compreendeu com maestria a união de valores lógicos e físicos de vetores.";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.loops ? ['logica'] : ['sintaxe_aparente'],
      `Análise Heurística de Localização Físico-Lógica: ${score}/10 pontos.`
    );
  }
};
