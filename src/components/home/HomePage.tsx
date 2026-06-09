import * as React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  ArrowRight, 
  ArrowLeft,
  Code2, 
  Zap, 
  CheckCircle2, 
  Clock, 
  FileJson, 
  FileSpreadsheet, 
  GitBranch, 
  Repeat, 
  Layers, 
  Grid, 
  Sparkles 
} from 'lucide-react';
import { Challenge, UserProfile, Attempt } from '../../types';
import { CHALLENGES } from '../../challenges';
import { AuthPanel } from '../auth/AuthPanel';
import { UserBadge } from '../auth/UserBadge';
import { attemptService } from '../../services/attemptService';
import { exportService } from '../../services/exportService';
import { localPersistenceService } from '../../services/localPersistenceService';

interface HomePageProps {
  user: UserProfile | null;
  selectedCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
  onSelectChallenge: (index: number) => void;
  onLogin: () => void;
  onLogout: () => void;
}

interface Category {
  id: string;
  title: string;
  description: string;
  theme: string;
  status: 'Disponível' | 'Em breve';
  challengesCount: number;
}

const CATEGORIES: Category[] = [
  {
    id: 'condicionais',
    title: 'Condicionais',
    description: 'Pratique decisões simples, múltiplas condições e classificação de casos usando if, else e operadores lógicos.',
    theme: 'CCI04',
    status: 'Disponível',
    challengesCount: 6
  },
  {
    id: 'lacos',
    title: 'Laços de repetição',
    description: 'Resolva problemas com repetição controlada, acumuladores, contadores e critérios de parada.',
    theme: 'CCI05',
    status: 'Disponível',
    challengesCount: 6
  },
  {
    id: 'vetores',
    title: 'Vetores',
    description: 'Pratique armazenamento, acesso por índice, percurso e processamento de coleções lineares.',
    theme: 'CCI06',
    status: 'Disponível',
    challengesCount: 6
  },
  {
    id: 'matrizes',
    title: 'Matrizes',
    description: 'Explore dados organizados em linhas e colunas, percursos aninhados e processamento tabular.',
    theme: 'CCI07',
    status: 'Disponível',
    challengesCount: 6
  },
  {
    id: 'funcoes',
    title: 'Funções e Procedimentos',
    description: 'Pratique decomposição de soluções em funções com retorno, procedimentos void, parâmetros, escopo principal e chamadas de subprogramas.',
    theme: 'CCI07',
    status: 'Disponível',
    challengesCount: 3
  }
];

