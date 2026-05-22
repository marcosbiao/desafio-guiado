import * as React from 'react';
import { LogOut, User as UserIcon } from 'lucide-react';
import { UserProfile } from '../../types';

interface UserBadgeProps {
  user: UserProfile;
  onLogout: () => void;
}

/**
 * Badge de identificação do usuário autenticado.
 */
export function UserBadge({ user, onLogout }: UserBadgeProps) {
  return (
    <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-2 pr-4 rounded-2xl border border-gray-100 shadow-sm group">
      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center overflow-hidden border border-indigo-100 group-hover:scale-105 transition-transform">
        {user.photoURL ? (
          <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <UserIcon className="w-5 h-5 text-indigo-600" />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-gray-900 leading-none mb-1">{user.displayName || 'Estudante'}</span>
        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-1.5 py-0.5 rounded-md self-start">
          {user.role}
        </span>
      </div>
      <button
        onClick={onLogout}
        title="Sair"
        className="ml-2 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-90"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}
