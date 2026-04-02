import Image from "next/image";

export default function NosotrosPage() {
  return (
    <div className="relative flex min-h-screen flex-col -mt-20">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-end pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black/20">
          <Image
            fill
            className="object-cover -z-10 mix-blend-overlay"
            alt="Editorial close up of high-end gold jewelry on a model"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5txGvV8rZI5ntRLvvsdDZW-3mcvsUVazLE44ZxGeXf9JbeM-Zvfb86u2WfPvfLesml4PHMAFXWEConNO6D34uChcyIbViAZ8cLNMQq77U2lG64xifqs1RhvuevuAFnU7Pgj9eADA-4gOlcRzJeeq7yMwJOtbPhp3NKJClHc1hWAD07hXpIrI_EC4sT0rlBvLbSq0jtTv3QgQ1Marybf7CzI78x7SCeqCuiuXksbD7rIQz2C-XPMrkSQbDJpf1ODcW92WyGjgO7mM"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h2 className="font-serif text-5xl md:text-7xl font-light tracking-[0.2em] uppercase">
            Nuestra Historia
          </h2>
          <div className="w-16 h-[1px] bg-white mx-auto mt-8"></div>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="aspect-[4/5] overflow-hidden rounded-lg relative">
              <Image
                fill
                className="object-cover"
                alt="Artisanal jeweler working on a delicate gold piece"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTbNgGqivhNwrXCmBCl1aY6P-Qp3aZ4Dw2EDsL2fzEIW7cBX6AvuwE_eBXy746EzmiWiu1ygypgLPv7eFPg_wNKmmEUeHVXxUtGiduZ_U8mSabLm6TyS8E-7-ws9Gwc_YBVMH6ztOb-NNPa1NgsUw8ymmcw1ZMMxdnsW_3xDc_IWP9UI6b_H4kx3gI0hEVGBnupRUPgnWtbPgnt1vPy5WmWbNdpdyc69tWvkasGl3rAZgMC7Ya2_PXPMYgxliTli0TpFypQfMrxiY"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-80 hidden lg:block border border-[#b4afa7]/30 -z-10 translate-x-4 translate-y-4"></div>
          </div>
          
          <div className="order-1 md:order-2 space-y-8">
            <span className="text-primary font-medium tracking-[0.3em] uppercase text-xs">
              Artesanía & Legado
            </span>
            <h3 className="font-serif text-4xl md:text-5xl text-slate-900 dark:text-white italic leading-tight">
              La esencia detrás de cada destello.
            </h3>
            <div className="space-y-6 text-[#8a8786] dark:text-slate-300 leading-relaxed text-lg font-light">
              <p>
                Fundada bajo la premisa de que la joyería debe ser una extensión del ser, ADELAI nace para redefinir el lujo cotidiano. Cada pieza es un testimonio de nuestra dedicación a la excelencia técnica y la visión artística.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                <div className="space-y-3">
                  <h4 className="text-slate-900 dark:text-white font-semibold tracking-wide uppercase text-sm">Waterproof</h4>
                  <p className="text-sm">Innovamos con materiales resistentes que te permiten llevar la elegancia incluso en los momentos más espontáneos, sin miedo al paso del tiempo o el agua.</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-slate-900 dark:text-white font-semibold tracking-wide uppercase text-sm">Artesanía</h4>
                  <p className="text-sm">Nuestros maestros joyeros esculpen a mano cada detalle, asegurando que no existan dos piezas idénticas. Calidad que se siente al tacto.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-primary/5 py-32 px-6 border-t border-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-serif text-4xl text-slate-900 dark:text-white mb-4">Escríbenos</h3>
          <p className="text-[#8a8786] dark:text-slate-400 font-light mb-12">
            ¿Tienes alguna duda o deseas una pieza personalizada? Estamos aquí para atenderte.
          </p>
          
          <form className="space-y-6 text-left bg-white dark:bg-background-dark p-8 md:p-12 rounded-xl shadow-sm border border-primary/10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-slate-700 dark:text-slate-300">Nombre</label>
                <input 
                  className="w-full border-0 border-b border-primary/20 bg-transparent py-3 focus:ring-0 focus:outline-none focus:border-primary transition-colors placeholder:text-slate-400 dark:text-white" 
                  placeholder="Tu nombre" 
                  type="text"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-slate-700 dark:text-slate-300">Email</label>
                <input 
                  className="w-full border-0 border-b border-primary/20 bg-transparent py-3 focus:ring-0 focus:outline-none focus:border-primary transition-colors placeholder:text-slate-400 dark:text-white" 
                  placeholder="hola@ejemplo.com" 
                  type="email"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-slate-700 dark:text-slate-300">Mensaje</label>
              <textarea 
                className="w-full border-0 border-b border-primary/20 bg-transparent py-3 focus:ring-0 focus:outline-none focus:border-primary transition-colors placeholder:text-slate-400 resize-none dark:text-white" 
                placeholder="¿En qué podemos ayudarte?" 
                rows={4}
              ></textarea>
            </div>
            
            <div className="pt-6">
              <button 
                className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all tracking-widest uppercase text-sm" 
                type="button"
              >
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
