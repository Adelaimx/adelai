'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Aquí puedes integrar servicios como Sentry para loggear errores
    console.error('Error no controlado capturado por Adelai:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center py-20">
      <div className="w-20 h-20 mb-8 rounded-full bg-red-50 dark:bg-red-900/10 flex items-center justify-center border border-red-100 dark:border-red-900/30">
        <span className="material-symbols-outlined text-4xl text-red-400">
          error
        </span>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mb-6">
        Algo no salió como esperábamos
      </h1>
      
      <p className="text-secondary max-w-md mb-12 text-lg leading-relaxed font-light">
        Tuvimos un inconveniente técnico al intentar cargar esta página. Nuestro equipo ha sido notificado, pero puedes intentar recargar.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <button
          onClick={() => reset()}
          className="px-8 py-4 bg-white dark:bg-transparent border border-primary/20 text-primary dark:text-white font-bold uppercase tracking-widest text-xs rounded-full transition-all duration-300 hover:border-primary hover:bg-primary/5 active:scale-95"
        >
          Intentar de nuevo
        </button>
        <Link 
          href="/"
          className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-full transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
        >
          Regresar al Inicio
        </Link>
      </div>
    </div>
  );
}
