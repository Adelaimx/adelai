import Image from 'next/image';
import { CategoryHero } from '@/components/ui/CategoryHero';
import { NosotrosStoryScrollClient } from '@/components/ui/NosotrosStoryScrollClient';
import { NosotrosContactForm } from '@/components/ui/NosotrosContactForm';
import { HashScroller } from '@/components/ui/HashScroller';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nosotros | ADELAI',
  description: 'Conoce la historia detrás de ADELAI. Joyería minimalista, consciente y atemporal para la mujer moderna.',
  alternates: {
    canonical: '/nosotros',
  },
};

export default function NosotrosPage() {
  const shopifyDomain =
    process.env.SHOPIFY_STORE_DOMAIN || 'adelai-3.myshopify.com';

  return (
    <div className="relative flex min-h-screen flex-col -mt-20">
      {/* Hero Section */}
      <CategoryHero 
        categoryTitle="Nuestra Historia" 
        imageUrl="/encabezados/Encabezado_Nostros.jpeg" 
      />

      {/* Star Wars Text Scroll Animation */}
      <NosotrosStoryScrollClient />

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="aspect-[4/5] overflow-hidden rounded-lg relative">
              <Image
                fill
                className="object-cover"
                alt="Artisanal jeweler working on a delicate gold piece"
                src="/escencia.jpg"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-80 hidden lg:block border border-[#b4afa7]/30 -z-10 translate-x-4 translate-y-4"></div>
          </div>

          <div className="order-1 md:order-2 space-y-8">
            <span className="text-primary font-medium tracking-[0.3em] uppercase text-xs">
              Artesanía & Legado
            </span>
            <h3 className="font-serif text-4xl md:text-5xl text-slate-900 dark:text-primary italic leading-tight">
              La esencia detrás de cada destello.
            </h3>
            <div className="space-y-6 text-[#8a8786] dark:text-primary-300 leading-relaxed text-lg font-light">
              <p>
                ADELAI es una marca de joyería pensada para acompañarte todos
                los días, creemos en la belleza de lo simple, en los detalles
                que elevan y en piezas que se sienten tan naturales como tú.
                Cada diseño combina elegancia atemporal con estilo moderno y
                minimalista, creando joyas versátiles que puedes usar desde lo
                cotidiano hasta lo especial. <br /> <br /> Son piezas que no
                buscan llamar la atención.... pero la atraen. <br /> <br /> Más
                que accesorios, son pequeños recordatorios de lo especial que
                eres, incluso en los días más simples. <br /> <br /> ADELAI -
                Everything Shine
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                <div className="space-y-3">
                  <h4 className="text-slate-900 dark:text-primary font-semibold tracking-wide uppercase text-sm">
                    Waterproof
                  </h4>
                  <p className="text-sm">
                    Innovamos con materiales resistentes que te permiten llevar
                    la elegancia incluso en los momentos más espontáneos, sin
                    miedo al paso del tiempo o el agua.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-slate-900 dark:text-primary font-semibold tracking-wide uppercase text-sm">
                    Artesanía
                  </h4>
                  <p className="text-sm">
                    Nuestros maestros joyeros esculpen a mano cada detalle,
                    asegurando que no existan dos piezas idénticas. Calidad que
                    se siente al tacto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="bg-primary/5 py-32 px-6 border-t border-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-serif text-4xl text-slate-900 dark:text-primary mb-4">
            Escríbenos
          </h3>
          <p className="text-[#8a8786] dark:text-primary-300 font-light mb-12">
            ¿Tienes alguna duda o deseas una pieza personalizada? Estamos aquí
            para atenderte.
          </p>

          <NosotrosContactForm />
        </div>
      </section>
      
      <HashScroller />
    </div>
  );
}
