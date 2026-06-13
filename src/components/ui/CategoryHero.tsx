'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CategoryHeroProps {
  categoryTitle: string;
  imageUrl: string;
}

export function CategoryHero({ categoryTitle, imageUrl }: CategoryHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      const letters = textRef.current?.querySelectorAll('.category-letter');
      if (!letters || letters.length === 0) return;

      // Create a timeline pinned to the container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%', // Increased scroll distance to give more room for the stagger animation
          pin: true,
          scrub: 1, // Smooth scrubbing effect
          pinSpacing: true, // Ensure it pushes the next section down
        },
      });

      // Staggered animation for the letters
      tl.to(letters, {
        y: -100, // Move upwards
        opacity: 0, // Fade out
        duration: 1,
        stagger: 0.1, // Animate letter by letter
        ease: 'power1.inOut',
      });
    }, containerRef); // Scope to the container

    return () => ctx.revert(); // Perfect cleanup for React 18 Strict Mode
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/40">
        <Image
          fill
          alt={`Colección ${categoryTitle}`}
          className="object-cover mix-blend-overlay"
          src={imageUrl}
          priority
        />
      </div>
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center mt-20">
        <h1 ref={textRef} className="text-4xl font-bold tracking-[0.15em] text-white lg:text-7xl font-serif uppercase flex flex-wrap justify-center">
          {categoryTitle.split('').map((letter, index) => (
            <span key={index} className="inline-block category-letter whitespace-pre">
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
