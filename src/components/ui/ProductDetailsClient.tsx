'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/shopify/types';
import { ProductCard } from './ProductCard';
import { useCart } from '@/contexts/CartContext';
import { getProductCategory } from '@/lib/utils/categorizeSize';
import { SizeGuideModal } from './SizeGuideModal';
import gsap from 'gsap';

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailsClient({
  product,
  relatedProducts,
}: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const variants = product.variants?.edges.map((e) => e.node) || [];

  // Extract unique colors and sizes from variants
  const colorOptions = useMemo(() => {
    const options = new Map<string, string>(); // id -> hex
    const labels = new Map<string, string>(); // id -> label
    variants.forEach((v) => {
      const colorName = v.selectedOptions.find(
        (o) => o.name === 'Color',
      )?.value;
      if (colorName) {
        let id = colorName.toLowerCase();
        let label = colorName;

        if (id === 'bicolor' || id === 'bi color') {
          id = 'bicolor';
          label = 'Bicolor';
        }

        if (!options.has(id)) {
          let hex = v.colorHex?.value || '#cccccc';

          if (id === 'dorado' || id === 'oro') {
            hex = '#D4AF37';
          } else if (id === 'bicolor' || id === 'bi color') {
            hex = 'linear-gradient(135deg, #D4AF37 50%, #C0C0C0 50%)';
          } else if (id === 'multicolor' || id === 'multi color') {
            hex =
              'linear-gradient(45deg, #ff9a9e 0%, #fecfef 25%, #a1c4fd 50%, #c2e9fb 75%, #fbc2eb 100%)';
          } else if (id === 'plata') {
            hex = '#C0C0C0';
          } else if (id === 'rose gold' || id === 'oro rosa') {
            hex = '#B76E79';
          }

          options.set(id, hex);
          labels.set(id, label);
        }
      }
    });
    return Array.from(options.entries()).map(([id, hex]) => ({
      id,
      label: labels.get(id) || id,
      hex,
    }));
  }, [variants]);

  const [activeColorId, setActiveColorId] = useState(colorOptions[0]?.id || '');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'care'>('specs');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const [isAnimatingTab, setIsAnimatingTab] = useState(false);
  const tabContentRef = useRef<HTMLDivElement>(null);
  const addToCartBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!addToCartBtnRef.current) return;

    // Create a bell-ring (campaneo) animation that repeats every 6 seconds
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 6 });

    gsap.set(addToCartBtnRef.current, { transformOrigin: 'center top' });

    tl.to(addToCartBtnRef.current, {
      keyframes: [
        { rotation: 12, duration: 0.1 },
        { rotation: -10, duration: 0.1 },
        { rotation: 8, duration: 0.1 },
        { rotation: -6, duration: 0.1 },
        { rotation: 4, duration: 0.1 },
        { rotation: -2, duration: 0.1 },
        { rotation: 0, duration: 0.1 },
      ],
      ease: 'power1.inOut',
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleTabChange = (newTab: 'specs' | 'care') => {
    if (newTab === activeTab || isAnimatingTab) return;
    setIsAnimatingTab(true);

    // Animate out
    gsap.to(tabContentRef.current, {
      opacity: 0,
      x: 20,
      ease: 'back.in(1.5)',
      duration: 0.3,
      onComplete: () => {
        setActiveTab(newTab);
        // Animate in
        gsap.fromTo(
          tabContentRef.current,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'back.out(1.5)',
            onComplete: () => setIsAnimatingTab(false),
          },
        );
      },
    });
  };

  const availableSizes = useMemo(() => {
    return Array.from(
      new Set(
        variants
          .filter((v) => {
            if (!activeColorId) return true;
            const vColor = v.selectedOptions
              .find((o) => o.name === 'Color')
              ?.value?.toLowerCase();
            if (!vColor) return false;
            const normalized = vColor === 'bi color' ? 'bicolor' : vColor;
            return normalized === activeColorId;
          })
          .map(
            (v) =>
              v.selectedOptions.find(
                (o) => o.name === 'Talla' || o.name === 'Size',
              )?.value,
          )
          .filter(Boolean) as string[],
      ),
    );
  }, [variants, activeColorId]);

  const [activeSize, setActiveSize] = useState<string | null>(
    availableSizes[0] || null,
  );

  // Reset size when color changes
  useEffect(() => {
    if (
      availableSizes.length > 0 &&
      (!activeSize || !availableSizes.includes(activeSize))
    ) {
      setActiveSize(availableSizes[0]);
    } else if (availableSizes.length === 0) {
      setActiveSize(null);
    }
  }, [availableSizes, activeSize]);

  // Mobile related products carousel state
  const [activeRelatedIndex, setActiveRelatedIndex] = useState(0);

  useEffect(() => {
    if (relatedProducts.length <= 1) return;
    const interval = setInterval(() => {
      setActiveRelatedIndex((prev) => (prev + 1) % relatedProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [relatedProducts.length]);

  // Find exact active variant
  const activeVariant =
    variants.find((v) => {
      const vColor = v.selectedOptions
        .find((o) => o.name === 'Color')
        ?.value?.toLowerCase();
      const normalizedColor = vColor === 'bi color' ? 'bicolor' : vColor;
      const colorMatch = !activeColorId || normalizedColor === activeColorId;
      const sizeMatch =
        !activeSize ||
        v.selectedOptions.find((o) => o.name === 'Talla' || o.name === 'Size')
          ?.value === activeSize;
      return colorMatch && sizeMatch;
    }) || variants[0];

  const currentPrice = activeVariant?.price?.amount
    ? parseFloat(activeVariant.price.amount)
    : parseFloat(product.priceRange.minVariantPrice.amount);
  const originalPrice = activeVariant?.compareAtPrice?.amount
    ? parseFloat(activeVariant.compareAtPrice.amount)
    : null;
  const stockQuantity = activeVariant?.quantityAvailable || 0;

  // Reset quantity when variant changes
  useEffect(() => {
    setQuantity(1);
  }, [activeVariant?.id]);

  const materialOption = product.options.find((o) =>
    o.name.toLowerCase().includes('material'),
  );
  const baseMaterial = materialOption
    ? materialOption.values[0]
    : product.tags?.find(
        (t) =>
          t.toLowerCase().includes('oro') ||
          t.toLowerCase().includes('plata') ||
          t.toLowerCase().includes('acero'),
      ) || 'Acero Inoxidable / Plata';

  const images =
    product.images?.edges.map((e) => e.node.url) ||
    ([product.featuredImage?.url].filter(Boolean) as string[]);

  const handleAddToCart = () => {
    if (activeVariant) {
      addToCart(activeVariant.id, quantity);
    }
  };

  return (
    <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-10 py-8 mt-20 sm:mt-24 lg:mt-16">
      {/* Breadcrumbs */}
      <nav className="flex flex-wrap gap-2 pb-6 pt-2 items-center text-sm">
        <Link className="text-primary font-medium hover:underline" href="/">
          Inicio
        </Link>
        <span className="text-secondary/60 material-symbols-outlined text-xs">
          chevron_right
        </span>
        <Link
          className="text-primary font-medium hover:underline capitalize"
          href={
            getProductCategory(product) === 'OTROS'
              ? '/best-sellers'
              : `/categoria/${getProductCategory(product).toLowerCase()}`
          }
        >
          {getProductCategory(product) === 'OTROS'
            ? 'Catálogo'
            : getProductCategory(product).toLowerCase()}
        </Link>
        <span className="text-secondary/60 material-symbols-outlined text-xs">
          chevron_right
        </span>
        <span className="text-secondary font-medium">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery Grid */}
        <div className="space-y-4">
          {/* Mobile Carousel (hidden on md) */}
          <div className="relative block md:hidden aspect-[4/5] w-full rounded-xl overflow-hidden bg-white shadow-sm border border-primary/10">
            {images.length > 0 && (
              <Image
                src={images[activeImageIndex]}
                alt={`${product.title} imagen`}
                fill
                className="object-cover bg-center"
                priority
              />
            )}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1,
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md text-primary"
                >
                  <span className="material-symbols-outlined text-sm">
                    chevron_left
                  </span>
                </button>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === images.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md text-primary"
                >
                  <span className="material-symbols-outlined text-sm">
                    chevron_right
                  </span>
                </button>
              </>
            )}
            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${idx === activeImageIndex ? 'w-5 bg-primary' : 'w-2 bg-primary/40'}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid (hidden on mobile) */}
          <div className="hidden md:grid grid-cols-2 gap-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`aspect-square rounded-xl overflow-hidden bg-white shadow-sm border relative group ${idx === activeImageIndex ? 'border-primary ring-1 ring-primary' : 'border-primary/10'}`}
              >
                <Image
                  src={img}
                  alt={`${product.title} imagen ${idx + 1}`}
                  fill
                  className="object-cover bg-center transition-transform hover:scale-105 duration-500 cursor-pointer"
                  onClick={() => setActiveImageIndex(idx)}
                  priority={idx < 2}
                  sizes="(max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            {product.tags?.includes('limited') && (
              <span className="bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest px-2 py-1 rounded mb-2 inline-block">
                Edición Limitada
              </span>
            )}
            <h1 className="text-primary text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-2xl font-bold text-primary">
                ${currentPrice.toFixed(2)}{' '}
                {activeVariant?.price?.currencyCode || 'MXN'}
              </p>
              {originalPrice && originalPrice > currentPrice && (
                <span className="text-secondary/70 line-through text-lg">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Inventory Status */}
          {stockQuantity > 0 && stockQuantity <= 3 && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg">
              <span className="material-symbols-outlined text-red-600 dark:text-red-400">
                warning
              </span>
              <p className="text-red-600 dark:text-red-400 font-bold text-sm">
                ¡Date prisa! Solo quedan {stockQuantity} unidades
              </p>
            </div>
          )}

          {/* Description & Features */}
          <div className="space-y-4 py-4 border-y border-primary/10">
            <div
              className="text-primary/80 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: product.descriptionHtml || product.description,
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  water_drop
                </span>
                <span className="text-sm font-medium">
                  Resistente al agua (Waterproof)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  verified
                </span>
                <span className="text-sm font-medium">Calidad Garantizada</span>
              </div>
            </div>
          </div>

          {/* Dynamic Color Selection */}
          {colorOptions.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-widest text-secondary ">
                  Color:{' '}
                  <span className="text-slate-900 dark:text-primary-100">
                    {colorOptions.find((c) => c.id === activeColorId)?.label ||
                      activeColorId}
                  </span>
                </span>
              </div>
              <div className="flex gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => {
                      setActiveColorId(color.id);
                      setActiveImageIndex(0);
                    }}
                    className={`w-8 h-8 rounded-full border transition-all ${activeColorId === color.id ? 'ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark border-transparent' : 'border-slate-200'}`}
                    style={{ background: color.hex }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Size Selection */}
          {availableSizes.length > 0 && availableSizes[0] !== 'U' && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-widest text-secondary">
                  Talla
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs font-medium uppercase tracking-widest text-primary hover:underline transition-all"
                >
                  GUÍA DE TALLAS
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setActiveSize(size)}
                    className={`h-12 min-w-[3rem] px-4 flex items-center justify-center border rounded font-medium transition-colors ${
                      activeSize === size
                        ? 'border-primary bg-primary text-white'
                        : 'border-primary/20 text-primary/80 hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Purchase Actions */}
          <div className="space-y-4 pt-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center md:items-stretch md:justify-start">
              {/* Quantity Button */}
              <div className="flex justify-between items-center border border-primary/30 rounded px-2 bg-white h-14 md:h-12 w-full max-w-[200px] md:w-auto shrink-0 transition-colors hover:border-primary">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || stockQuantity === 0}
                  className="px-4 text-primary hover:bg-primary/10 disabled:opacity-30 disabled:hover:bg-transparent rounded-full h-10 w-10 flex items-center justify-center font-medium"
                >
                  -
                </button>
                <input
                  className="w-12 text-center border-none focus:ring-0 bg-transparent font-bold text-slate-900 dark:text-primary-100 p-0"
                  readOnly
                  type="number"
                  value={stockQuantity === 0 ? 0 : quantity}
                />
                <button
                  onClick={() =>
                    setQuantity(Math.min(stockQuantity, quantity + 1))
                  }
                  disabled={quantity >= stockQuantity || stockQuantity === 0}
                  className="px-4 text-primary hover:bg-primary/10 disabled:opacity-30 disabled:hover:bg-transparent rounded-full h-10 w-10 flex items-center justify-center font-medium"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                ref={addToCartBtnRef}
                onClick={handleAddToCart}
                disabled={stockQuantity === 0}
                className="btn-primary w-full md:w-auto md:flex-1 h-14 md:h-12 shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:cursor-not-allowed hover:cursor-pointer"
              >
                <span className="material-symbols-outlined">
                  {stockQuantity === 0
                    ? 'remove_shopping_cart'
                    : 'shopping_bag'}
                </span>
                {stockQuantity === 0 ? 'Agotado' : 'Añadir al carrito'}
              </button>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="flex flex-col gap-3 pt-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary mt-1">
                local_shipping
              </span>
              <div>
                <p className="text-sm font-bold">Envío Express Gratis</p>
                <p className="text-xs text-secondary">
                  En pedidos mayores a $999 MXN. Entrega de 2 a 4 días hábiles.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary mt-1">
                restart_alt
              </span>
              <div>
                <p className="text-sm font-bold">Garantía de Satisfacción</p>
                <p className="text-xs text-secondary">
                  7 días para cambios y devoluciones sin costo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs/Details Bottom */}
      <div className="mt-16 border-t border-primary/10 pt-10 overflow-hidden">
        <div className="flex gap-4 sm:gap-8 border-b border-primary/10 mb-8 overflow-x-auto pb-1 justify-center sm:justify-start no-scrollbar">
          <button
            onClick={() => handleTabChange('specs')}
            className={`pb-4 border-b-2 whitespace-nowrap ${activeTab === 'specs' ? 'border-primary text-primary font-bold' : 'border-transparent text-secondary/70 font-medium hover:text-primary transition-colors'}`}
          >
            Especificaciones
          </button>
          <button
            onClick={() => handleTabChange('care')}
            className={`pb-4 border-b-2 whitespace-nowrap ${activeTab === 'care' ? 'border-primary text-primary font-bold' : 'border-transparent text-secondary/70 font-medium hover:text-primary transition-colors'}`}
          >
            Cuidado de la Joya
          </button>
        </div>

        <div ref={tabContentRef}>
          {activeTab === 'specs' ? (
            <div className="grid md:grid-cols-2 gap-10 p-4 sm:p-6 md:p-8 rounded-xl bg-white border border-primary/10">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-primary-100">
                  Detalles Técnicos
                </h3>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex flex-col sm:flex-row sm:justify-between border-b border-primary/10 pb-2 gap-1 sm:gap-0 items-center sm:items-start text-center sm:text-left">
                    <span className="font-medium text-[10px] uppercase tracking-widest text-secondary/70">
                      Material Base
                    </span>
                    <span className="font-bold capitalize">{baseMaterial}</span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:justify-between border-b border-primary/10 pb-2 gap-1 sm:gap-0 items-center sm:items-start text-center sm:text-left">
                    <span className="font-medium text-[10px] uppercase tracking-widest text-secondary/70">
                      Color Actual
                    </span>
                    <span className="font-bold capitalize">
                      {colorOptions.find((c) => c.id === activeColorId)
                        ?.label ||
                        activeColorId ||
                        'Original'}
                    </span>
                  </li>
                </ul>
              </div>
              <div
                className="p-4 sm:p-6 rounded-xl border text-white border-white/30"
                style={{ backgroundColor: '#9E8E80' }}
              >
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined">info</span>
                  Información de Calidad
                </h3>
                <p className="text-sm text-white/90 leading-relaxed mb-4">
                  Nuestras piezas waterproof están fabricadas con tecnología de
                  recubrimiento PVD (Physical Vapor Deposition), lo que las hace
                  hasta 10 veces más resistentes que el chapado convencional.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
                  <span className="text-[10px] font-bold text-white border border-white/40 px-2 py-1 rounded">
                    SIN PLOMO
                  </span>
                  <span className="text-[10px] font-bold text-white border border-white/40 px-2 py-1 rounded">
                    REUTILIZABLE
                  </span>
                  <span className="text-[10px] font-bold text-white border border-white/40 px-2 py-1 rounded">
                    ÉMISIONES BAJAS
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-8 rounded-xl bg-white border border-primary/10 text-sm text-primary/80 leading-relaxed text-center sm:text-left">
              <div className="cuidados">
                <p className="mb-4">
                  Nuestras piezas están diseñadas para acompañarte todos los
                  días. Con los cuidados adecuados, conservarán su brillo y
                  belleza por mucho más tiempo.
                </p>
                <ul className="list-disc pl-5 space-y-3 text-left">
                  <li>
                    <span className="font-semibold">Acero inoxidable:</span> Es
                    resistente al agua y al uso diario, puedes usarlo con
                    tranquilidad, pero te recomendamos secarlo después del
                    contacto con agua para mantener su acabado impecable.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Acero inoxidable chapado en oro o platino:
                    </span>{' '}
                    Para preservar el baño de oro o platino, evita contacto
                    constante con cremas, perfumes y otros químicos, retira tus
                    piezas antes de bañarte, nadar o hacer ejercicio, guárdalas
                    por separado para evitar fricción.
                  </li>
                  <li>
                    <span className="font-semibold">Zirconia Cúbica:</span>{' '}
                    Mantiene su brillo con facilidad, pero evita golpes o
                    contacto con superficies duras, puedes limpiar tu joyería
                    suavemente con un paño seco para conservar su luz.
                  </li>
                  <li>
                    <span className="font-semibold">Perlas naturales:</span>{' '}
                    Evita el contacto con perfumes y productos químicos,
                    limpialas con un paño suave y guárdalas en un lugar seco,
                    separadas de otras piezas.
                  </li>
                </ul>
              </div>
              <div className="recomendaciones mt-6">
                <p className="font-semibold mb-3 text-left">Recomendaciones generales:</p>
                <ul className="list-disc pl-5 space-y-2 text-left">
                  <li>Evita el contacto directo con perfumes, cremas y productos químicos.</li>
                  <li>Guarda tus piezas en un lugar seco, idealmente en su guardapolvo.</li>
                  <li>Limpialas suavemente con un paño seco después de usarlas.</li>
                  <li>Retíralas antes de dormir o hacer ejercicio.</li>
                  <li>Cuidar tus piezas es también una forma de cuidar lo que representan.</li>
                </ul>
                <p className="mt-6 text-center italic text-primary/70">
                  Adelai - Everything shine
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 relative p-[2px] rounded-xl overflow-hidden shadow-sm">
          {/* Animated golden light border */}
          <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_70%,#D4AF37_100%)] animate-[spin_3s_ease-in-out_infinite]" />

          <section className="relative bg-white py-12 px-6 rounded-[10px] z-10 w-full h-full">
            <h2 className="text-2xl font-bold mb-8 text-primary">
              Productos Relacionados
            </h2>

            {/* Desktop View: Grid */}
            <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-6 ">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  forceAddMode="AÑADIR AL CARRITO"
                />
              ))}
            </div>

            {/* Mobile View: Carousel */}
            <div className="sm:hidden relative overflow-hidden w-full">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${activeRelatedIndex * 100}%)`,
                }}
              >
                {relatedProducts.map((p) => (
                  <div key={p.id} className="w-full flex-shrink-0 px-2">
                    <ProductCard product={p} forceAddMode="AÑADIR AL CARRITO" />
                  </div>
                ))}
              </div>

              {/* Carousel Indicators */}
              {relatedProducts.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {relatedProducts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveRelatedIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${idx === activeRelatedIndex ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]/20'}`}
                      aria-label={`Ir al producto ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      )}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        product={product}
        sizeOption={activeSize || availableSizes[0] || ''}
      />
    </main>
  );
}
