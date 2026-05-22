import * as React from 'react';
import { Terminal, ArrowRight } from 'lucide-react';
import { ChallengeExample } from '../../types';

interface ChallengeExamplesPanelProps {
  examples: ChallengeExample[];
}

/**
 * Componente que exibe exemplos de entrada e saída para o desafio em formato de tabela.
 */
export function ChallengeExamplesPanel({ examples }: ChallengeExamplesPanelProps) {
  if (!examples || examples.length === 0) return null;

  return (
    <div className="space-y-6">
      <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
        <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center">
          <Terminal className="w-4 h-4 text-slate-600" />
        </div>
        Exemplos de Entrada e Saída
      </h4>
      
      <div className="overflow-hidden rounded-2xl border border-slate-200/60 shadow-sm bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/60">
              <th className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest border-r border-slate-200/60">Entrada</th>
              <th className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">Saída Esperada</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {examples.slice(0, 3).map((example, index) => (
              <tr key={index} className="hover:bg-slate-50/30 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-emerald-600 bg-slate-50/20 border-r border-slate-100">{example.input}</td>
                <td className="px-4 py-3 font-mono text-xs text-indigo-600">{example.output}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {examples.some(ex => ex.description) && (
        <div className="space-y-2">
          {examples.slice(0, 3).filter(ex => ex.description).map((ex, i) => (
            <p key={i} className="text-[10px] text-slate-400 font-medium italic leading-relaxed">
              * {ex.description}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
