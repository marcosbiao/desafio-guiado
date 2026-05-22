import * as React from 'react';
import { LogIn, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthPanelProps {
  onLogin: () => void;
}

/**
 * Painel de incentivo ao login para usuários anônimos.
 */
export function AuthPanel({ onLogin }: AuthPanelProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-xl shadow-indigo-200/50 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
        <Zap className="w-32 h-32" />
      </div>
      
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
          Turbine seu Aprendizado! <Zap className="w-6 h-6 text-yellow-300 fill-yellow-300" />
        </h2>
        <p className="text-indigo-100 mb-8 max-w-md leading-relaxed">
          O acesso aos desafios é livre! No entanto, ao fazer login você pode salvar seu progresso na nuvem, acessar seu histórico de qualquer lugar e receber feedbacks mais precisos.
        </p>
        <button
          onClick={onLogin}
          className="flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all active:scale-95 shadow-lg shadow-black/10"
        >
          <LogIn className="w-5 h-5" />
          Entrar com Google
        </button>
      </div>
    </motion.div>
  );
}
