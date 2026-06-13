'use client';

import { useState } from 'react';
import { sendContactEmail } from '@/app/actions/contact';

export function NosotrosContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await sendContactEmail({ name, email, message });

      if (response.error) {
        console.error('Error enviando formulario:', response.error);
        setStatus('error');
        return;
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error enviando formulario:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-left bg-white dark:bg-background-dark p-8 md:p-12 rounded-xl shadow-sm border border-primary/10 relative"
    >
      {status === 'success' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm rounded-xl text-center px-6">
          <span className="material-symbols-outlined text-green-500 text-5xl mb-4">
            check_circle
          </span>
          <h4 className="font-serif text-2xl text-slate-900 dark:text-primary mb-2">
            ¡Mensaje enviado!
          </h4>
          <p className="text-slate-600 dark:text-primary-300">
            Gracias por escribirnos. Nos pondremos en contacto contigo pronto.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-6 border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary/5 transition-colors uppercase text-xs tracking-widest font-bold cursor-pointer"
          >
            Enviar otro mensaje
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-slate-700 dark:text-slate-300">
            Nombre
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-0 border-b border-primary/20 bg-transparent py-3 focus:ring-0 focus:outline-none focus:border-primary transition-colors placeholder:text-slate-400 dark:text-primary"
            placeholder="Tu nombre"
            type="text"
            name="contact[name]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-slate-700 dark:text-slate-300">
            Email
          </label>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-0 border-b border-primary/20 bg-transparent py-3 focus:ring-0 focus:outline-none focus:border-primary transition-colors placeholder:text-slate-400 dark:text-primary"
            placeholder="hola@ejemplo.com"
            type="email"
            name="contact[email]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest font-bold text-slate-700 dark:text-slate-300">
          Mensaje
        </label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border-0 border-b border-primary/20 bg-transparent py-3 focus:ring-0 focus:outline-none focus:border-primary transition-colors placeholder:text-slate-400 resize-none dark:text-primary"
          placeholder="¿En qué podemos ayudarte?"
          rows={4}
          name="contact[body]"
        ></textarea>
      </div>

      {status === 'error' && (
        <p className="text-red-500 text-sm">
          Ocurrió un error al enviar tu mensaje. Por favor intenta de nuevo más tarde.
        </p>
      )}

      <div className="pt-6">
        <button
          disabled={isSubmitting}
          className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all tracking-widest uppercase text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          type="submit"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined animate-spin text-sm">
                progress_activity
              </span>
              Enviando...
            </>
          ) : (
            'Enviar Mensaje'
          )}
        </button>
      </div>
    </form>
  );
}
