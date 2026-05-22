import * as React from 'react';
import { motion } from 'motion/react';
import { Code2 } from 'lucide-react';

/**
 * Componente de carregamento para estados iniciais.
 */
export function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mb-4"
      >
        <Code2 className="w-12 h-12 text-indigo-600" />
      </motion.div>
      <p className="text-gray-600 font-medium animate-pulse">Carregando ambiente pedagógico...</p>
    </div>
  );
}
