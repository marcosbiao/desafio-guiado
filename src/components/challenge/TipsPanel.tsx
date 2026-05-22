import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, ChevronDown, ChevronUp, Zap, CheckCircle2, Info } from 'lucide-react';
import { Challenge } from '../../types';

interface TipsPanelProps {
  challenge: Challenge;
  usedTips: number[];
  onUseTip: (tipId: number) => void;
}

/**
 * Painel de dicas do desafio com controle de visibilidade e progressão pedagógica.
 */
export function TipsPanel({ challenge, usedTips, onUseTip }: TipsPanelProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const totalTips = challenge.tips.length;
  const usedCount = usedTips.length;

  return (
    <div className="card-base overflow-hidden border-amber-100/50 shadow-xl shadow-amber-500/5 group">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-10 py-8 flex items-center justify-between hover:bg-amber-50/30 transition-all duration-500"
      >
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-100 group-hover:scale-110 transition-transform duration-500">
            <Lightbulb className="w-8 h-8 text-amber-600 fill-amber-100" />
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1.5">Apoio Pedagógico</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dicas para destravar seu raciocínio</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="hidden sm:flex gap-1.5">
            {Array.from({ length: totalTips }).map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  usedTips.includes(challenge.tips[i].id) ? 'bg-amber-500 scale-125' : 'bg-slate-200'
                }`} 
              />
            ))}
          </div>
          <div className={`p-3 rounded-2xl transition-all duration-500 ${isExpanded ? 'bg-amber-100 text-amber-700 rotate-180' : 'text-slate-300 group-hover:text-amber-400 group-hover:bg-amber-50'}`}>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-amber-50/10"
          >
            <div className="px-10 pb-10 space-y-8">
              <div className="p-6 bg-amber-50/50 border border-amber-100 rounded-3xl flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-amber-200 shrink-0 shadow-sm">
                  <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                </div>
                <p className="text-sm text-amber-900/70 font-semibold italic leading-relaxed">
                  "Tente resolver o problema sozinho primeiro. Use as dicas apenas se precisar de um empurrãozinho para avançar no seu código."
                </p>
              </div>

              <div className="space-y-6">
                {challenge.tips.map((tip, index) => {
                  const isUsed = usedTips.includes(tip.id);
                  return (
                    <div key={tip.id} className={`p-8 rounded-3xl border transition-all duration-500 ${
                      isUsed 
                        ? 'bg-white border-amber-200 shadow-lg shadow-amber-500/5' 
                        : 'bg-slate-50/50 border-slate-100 opacity-60'
                    }`}>
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-500 ${
                              isUsed ? 'bg-amber-600 text-white scale-110 shadow-lg shadow-amber-600/20' : 'bg-slate-200 text-slate-500'
                            }`}>
                              {index + 1}
                            </div>
                            <h4 className={`font-black text-sm uppercase tracking-widest ${isUsed ? 'text-amber-900' : 'text-slate-400'}`}>
                              Dica de Apoio
                            </h4>
                          </div>
                          {isUsed ? (
                            <div className="space-y-3">
                              <p className="text-amber-900 text-base leading-relaxed font-semibold">{tip.text}</p>
                              {tip.pedagogicalGoal && (
                                <div className="flex items-center gap-2 text-[10px] font-black text-amber-600/60 uppercase tracking-widest bg-amber-100/30 w-fit px-3 py-1 rounded-lg">
                                  <Info className="w-3 h-3" />
                                  Meta: {tip.pedagogicalGoal}
                                </div>
                              )}
                            </div>
                          ) : (
                            <p className="text-slate-400 text-sm italic font-medium">Esta dica está oculta para incentivar seu raciocínio inicial.</p>
                          )}
                        </div>
                        {!isUsed && (
                          <button
                            onClick={() => onUseTip(tip.id)}
                            className="px-6 py-3 bg-amber-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/20 active:scale-95 flex items-center gap-2"
                          >
                            <Zap className="w-3.5 h-3.5 fill-current" />
                            Revelar
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {usedCount === totalTips && (
                <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-emerald-200 shrink-0 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <p className="text-sm text-emerald-900 font-black leading-relaxed">
                    Você já utilizou todo o apoio disponível. Confie na sua lógica e envie para análise!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
