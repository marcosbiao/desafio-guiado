import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Challenge } from '../../types';

interface CommonErrorsPanelProps {
  challenge: Challenge;
  isExpanded: boolean;
  onToggle: () => void;
}

/**
 * Painel de erros comuns do desafio com controle de visibilidade e design aprimorado.
 */
export function CommonErrorsPanel({ challenge, isExpanded, onToggle }: CommonErrorsPanelProps) {
  return (
    <div className="card-base overflow-hidden border-red-100/30 shadow-xl shadow-red-500/5 group">
      <button
        onClick={onToggle}
        className="w-full px-10 py-8 flex items-center justify-between hover:bg-red-50/20 transition-all duration-500"
      >
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center border border-red-100 group-hover:scale-110 transition-transform duration-500">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <div className="text-left">
            <h3 id="common-errors-title" className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1.5">Erros Comuns</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">O que evitar no seu código</p>
          </div>
        </div>
        <div className={`p-3 rounded-2xl transition-all duration-500 ${isExpanded ? 'bg-red-100 text-red-700 rotate-180' : 'text-slate-300 group-hover:text-red-400 group-hover:bg-red-50'}`}>
          <ChevronDown className="w-6 h-6" />
        </div>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-red-50/10"
          >
            <div className="px-10 pb-10 space-y-6">
              {challenge.commonErrors.map((error, index) => (
                <div key={index} className="p-8 bg-white rounded-3xl border border-red-100/50 shadow-sm space-y-4 group/error transition-all hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    </div>
                    <h4 className="text-sm font-black text-red-900 uppercase tracking-widest">{error.title}</h4>
                  </div>
                  <p className="text-base text-slate-700 font-semibold leading-relaxed italic">
                    "{error.description}"
                  </p>
                  {error.pedagogicalAdvice && (
                    <div className="p-4 bg-red-50/50 border border-red-100/50 rounded-2xl">
                      <p className="text-xs text-red-900/70 font-bold leading-relaxed">
                        <span className="uppercase tracking-widest text-[9px] block mb-1 opacity-50">Conselho Pedagógico:</span>
                        {error.pedagogicalAdvice}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
