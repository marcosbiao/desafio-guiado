import * as React from 'react';
import { Code2, RotateCcw, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-c';
import 'prismjs/themes/prism-tomorrow.css';

interface CodeEditorPanelProps {
  code: string;
  setCode: (code: string) => void;
  onVerify: () => void;
  onReset: () => void;
  onCancelReset: () => void;
  onInitiateReset: () => void;
  showResetConfirm: boolean;
  isAnalyzing: boolean;
  hasChangesSinceLastAnalysis: boolean;
}

/**
 * Painel do editor de código com realce de sintaxe e ações de reset/verificação.
 */
export function CodeEditorPanel({ 
  code, 
  setCode, 
  onVerify, 
  onReset, 
  onCancelReset,
  onInitiateReset,
  showResetConfirm,
  isAnalyzing,
  hasChangesSinceLastAnalysis 
}: CodeEditorPanelProps) {
  const highlightWithPrism = (code: string) => {
    return Prism.highlight(code, Prism.languages.c, 'c');
  };

  return (
    <div className="card-base flex flex-col h-full overflow-hidden group focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-500/5 relative">
      {/* Header do Editor */}
      <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100/50">
            <Code2 className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <label htmlFor="code-editor" className="text-sm font-bold text-slate-900 tracking-tight uppercase tracking-widest block">
              Editor de Código C
            </label>
            {hasChangesSinceLastAnalysis && (
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                Rascunho com alterações não analisadas
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onInitiateReset}
          title="Resetar código"
          aria-label="Resetar código para o modelo inicial"
          className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all active:scale-90 focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Overlay de Confirmação de Reset */}
      {showResetConfirm && (
        <div className="absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-8">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full space-y-6 border border-slate-100"
          >
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto border border-amber-100">
              <RotateCcw className="w-8 h-8 text-amber-600" />
            </div>
            <div className="text-center space-y-2">
              <h4 className="text-xl font-black text-slate-900 tracking-tight">Resetar Código?</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Seu rascunho atual será perdido e o código voltará ao modelo inicial do desafio.
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={onCancelReset}
                className="flex-1 px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={onReset}
                className="flex-1 px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/20"
              >
                Confirmar
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Área do Editor com Realce de Sintaxe */}
      <div className="relative flex-1 bg-[#2d2d2d] overflow-auto custom-scrollbar">
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={highlightWithPrism}
          padding={32}
          textareaId="code-editor"
          placeholder="// Escreva seu código C aqui..."
          className="font-mono text-[15px] min-h-full"
          style={{
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            fontSize: 15,
            backgroundColor: 'transparent',
            color: '#ccc',
          }}
        />
        
        {/* Botão de Verificação Flutuante */}
        <div className="absolute bottom-8 right-8 flex flex-col items-end gap-4 pointer-events-none">
          {!isAnalyzing && (
            <div className="bg-slate-800/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl border border-slate-700 shadow-xl text-[10px] font-bold text-indigo-300 uppercase tracking-widest max-w-[220px] text-right leading-relaxed border-l-4 border-l-indigo-500">
              Revise se sua solução trata todos os casos do problema antes de enviar.
            </div>
          )}
          
          <button
            onClick={onVerify}
            disabled={isAnalyzing}
            aria-busy={isAnalyzing}
            className={`
              pointer-events-auto flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-2xl
              ${isAnalyzing 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed shadow-none' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/30 hover:-translate-y-0.5'
              }
            `}
          >
            {isAnalyzing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <RotateCcw className="w-5 h-5" />
                </motion.div>
                Analisando...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 fill-current" />
                Solicitar Orientação
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
