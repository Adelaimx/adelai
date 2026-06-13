'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { TransitionLink as Link } from '@/components/ui/TransitionLink';

const CAROUSEL_IMAGES = [
  '/Fotos_destacadas/3_.avif',
  '/Fotos_destacadas/IMG_8680_VSCO.avif',
  '/Fotos_destacadas/IMG_8683_VSCO.avif',
  '/Fotos_destacadas/IMG_8684_VSCO.avif',
  '/Fotos_destacadas/IMG_8734_VSCO.avif',
  '/Fotos_destacadas/IMG_8737_VSCO.avif',
  '/Fotos_destacadas/IMG_9191.avif',
  '/Fotos_destacadas/IMG_9193.avif',
];
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

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, []);

  const slidingIndices = [currentIndex - 1, currentIndex, currentIndex + 1];
  const getMod = (n: number, m: number) => ((n % m) + m) % m;

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
      <style>{`
        @keyframes progress-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
      {/* 1. Hero Container (100vh) */}
      <div
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Pinned Background with Two Images */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full z-0 flex flex-col md:flex-row bg-[#b3a496]/20"
        >
          <div className="absolute inset-0 hero-gradient z-10 pointer-events-none"></div>

          {/* Left Column (Transitions UP) */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden relative">
            {slidingIndices.map((slideIndex) => {
              const imageIndex = getMod(slideIndex, CAROUSEL_IMAGES.length);
              const src = CAROUSEL_IMAGES[imageIndex];
              const offset = slideIndex - currentIndex;

              return (
                <div
                  key={`left-${slideIndex}`}
                  className="absolute inset-0 transition-transform"
                  style={{
                    transform: `translateY(${offset * 100}%)`,
                    transitionDuration: '1.2s',
                    transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
                  }}
                >
                  <Image
                    fill
                    className="object-cover"
                    alt={`Colección ADELAI Joyería Minimalista - ${imageIndex}`}
                    src={src}
                    priority={slideIndex >= -1 && slideIndex <= 1}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column (Transitions DOWN) */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden relative">
            {slidingIndices.map((slideIndex) => {
              const imageIndex = getMod(slideIndex + 1, CAROUSEL_IMAGES.length);
              const src = CAROUSEL_IMAGES[imageIndex];
              const offset = slideIndex - currentIndex;

              return (
                <div
                  key={`right-${slideIndex}`}
                  className="absolute inset-0 transition-transform"
                  style={{
                    transform: `translateY(${-offset * 100}%)`,
                    transitionDuration: '1.2s',
                    transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
                  }}
                >
                  <Image
                    fill
                    className="object-cover"
                    alt={`Detalle de Joyería ADELAI - ${imageIndex}`}
                    src={src}
                    priority={slideIndex >= -1 && slideIndex <= 1}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
              );
            })}
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

          {/* Progress Bar */}
          <div className="w-48 md:w-64 h-1 bg-white/30 rounded-full overflow-hidden mt-2 relative pointer-events-auto">
            <div
              key={currentIndex}
              className="absolute top-0 left-0 h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              style={{ animation: 'progress-bar 5s linear forwards' }}
            />
          </div>
        </div>
      </div>

      {/* 2. Promo Section (Naturally flows over the pinned hero background) */}
      <section className="relative w-full min-h-screen bg-[#b3a496] z-30 border-b border-primary/10 flex flex-col justify-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] border border-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white/60 rounded-full blur-[1px]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/40 rounded-full blur-[1px]"></div>

        <div className="w-full flex flex-col md:flex-row min-h-screen">
          {/* Left: Joyero Image Placeholder / Dynamic */}
          <div className="w-full md:w-1/2 flex justify-center items-center relative z-10 p-6 md:p-12 lg:p-20">
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
            <div className="absolute inset-0 m-auto w-[80%] aspect-square max-w-[600px] border border-white/30 rounded-full -z-10"></div>

            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl group z-10">
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
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left text-white relative z-10 p-6 md:p-12 lg:p-24">
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
