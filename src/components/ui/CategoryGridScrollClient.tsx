"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { TransitionLink as Link } from '@/components/ui/TransitionLink';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = [
  {
    tag: 'Anillos',
    link: '/categoria/anillos',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJNoMj8e16sQdafjarzGK2anFCGYo-_tQQbBmBoVcLMxshNWum9BfUiwO7mhHbPYkvDWusJa7_rUEaIuClxM080K8-7sEgjsHvZ4X6tgeW2pOtzbcOYCS-Bqsxze3kEN8cEgC5nocRInf_1PXAjTlRzog2GUUC5WYyAFnIrfWCalTMH2WyceOy5qa7A0b9yrQWFHOoUSlvR0NNQMsLUpmYephJrAQTwdmQrsPu2_jrahtqEgvXdyksHRfBy9gOtpJZ9LBnKf2gmfw',
  },
  {
    tag: 'Aretes',
    link: '/categoria/aretes',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9nztw0kmTmE94-3F0WOr6ye24eP0CAf7sFOFWR3MMxVzvtwmRIMJcbrVSLb59nlitJvOFYC8mPN8LSbcZO8ePUzwd_n3QDv2f3iD1r7CwkGH8esJ84yg0HM7GHg7MainX5_Uj_wntH4n6nn0d_WNM6-Vlz32vZbxWGDH3KdozrrxWcGBxEgCsxVRFhXq06fZe__PpMekTKGBQCU-fcz3yZwGQK8DwNkf1GriJhdN4We6zWmFTX_zOD2Mo6eo829XEGWJ8dwV0oZA',
  },
  {
    tag: 'Collares',
    link: '/categoria/collares',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2tPX_NMTEXjss03tcGWy10N9tb2cxmwaa4Y96sycCC5Z6HIW0eVxeGeWNrwHy7jICiF75xY-KErCy-CAcVqLkVmMFPaaVkZfibw9ybHb6_810kTtBQ1uxluIyEI3jhun8H8zCAzJ2V_qGPfu7kOX5zYnZv6bmoIjNdt5XbkjfYa-BGWfVNPAghHpqunfDGBtOXurMk3H8QcXDIZ_5cJgM1ezcVqdllTWBCyXHQDmDzCvSh86PhTR7xd1twt7nwr9SF_090Wkqu7U',
  },
  {
    tag: 'Pulseras',
    link: '/categoria/brazaletes',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7k3DTqxmySizTBhyh_i8bvW3CcyRcQoE2PmY2cEvjbZRSPsxLm0VIjczyZgN7m-qR29kM9Fcr9f3-cIhN1duIX7dt13nD_GQMv2LPWFoWnYRyzfkwlCt9GG3a8IylWwVwcC0TEX1bFN-I6nkCTQVRXiHsaE7FC9JWB6yVs3CPCF-KKYm18x6A-EMfgcI3h1zJZ-Q8jcuEGvj6cbIHxBBWXeEMnda5AmYjl_21ZdKUSd8erC4BmPG8lmxttkYIwAzuknsfPwqogK4',
  },
];

export function CategoryGridScrollClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const anillosRef = useRef<HTMLDivElement>(null);
  const aretesRef = useRef<HTMLDivElement>(null);
  const collaresRef = useRef<HTMLDivElement>(null);
  const pulserasRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Setup initial positions (below viewport)
    // Anillos starts visible
    gsap.set(aretesRef.current, { yPercent: 100 });
    gsap.set(collaresRef.current, { yPercent: 100 });
    gsap.set(pulserasRef.current, { yPercent: 100 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // Pin for 3 screen heights to allow sequential scrolling
        scrub: true,
        pin: true,
      }
    });

    // Sequence: Aretes up, then Collares up (covering Anillos), then Pulseras up (covering Aretes)
    tl.to(aretesRef.current, { yPercent: 0, ease: "none" })
      .to(collaresRef.current, { yPercent: 0, ease: "none" })
      .to(pulserasRef.current, { yPercent: 0, ease: "none" });

  }, { scope: containerRef });

  const CategoryCard = ({ item, nodeRef, side, zIndex }: { item: any, nodeRef: any, side: "left" | "right", zIndex: string }) => (
    <div 
      ref={nodeRef} 
      className={`absolute top-0 ${side === "left" ? "left-0" : "right-0"} w-full md:w-1/2 h-full ${zIndex} group bg-slate-900 overflow-hidden shadow-2xl`}
    >
      <Image
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
        src={item.img}
        alt={item.tag}
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="text-white uppercase tracking-[0.4em] font-medium text-lg drop-shadow-md select-none">
            {item.tag}
          </span>
          <Link href={item.link} className="cursor-pointer pointer-events-auto">
            <span className="backdrop-blur-md border border-white/50 bg-transparent text-white text-[10px] uppercase tracking-[0.2em] px-4 py-2 rounded-custom transition-all duration-300 font-semibold hover:border-primary hover:bg-primary/20">
              VER COLECCIÓN
            </span>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full block relative">
      <section ref={containerRef} className="h-screen w-full relative overflow-hidden bg-primary">
        <CategoryCard item={categories[0]} nodeRef={anillosRef} side="left" zIndex="z-10" />
        <CategoryCard item={categories[1]} nodeRef={aretesRef} side="right" zIndex="z-20" />
        <CategoryCard item={categories[2]} nodeRef={collaresRef} side="left" zIndex="z-30" />
        <CategoryCard item={categories[3]} nodeRef={pulserasRef} side="right" zIndex="z-40" />
      </section>
    </div>
  );
}
