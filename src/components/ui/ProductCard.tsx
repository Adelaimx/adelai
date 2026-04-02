"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/types/design";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  forceAddMode?: string;
  layout?: "carousel" | "grid";
}

export function ProductCard({ product, priority = false, forceAddMode = "Añadir al Carrito", layout = "grid" }: ProductCardProps) {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  const activeVariant = product.variants[activeVariantIndex];
  // Guard against missing images
  const images = activeVariant?.images || [];
  const currentPrice = activeVariant?.price ?? product.basePrice;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleVariantChange = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    setActiveVariantIndex(idx);
    setCurrentImageIndex(0); // Reset image index on color change
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      variantId: activeVariant.id,
      name: product.name,
      price: currentPrice,
      size: activeVariant.sizes[0] || "U",
      colorName: activeVariant.colorName,
      image: images[0] || ""
    });
  };

  if (!activeVariant) return null;

  const containerClasses = layout === "carousel"
    ? "min-w-[280px] md:min-w-[320px] snap-start"
    : "w-full h-full flex flex-col";

  return (
    <div className={`group cursor-pointer block ${containerClasses}`}>
      {/* Product Image Carousel */}
      <div className="relative aspect-[3/4] overflow-hidden bg-background-light mb-4 flex items-center justify-center p-0">
        {/* Images */}
        <Link href={`/producto/${product.id}`} className="absolute inset-0 z-0">
          {images.length > 0 && (
            <Image
              src={images[currentImageIndex]}
              alt={`${product.name} - ${activeVariant.colorName}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </Link>

        {/* Navigation Arrows (Visible on Hover if more than 1 image) */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-slate-900 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Imagen anterior"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-slate-900 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Siguiente imagen"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 pointer-events-none">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex ? "w-4 bg-primary" : "w-1.5 bg-primary/30"
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Bottom Actions Overlay */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end gap-2 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none">
          <Link href={`/producto/${product.id}`} className="w-full pointer-events-auto">
            <button className="w-full translate-y-4 group-hover:translate-y-0 transition-all duration-300 rounded-sm bg-white/95 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 hover:bg-primary hover:text-white">
              VER PRODUCTO
            </button>
          </Link>
          <button 
            onClick={handleAddToCart}
            className="w-full pointer-events-auto translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 rounded-sm bg-primary py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-slate-900 shadow-xl"
          >
            {forceAddMode}
          </button>
        </div>
      </div>

      {/* Product Info */}
      {/* Product Info */}
      <div className="flex flex-col flex-1">
        <h3 className="text-sm font-medium tracking-wide mb-1">
          <Link href={`/producto/${product.id}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm font-bold text-primary">${currentPrice.toFixed(2)}</p>
        
        {/* Dynamic Color Variants */}
        <div className="mt-auto pt-2 z-10">
          {product.variants.length > 0 && (
            <div className="flex gap-2">
              {product.variants.map((variant, idx) => (
                <button 
                  key={variant.id}
                  onClick={(e) => handleVariantChange(e, idx)}
                  style={{ backgroundColor: variant.colorHex }}
                  className={`w-4 h-4 rounded-full transition-transform hover:scale-110 ${idx === activeVariantIndex ? 'ring-1 ring-offset-2 ring-primary/40' : 'border border-gray-200'}`}
                  aria-label={`Color ${variant.colorName}`}
                  title={variant.colorName}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
