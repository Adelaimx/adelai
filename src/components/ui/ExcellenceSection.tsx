import React from "react";

export function ExcellenceSection() {
  return (
    <section className="border-t border-primary/10 py-24 bg-background-light dark:bg-background-dark z-10">
      <div className="mx-auto max-w-4xl text-center px-6">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">ADELAI Heritage</span>
        <h2 className="mt-6 font-serif text-4xl font-light italic tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
          ARTESANÍA DE EXCELENCIA
        </h2>
        <div className="mx-auto mt-8 h-px w-24 bg-primary"></div>
        <p className="mt-8 text-sm leading-relaxed tracking-wide text-slate-500 max-w-2xl mx-auto uppercase">
          Cada pieza es cuidadosamente elaborada a mano por maestros joyeros, combinando técnicas tradicionales con el diseño contemporáneo más vanguardista.
        </p>
      </div>
    </section>
  );
}
