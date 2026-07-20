'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function HashScroller() {
  const pathname = usePathname();

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          // Delay to ensure GSAP ScrollTrigger has finished measuring the DOM heights
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 400);
        }
      }
    };

    // Run on initial mount
    handleHash();

    // Run whenever the hash changes while on the same page
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [pathname]);

  return null;
}
