import type { Challenge, AnalysisResult } from '../types.ts';
import { createLocalAnalysisResult } from '../domain/pedagogicalDomain.ts';

export const desafioLacosMaiorDezNumeros: Challenge = {
  id: 'lacos_maior_dez_numeros',
  categoryId: 'lacos',
  title: 'Encontrar o maior número de uma sequência',
  subtitle: 'Escreva um programa em C que leia 10 números inteiros e mostre o maior número informado.',
  challengeVersion: '1.0.0',
  
  metadata: {
    content: 'Laços de Repetição com Comparação',
    language: 'C (ANSI/C99)',
    level: 'Intermediário',
    time: '25 minutos',
    requirements: 'Estruturação de repetições, condicionais de desigualdade, inicialização de busca por extremos.',
    skill: 'Modelar algoritmos de pesquisa de extremos em sequências de dados dinâmicos.',
    version: '1.0.0'
  },

  pedagogicalMetadata: {
    learningObjective: 'Utilizar técnicas de tomada de decisão temporal e sequencial dentro de loops para identificar valores máximos em sequências indeterminadas ou determinados de números do teclado.',
    pedagogicalGoal: 'Compreender a robustez de inicialização de variáveis comparativas em algoritmos de busca por extremos numéricos.',
    expectedDifficulty: 'alta',
    cognitiveOperation: 'aplicar',
    prerequisites: ['Repetições', 'Tomada de Decisão', 'Inicialização Algorítmica', 'Pesquisa de Soluções']
  },

  domainTags: {
    skillTags: ['loops', 'variables', 'conditionals', 'input-output'],
    topicTags: ['basic-c', 'repetition', 'math-logic'],
    difficultyTag: 'high-complexity-logic',
    prerequisiteTags: ['basic-syntax', 'loops', 'conditionals']
  },

  problem: 'Escreva um programa em C que leia do teclado uma sequência de 10 números inteiros quaisquer (positivos, negativos ou nulos) e exiba, ao término das leituras, qual foi o maior valor fornecido pelo usuário.',
  
  guidingQuestions: [
    'Por que inicializar a variável contendo o maior valor com 0 é conceitualmente inadequado para um domínio numérico amplo?',
    'Como obter a primeira leitura do teclado de forma isolada e utilizá-la como a nossa hipótese inicial sólida de maior número?',
    'Como coordenar o contador do laço para rodar apenas as 9 jogadas restantes (de 2 até 10) após a primeira entrada ter sido consumida?',
    'Como verificar se cada nova digitação ultrapassa as referências temporárias registradas no sistema?'
  ],

  orientation: {
    input: '10 números inteiros quaisquer separados por espaços ou quebras de linhas.',
    output: 'A indicação exata do maior número inteiro inserido.',
    cases: 'Caso com valores inteiros totalmente negativos (ex: -8, -15, -3, -42, -9, -1, -12, -7, -22, -10 retorna como maior -1).',
    structure: 'Leitura inicial do primeiro número fora do laço atribuído à variável maior. Loop rodando 9 vezes para coletar os números remanescentes comparando cada elemento com maior.',
    expectedLogic: 'Criar as variáveis i, numero e maior. Executar uma leitura de scanf inicial para guardar o conteúdo numérico na variável maior. Chamar o laço for (ou while) iniciando do índice 2 até o limite 10. Dentro dele, efetuar um scanf do numero. Se numero > maior, reatribuir maior = numero. Exibir o maior total após o loop.'
  },

  examples: [
    { input: '4 8 1 23 9 12 7 2 11 5', output: 'Maior: 23' },
    { input: '-10 -5 -15 -2 -20 -8 -12 -33 -6 -9', output: 'Maior: -2' }
  ],

  concepts: [
    'Comparação iterativa de extremos',
    'Inicialização dinâmica de hipótese de pesquisa',
    'Prevenção de desvios lógicos por viés de amostragem'
  ],

  tips: [
    { 
      id: 1, 
      text: "Não é seguro inicializar maior com 0, porque se o usuário inserir somente números negativos (como -5, -30, -90, -12), seu programa afirmará erroneamente que o maior é 0.",
      pedagogicalGoal: "Compreender falhas comuns de lógica em domínios negativos."
    },
    { 
      id: 2, 
      text: "Uma estratégia clássica e muito elegante é colher o primeiro número digitado separadamente, antes de abrir o laço de repetição, e utilizá-lo como o maior provisório inicial.",
      pedagogicalGoal: "Ensinar o design de algoritmos de inicialização segura."
    },
    { 
      id: 3, 
      text: "Como você já leu o primeiro número, configure o loop para controlar as próximas 9 tentativas necessárias, com contador indo de 2 até 10.",
      pedagogicalGoal: "Ajustar limites de controle de ciclos."
    },
    { 
      id: 4, 
      text: "Em cada ciclo do loop, leia o número do teclado e verifique se ele é maior que a variável maior. Se sim, atualize: 'maior = numero'.",
      pedagogicalGoal: "Construir testes eficientes de desigualdade em loops."
    }
  ],

  commonErrors: [
    { 
      title: "Inicializar a variável maior com valor fixo zero", 
      description: "Escrever int maior = 0; causará detecção falsa de maior número quando as amostras reais forem integralmente negativas.",
      pedagogicalAdvice: "Inicie variáveis de verificação de extremos sempre com amostras de dados legítimos pertencentes ao próprio conjunto estudado."
    },
    { 
      title: "Atualizar a variável de verificação sem testar", 
      description: "Fazer de forma mecânica 'maior = numero' sem encapsular por um if de confronto registrará equivocadamente a última entrada lida.",
      pedagogicalAdvice: "Toda alteração de variável de decisão crítica deve ser protegida por uma blindagem lógica apropriada."
    },
    { 
      title: "Exibir o maior valor repetidamente dentro do laço", 
      description: "Inserir o printf com o saldo dentro das chaves de repetição poluíra a visualização enviando dezenas de mensagens intermediárias ao terminal.",
      pedagogicalAdvice: "Operações de consolidação e respostas conclusivas de saída devem ser apresentadas de forma isolada depois do fechamento do loop."
    },
    { 
      title: "Ciclo de leitura incorreto", 
      description: "Rodar loops que leem mais ou menos que as 10 amostras especificadas distorce o teste pedagógico.",
      pedagogicalAdvice: "Monitore com rigor as declarações dos contadores garantindo a correspondência numérica descrita no escopo."
    }
  ],

  solution: `#include <stdio.h>

int main() {
    int i, numero, maior;

    // Colhe o primeiro número para servir de hipótese inicial segura
    scanf("%d", &maior);

    // Roda exatamente 9 vezes para coletar o restante do conjunto (de 2 a 10)
    for (i = 2; i <= 10; i++) {
        scanf("%d", &numero);

        // Se o número lido for maior que nossa hipótese registrada, atualiza-se
        if (numero > maior) {
            maior = numero;
        }
    }

    printf("Maior: %d\\n", maior);

    return 0;
}`,

  finalSummary: [
    'Inicialização Criteriosa: Usar o primeiro registro de entrada real garante imunidade operacional contra surpresas de domínios numéricos amplos.',
    'Sincronia Estrita: O controle dos loopings deve acompanhar cirurgicamente o consumo prévio das correntes de dados.',
    'Comparação Condensada: O filtro If contendo > refina o maior valor absoluto contido na população analisada.'
  ],

  nextChallengeId: 'lacos_validar_senha_tres_tentativas',

  expectedCriteria: [
    { id: 'crit1', description: 'Leitura inicial do primeiro número isolado', importance: 'essencial' },
    { id: 'crit2', description: 'Uso de variável maior inicializada com essa primeira leitura', importance: 'essencial' },
    { id: 'crit3', description: 'Laço rodando 9 vezes restantes para as próximas entradas', importance: 'essencial' },
    { id: 'crit4', description: 'Condição de desigualdade testando se numero > maior', importance: 'essencial' },
    { id: 'crit5', description: 'Atualização condicional do valor de maior e printf final posicionado de forma isolada', importance: 'essencial' }
  ],

  probableErrors: [
    { id: 'err1', description: 'Inicialização forçada por valor zero', likelyCause: 'Ausência de método de leitura isolada preliminar' },
    { id: 'err2', description: 'Não limitação do teto de loops', likelyCause: 'Erros nos limitadores do índice do contador' },
    { id: 'err3', description: 'Omitir teste de maior antes de atualizar', likelyCause: 'Emprego direto de atribuição simples' }
  ],

  templateCode: `#include <stdio.h>\n\nint main() {\n    // Seu código aqui\n    \n    return 0;\n}`,
  
  analyzeLocally: (code: string): AnalysisResult => {
    const codeLower = code.toLowerCase();
    const checks = {
      stdio: /#include\s*<\s*stdio\.h\s*>/.test(codeLower),
      main: /int\s+main\s*\(/.test(codeLower),
      loops: /\b(for|while)\b/.test(codeLower),
      scanf: /scanf\s*\(/.test(codeLower),
      hasGreaterThan: />/.test(codeLower),
      safeInit: /scanf\s*\(\s*["'][^"']*%d[^"']*["']\s*,\s*&\s*maior\s*\)/.test(codeLower) || /maior\s*=\s*[a-zA-Z0-9_]+/.test(codeLower),
      hasConditionalGreater: /if\s*\([\s\S]*?>[\s\S]*?\)/.test(codeLower),
      printf: /printf\s*\(/.test(codeLower)
    };

    const good: string[] = [];
    const review: string[] = [];
    let score = 0;

    if (checks.stdio) { good.push("Disponibilizou cabeçalho stdio.h."); score++; }
    else { review.push("Assinale #include <stdio.h> no topo."); }

    if (checks.main) { good.push("Int main() bem estruturado."); score++; }
    else { review.push("Diga int main() no início de seu escopo."); }

    if (checks.loops) { good.push("Você implementou uma estrutura de laço."); score++; }
    else { review.push("Certifique-se de usar repetição para as 9 entradas remanescentes."); }

    if (checks.scanf) { good.push("Uso de comandos de leitura com scanf identificados."); score++; }

    if (checks.safeInit) { good.push("O código realiza a inicialização segura a partir de dados da entrada do usuário."); score += 2; }
    else { review.push("Pense em iniciar a variável 'maior' com a primeira leitura do teclado fora do laço para manter seu algoritmo seguro."); }

    if (checks.hasGreaterThan || checks.hasConditionalGreater) { good.push("Filtro condicional contendo verificação de extremos."); score += 3; }
    else { review.push("Diga em seu loop a verificação se o número inserido supera a variável maior, reatribuindo-o."); }

    if (checks.printf) { score++; }

    let category: AnalysisResult['category'] = 'tentativa inicial';
    if (score >= 9) category = 'solução adequada';
    else if (score >= 6) category = 'quase completa';
    else if (score >= 3) category = 'parcialmente correta';

    let difficulty = "Dificuldade na coordenação de inicialização dinâmica de hipóteses e buscas extremas";
    if (!checks.loops) difficulty = "Falta de controle repetição";
    else if (!checks.safeInit) difficulty = "Uso de inicializadores fixos instáveis";
    else if (!checks.hasGreaterThan) difficulty = "Erro operacional na comparação extrema";

    let nextStep = "Comece colhendo seu primeiro dado com scanf diretamente na variável 'maior' logo após int main().";
    if (category === 'parcialmente correta') nextStep = "Adicione um loop com for variando de 2 a 10 para as próximas entradas lendo 'numero' a cada ciclo.";
    if (category === 'quase completa') nextStep = "Assegure-se de que a variável 'maior' mude para o valor de 'numero' se 'numero > maior'.";
    if (category === 'solução adequada') nextStep = "Trabalho impecável! Você estruturou uma das soluções de pesquisa de extremos mais robustas da computação.";

    return createLocalAnalysisResult(
      category,
      good,
      review,
      nextStep,
      difficulty,
      checks.loops ? ['logica'] : ['sintaxe_aparente'],
      `Análise Heurística de Busca Extrema: ${score}/10 pontos.`
    );
  }
};
