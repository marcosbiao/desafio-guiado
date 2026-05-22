import * as React from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Challenge, UserProfile } from '../../types';
import { UserBadge } from '../auth/UserBadge';

interface ChallengeHeaderProps {
  challenge: Challenge;
  user: UserProfile | null;
  onBack: () => void;
  onLogout: () => void;
}

/**
 * Header da página de desafio com navegação e perfil.
 */
export function ChallengeHeader({ challenge, user, onBack, onLogout }: ChallengeHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={onBack}
            aria-label="Voltar para a lista de desafios"
            className="group p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all active:scale-90 focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100/50 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1.5">{challenge.title}</h1>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-md">
                  {challenge.metadata.level}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {challenge.metadata.time}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {user && <UserBadge user={user} onLogout={onLogout} />}
      </div>
    </header>
  );
}
