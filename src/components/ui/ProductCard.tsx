"use client";

import Image from "next/image";
import { TransitionLink as Link } from "@/components/ui/TransitionLink";
import { useState } from "react";
import { Product } from "@/lib/shopify/types";
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

  const variants = product.variants?.edges.map(e => e.node) || [];
  const activeVariant = variants[activeVariantIndex];
  
  // Extract images from variant or fallback to product images
  const images = activeVariant?.image 
    ? [activeVariant.image.url] 
    : (product.images?.edges.map(e => e.node.url) || [product.featuredImage?.url].filter(Boolean) as string[]);
    
  const currentPrice = activeVariant?.price?.amount 
    ? parseFloat(activeVariant.price.amount) 
    : parseFloat(product.priceRange.minVariantPrice.amount);

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
    if (activeVariant) {
      // Shopify variant IDs are gid://shopify/ProductVariant/123456
      addToCart(activeVariant.id, 1);
    }
  };

  if (!activeVariant) return null;

  const containerClasses = layout === "carousel"
    ? "min-w-[280px] md:min-w-[320px] snap-start"
    : "w-full h-full flex flex-col";

  return (
    <div className={`group cursor-default block ${containerClasses}`}>
      {/* Product Image Carousel */}
      <div className="relative aspect-[3/4] overflow-hidden bg-background-light mb-4 flex items-center justify-center p-0">
        {/* Images */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          {images.length > 0 && (
            <Image
              src={images[currentImageIndex]}
              alt={`${product.title}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>

        {/* Navigation Arrows (Visible on Hover if more than 1 image) */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-slate-900 rounded-full p-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
              aria-label="Imagen anterior"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-slate-900 rounded-full p-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
              aria-label="Siguiente imagen"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
            
            {/* Dots */}
            <div className="absolute top-4 left-0 right-0 flex justify-center gap-1.5 opacity-100 lg:opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 pointer-events-none">
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
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end gap-2 p-4 opacity-100 lg:opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none">
          {/* Usar el handle (slug) en lugar del ID para la URL */}
          <Link href={`/producto/${product.handle}`} className="w-full pointer-events-auto cursor-pointer">
            <button className="w-full translate-y-0 lg:translate-y-4 group-hover:translate-y-0 transition-all duration-300 rounded-sm bg-white/95 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 hover:bg-primary hover:text-white cursor-pointer">
              VER PRODUCTO
            </button>
          </Link>
          <button 
            onClick={handleAddToCart}
            className="w-full pointer-events-auto translate-y-0 lg:translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 rounded-sm bg-primary py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-slate-900 shadow-xl cursor-pointer"
            aria-label={`Añadir ${product.title} al carrito`}
          >
            {forceAddMode}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1">
        <h3 className="text-sm font-medium tracking-wide mb-1">
          {product.title}
        </h3>
        <p className="text-sm font-bold text-primary">${currentPrice.toFixed(2)}</p>
        
        {/* Dynamic Color Variants (Metafields) */}
        <div className="mt-auto pt-2 z-10">
          {(() => {
            // Group variants by color to avoid duplicates (e.g., when size variants exist)
            const colorGroups = new Map();
            
            variants.forEach((variant, idx) => {
              const colorOption = variant.selectedOptions.find(o => o.name === "Color");
              if (colorOption) {
                const colorName = colorOption.value;
                if (!colorGroups.has(colorName)) {
                  colorGroups.set(colorName, {
                    name: colorName,
                    hex: variant.colorHex?.value,
                    variantIndex: idx,
                    id: variant.id
                  });
                }
              }
            });

            const uniqueColors = Array.from(colorGroups.values());

            if (uniqueColors.length <= 1) return null;

            return (
              <div className="flex gap-2">
                {uniqueColors.map((color) => {
                  const id = color.name.toLowerCase();
                  let hex = color.hex || "#cccccc";

                  if (id === 'dorado' || id === 'oro') {
                    hex = '#D4AF37';
                  } else if (id === 'bicolor' || id === 'bi color') {
                    hex = 'linear-gradient(135deg, #D4AF37 50%, #C0C0C0 50%)';
                  } else if (id === 'multi color') {
                    hex = 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 25%, #a1c4fd 50%, #c2e9fb 75%, #fbc2eb 100%)';
                  } else if (id === 'plata') {
                    hex = '#C0C0C0';
                  } else if (id === 'rose gold' || id === 'oro rosa') {
                    hex = '#B76E79';
                  }
                  
                  // Check if the currently active variant matches this color
                  const activeColorOption = activeVariant?.selectedOptions.find(o => o.name === "Color");
                  const isActive = activeColorOption?.value === color.name;

                  return (
                    <button 
                      key={color.id}
                      onClick={(e) => handleVariantChange(e, color.variantIndex)}
                      style={{ background: hex }}
                      className={`w-4 h-4 rounded-full transition-transform hover:scale-110 cursor-pointer ${isActive ? 'ring-1 ring-offset-2 ring-primary/40' : 'border border-gray-200'}`}
                      aria-label={`Seleccionar color ${color.name} para ${product.title}`}
                      title={color.name}
                    />
                  );
                })}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
