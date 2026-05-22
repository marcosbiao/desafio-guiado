import * as React from 'react';
import { motion } from 'motion/react';
import { Zap, CheckCircle2, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { AnalysisResult } from '../../types';

interface FeedbackPanelProps {
  analysis: AnalysisResult | null;
  isAnalyzing?: boolean;
}

/**
 * Painel de feedback pedagógico gerado pela IA.
 */
export function FeedbackPanel({ analysis, isAnalyzing }: FeedbackPanelProps) {
  if (isAnalyzing) {
    return (
      <div className="card-base p-12 flex flex-col items-center justify-center text-center space-y-6 animate-pulse">
        <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center border border-indigo-100/50">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <RotateCcw className="w-10 h-10 text-indigo-600" />
          </motion.div>
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Analisando sua lógica...</h3>
          <p className="text-base text-slate-500 max-w-xs mx-auto leading-relaxed font-medium">
            Nossa IA está revisando seu código para oferecer as melhores orientações pedagógicas.
          </p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="card-base p-12 flex flex-col items-center justify-center text-center space-y-6 border-dashed bg-slate-50/30">
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center border border-slate-100 shadow-sm">
          <Zap className="w-10 h-10 text-slate-300" />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-black text-slate-400 tracking-tight">Aguardando análise</h3>
          <p className="text-base text-slate-400 max-w-xs mx-auto leading-relaxed font-medium">
            Escreva seu código e clique em "Solicitar Orientação" para receber feedback da nossa IA.
          </p>
        </div>
      </div>
    );
  }

  const hasGood = analysis.feedback.good && analysis.feedback.good.length > 0;
  const hasReview = analysis.feedback.review && analysis.feedback.review.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-base overflow-hidden border-indigo-100 shadow-xl shadow-indigo-500/10 group"
    >
      {/* Header do Feedback */}
      <div className="bg-indigo-600 px-10 py-8 flex items-center justify-between text-white">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-500">
            <Zap className="w-8 h-8 text-yellow-300 fill-yellow-300" />
          </div>
          <div className="text-left">
            <h3 id="feedback-title" className="text-2xl font-black tracking-tight leading-none mb-1.5">Orientação Pedagógica</h3>
            <p className="text-[10px] font-black text-indigo-100 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-md inline-block">
              Análise da IA Concluída
            </p>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-[10px] font-black text-indigo-100 uppercase tracking-widest block mb-1 opacity-60">Status da Tentativa</span>
          <span className="text-xl font-black text-white uppercase tracking-tight">{analysis.category || "Em Análise"}</span>
        </div>
      </div>
      
      {/* Conteúdo do Feedback */}
      <div className="p-10 space-y-12">
        {/* Resumo e Próximo Passo Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-3">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
              O que a IA observou
            </h4>
            <p className="text-slate-700 font-semibold leading-relaxed italic text-lg">
              "{analysis.analysisSummary || "A IA analisou seu código e preparou orientações para ajudar no seu progresso."}"
            </p>
          </div>
          <div className="p-8 bg-indigo-50/50 rounded-3xl border border-indigo-100/50 space-y-3">
            <h4 className="text-xs font-black text-indigo-500 uppercase tracking-widest flex items-center gap-2">
              <ArrowRight className="w-3 h-3" />
              Próximo Passo Sugerido
            </h4>
            <p className="text-indigo-900 font-black leading-relaxed text-lg">
              {analysis.suggestedNextStep || "Continue refinando sua lógica e revise os conceitos do desafio."}
            </p>
          </div>
        </div>

        {/* Pontos Positivos e de Atenção */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Pontos Positivos */}
          <div className="space-y-6">
            <h4 className="flex items-center gap-3 text-emerald-700 font-black text-sm uppercase tracking-widest">
              <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              Pontos Positivos
            </h4>
            {hasGood ? (
              <div className="space-y-4">
                {analysis.feedback.good.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 group/item transition-all hover:bg-emerald-50">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 shrink-0" />
                    <p className="text-base text-emerald-900 font-semibold leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-400 italic font-medium">
                Continue trabalhando no seu código para desbloquear feedbacks positivos!
              </div>
            )}
          </div>

          {/* O que revisar */}
          <div className="space-y-6">
            <h4 className="flex items-center gap-3 text-amber-700 font-black text-sm uppercase tracking-widest">
              <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-amber-600" />
              </div>
              O que você pode melhorar
            </h4>
            {hasReview ? (
              <div className="space-y-4">
                {analysis.feedback.review.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-5 bg-amber-50/50 rounded-2xl border border-amber-100/50 group/item transition-all hover:bg-amber-50">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 shrink-0" />
                    <p className="text-base text-amber-900 font-semibold leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-sm text-emerald-700 font-bold">
                Excelente! Não identificamos pontos críticos de revisão nesta tentativa.
              </div>
            )}
          </div>
        </div>

        {/* Dica de Ouro (Hipótese) */}
        <div className="pt-10 border-t border-slate-100">
          <div className="p-8 bg-slate-50/80 rounded-3xl border border-slate-100 group/step transition-all hover:bg-slate-50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-200 shadow-sm group-hover/step:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Dica de Ouro</h4>
                <p className="text-sm font-bold text-slate-900">Hipótese de Dificuldade</p>
              </div>
            </div>
            <p className="text-slate-700 font-bold leading-relaxed italic text-lg mb-4">
              "{analysis.difficultyHypothesis || "Reflita sobre como os dados fluem no seu programa."}"
            </p>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <ArrowRight className="w-4 h-4" />
              <span>{analysis.feedback.nextStep || "Tente corrigir o ponto principal antes de enviar novamente."}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
