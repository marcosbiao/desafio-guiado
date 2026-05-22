import * as React from 'react';
import { BookOpen, Zap, Clock, Code2 } from 'lucide-react';
import { Challenge } from '../../types';
import { ChallengeExamplesPanel } from './ChallengeExamplesPanel';

interface ChallengeMetadataCardProps {
  challenge: Challenge;
}

/**
 * Cartão com informações e metadados do desafio.
 */
export function ChallengeMetadataCard({ challenge }: ChallengeMetadataCardProps) {
  return (
    <div className="card-base overflow-hidden border-slate-200/60 shadow-xl shadow-slate-200/20">
      <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-200 shadow-sm">
            <BookOpen className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1.5">Enunciado do Desafio</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Leia com atenção antes de começar</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-indigo-50 rounded-xl border border-indigo-100/50 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{challenge.metadata.level}</span>
          </div>
          <div className="px-4 py-2 bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{challenge.metadata.time}</span>
          </div>
        </div>
      </div>

      <div className="p-10 space-y-10">
        {/* Descrição e Metadados Pedagógicos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 prose prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed font-medium">
              {challenge.problem}
            </p>
            
            {challenge.pedagogicalMetadata && (
              <div className="mt-8 p-6 bg-indigo-50/30 border border-indigo-100/50 rounded-2xl">
                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3">Objetivo de Aprendizagem</h4>
                <p className="text-sm text-indigo-900/70 font-semibold italic leading-relaxed">
                  {challenge.pedagogicalMetadata.learningObjective}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
              Conceitos Centrais
            </h4>
            <div className="flex flex-wrap gap-2">
              {challenge.concepts.map((concept, i) => (
                <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-600 uppercase tracking-wider shadow-sm">
                  {concept}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Requisitos e Exemplo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center">
                <Code2 className="w-4 h-4 text-slate-600" />
              </div>
              Requisitos Técnicos
            </h4>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-sm text-slate-600 font-semibold leading-relaxed">
                {challenge.metadata.requirements}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <ChallengeExamplesPanel examples={challenge.examples} />
          </div>
        </div>
      </div>
    </div>
  );
}