export function HomePage({ 
  user, 
  selectedCategoryId, 
  onSelectCategory, 
  onSelectChallenge, 
  onLogin, 
  onLogout 
}: HomePageProps) {
  const [allAttempts, setAllAttempts] = React.useState<Attempt[]>([]);

  React.useEffect(() => {
    if (!user) {
      // Se não estiver logado, tenta recuperar o progresso do localStorage
      const localAttempts = localPersistenceService.getAllLocalAttempts();
      setAllAttempts(localAttempts);
      return;
    }

    const unsubscribe = attemptService.subscribeToAllAttempts(user.uid, (attempts) => {
      setAllAttempts(attempts);
    });

    return () => unsubscribe();
  }, [user]);

  const activeCategory = CATEGORIES.find(c => c.id === selectedCategoryId);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'condicionais':
        return <GitBranch className="w-6 h-6 text-indigo-600" />;
      case 'lacos':
        return <Repeat className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors" />;
      case 'vetores':
        return <Layers className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors" />;
      case 'matrizes':
        return <Grid className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors" />;
      case 'funcoes':
        return <Code2 className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors" />;
      default:
        return <BookOpen className="w-6 h-6 text-indigo-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 selection:bg-indigo-100">
      {/* Header / Hero */}
      <header className="bg-white border-b border-slate-200/60 px-6 py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-50/50 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
            
            {/* Conditional breadcrumb / back button */}
            <div className="space-y-4 max-w-2xl">
              {selectedCategoryId && (
                <button
                  id="header-back-to-categories-btn"
                  onClick={() => onSelectCategory(null)}
                  className="inline-flex items-center gap-2 group text-xs font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Voltar para categorias
                </button>
              )}

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-2xl border border-indigo-100/50">
                <Zap className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                  {selectedCategoryId ? `Desafio Guiado > ${activeCategory?.title}` : "Plataforma de Desafios C"}
                </span>
              </div>

              {selectedCategoryId === null ? (
                <>
                  <h1 className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95]">
                    Desafio Guiado
                  </h1>
                  <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                    Escolha uma categoria para praticar programação com apoio pedagógico e feedback orientado por IA.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95]">
                    {activeCategory?.title}
                  </h1>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl">
                    {activeCategory?.description}
                  </p>
                </>
              )}
            </div>
            
            <div className="flex-shrink-0">
              {user ? (
                <UserBadge user={user} onLogout={onLogout} />
              ) : (
                selectedCategoryId === null && (
                  <button
                    id="hero-start-practicing-btn"
                    onClick={() => {
                      const element = document.getElementById('categories-section');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-4 px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all active:scale-95 shadow-xl shadow-indigo-600/10"
                  >
                    Começar a Praticar
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-16 space-y-16">
        
        {/* Seção das Categorias */}
        {selectedCategoryId === null ? (
          <section id="categories-section" className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center shadow-md">
                <Grid className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-1.5">
                  Categorias de Desafios
                </h2>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
                  Selecione um tópico para focar sua prática
                </p>
              </div>
            </div>

            <div id="categories-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CATEGORIES.map((category, idx) => {
                const isAvailable = category.status === 'Disponível';
                return (
                  <motion.div
                    key={category.id}
                    id={`category-card-${category.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -6 }}
                    onClick={() => onSelectCategory(category.id)}
                    className="group text-left card-base p-8 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col h-full relative overflow-hidden cursor-pointer bg-white border border-slate-200"
                  >
                    {/* Background Soft Gradients */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/30 rounded-full -mr-10 -mt-10 group-hover:scale-125 transition-transform pointer-events-none" />

                    {/* Status Badge */}
                    <div className="absolute top-6 right-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        isAvailable 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                        {category.status}
                      </span>
                    </div>

                    {/* Header: Icon & Topic Meta */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                        {getCategoryIcon(category.id)}
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                          Tema {category.theme}
                        </span>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5 leading-none group-hover:text-indigo-600 transition-colors">
                          {category.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">
                      {category.description}
                    </p>

                    {/* Footer stats / prompt */}
                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {category.challengesCount} {category.challengesCount === 1 ? 'desafio disponível' : 'desafios disponíveis'}
                      </span>
                      <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                        {isAvailable ? 'Acessar Trilha' : 'Ver Detalhes'} <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Explanatory banner at bottom */}
            <motion.div 
              id="categories-info-banner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="card-base p-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-none flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-1">
                <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Metodologia de Ensino
                </span>
                <p className="text-xl font-normal leading-relaxed tracking-tight text-slate-200">
                  Pratique no seu ritmo, resolva problemas reais, receba feedback estruturado e refine seu código de forma guiada.
                </p>
              </div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-wider italic bg-white/5 border border-white/5 px-6 py-4 rounded-2xl max-w-sm">
                "Escolha uma categoria, resolva o desafio, receba feedback e tente melhorar sua solução."
              </div>
            </motion.div>
          </section>
        ) : (
          /* Trilha da Categoria Selecionada */
          <section id="challenges-section" className="space-y-10">
            {/* Header com botão de voltar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                id="back-to-categories-btn"
                onClick={() => onSelectCategory(null)}
                className="inline-flex items-center gap-3 px-6 py-3 bg-white hover:bg-slate-100 text-slate-600 rounded-2xl border border-slate-200 shadow-sm font-black text-[10px] uppercase tracking-widest transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para Categorias
              </button>

              <div className="text-slate-400 font-bold text-sm uppercase tracking-widest bg-white border border-slate-200 shadow-sm px-4 py-2 rounded-xl self-start sm:self-auto">
                {activeCategory?.challengesCount} {activeCategory?.challengesCount === 1 ? 'Desafio' : 'Desafios'}
              </div>
            </div>

            {/* Renderização de Desafios ou Estado Vazio */}
            {activeCategory && activeCategory.challengesCount > 0 ? (
              <div id="challenges-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {CHALLENGES.map((challenge, index) => {
                  if (challenge.categoryId !== selectedCategoryId) return null;

                  const challengeAttempts = allAttempts.filter(a => a.challengeId === challenge.id);
                  const isCompleted = challengeAttempts.some(a => a.category === 'solução adequada');
                  
                  return (
                    <ChallengeCard 
                      key={challenge.id} 
                      challenge={challenge} 
                      index={index} 
                      attemptsCount={challengeAttempts.length}
                      isCompleted={isCompleted}
                      onClick={() => onSelectChallenge(index)} 
                    />
                  );
                })}
              </div>
            ) : (
              <motion.div 
                id="empty-category-container"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-base bg-white border border-slate-200 p-16 text-center max-w-2xl mx-auto flex flex-col items-center justify-center space-y-6 shadow-sm mr-auto ml-auto"
              >
                <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-2">
                  <Code2 className="w-8 h-8 text-slate-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                    Esta categoria ainda não possui desafios cadastrados.
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
                    Novos desafios serão adicionados em breve para complementar sua jornada de aprendizado.
                  </p>
                </div>
                <button
                  id="empty-category-redirect-btn"
                  onClick={() => onSelectCategory('condicionais')}
                  className="flex items-center gap-3 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/15"
                >
                  Praticar "Condicionais" <Sparkles className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </section>
        )}

        {/* Seção de Exportação Global (apenas se logado e houver progresso) */}
        {user && allAttempts.length > 0 && (
          <section id="global-export-section" className="card-base p-8 bg-indigo-600 shadow-xl shadow-indigo-600/20 border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white tracking-tight leading-none">Exportar Meus Dados</h2>
                <p className="text-indigo-100/70 text-sm font-medium">
                  Baixe todas as suas {allAttempts.length} tentativas para análise ou backup pessoal.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  id="export-to-json-btn"
                  onClick={() => exportService.exportToJson(allAttempts, user.uid)}
                  className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/10"
                >
                  <FileJson className="w-4 h-4" />
                  JSON Completo
                </button>
                <button
                  id="export-to-csv-btn"
                  onClick={() => exportService.exportToCsv(allAttempts, user.uid)}
                  className="flex items-center gap-3 px-6 py-3 bg-white text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-indigo-50 shadow-lg shadow-black/10"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  CSV Planilha
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Painel de Incentivo ao Login */}
        {!user && <AuthPanel onLogin={onLogin} />}
      </main>
    </div>
  );
}

interface ChallengeCardProps {
  challenge: Challenge;
  index: number;
  attemptsCount: number;
  isCompleted: boolean;
  onClick: () => void;
}

function ChallengeCard({ challenge, index, attemptsCount, isCompleted, onClick }: ChallengeCardProps) {
  const hasStarted = attemptsCount > 0;

  return (
    <motion.div
      id={`challenge-card-${challenge.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group text-left card-base p-8 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col h-full relative overflow-hidden cursor-pointer bg-white border border-slate-200"
    >
      {/* Badge de Status */}
      <div className="absolute top-0 right-0 p-6">
        {isCompleted ? (
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100 shadow-sm animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
        ) : hasStarted ? (
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100 shadow-sm animate-fade-in">
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
        ) : (
          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-400" transition-all />
          </div>
        )}
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="px-3 py-1 bg-slate-100 rounded-lg border border-slate-200">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{challenge.metadata.level}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5" />
            {challenge.metadata.time}
          </div>
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
          {challenge.title}
        </h3>
      </div>

      <p className="text-slate-500 font-medium leading-relaxed mb-8 line-clamp-2 flex-grow">
        {challenge.problem}
      </p>

      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
            <Code2 className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors">
            {challenge.metadata.skill}
          </span>
        </div>
        <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
          {hasStarted ? 'Continuar' : 'Começar'} <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}
