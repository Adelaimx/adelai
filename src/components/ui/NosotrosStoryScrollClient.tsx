'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function NosotrosStoryScrollClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>('.story-slide');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${slides.length * 100}%`, // Dynamic scroll length based on number of slides
          scrub: 1,
          pin: true,
        },
      });

      slides.forEach((slide, i) => {
        // Enter animation: from bottom
        tl.fromTo(
          slide,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
        );

        // Exit animation: to top (except for the last one which just stays)
        if (i !== slides.length - 1) {
          tl.to(
            slide,
            { y: -100, opacity: 0, duration: 1, ease: 'power2.in' },
            '+=0.5' // Time to read before it exits
          );
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="w-full">
      <section
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden bg-transparent flex items-center justify-center"
      >
        <div className="relative w-full max-w-4xl px-6 h-full flex items-center justify-center text-center text-slate-800 dark:text-primary-100 font-serif text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed tracking-wide">
          
          {/* Slide 1 */}
          <div className="story-slide absolute w-full opacity-0">
            <span className="block mb-8 font-bold text-primary tracking-[0.2em] uppercase text-xl md:text-2xl">
              ADELAI
            </span>
            <p>
              nace de un momento en que entendimos que la belleza no siempre
              está en lo extraordinario, sino en lo que se vive todos los días.
              Inspirada en el nombre de alguien que cambió todo, Adelai
              representa amor, fuerza y nuevos comienzos.
            </p>
          </div>

          {/* Slide 2 */}
          <div className="story-slide absolute w-full opacity-0">
            <p>
              Es un recordatorio constante de que lo más valioso no es lo que se
              guarda para ocasiones especiales, sino lo que decides usar, sentir
              y vivir cada día. Creamos joyería pensada para acompañarte
              siempre: piezas resistentes, versátiles y atemporales que se
              integran a tu vida sin esfuerzo.
            </p>
          </div>

          {/* Slide 3 */}
          <div className="story-slide absolute w-full opacity-0">
            <p>
              Por que hay momentos que transforman tu vida y hay pequeños
              detalles que te ayudan a recordarlo todos los días. Adelai es
              eso, un pedacito de luz, de amor y de significado que llevas
              contigo.
            </p>
            <span className="italic block mt-8 text-primary/80">
              - Adelai
            </span>
          </div>

        </div>
      </section>
    </div>
  );
}
