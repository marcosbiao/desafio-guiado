/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Code2, 
  Lightbulb, 
  CheckCircle2, 
  AlertCircle, 
  History, 
  Download, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp,
  FileJson,
  FileSpreadsheet,
  ArrowRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Tipos e Interfaces ---

interface Attempt {
  id: string;
  timestamp: string;
  code: string;
  category: string;
  tipsUsed: number[];
  feedback: string;
  difficultyHypothesis: string;
}

interface HeuristicResult {
  category: 'tentativa inicial' | 'parcialmente correta' | 'quase completa' | 'solução adequada';
  feedback: {
    good: string[];
    review: string[];
    nextStep: string;
  };
  difficulty: string;
}

// --- Constantes e Dados Estáticos ---

const INITIAL_CODE = `#include <stdio.h>

int main() {
    // Seu código aqui
    
    return 0;
}`;

const TIPS = [
  { id: 1, text: "Pense na entrada: você precisará de uma variável para armazenar o número inteiro. Qual tipo de dado em C é usado para inteiros?" },
  { id: 2, text: "Lembre-se de usar a função 'scanf' para ler o valor digitado pelo usuário. Não esqueça do '&' antes do nome da variável!" },
  { id: 3, text: "Existem três situações possíveis: o número ser maior que zero (> 0), menor que zero (< 0) ou exatamente igual a zero (== 0)." },
  { id: 4, text: "Organize sua lógica usando 'if' para a primeira condição, 'else if' para a segunda e 'else' para o caso que sobrar." }
];

const COMMON_ERRORS = [
  { title: "Esquecer o scanf", description: "O programa não saberá qual número testar se você não ler a entrada do usuário." },
  { title: "Usar apenas if", description: "Se você usar vários 'if' separados, o programa pode testar condições desnecessárias ou falhar em lógica complexa. 'else if' é mais eficiente aqui." },
  { title: "Esquecer o caso zero", description: "Muitos iniciantes testam apenas positivo e negativo, esquecendo que o zero é um caso neutro importante." },
  { title: "Erro de comparação", description: "Lembre-se que para testar igualdade usamos '==', e não '=' (que é atribuição)." },
  { title: "Mensagens incoerentes", description: "Certifique-se de que o 'printf' dentro do bloco 'if (n > 0)' realmente diga que o número é positivo." }
];

const COMMENTED_SOLUTION = `#include <stdio.h>

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
}`;

// --- Componente Principal ---

