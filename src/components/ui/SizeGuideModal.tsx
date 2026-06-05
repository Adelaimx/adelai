'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Product } from '@/lib/shopify/types';
import {
  categorizeSize,
  getProductCategory,
  getStyleAdvice,
} from '@/lib/utils/categorizeSize';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  sizeOption: string; // The selected raw size string, e.g. "45cm" or "10mm x 8mm"
}

export function SizeGuideModal({
  isOpen,
  onClose,
  product,
  sizeOption,
}: SizeGuideModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const category = getProductCategory(product);
  const info = categorizeSize(sizeOption, category);
  const advice = getStyleAdvice(category, info);

  // GSAP Animation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        display: 'block',
        ease: 'power2.out',
      });
      gsap.fromTo(
        drawerRef.current,
        { y: '100%' },
        { y: '0%', duration: 0.5, ease: 'power3.out' },
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(drawerRef.current, {
        y: '100%',
        duration: 0.4,
        ease: 'power3.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        display: 'none',
        ease: 'power2.in',
        delay: 0.1,
      });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Extract CM for Necklace visual
  const cmMatch = sizeOption.toLowerCase().match(/(\d+(?:\.\d+)?)\s*cm/);
  const chainLengthCm = cmMatch ? parseFloat(cmMatch[1]) : 45; // Default 45cm

  // Calculate SVG Drop (35cm = high up, 60cm = deep drop)
  // Normalizing roughly: 35cm -> y=80, 60cm -> y=180
  const necklaceDropY =
    30 + ((Math.max(35, Math.min(65, chainLengthCm)) - 35) / 30) * 100;

  // Drag-to-close logic
  const dragStartY = useRef(0);
  const isDragging = useRef(false);

  const handleDragStart = (y: number) => {
    isDragging.current = true;
    dragStartY.current = y;
  };

  const handleDragMove = (y: number) => {
    if (!isDragging.current || !drawerRef.current) return;
    const deltaY = y - dragStartY.current;
    if (deltaY > 0) {
      // Move drawer down
      gsap.set(drawerRef.current, { y: deltaY });
    }
  };

  const handleDragEnd = (y: number) => {
    if (!isDragging.current || !drawerRef.current) return;
    isDragging.current = false;
    const deltaY = y - dragStartY.current;
    
    // If dragged down more than 80px, close it
    if (deltaY > 80) {
      onClose();
    } else {
      // Snap back to top
      gsap.to(drawerRef.current, { y: '0%', duration: 0.3, ease: 'power2.out' });
    }
  };

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm hidden opacity-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed bottom-0 left-0 right-0 z-50 bg-background-light rounded-t-3xl shadow-2xl flex flex-col mx-auto w-full md:max-w-4xl translate-y-full will-change-transform max-h-[85vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-guide-title"
      >
        {/* Drag Indicator / Header */}
        <div 
          className="flex items-center justify-between px-6 py-4 border-b border-primary/10 shrink-0 cursor-grab active:cursor-grabbing"
          onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
          onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientY)}
          onMouseDown={(e) => handleDragStart(e.clientY)}
          onMouseMove={(e) => handleDragMove(e.clientY)}
          onMouseUp={(e) => handleDragEnd(e.clientY)}
          onMouseLeave={(e) => { if (isDragging.current) handleDragEnd(e.clientY); }}
        >
          <div className="w-8 h-8" /> {/* Spacer */}
          <div className="w-12 h-1.5 bg-secondary/30 rounded-full mx-auto" />
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/50 hover:bg-white text-primary transition-colors"
            aria-label="Cerrar guía de tallas"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 py-8 md:px-12 md:py-10">
          <div className="text-center mb-10">
            <h2
              id="size-guide-title"
              className="text-2xl font-black text-primary mb-1"
            >
              {advice.title}
            </h2>
            <p className="text-sm font-medium uppercase tracking-widest text-secondary">
              {advice.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left: Silhouette Visuals */}
            <div className="flex justify-center bg-secondary/5 rounded-2xl p-6 relative min-h-[250px] items-center">
              {category === 'COLLARES' && (
                <svg
                  viewBox="0 0 200 250"
                  className="w-full max-w-[180px] text-secondary/40 drop-shadow-sm"
                >
                  {/* Neck and Shoulders Silhouette */}
                  <path
                    d="M50,0 C50,30 40,60 10,80 L0,86 L0,250 L200,250 L200,86 L190,80 C160,60 150,30 150,0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M70,0 L70,30 C70,45 130,45 130,30 L130,0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  {/* The Necklace Chain */}
                  <path
                    d={`M70,30 C70,${necklaceDropY - 20} 100,${necklaceDropY} 100,${necklaceDropY} C100,${necklaceDropY} 130,${necklaceDropY - 20} 130,30`}
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    className="animate-pulse"
                  />
                  {/* The Pendant */}
                  <circle
                    cx="100"
                    cy={necklaceDropY}
                    r="3"
                    fill="#D4AF37"
                    className="shadow-lg"
                  />

                  {/* Measurement Label */}
                  <text
                    x="100"
                    y={necklaceDropY + 15}
                    textAnchor="middle"
                    fill="#D4AF37"
                    fontSize="10"
                    fontWeight="bold"
                    className="font-sans"
                  >
                    {chainLengthCm}cm
                  </text>
                </svg>
              )}

              {category === 'ARETES' && (
                <svg
                  viewBox="0 0 150 200"
                  className="w-full max-w-[120px] text-secondary/40"
                >
                  {/* Ear Silhouette */}
                  <path
                    d="M75,20 C110,20 120,60 120,90 C120,120 95,140 85,160 C80,170 70,170 65,160 C55,140 50,110 50,80 C50,40 60,20 75,20 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Inner Ear Lines */}
                  <path
                    d="M90,40 C105,50 105,80 90,95"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M75,145 L75,150"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  {/* Earring Visualization based on size */}
                  <circle
                    cx="75"
                    cy="155"
                    r={
                      info.semanticSize === 'Statement'
                        ? 12
                        : info.semanticSize === 'Clásico'
                          ? 6
                          : 3
                    }
                    fill="#D4AF37"
                  />
                  {info.semanticSize === 'Statement' && (
                    <path
                      d="M75,167 L75,190 M65,180 L85,180"
                      stroke="#D4AF37"
                      strokeWidth="2"
                      fill="none"
                    />
                  )}

                  {/* Measurement Label */}
                  <text
                    x="75"
                    y="195"
                    textAnchor="middle"
                    fill="#D4AF37"
                    fontSize="10"
                    fontWeight="bold"
                    className="font-sans"
                  >
                    {info.semanticSize}
                  </text>
                </svg>
              )}

              {category === 'BRAZALETES' && (
                <svg
                  viewBox="0 0 200 150"
                  className="w-full max-w-[160px] text-secondary/40"
                >
                  {/* Wrist Silhouette */}
                  <path
                    d="M20,150 C30,110 40,80 100,80 C160,80 170,110 180,150"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M40,150 C45,120 60,100 100,100 C140,100 155,120 160,150"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Bracelet Visualization */}
                  <path
                    d="M35,125 C60,120 140,120 165,125"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth={
                      info.semanticSize === 'Statement'
                        ? 8
                        : info.semanticSize === 'Clásico'
                          ? 4
                          : 2
                    }
                    strokeLinecap="round"
                  />
                </svg>
              )}

              {category === 'ANILLOS' && (
                <svg
                  viewBox="0 0 150 200"
                  className="w-full max-w-[120px] text-secondary/40"
                >
                  {/* Fingers Silhouette */}
                  <path
                    d="M30,200 L30,80 C30,60 60,60 60,80 L60,200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M60,200 L60,50 C60,30 90,30 90,50 L90,200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M90,200 L90,70 C90,50 120,50 120,70 L120,200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Ring Visualization */}
                  <rect
                    x="58"
                    y="120"
                    width="34"
                    height="6"
                    fill="#D4AF37"
                    rx="2"
                  />
                </svg>
              )}
            </div>

            {/* Right: Emotional Copy & Details */}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-secondary/70 mb-2">
                  Descripción
                </h4>
                <p className="text-primary/80 leading-relaxed text-lg font-serif italic">
                  &quot;{advice.description}&quot;
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-secondary/70 mb-2">
                  Consejo de Estilo
                </h4>
                <div className="flex items-start gap-3 bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <span className="material-symbols-outlined text-primary mt-0.5">
                    auto_awesome
                  </span>
                  <p className="text-sm text-primary/80 leading-relaxed">
                    {advice.advice}
                  </p>
                </div>
              </div>

              {info.isAdjustable && (
                <div className="pt-4 border-t border-primary/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-green-600 text-[18px]">
                      check_circle
                    </span>
                    <h4 className="text-sm font-bold text-primary">
                      Pieza Ajustable
                    </h4>
                  </div>
                  <p className="text-sm text-secondary ml-6">
                    Incluye una extensión de cadena que te permite ajustar el
                    largo a tu medida perfecta.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-primary/10 text-center flex justify-center">
            <button
              onClick={onClose}
              className="btn-primary rounded-full hover:scale-105"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
