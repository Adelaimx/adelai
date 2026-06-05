'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { TransitionLink as Link } from '@/components/ui/TransitionLink';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroScrollClientProps {
  regaloProduct: any;
  regalosExclusivosCollection: any;
}

export function HeroScrollClient({
  regaloProduct,
  regalosExclusivosCollection,
}: HeroScrollClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const promoRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 1. Pin the background while we scroll past the hero
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      pin: bgRef.current,
      pinSpacing: false,
    });

    // 2. Text fades out and moves up (scrubbed with scroll)
    gsap.to(textRef.current, {
      y: -200,
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  return (
    <div className="relative w-full -mt-20">
      {/* 1. Hero Container (100vh) */}
      <div
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Pinned Background with Two Images */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full z-0 flex flex-col md:flex-row"
        >
          <div className="absolute inset-0 hero-gradient z-10 pointer-events-none"></div>

          <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden relative">
            <Image
              fill
              className="object-cover"
              alt="Colección ADELAI Joyería Minimalista - Modelo elegante con collar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCToxH35ucCQhFBR_r_PVV4aM-nURecRbVk4ZUm_JB4NiuQVinUKPs49dhFR1TnuSCvL8WTuD05yW7NNqb7vGc-3NLTnJiRnGHUMLTkVO5RBq2lsYzpRr9gZlKntYeFbBfwJZEPo6e1iixjChM_pHc6xm8riwW5pfSf3_ECxymmYLXLkM_9V5J3RJy4ZSiACUQ4fFT9otH5rPoKRjcNsn9Ad64Rq4s4ssnpKHAOjfyylEAJ3L9MJWsHiN6uQ0CPrWMoIaOWzEqqrMg"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden relative">
            <Image
              fill
              className="object-cover"
              alt="Detalle de Joyería ADELAI - Pendientes de oro en primer plano"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1_lj_a6B6k-Jg32qXpsslhM46PNKs4A68vrQKyi9b8aQDfqtZtTfX_h3uaEuZhq4ghJ1apum2ZwFbEKFLtZOPedpvypnQLwCKIh6Z4XJB203XAXeFAMBD2RGeF4IJdvG9njtAUjlMnlyW13FJ9rJU_-UrjCptFoi4E3nO_Kf_sGi0A-gMeaoGrSaxy4z7Dd_656W9PCmO5Dmx1dAf4m_LyrSkuj-EFDxg5g4ykpcLRBMFuFTFEUoo_DRJblKRfiO4kvrsbKev2fM"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Text Overlay (Moves up) */}
        <div
          ref={textRef}
          className="absolute inset-0 z-20 flex flex-col items-center text-center text-white px-6 justify-end pb-20 pointer-events-none"
        >
          <h2 className="font-serif italic opacity-90 drop-shadow-md text-[10px] md:text-xs mb-2 tracking-[0.2em] uppercase text-white font-semibold">
            Disponible Ahora
          </h2>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tighter mb-6 uppercase drop-shadow-lg">
            Nueva Colección
          </h1>
        </div>
      </div>

      {/* 2. Promo Section (Naturally flows over the pinned hero background) */}
      <section className="relative w-full bg-[#b3a496] z-30 border-b border-primary/10 flex flex-col justify-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] border border-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white/60 rounded-full blur-[1px]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/40 rounded-full blur-[1px]"></div>

        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Left: Joyero Image Placeholder / Dynamic */}
          <div className="w-full md:w-1/2 flex justify-center relative z-10">
            {/* Floating Sparkles */}
            <div className="absolute top-4 left-10 md:left-20 text-white opacity-80 animate-pulse drop-shadow-md z-20">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" />
              </svg>
            </div>
            <div className="absolute bottom-10 right-4 md:right-16 text-white opacity-60 animate-[pulse_3s_ease-in-out_infinite] drop-shadow-md z-20 scale-75">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" />
              </svg>
            </div>
            <div className="absolute top-1/2 -right-4 md:right-4 text-white opacity-40 animate-[pulse_4s_ease-in-out_infinite] drop-shadow-md z-20 scale-50">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" />
              </svg>
            </div>

            {/* The circle behind the image */}
            <div className="absolute inset-0 m-auto w-64 h-64 md:w-80 md:h-80 border border-white/30 rounded-full -z-10"></div>

            <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group z-10">
              <Image
                src={
                  regaloProduct?.featuredImage?.url ||
                  'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop'
                }
                alt={regaloProduct?.title || 'Regalo Exclusivo'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right: Text and Promos */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left text-white relative z-10">
            <span className="material-symbols-outlined text-4xl mb-4 opacity-90 mx-auto md:mx-0">
              featured_seasonal_and_gifts
            </span>
            <div className="bg-black/10 backdrop-blur-lg p-5 rounded-2xl mb-6">
              <h2 className=" font-serif text-4xl md:text-5xl lg:text-6xl  leading-tight drop-shadow-sm shine-text">
                Regalos Exclusivos
              </h2>
            </div>

            <div className="flex items-center gap-4 mb-10 w-full max-w-xs mx-auto md:mx-0">
              <div className="h-[1px] flex-1 bg-white/30"></div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/90">
                {regalosExclusivosCollection?.description ||
                  'Detalles que enamoran'}
              </span>
              <div className="h-[1px] flex-1 bg-white/30 md:hidden"></div>
            </div>

            <div className="flex flex-col gap-8 w-full max-w-md mx-auto md:mx-0 mb-10 text-left">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center shrink-0 bg-white/5">
                  <span className="material-symbols-outlined text-white text-[28px]">
                    local_shipping
                  </span>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold tracking-widest uppercase text-sm mb-1">
                    Envío Gratis
                  </h3>
                  <p className="text-sm text-white/80">
                    En todas tus compras superiores a $999
                  </p>
                </div>
              </div>

              <div className="h-[1px] w-full bg-white/10"></div>

              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center shrink-0 bg-white/5">
                  <span className="material-symbols-outlined text-white text-[28px]">
                    redeem
                  </span>
                </div>
                <div className="flex flex-col justify-center">
                  {regaloProduct ? (
                    <Link
                      href={`/producto/${regaloProduct.handle}`}
                      className="hover:text-gold transition-colors block"
                    >
                      <h3 className="font-bold tracking-widest uppercase text-sm mb-1 underline decoration-white/30 underline-offset-4">
                        {regaloProduct.title}
                      </h3>
                    </Link>
                  ) : (
                    <h3 className="font-bold tracking-widest uppercase text-sm mb-1">
                      Joyero de Regalo
                    </h3>
                  )}
                  <p className="text-sm text-white/80">
                    Incluido en tu compra mayor a $1999
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/best-sellers"
              className="border border-white text-white hover:bg-white hover:text-[#b3a496] transition-colors duration-300 rounded-full px-12 py-4 text-xs font-bold tracking-[0.2em] uppercase mx-auto md:mx-0 shadow-lg hover:shadow-xl"
            >
              Ve por tu regalo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
