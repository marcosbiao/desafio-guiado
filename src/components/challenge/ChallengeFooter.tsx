import * as React from 'react';
import { Info } from 'lucide-react';

/**
 * Rodapé informativo sobre transparência pedagógica e pesquisa.
 */
export function PedagogicalTransparencyFooter() {
  return (
    <footer className="max-w-7xl mx-auto px-6 pb-12">
      <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-500" />
          Transparência e Pesquisa
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-slate-500 font-medium leading-relaxed">
          <p>
            <strong className="text-slate-700 block mb-1">Coleta de Dados:</strong>
            Suas interações e tentativas são registradas para fins de acompanhamento pedagógico e pesquisa educacional. Isso nos ajuda a entender como você aprende.
          </p>
          <p>
            <strong className="text-slate-700 block mb-1">Análise por IA:</strong>
            O feedback é gerado por Inteligência Artificial (Gemini). As hipóteses de dificuldade e categorias são inferências automáticas para guiar seu estudo.
          </p>
          <p>
            <strong className="text-slate-700 block mb-1">Rastreabilidade:</strong>
            Cada análise registra a versão do sistema e do modelo utilizado, garantindo a validade metodológica dos dados coletados para estudos futuros.
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * Aviso de privacidade simplificado para o contexto do desafio.
 */
export function PrivacyNotice() {
  return (
    <div className="p-8 bg-indigo-50/30 border border-indigo-100/50 rounded-3xl flex items-start gap-5 text-indigo-900/40 shadow-sm">
      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
        <Info className="w-5 h-5 text-indigo-400" />
      </div>
      <p className="text-xs leading-relaxed font-semibold italic">
        Seu código será analisado por uma Inteligência Artificial para fins pedagógicos. 
        Suas tentativas são salvas para que você possa acompanhar sua evolução.
      </p>
    </div>
  );
}
