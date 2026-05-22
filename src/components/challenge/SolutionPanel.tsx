import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronDown, ChevronUp, Code2, AlertTriangle, Zap } from 'lucide-react';
import { Challenge } from '../../types';

interface SolutionPanelProps {
  challenge: Challenge;
  isExpanded: boolean;
  onToggle: () => void;
}

/**
 * Painel que exibe a solução sugerida para o desafio com controle de visibilidade e design aprimorado.
 */
export function SolutionPanel({ challenge, isExpanded, onToggle }: SolutionPanelProps) {
  return (
    <div className="card-base overflow-hidden border-emerald-100/30 shadow-xl shadow-emerald-500/5 group">
      <button
        onClick={onToggle}
        className="w-full px-10 py-8 flex items-center justify-between hover:bg-emerald-50/20 transition-all duration-500"
      >
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100 group-hover:scale-110 transition-transform duration-500">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <div className="text-left">
            <h3 id="solution-title" className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1.5">Solução Sugerida</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Apenas para conferência final</p>
          </div>
        </div>
        <div className={`p-3 rounded-2xl transition-all duration-500 ${isExpanded ? 'bg-emerald-100 text-emerald-700 rotate-180' : 'text-slate-300 group-hover:text-emerald-400 group-hover:bg-emerald-50'}`}>
          <ChevronDown className="w-6 h-6" />
        </div>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-emerald-50/10"
          >
            <div className="px-10 pb-10 space-y-8">
              <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-amber-200 shrink-0 shadow-sm">
                  <AlertTriangle className="w-5 h-5 text-amber-500 fill-amber-500" />
                </div>
                <p className="text-sm text-amber-900/70 font-semibold italic leading-relaxed">
                  "Use a solução apenas para comparar com o seu raciocínio. O aprendizado real acontece quando você tenta resolver por conta própria!"
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                  Lógica Esperada
                </h4>
                <div className="p-6 bg-emerald-50/50 border border-emerald-100/50 rounded-3xl">
                  <p className="text-sm text-emerald-900/70 font-semibold italic leading-relaxed">
                    {challenge.orientation.expectedLogic}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  Implementação de Referência
                </h4>
                <div className="relative group/code">
                  <pre className="p-8 bg-slate-900 text-slate-300 rounded-3xl text-sm font-mono overflow-x-auto leading-relaxed border border-slate-800 max-h-80 scrollbar-thin scrollbar-thumb-slate-700">
                    <code>{challenge.solution}</code>
                  </pre>
                  <div className="absolute top-6 right-6 opacity-0 group-hover/code:opacity-100 transition-opacity">
                    <span className="text-[10px] font-black text-slate-500 bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-xl uppercase tracking-widest border border-slate-700">
                      C Solution
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
