import * as React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

/**
 * Componente para exibição de erros críticos.
 */
export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 max-w-md w-full">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Ops! Algo deu errado</h2>
        <p className="text-gray-600 mb-8">{message}</p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Tentar Novamente
          </button>
        )}
      </div>
    </div>
  );
}
