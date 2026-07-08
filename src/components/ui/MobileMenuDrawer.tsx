'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TransitionLink as Link } from './TransitionLink';
import { usePathname } from 'next/navigation';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: '/', label: 'Inicio', number: '01' },
  { href: '/nosotros', label: 'Nosotros', number: '02' },
  { href: '/categoria/aretes', label: 'Aretes', number: '03' },
  { href: '/categoria/collares', label: 'Collares', number: '04' },
  { href: '/categoria/brazaletes', label: 'Brazaletes', number: '05' },
  { href: '/categoria/anillos', label: 'Anillos', number: '06' },
  { href: '/categoria/joyeros', label: 'Joyeros', number: '07' },
  { href: '/best-sellers', label: 'Best Sellers', number: '08' },
];

export function MobileMenuDrawer({ isOpen, onClose }: MobileMenuDrawerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null); // Dark layer
  const layer2Ref = useRef<HTMLDivElement>(null); // Primary layer
  const menuLayerRef = useRef<HTMLDivElement>(null); // Main menu layer
  const linksContainerRef = useRef<HTMLDivElement>(null);
  
  const pathname = usePathname();

  // Drag logic
  const dragStartY = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const tl = gsap.timeline();
      
      // Reset all initial states
      gsap.set([layer1Ref.current, layer2Ref.current, menuLayerRef.current], { y: '-100%' });
      gsap.set(containerRef.current, { display: 'block' });
      
      // Animate layers down
      tl.to(layer1Ref.current, { y: '0%', duration: 0.5, ease: 'power3.inOut' })
        .to(layer2Ref.current, { y: '0%', duration: 0.5, ease: 'power3.inOut' }, '-=0.3')
        .to(menuLayerRef.current, { y: '0%', duration: 0.6, ease: 'power4.out' }, '-=0.3')
        
      // Animate links staggered
      if (linksContainerRef.current) {
        const links = linksContainerRef.current.children;
        gsap.fromTo(links, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.2)' }
        );
      }
      
    } else {
      document.body.style.overflow = '';
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(containerRef.current, { display: 'none' });
        }
      });
      
      // Fade out links first
      if (linksContainerRef.current) {
         tl.to(linksContainerRef.current.children, { y: -20, opacity: 0, duration: 0.3, stagger: 0.05, ease: 'power2.in' });
      }
      
      // Animate layers back up
      tl.to(menuLayerRef.current, { y: '-100%', duration: 0.5, ease: 'power3.inOut' }, '-=0.1')
        .to(layer2Ref.current, { y: '-100%', duration: 0.5, ease: 'power3.inOut' }, '-=0.3')
        .to(layer1Ref.current, { y: '-100%', duration: 0.5, ease: 'power3.inOut' }, '-=0.3');
    }

    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Handle Drag to close (swipe UP from anywhere on the menu)
  const handleDragStart = (y: number) => {
    isDragging.current = true;
    dragStartY.current = y;
  };

  const handleDragMove = (y: number) => {
    if (!isDragging.current || !menuLayerRef.current) return;
    const deltaY = y - dragStartY.current;
    if (deltaY < 0) { // dragging UP
      gsap.set(menuLayerRef.current, { y: deltaY });
      // Move background layers slightly for parallax effect
      gsap.set(layer2Ref.current, { y: deltaY * 0.5 });
      gsap.set(layer1Ref.current, { y: deltaY * 0.2 });
    }
  };

  const handleDragEnd = (y: number) => {
    if (!isDragging.current || !menuLayerRef.current) return;
    isDragging.current = false;
    const deltaY = y - dragStartY.current;
    
    // If dragged UP more than 80px, close it
    if (deltaY < -80) {
      onClose();
    } else {
      // Snap back to fully open
      gsap.to([menuLayerRef.current, layer2Ref.current, layer1Ref.current], { 
        y: '0%', duration: 0.4, ease: 'power3.out' 
      });
    }
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 hidden" aria-hidden={!isOpen}>
      
      {/* Click-outside overlay at the bottom (the 10% space) */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* Multilayer Backgrounds (90% height) */}
      <div 
        ref={layer1Ref} 
        className="absolute top-0 left-0 w-full h-[90vh] bg-secondary shadow-2xl rounded-b-3xl"
      />
      <div 
        ref={layer2Ref} 
        className="absolute top-0 left-0 w-full h-[90vh] bg-primary shadow-2xl rounded-b-3xl"
      />
      
      {/* Main Menu Drawer Layer */}
      <div 
        ref={menuLayerRef}
        className="absolute top-0 left-0 w-full h-[90vh] bg-background-light shadow-2xl rounded-b-3xl flex flex-col"
        onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientY)}
        onMouseDown={(e) => handleDragStart(e.clientY)}
        onMouseMove={(e) => handleDragMove(e.clientY)}
        onMouseUp={(e) => handleDragEnd(e.clientY)}
        onMouseLeave={(e) => { if (isDragging.current) handleDragEnd(e.clientY); }}
      >
        
        {/* Header with Close Button */}
        <div className="flex justify-between items-center px-6 h-20 shrink-0">
          <Link href="/" onClick={onClose}>
            <h1 className="font-serif text-3xl tracking-[0.2em] font-light text-primary">ADELAI</h1>
          </Link>
          <button 
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/50 hover:bg-white text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Scrollable Nav Links */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col justify-center">
          <div ref={linksContainerRef} className="flex flex-col gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.href} className="relative w-fit group">
                  <Link 
                    href={link.href} 
                    onClick={onClose}
                    className={`text-4xl md:text-5xl font-black uppercase tracking-tight transition-colors duration-300 block ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-primary/70 hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                  <span className="absolute -top-1 -right-6 text-xs font-bold text-secondary/60">
                    {link.number}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Drag Indicator Bottom */}
        <div className="h-10 flex items-center justify-center shrink-0 opacity-50">
          <div className="w-16 h-1.5 rounded-full bg-secondary/30" />
        </div>
      </div>
    </div>
  );
}
