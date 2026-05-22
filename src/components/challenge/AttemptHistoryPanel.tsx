import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { History, ChevronDown, ChevronUp, Code2, Zap, Clock, Download, FileJson, FileSpreadsheet, PieChart } from 'lucide-react';
import { Attempt } from '../../types';
import { exportService } from '../../services/exportService';

interface AttemptHistoryPanelProps {
  attempts: Attempt[];
  challengeId?: string;
  userId?: string;
}

/**
 * Painel que exibe o histórico de tentativas do aluno com opções de exportação e resumo.
 */
export function AttemptHistoryPanel({ attempts, challengeId, userId }: AttemptHistoryPanelProps) {
  const [showSummary, setShowSummary] = React.useState(false);

  if (attempts.length === 0) {
    return (
      <div className="card-base p-12 flex flex-col items-center justify-center text-center space-y-6 border-dashed bg-slate-50/30">
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center border border-slate-100 shadow-sm">
          <History className="w-10 h-10 text-slate-300" />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-black text-slate-400 tracking-tight">Sem histórico ainda</h3>
          <p className="text-base text-slate-400 max-w-xs mx-auto leading-relaxed font-medium">
            Suas tentativas aparecerão aqui para que você possa acompanhar sua evolução.
          </p>
        </div>
      </div>
    );
  }

  // Cálculo de estatísticas simples para o resumo
  const stats = {
    total: attempts.length,
    completed: attempts.filter(a => a.category === 'solução adequada').length,
    tips: attempts.reduce((acc, a) => acc + (a.tipsUsed?.length || 0), 0),
    lastCategory: attempts[0]?.category || 'N/A'
  };

  return (
    <div className="card-base overflow-hidden border-slate-200/60 shadow-xl shadow-slate-200/20">
      <div className="px-10 py-8 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-200 shadow-sm">
              <History className="w-6 h-6 text-slate-600" />
            </div>
            <div>
              <h3 id="history-title" className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1.5">Histórico de Evolução</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {attempts.length} {attempts.length === 1 ? 'Tentativa Registrada' : 'Tentativas Registradas'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSummary(!showSummary)}
              className={`p-2.5 rounded-xl border transition-all ${showSummary ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50'}`}
              title="Ver Resumo"
            >
              <PieChart className="w-5 h-5" />
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1" />
            <button
              onClick={() => exportService.exportToJson(attempts, userId, challengeId)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-indigo-200 hover:bg-indigo-50 transition-all"
              title="Exportar JSON"
            >
              <FileJson className="w-4 h-4 text-indigo-500" />
              JSON
            </button>
            <button
              onClick={() => exportService.exportToCsv(attempts, userId, challengeId)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-indigo-200 hover:bg-indigo-50 transition-all"
              title="Exportar CSV"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
              CSV
            </button>
          </div>
        </div>

        {/* Resumo Visual Simples */}
        <AnimatePresence>
          {showSummary && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
                <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total</p>
                  <p className="text-2xl font-black text-slate-900">{stats.total}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">Sucesso</p>
                  <p className="text-2xl font-black text-emerald-600">{stats.completed}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-[9px] font-black text-amber-400 uppercase tracking-widest mb-1">Dicas</p>
                  <p className="text-2xl font-black text-amber-600">{stats.tips}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">Status Atual</p>
                  <p className="text-xs font-black text-indigo-600 truncate uppercase mt-1">{stats.lastCategory}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="divide-y divide-slate-100">
        {attempts.map((attempt) => (
          <AttemptHistoryItem key={attempt.id} attempt={attempt} />
        ))}
      </div>
    </div>
  );
}

function AttemptHistoryItem({ attempt }: { attempt: Attempt }) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  const date = attempt.timestamp?.toDate ? attempt.timestamp.toDate() : new Date(attempt.timestamp);
  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'solução adequada': return 'bg-emerald-500 text-white';
      case 'quase completa': return 'bg-indigo-500 text-white';
      case 'parcialmente correta': return 'bg-amber-500 text-white';
      default: return 'bg-slate-400 text-white';
    }
  };

  return (
    <div className="group transition-all hover:bg-slate-50/50">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-10 py-8 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-6">
          <div className={`w-4 h-4 rounded-full ${getCategoryColor(attempt.category).split(' ')[0]} shadow-sm ring-4 ring-white shrink-0`} />
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-base font-black text-slate-900 uppercase tracking-tight">
                {attempt.category || "Tentativa Registrada"}
              </span>
              {attempt.isLocal && (
                <span className="text-[9px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md uppercase tracking-widest">
                  Offline
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                {attempt.tipsUsed.length} Dicas
              </span>
            </div>
          </div>
        </div>
        <div className={`p-3 rounded-2xl transition-all duration-500 ${isExpanded ? 'bg-indigo-50 text-indigo-600 rotate-180' : 'text-slate-300 group-hover:text-slate-400 group-hover:bg-slate-100'}`}>
          <ChevronDown className="w-6 h-6" />
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-slate-50/30"
          >
            <div className="px-10 pb-10 pt-2 space-y-10">
              {/* Resumo da Análise */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                  Análise da Tentativa
                </h4>
                <p className="text-base text-slate-700 leading-relaxed font-semibold italic">
                  "{attempt.analysisSummary || "Análise pedagógica registrada para esta tentativa."}"
                </p>
              </div>

              {/* Dica de Ouro */}
              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3">
                <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                  Dica de Ouro Recebida
                </h4>
                <p className="text-base text-slate-900 font-black leading-relaxed">
                  {attempt.difficultyHypothesis || "Reflexão sobre o raciocínio lógico."}
                </p>
              </div>

              {/* Código Submetido */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  Código Enviado
                </h4>
                <div className="relative group/code">
                  <pre className="p-8 bg-slate-900 text-slate-300 rounded-3xl text-sm font-mono overflow-x-auto leading-relaxed border border-slate-800 max-h-80 scrollbar-thin scrollbar-thumb-slate-700">
                    <code>{attempt.code}</code>
                  </pre>
                  <div className="absolute top-6 right-6 opacity-0 group-hover/code:opacity-100 transition-opacity">
                    <span className="text-[10px] font-black text-slate-500 bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-xl uppercase tracking-widest border border-slate-700">
                      C Source
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