export default function App() {
  // Estados da aplicação
  const [code, setCode] = useState(INITIAL_CODE);
  const [planning, setPlanning] = useState({ input: '', process: '', output: '' });
  const [showOrientation, setShowOrientation] = useState(false);
  const [usedTips, setUsedTips] = useState<number[]>([]);
  const [analysis, setAnalysis] = useState<HeuristicResult | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  // Carregar histórico do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('c_challenge_attempts');
    if (saved) {
      try {
        setAttempts(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar histórico", e);
      }
    }
  }, []);

  // Salvar histórico no localStorage
  const saveAttempt = (newAttempt: Attempt) => {
    const updated = [newAttempt, ...attempts].slice(0, 10); // Mantém as últimas 10
    setAttempts(updated);
    localStorage.setItem('c_challenge_attempts', JSON.stringify(updated));
  };

  // --- Lógica de Análise Heurística ---

  const analyzeCode = (inputCode: string): HeuristicResult => {
    const codeLower = inputCode.toLowerCase();
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

    if (checks.stdio) { good.push("Você incluiu a biblioteca padrão de entrada e saída (#include <stdio.h>)."); score++; }
    else { review.push("Falta incluir a biblioteca <stdio.h> para usar printf e scanf."); }

    if (checks.main) { good.push("A função principal 'int main()' foi declarada corretamente."); score++; }
    else { review.push("Todo programa em C precisa de uma função 'int main()'."); }

    if (checks.variable) { good.push("Você declarou uma variável para armazenar o número."); score++; }
    else { review.push("Você precisa declarar uma variável (ex: int n;) para guardar o valor."); }

    if (checks.scanf) { good.push("A leitura de dados com 'scanf' está presente."); score++; }
    else { review.push("Esqueceu de ler o valor do usuário com 'scanf'."); }

    if (checks.if) { good.push("Você iniciou a estrutura de decisão com 'if'."); score++; }
    else { review.push("O problema exige uma estrutura de decisão 'if'."); }

    if (checks.elseIf || checks.else) { good.push("Você está tratando múltiplos casos com else/else if."); score++; }
    else { review.push("Tente usar 'else if' e 'else' para tratar os três casos (positivo, negativo e zero)."); }

    if (checks.printf) { good.push("O programa utiliza 'printf' para exibir os resultados."); score++; }
    else { review.push("Use 'printf' para informar ao usuário se o número é positivo, negativo ou zero."); }

    // Determinar categoria
    let category: HeuristicResult['category'] = 'tentativa inicial';
    if (score >= 10) category = 'solução adequada';
    else if (score >= 7) category = 'quase completa';
    else if (score >= 4) category = 'parcialmente correta';

    // Determinar hipótese de dificuldade
    let difficulty = "Dificuldade de compreensão inicial";
    if (!checks.scanf) difficulty = "Dificuldade na entrada de dados (scanf)";
    else if (!checks.if) difficulty = "Dificuldade em estruturar a condição (if)";
    else if (!checks.elseIf || !checks.else) difficulty = "Dificuldade em tratar todos os casos";
    else if (!checks.printf) difficulty = "Dificuldade em produzir a saída correta";
    else if (score < 10) difficulty = "Dificuldade sintática ou lógica incompleta";
    else difficulty = "Nenhuma dificuldade predominante detectada";

    // Próximo passo
    let nextStep = "Comece declarando a variável e lendo o valor com scanf.";
    if (category === 'parcialmente correta') nextStep = "Agora foque em criar as condições if (n > 0) e else if (n < 0).";
    if (category === 'quase completa') nextStep = "Revise se todos os três casos (incluindo o zero) estão sendo tratados.";
    if (category === 'solução adequada') nextStep = "Parabéns! Sua solução parece completa. Que tal ler a solução comentada para comparar?";

    return {
      category,
      feedback: { good, review, nextStep },
      difficulty
    };
  };

  // --- Handlers ---

  const handleVerify = () => {
    const result = analyzeCode(code);
    setAnalysis(result);

    const newAttempt: Attempt = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString('pt-BR'),
      code,
      category: result.category,
      tipsUsed: [...usedTips],
      feedback: result.feedback.nextStep,
      difficultyHypothesis: result.difficulty
    };
    saveAttempt(newAttempt);
  };

  const handleReset = () => {
    if (window.confirm("Deseja realmente limpar tudo e recomeçar?")) {
      setCode(INITIAL_CODE);
      setPlanning({ input: '', process: '', output: '' });
      setUsedTips([]);
      setAnalysis(null);
      setShowSolution(false);
      setShowErrors(false);
    }
  };

  const handleTip = (id: number) => {
    if (!usedTips.includes(id)) {
      setUsedTips([...usedTips, id]);
    }
  };

  const exportJSON = () => {
    const data = {
      challenge: "Estrutura Condicional em C",
      user: "Estudante",
      attempts: attempts,
      finalCategory: analysis?.category || "não finalizado"
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tentativas_programacao.json';
    a.click();
  };

  const exportCSV = () => {
    const header = "data_hora,categoria,dicas_usadas,dificuldade_predominante\n";
    const rows = attempts.map(a => 
      `"${a.timestamp}","${a.category}","${a.tipsUsed.length}","${a.difficultyHypothesis}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tentativas_programacao.csv';
    a.click();
  };

  // --- Renderização ---

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans pb-20">
      {/* 1. Cabeçalho */}
      <header className="bg-white border-b border-slate-200 py-8 px-6 mb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <BookOpen className="text-blue-600" size={32} />
            Desafio Guiado: Estrutura Condicional em C
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Pratique decisões com <code className="bg-slate-100 px-1 rounded">if</code>, <code className="bg-slate-100 px-1 rounded">else if</code> e <code className="bg-slate-100 px-1 rounded">else</code> em um problema introdutório.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-8">
        
        {/* 2. Cartão de Metadados */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Code2 size={20} /></div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Conteúdo</p>
              <p className="font-medium">Estrutura Condicional</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Info size={20} /></div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Linguagem</p>
              <p className="font-medium">C (ANSI/C99)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><History size={20} /></div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tempo Estimado</p>
              <p className="font-medium">10 a 15 minutos</p>
            </div>
          </div>
          <div className="col-span-full border-t border-slate-100 pt-4 mt-2">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">Pré-requisitos:</span> Variáveis, leitura com scanf, saída com printf.
            </p>
            <p className="text-sm text-slate-600 mt-1">
              <span className="font-semibold text-slate-900">Habilidade principal:</span> Analisar um valor de entrada e decidir entre múltiplos casos.
            </p>
          </div>
        </section>

        {/* 3. Situação-problema */}
        <section className="bg-blue-600 text-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <AlertCircle size={24} />
            Situação-problema
          </h2>
          <p className="text-xl leading-relaxed font-medium italic">
            "Escreva um programa em C que leia um número inteiro e informe se ele é positivo, negativo ou igual a zero."
          </p>
        </section>

        {/* 4. Compreendendo o problema */}
        <section className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <button 
            onClick={() => setShowOrientation(!showOrientation)}
            className="w-full p-6 flex justify-between items-center hover:bg-slate-50 transition-colors"
          >
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Lightbulb className="text-amber-500" size={20} />
              Compreendendo o problema
            </h2>
            {showOrientation ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          <AnimatePresence>
            {showOrientation && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-6 pb-6 border-t border-slate-100 pt-4 space-y-4"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="font-semibold text-sm text-slate-500 mb-1">Qual é a entrada?</p>
                    <p className="text-slate-700">Um único número inteiro digitado pelo usuário.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="font-semibold text-sm text-slate-500 mb-1">Qual é a saída esperada?</p>
                    <p className="text-slate-700">Uma mensagem de texto indicando a categoria do número.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="font-semibold text-sm text-slate-500 mb-1">Quantos casos tratar?</p>
                    <p className="text-slate-700">Três casos: Positivo (&gt;0), Negativo (&lt;0) e Zero (==0).</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="font-semibold text-sm text-slate-500 mb-1">Estrutura recomendada?</p>
                    <p className="text-slate-700">Estrutura condicional encadeada (if / else if / else).</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* 5. Planeje antes de codificar */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <RotateCcw className="text-slate-400" size={20} />
            Planeje antes de codificar
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Entrada</label>
              <textarea 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm h-24 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ex: Variável int num..."
                value={planning.input}
                onChange={(e) => setPlanning({...planning, input: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Processamento</label>
              <textarea 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm h-24 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ex: Se num > 0 então..."
                value={planning.process}
                onChange={(e) => setPlanning({...planning, process: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Saída</label>
              <textarea 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm h-24 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ex: Printf 'Positivo'..."
                value={planning.output}
                onChange={(e) => setPlanning({...planning, output: e.target.value})}
              />
            </div>
          </div>
        </section>

        {/* 6. Editor de Código */}
        <section className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-slate-700">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <span className="text-slate-400 text-xs font-mono">desafio_condicional.c</span>
            <button 
              onClick={() => setCode(INITIAL_CODE)}
              className="text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
            >
              <RotateCcw size={12} /> Limpar editor
            </button>
          </div>
          <textarea 
            className="w-full h-80 p-6 bg-slate-900 text-emerald-400 font-mono text-sm outline-none resize-none leading-relaxed"
            spellCheck={false}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </section>

        {/* 7. Apoio Progressivo (Dicas) */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Apoio Progressivo</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TIPS.map((tip) => (
              <button
                key={tip.id}
                onClick={() => handleTip(tip.id)}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  usedTips.includes(tip.id) 
                  ? 'bg-amber-50 border-amber-200 text-amber-700 shadow-inner' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                {usedTips.includes(tip.id) ? `Dica ${tip.id} (Lida)` : `Ver dica ${tip.id}`}
              </button>
            ))}
          </div>
          <AnimatePresence>
            {usedTips.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-50 border border-amber-100 rounded-xl p-6 space-y-3"
              >
                {usedTips.sort().map(id => (
                  <div key={id} className="flex gap-3 items-start">
                    <span className="bg-amber-200 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded mt-1">DICA {id}</span>
                    <p className="text-sm text-amber-900">{TIPS.find(t => t.id === id)?.text}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* 8. Botões Principais */}
        <section className="flex flex-wrap gap-4 justify-center py-4">
          <button 
            onClick={handleVerify}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
          >
            <CheckCircle2 size={20} /> Verificar resposta
          </button>
          <button 
            onClick={() => setShowSolution(!showSolution)}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2"
          >
            <Code2 size={20} /> {showSolution ? 'Ocultar solução' : 'Mostrar solução comentada'}
          </button>
          <button 
            onClick={() => setShowErrors(!showErrors)}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2"
          >
            <AlertCircle size={20} /> Erros comuns
          </button>
          <button 
            onClick={handleReset}
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2"
          >
            <RotateCcw size={20} /> Reiniciar
          </button>
        </section>

        {/* 9. Área de Feedback Pedagógico */}
        <AnimatePresence>
          {analysis && (
            <motion.section 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl border-2 border-blue-100 p-8 shadow-xl space-y-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-900">Feedback Formativo</h2>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                  analysis.category === 'solução adequada' ? 'bg-emerald-100 text-emerald-700' :
                  analysis.category === 'quase completa' ? 'bg-blue-100 text-blue-700' :
                  analysis.category === 'parcialmente correta' ? 'bg-amber-100 text-amber-700' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  Estado: {analysis.category}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-emerald-600 flex items-center gap-2">
                    <CheckCircle2 size={18} /> O que você já fez bem
                  </h3>
                  <ul className="space-y-2">
                    {analysis.feedback.good.map((item, i) => (
                      <li key={i} className="text-sm text-slate-600 flex gap-2">
                        <span className="text-emerald-500 mt-1">•</span> {item}
                      </li>
                    ))}
                    {analysis.feedback.good.length === 0 && <li className="text-sm text-slate-400 italic">Nenhum ponto identificado ainda.</li>}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-amber-600 flex items-center gap-2">
                    <AlertCircle size={18} /> O que ainda precisa revisar
                  </h3>
                  <ul className="space-y-2">
                    {analysis.feedback.review.map((item, i) => (
                      <li key={i} className="text-sm text-slate-600 flex gap-2">
                        <span className="text-amber-500 mt-1">•</span> {item}
                      </li>
                    ))}
                    {analysis.feedback.review.length === 0 && <li className="text-sm text-slate-400 italic">Tudo parece estar no caminho certo!</li>}
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <p className="text-blue-900 font-bold mb-2 flex items-center gap-2">
                  <ArrowRight size={18} /> Próximo passo sugerido:
                </p>
                <p className="text-blue-800">{analysis.feedback.nextStep}</p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Hipótese Pedagógica</p>
                <p className="text-sm text-slate-500 italic">"{analysis.difficulty}"</p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* 10. Erros Comuns */}
        <AnimatePresence>
          {showErrors && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <AlertCircle className="text-red-500" size={24} />
                Erros comuns neste desafio
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {COMMON_ERRORS.map((error, i) => (
                  <div key={i} className="p-4 border border-slate-100 rounded-lg hover:border-red-100 hover:bg-red-50 transition-all">
                    <h3 className="font-bold text-slate-900 mb-1">{error.title}</h3>
                    <p className="text-sm text-slate-600">{error.description}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* 11. Solução Comentada */}
        <AnimatePresence>
          {showSolution && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
            >
              <div className="p-6 bg-slate-50 border-b border-slate-200">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-500" size={24} />
                  Solução comentada
                </h2>
                <p className="text-slate-500 text-sm mt-1">Compare sua lógica com esta implementação pedagógica.</p>
              </div>
              <div className="p-0">
                <pre className="p-6 bg-slate-900 text-slate-300 font-mono text-sm overflow-x-auto leading-relaxed">
                  {COMMENTED_SOLUTION}
                </pre>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* 12. O que aprender */}
        <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Lightbulb className="text-amber-500" size={24} />
            O que aprender com este desafio
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">1</div>
                <p className="text-sm text-slate-600"><span className="font-bold text-slate-900">Mapeamento de Casos:</span> Antes de programar, identifique todos os cenários possíveis (positivo, negativo, zero).</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">2</div>
                <p className="text-sm text-slate-600"><span className="font-bold text-slate-900">Decisão Encadeada:</span> Use <code className="bg-slate-100 px-1 rounded">else if</code> quando os casos forem mutuamente exclusivos.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">3</div>
                <p className="text-sm text-slate-600"><span className="font-bold text-slate-900">Entrada e Saída:</span> A precisão no <code className="bg-slate-100 px-1 rounded">scanf</code> e clareza no <code className="bg-slate-100 px-1 rounded">printf</code> são fundamentais.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">4</div>
                <p className="text-sm text-slate-600"><span className="font-bold text-slate-900">Tratamento Completo:</span> Um bom programa não deixa "pontas soltas" e trata todas as entradas previstas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 13. Próximo desafio */}
        <section className="bg-slate-800 text-white rounded-xl p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ArrowRight className="text-blue-400" size={24} />
              Próximo desafio sugerido
            </h2>
            <p className="text-slate-300">"Adapte o programa para verificar se um número é positivo par, positivo ímpar, negativo ou zero."</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold transition-all whitespace-nowrap">
            Aceitar desafio
          </button>
        </section>

        {/* Histórico de Tentativas */}
        <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <History className="text-slate-400" size={24} />
              Histórico de tentativas
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={exportJSON}
                className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
              >
                <FileJson size={14} /> Exportar JSON
              </button>
              <button 
                onClick={exportCSV}
                className="text-xs font-bold text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
              >
                <FileSpreadsheet size={14} /> Exportar CSV
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {attempts.length === 0 ? (
              <p className="text-center py-8 text-slate-400 italic">Nenhuma tentativa registrada nesta sessão.</p>
            ) : (
              attempts.map((att) => (
                <div key={att.id} className="p-4 border border-slate-100 rounded-lg flex flex-col md:flex-row justify-between gap-4 hover:bg-slate-50 transition-all">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">{att.timestamp}</p>
                    <p className="text-sm font-semibold text-slate-700 mt-1">Estado: <span className="capitalize text-blue-600">{att.category}</span></p>
                    <p className="text-xs text-slate-500 mt-1">Dicas usadas: {att.tipsUsed.length}</p>
                  </div>
                  <div className="md:text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase">Hipótese de Dificuldade</p>
                    <p className="text-sm text-slate-600 italic">{att.difficultyHypothesis}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </main>

      {/* Rodapé Fixo de Ações Rápidas (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:hidden flex justify-around items-center z-50">
        <button onClick={handleVerify} className="p-3 bg-blue-600 text-white rounded-full shadow-lg"><CheckCircle2 size={24} /></button>
        <button onClick={() => setShowSolution(!showSolution)} className="p-3 bg-slate-100 text-slate-600 rounded-full"><Code2 size={24} /></button>
        <button onClick={() => setShowErrors(!showErrors)} className="p-3 bg-slate-100 text-slate-600 rounded-full"><AlertCircle size={24} /></button>
        <button onClick={handleReset} className="p-3 bg-slate-100 text-slate-600 rounded-full"><RotateCcw size={24} /></button>
      </div>
    </div>
  );
}
