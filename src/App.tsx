/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState, useEffect, ErrorInfo, ReactNode } from 'react';
import { 
  BookOpen, 
  Code2, 
  Lightbulb, 
  CheckCircle2, 
  AlertCircle, 
  History, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  Info,
  ArrowLeft,
  Zap,
  LogIn,
  LogOut,
  User as UserIcon,
  FileJson,
  FileSpreadsheet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Attempt, HeuristicResult, User } from './types';
import { CHALLENGES } from './challenges';
import { 
  auth, 
  db, 
  googleProvider, 
  handleFirestoreError, 
  OperationType 
} from './firebase';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  orderBy, 
  limit, 
  doc, 
  setDoc, 
  getDoc,
  addDoc
} from 'firebase/firestore';

import { analyzeCodeWithGemini } from './services/analysisService';

// --- Error Boundary ---
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      let errorMessage = "Ocorreu um erro inesperado.";
      try {
        const errorMsg = this.state.error?.message || "{}";
        const parsed = JSON.parse(errorMsg);
        if (parsed.error) errorMessage = `Erro no Firestore: ${parsed.error}`;
      } catch {
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-red-100">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Ops! Algo deu errado</h1>
            <p className="text-slate-600 mb-8">{errorMessage}</p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              Recarregar Aplicativo
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  // --- Estados de Autenticação ---
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // --- Estados da Aplicação ---
  const [isHome, setIsHome] = useState(true);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [code, setCode] = useState('');
  const [showOrientation, setShowOrientation] = useState(false);
  const [usedTips, setUsedTips] = useState<number[]>([]);
  const [analysis, setAnalysis] = useState<HeuristicResult | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // --- Autenticação ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        try {
          const userSnap = await getDoc(userRef);
          
          if (!userSnap.exists()) {
            const newUser: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              role: 'student',
              createdAt: new Date().toISOString()
            };
            await setDoc(userRef, newUser);
            setUser(newUser);
          } else {
            setUser(userSnap.data() as User);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
        }
      } else {
        setUser(null);
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsHome(true);
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  // --- Persistência por Desafio ---
  useEffect(() => {
    if (!isHome && isAuthReady) {
      let unsubscribeAttempts: () => void = () => {};

      if (user) {
        // Carregar Tentativas do Firestore
        const qAttempts = query(
          collection(db, 'users', user.uid, 'attempts'),
          where('challengeId', '==', currentChallenge.id),
          orderBy('timestamp', 'desc'),
          limit(10)
        );

        unsubscribeAttempts = onSnapshot(qAttempts, (snapshot) => {
          const loadedAttempts = snapshot.docs.map(doc => doc.data() as Attempt);
          setAttempts(loadedAttempts);
        }, (error) => {
          handleFirestoreError(error, OperationType.LIST, `users/${user.uid}/attempts`);
        });
      } else {
        // Fallback para LocalStorage
        const storageKeyAttempts = `attempts_${currentChallenge.id}`;
        const savedAttempts = localStorage.getItem(storageKeyAttempts);
        if (savedAttempts) setAttempts(JSON.parse(savedAttempts));
        else setAttempts([]);
      }
      
      // Resetar estado
      setCode(currentChallenge.templateCode);
      setUsedTips([]);
      setAnalysis(null);
      setShowSolution(false);
      setShowErrors(false);
      setShowOrientation(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      return () => {
        unsubscribeAttempts();
      };
    }
  }, [isHome, currentChallengeIndex, currentChallenge.id, currentChallenge.templateCode, user, isAuthReady]);

  const saveAttempt = async (newAttempt: Attempt) => {
    if (user) {
      try {
        await addDoc(collection(db, 'users', user.uid, 'attempts'), newAttempt);
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, `users/${user.uid}/attempts`);
      }
    } else {
      const updated = [newAttempt, ...attempts].slice(0, 10);
      setAttempts(updated);
      localStorage.setItem(`attempts_${currentChallenge.id}`, JSON.stringify(updated));
    }
  };

  // --- Handlers ---
  const handleSelectChallenge = (index: number) => {
    setCurrentChallengeIndex(index);
    setIsHome(false);
  };

  const handleVerify = async () => {
    setIsAnalyzing(true);
    setAnalysis(null);
    
    try {
      const result = await analyzeCodeWithGemini(code, currentChallenge);
      setAnalysis(result);

      const newAttempt: Attempt = {
        id: Date.now().toString(),
        userId: user?.uid || 'anonymous',
        challengeId: currentChallenge.id,
        timestamp: new Date().toISOString(),
        code,
        category: result.category,
        tipsUsed: [...usedTips],
        feedback: result.feedback.nextStep,
        difficultyHypothesis: result.difficulty
      };
      await saveAttempt(newAttempt);
    } catch (error) {
      console.error("Erro ao verificar código:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Deseja realmente limpar seu código e recomeçar este desafio?")) {
      setCode(currentChallenge.templateCode);
      setAnalysis(null);
      setUsedTips([]);
    }
  };

  const handleTip = (id: number) => {
    if (!usedTips.includes(id)) {
      setUsedTips([...usedTips, id]);
    }
  };

  const exportJSON = () => {
    const data = {
      challengeId: currentChallenge.id,
      titulo: currentChallenge.title,
      tentativas: attempts
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_${currentChallenge.id}.json`;
    a.click();
  };

  const exportCSV = () => {
    const header = "challengeId,titulo,data_hora,categoria,dicas_usadas,feedback,dificuldade\n";
    const rows = attempts.map(a => 
      `"${currentChallenge.id}","${currentChallenge.title}","${a.timestamp}","${a.category}","${a.tipsUsed.length}","${a.feedback}","${a.difficultyHypothesis}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_${currentChallenge.id}.csv`;
    a.click();
  };

  // --- Sub-componentes de Renderização ---

  const renderHome = () => (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <header className="bg-white border-b border-slate-200 py-12 px-6 mb-12 relative">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="absolute top-6 right-6 flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 bg-slate-50 p-2 pr-4 rounded-full border border-slate-200">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <UserIcon size={16} />
                  </div>
                )}
                <span className="text-sm font-bold text-slate-700 hidden md:inline">{user.displayName}</span>
                <button onClick={handleLogout} className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors" title="Sair">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
              >
                <LogIn size={18} /> Entrar com Google
              </button>
            )}
          </div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex p-4 bg-blue-50 rounded-2xl text-blue-600 mb-6"
          >
            <BookOpen size={48} />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Trilha de Programação em C
          </h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto text-center">
            Aprenda lógica de programação de forma guiada com desafios interativos e feedback em tempo real.
          </p>
          {!user && (
            <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-3 text-amber-800 text-sm max-w-md">
              <Info size={20} className="shrink-0" />
              <p>Faça login para salvar seu progresso na nuvem e acessar seu histórico de qualquer lugar.</p>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {CHALLENGES.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer group"
              onClick={() => handleSelectChallenge(index)}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <Code2 size={24} />
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-1">
                    {challenge.metadata.level}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{challenge.metadata.time}</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {challenge.title}
              </h2>
              <p className="text-slate-500 mb-6 line-clamp-2">
                {challenge.subtitle}
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                Começar desafio <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}

          <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center text-center opacity-60">
            <div className="p-3 bg-white rounded-xl text-slate-300 mb-4">
              <Zap size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-400 mb-2">Novos Desafios</h2>
            <p className="text-slate-400 text-sm">Estamos preparando mais conteúdos para sua trilha.</p>
          </div>
        </div>
      </main>
    </div>
  );

  const renderChallenge = () => (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans pb-20">
      <header className="bg-white border-b border-slate-200 py-6 px-6 mb-8 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsHome(true)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
              title="Voltar para o início"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                {currentChallenge.title}
              </h1>
              <p className="text-slate-400 text-xs font-medium">
                {currentChallenge.subtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Desafio {currentChallengeIndex + 1} de {CHALLENGES.length}
              </span>
            </div>
            {user && (
              <div className="flex items-center gap-2 bg-slate-50 p-1 pr-3 rounded-full border border-slate-200">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <UserIcon size={12} />
                  </div>
                )}
                <span className="text-[10px] font-bold text-slate-600">{user.displayName?.split(' ')[0]}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-8">
        {/* Metadados */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Code2 size={20} /></div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Conteúdo</p>
              <p className="font-medium text-sm">{currentChallenge.metadata.content}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Info size={20} /></div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Linguagem</p>
              <p className="font-medium text-sm">{currentChallenge.metadata.language}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><History size={20} /></div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tempo</p>
              <p className="font-medium text-sm">{currentChallenge.metadata.time}</p>
            </div>
          </div>
          <div className="col-span-full border-t border-slate-100 pt-4 mt-2">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">Pré-requisitos:</span> {currentChallenge.metadata.requirements}
            </p>
          </div>
        </section>

        {/* Enunciado */}
        <section className="bg-blue-600 text-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <AlertCircle size={24} />
            Situação-problema
          </h2>
          <p className="text-xl leading-relaxed font-medium italic">
            "{currentChallenge.problem}"
          </p>
        </section>

        {/* Orientação */}
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
                className="px-6 pb-6 border-t border-slate-100 pt-4 space-y-6"
              >
                <div className="space-y-3">
                  <p className="text-sm font-bold text-slate-400 uppercase">Perguntas Orientadoras</p>
                  <ul className="space-y-2">
                    {currentChallenge.guidingQuestions.map((q, i) => (
                      <li key={i} className="text-sm text-slate-700 flex gap-2">
                        <span className="text-blue-500 font-bold">?</span> {q}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="font-semibold text-xs text-slate-500 mb-1 uppercase">Entrada</p>
                    <p className="text-sm text-slate-700">{currentChallenge.orientation.input}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="font-semibold text-xs text-slate-500 mb-1 uppercase">Saída</p>
                    <p className="text-sm text-slate-700">{currentChallenge.orientation.output}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="font-semibold text-xs text-slate-500 mb-1 uppercase">Casos</p>
                    <p className="text-sm text-slate-700">{currentChallenge.orientation.cases}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="font-semibold text-xs text-slate-500 mb-1 uppercase">Estrutura</p>
                    <p className="text-sm text-slate-700">{currentChallenge.orientation.structure}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Editor */}
        <section className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-slate-700">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <span className="text-slate-400 text-xs font-mono">main.c</span>
            <button onClick={handleReset} className="text-slate-400 hover:text-white text-xs flex items-center gap-1"><RotateCcw size={12} /> Reiniciar</button>
          </div>
          <textarea 
            className="w-full h-80 p-6 bg-slate-900 text-emerald-400 font-mono text-sm outline-none resize-none leading-relaxed"
            spellCheck={false}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </section>

        {/* Dicas */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dicas Progressivas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {currentChallenge.tips.map((tip) => (
              <button
                key={tip.id}
                onClick={() => handleTip(tip.id)}
                className={`p-3 rounded-lg border text-xs font-medium transition-all ${
                  usedTips.includes(tip.id) ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-blue-50'
                }`}
              >
                {usedTips.includes(tip.id) ? `Dica ${tip.id} (Lida)` : `Ver dica ${tip.id}`}
              </button>
            ))}
          </div>
          <AnimatePresence>
            {usedTips.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-amber-50 border border-amber-100 rounded-xl p-6 space-y-3">
                {usedTips.sort().map(id => (
                  <div key={id} className="flex gap-3 items-start">
                    <span className="bg-amber-200 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded mt-1">DICA {id}</span>
                    <p className="text-sm text-amber-900">{currentChallenge.tips.find(t => t.id === id)?.text}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Ações */}
        <section className="flex flex-wrap gap-4 justify-center">
          <button 
            onClick={handleVerify} 
            disabled={isAnalyzing}
            className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transition-all ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isAnalyzing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <RotateCcw size={20} />
                </motion.div>
                Analisando com IA...
              </>
            ) : (
              <>
                <CheckCircle2 size={20} /> Verificar Resposta
              </>
            )}
          </button>
          <button onClick={() => setShowSolution(!showSolution)} className="bg-white border border-slate-200 px-6 py-3 rounded-full font-bold flex items-center gap-2"><Code2 size={20} /> {showSolution ? 'Ocultar Solução' : 'Solução Comentada'}</button>
          <button onClick={() => setShowErrors(!showErrors)} className="bg-white border border-slate-200 px-6 py-3 rounded-full font-bold flex items-center gap-2"><AlertCircle size={20} /> Erros Comuns</button>
        </section>

        {/* Feedback */}
        <AnimatePresence>
          {analysis && (
            <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl border-2 border-blue-100 p-8 shadow-xl space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Feedback Pedagógico</h2>
                <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                  analysis.category === 'solução adequada' ? 'bg-emerald-100 text-emerald-700' :
                  analysis.category === 'quase completa' ? 'bg-blue-100 text-blue-700' :
                  analysis.category === 'parcialmente correta' ? 'bg-amber-100 text-amber-700' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {analysis.category}
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-emerald-600 flex items-center gap-2"><CheckCircle2 size={18} /> O que você já fez bem</h3>
                  <ul className="space-y-2">
                    {analysis.feedback.good.map((item, i) => <li key={i} className="text-sm text-slate-600 flex gap-2"><span className="text-emerald-500">•</span> {item}</li>)}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-amber-600 flex items-center gap-2"><AlertCircle size={18} /> O que ainda precisa revisar</h3>
                  <ul className="space-y-2">
                    {analysis.feedback.review.map((item, i) => <li key={i} className="text-sm text-slate-600 flex gap-2"><span className="text-amber-500">•</span> {item}</li>)}
                  </ul>
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <p className="text-blue-900 font-bold mb-2 flex items-center gap-2"><ArrowRight size={18} /> Próximo passo sugerido:</p>
                <p className="text-blue-800">{analysis.feedback.nextStep}</p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Foco de Dificuldade Identificado</p>
                <p className="text-sm text-slate-500 italic">"{analysis.difficulty}"</p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Erros Comuns */}
        <AnimatePresence>
          {showErrors && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><AlertCircle className="text-red-500" size={24} /> Erros comuns neste desafio</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {currentChallenge.commonErrors.map((error, i) => (
                  <div key={i} className="p-4 border border-slate-100 rounded-lg">
                    <h3 className="font-bold text-slate-900 mb-1">{error.title}</h3>
                    <p className="text-sm text-slate-600">{error.description}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Solução */}
        <AnimatePresence>
          {showSolution && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-6 bg-slate-50 border-b border-slate-200">
                <h2 className="text-xl font-bold flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={24} /> Solução comentada</h2>
              </div>
              <pre className="p-6 bg-slate-900 text-slate-300 font-mono text-sm overflow-x-auto leading-relaxed">{currentChallenge.solution}</pre>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Resumo Final */}
        <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Lightbulb className="text-amber-500" size={24} /> Resumo do aprendizado</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {currentChallenge.finalSummary.map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs">{i+1}</div>
                <p className="text-sm text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Próximo Desafio */}
        {currentChallengeIndex < CHALLENGES.length - 1 && (
          <section className="bg-slate-800 text-white rounded-xl p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-xl font-bold flex items-center gap-2"><ArrowRight className="text-blue-400" size={24} /> Próximo desafio sugerido</h2>
              <p className="text-slate-300">"{currentChallenge.nextChallengeSuggestion}"</p>
            </div>
            <button onClick={() => handleSelectChallenge(currentChallengeIndex + 1)} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold transition-all whitespace-nowrap">Aceitar Desafio</button>
          </section>
        )}

        {/* Histórico */}
        <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><History className="text-blue-600" size={24} /> Seu histórico de tentativas</h2>
          <div className="space-y-4">
            {attempts.length > 0 ? (
              attempts.map((attempt) => (
                <div key={attempt.id} className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      attempt.category === 'solução adequada' ? 'bg-emerald-100 text-emerald-700' :
                      attempt.category === 'quase completa' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {attempt.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{new Date(attempt.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-slate-700 line-clamp-2 mb-2">{attempt.feedback}</p>
                  <button 
                    onClick={() => setCode(attempt.code)}
                    className="text-blue-600 text-[10px] font-bold hover:underline"
                  >
                    Restaurar este código
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl">
                <p className="text-slate-400 text-sm">Você ainda não fez nenhuma tentativa neste desafio.</p>
              </div>
            )}
          </div>
          {attempts.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4">
              <button onClick={exportJSON} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
                <FileJson size={16} /> Exportar JSON
              </button>
              <button onClick={exportCSV} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
                <FileSpreadsheet size={16} /> Exportar CSV
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 mt-20 pt-10 border-t border-slate-200 text-center">
        <p className="text-slate-400 text-sm">
          Trilha de Programação em C • Sistema de Feedback Pedagógico com IA
        </p>
      </footer>
    </div>
  );

  return (
    <ErrorBoundary>
      {isHome ? renderHome() : renderChallenge()}
    </ErrorBoundary>
  );
}
