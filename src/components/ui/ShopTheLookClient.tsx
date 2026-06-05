'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Collection, Product, ProductVariant } from '@/lib/shopify/types';
import { useCart } from '@/contexts/CartContext';

interface ShopTheLookClientProps {
  collection: Collection;
}

export function ShopTheLookClient({ collection }: ShopTheLookClientProps) {
  const { addMultipleToCart, isPending } = useCart();
  const products = collection.products.edges.map((e) => e.node);

  // State to hold the currently selected variant ID for each product in the look
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >(() => {
    const initial: Record<string, string> = {};
    products.forEach((p) => {
      const firstAvailable = p.variants.edges.find(
        (v) => v.node.availableForSale,
      )?.node;
      if (firstAvailable) {
        initial[p.id] = firstAvailable.id;
      } else if (p.variants.edges.length > 0) {
        initial[p.id] = p.variants.edges[0].node.id;
      }
    });
    return initial;
  });

  // Universal tick for carousels
  const [tick, setTick] = useState(0);

  // All images from all products to show in the carousel
  const allImages = products
    .map((p) => p.featuredImage?.url)
    .filter(Boolean) as string[];
  const primaryImage = collection.image?.url || allImages[0];
  const secondaryImages = allImages.filter((url) => url !== primaryImage);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const mobileIdx = allImages.length > 0 ? tick % allImages.length : 0;
  const secondaryIdx =
    secondaryImages.length > 0 ? tick % secondaryImages.length : 0;

  const handleVariantChange = (productId: string, variantId: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variantId,
    }));
  };

  const handleBuyLook = async () => {
    const lines = Object.values(selectedVariants).map((variantId) => ({
      merchandiseId: variantId,
      quantity: 1,
    }));

    if (lines.length > 0) {
      await addMultipleToCart(lines);
    }
  };

  // Helper to format variant title (e.g. "Dorado / S")
  const getVariantLabel = (variant: ProductVariant) => {
    if (variant.title === 'Default Title') return 'Única';
    return variant.title;
  };

  return (
    <section className="bg-primary/5 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Images Section */}
          <div className="w-full md:w-1/2 relative">
            {/* Desktop Static Primary Image */}
            <div className="aspect-[4/5] bg-secondary/10 overflow-hidden relative z-10 w-full h-full rounded-lg shadow-sm hidden md:block">
              {primaryImage && (
                <Image
                  fill
                  className="object-cover"
                  src={primaryImage}
                  alt={collection.title}
                  sizes="50vw"
                />
              )}
            </div>

            {/* Desktop Secondary Image / Carousel */}
            {secondaryImages.length > 0 && (
              <div className="absolute -bottom-6 -right-6 w-2/3 aspect-square bg-white p-4 shadow-xl z-20 hidden md:block rounded-lg">
                <div className="relative w-full h-full rounded overflow-hidden">
                  {secondaryImages.map((img, idx) => (
                    <Image
                      key={img}
                      fill
                      className={`object-cover transition-opacity duration-1000 ${idx === secondaryIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                      src={img}
                      alt={`Detalle del look ${idx + 1}`}
                      sizes="25vw"
                    />
                  ))}

                  {/* Carousel Indicators */}
                  {secondaryImages.length > 1 && (
                    <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-1">
                      {secondaryImages.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1 rounded-full transition-all ${idx === secondaryIdx ? 'w-4 bg-primary' : 'w-1.5 bg-primary/40'}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Info & Products Section */}
          <div className="w-full md:w-1/2 flex flex-col items-start text-primary">
            <span className="text-primary font-bold tracking-widest uppercase mb-4 text-xs">
              Editorial Estilo
            </span>

            {/* Make the title dynamic. Usually we remove "Comprar el look: " prefix for cleaner display */}
            <h2 className="font-serif text-4xl sm:text-5xl font-light mb-6 leading-tight">
              {collection.title.toLowerCase().startsWith('comprar el look:') ? (
                <>
                  Comprar el Look: <br />
                  <i className="font-normal">
                    {collection.title.split(':')[1]?.trim() || collection.title}
                  </i>
                </>
              ) : (
                collection.title
              )}
            </h2>

            {collection.description && (
              <p className="text-secondary mb-10 leading-relaxed max-w-md">
                {collection.description}
              </p>
            )}

            {/* Mobile Carousel (1 slide per product) */}
            <div className="aspect-[4/5] bg-secondary/10 overflow-hidden relative z-10 w-full h-full rounded-lg shadow-sm md:hidden">
              {allImages.map((img, idx) => (
                <Image
                  key={img}
                  fill
                  className={`object-cover transition-opacity duration-1000 ${idx === mobileIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  src={img}
                  alt={`Look producto ${idx + 1}`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ))}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                  {allImages.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${idx === mobileIdx ? 'w-5 bg-primary' : 'w-2 bg-primary/40'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4 w-full max-w-md mb-10">
              {products.map((product) => {
                const variants = product.variants.edges.map((e) => e.node);
                const hasMultipleVariants = variants.length > 1;
                const minPrice = parseFloat(
                  product.priceRange.minVariantPrice.amount,
                );

                return (
                  <div
                    key={product.id}
                    className="flex flex-col py-3 border-b border-primary/20 gap-2"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <Link
                        href={`/producto/${product.handle}`}
                        className="text-sm font-medium hover:text-primary transition-colors hover:underline"
                      >
                        {product.title}
                      </Link>
                      <span className="text-sm font-bold text-primary shrink-0">
                        ${minPrice.toFixed(2)}{' '}
                        {product.priceRange.minVariantPrice.currencyCode}
                      </span>
                    </div>

                    {/* Variant Selector (if applicable) */}
                    {hasMultipleVariants && (
                      <div className="flex items-center gap-2 mt-1">
                        <label
                          htmlFor={`variant-${product.id}`}
                          className="text-xs uppercase tracking-widest text-secondary font-bold"
                        >
                          Opción:
                        </label>
                        <select
                          id={`variant-${product.id}`}
                          value={selectedVariants[product.id] || ''}
                          onChange={(e) =>
                            handleVariantChange(product.id, e.target.value)
                          }
                          className="text-xs bg-transparent border border-primary/20 rounded px-2 py-1 outline-none focus:border-primary text-primary/80 flex-1 max-w-[200px]"
                        >
                          {variants.map((v) => (
                            <option
                              key={v.id}
                              value={v.id}
                              disabled={!v.availableForSale}
                              className="text-primary"
                            >
                              {getVariantLabel(v)}{' '}
                              {!v.availableForSale ? '(Agotado)' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleBuyLook}
              disabled={isPending || products.length === 0}
              className={`btn-primary w-full md:w-auto h-14 md:h-12 rounded-[12px] ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isPending ? 'AGREGANDO...' : 'COMPRAR LOOK COMPLETO'}
              {!isPending && (
                <span className="material-symbols-outlined text-sm">
                  shopping_cart_checkout
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
