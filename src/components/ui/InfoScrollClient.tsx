"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function InfoScrollClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftItemRef = useRef<HTMLDivElement>(null);
  const centerItemRef = useRef<HTMLDivElement>(null);
  const rightItemRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial off-screen positions
    gsap.set(leftItemRef.current, { x: -100, opacity: 0 });
    gsap.set(centerItemRef.current, { y: 50, opacity: 0 });
    gsap.set(rightItemRef.current, { x: 100, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%", // When top of container hits 90% of viewport
        end: "top 40%",   // When top of container hits 40% of viewport (settled in original position)
        scrub: 1.5,
      }
    });

    // All items animate simultaneously back to original position
    tl.to(leftItemRef.current, { x: 0, opacity: 1 }, 0)
      .to(centerItemRef.current, { y: 0, opacity: 1 }, 0)
      .to(rightItemRef.current, { x: 0, opacity: 1 }, 0);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-white dark:bg-background-dark py-16 border-b border-primary/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        <div ref={leftItemRef} className="flex flex-col items-center text-center gap-4">
          <span className="material-symbols-outlined text-3xl animate-water-fill">
            water_drop
          </span>
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-1">
              RESISTENTE AL AGUA
            </h3>
            <p className="text-xs text-secondary dark:text-accent max-w-[240px] mx-auto">
              Calidad duradera diseñada para acompañarte en cada momento de tu día.
            </p>
          </div>
        </div>

        <div ref={centerItemRef} className="flex flex-col items-center text-center gap-4 border-y md:border-y-0 md:border-x border-primary/10 py-8 md:py-0 px-4">
          <span className="material-symbols-outlined text-3xl animate-shield-sparkle">
            verified_user
          </span>
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-1">
              ACERO INOXIDABLE
            </h3>
            <p className="text-xs text-secondary dark:text-accent max-w-[240px] mx-auto">
              Material premium hipoalergénico con baño de oro de 18k de alta calidad.
            </p>
          </div>
        </div>

        <div ref={rightItemRef} className="flex flex-col items-center text-center gap-4">
          <span className="material-symbols-outlined text-3xl animate-leaf-wind">
            eco
          </span>
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-1">
              DISEÑO CONSCIENTE
            </h3>
            <p className="text-xs text-secondary dark:text-accent max-w-[240px] mx-auto">
              Piezas creadas con un propósito ético y procesos de producción responsables.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
