"use client";

import { useRef } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Product } from "@/lib/shopify/types";

interface BestSellersCarouselProps {
  products: Product[];
}

export function BestSellersCarousel({ products }: BestSellersCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      // Scroll by the width of the container to show the next "page" of items.
      // Alternatively, scroll by a specific item's width. We'll use the container's clientWidth.
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={scrollLeft}
        className="absolute left-0 top-1/3 -translate-y-1/2 z-30 bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all ml-2 lg:-left-6" 
        aria-label="Anterior"
      >
        <span className="material-symbols-outlined text-sm">chevron_left</span>
      </button>
      
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 scroll-smooth"
      >
        {products.map((product) => (
          <div 
            key={product.id} 
            // 1 column mobile (100%), 2 columns tablet (50% - gap), 4 columns desktop (25% - gap)
            className="snap-start min-w-[100%] md:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)]"
          >
            <ProductCard 
              product={product} 
              forceAddMode="AÑADIR AL CARRITO" 
              layout="grid" // Use grid layout since we handle the width here
              hideArrowsOnMobile={true}
            />
          </div>
        ))}
      </div>

      <button 
        onClick={scrollRight}
        className="absolute right-0 top-1/3 -translate-y-1/2 z-30 bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all mr-2 lg:-right-6" 
        aria-label="Siguiente"
      >
        <span className="material-symbols-outlined text-sm">chevron_right</span>
      </button>
    </div>
  );
}
