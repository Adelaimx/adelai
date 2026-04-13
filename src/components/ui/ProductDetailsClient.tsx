"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/design";
import { ProductCard } from "./ProductCard";
import { PRODUCTS } from "@/lib/mockProducts";
import { useCart } from "@/contexts/CartContext";

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "care">("specs");

  const { addToCart } = useCart();

  const activeVariant = product.variants[activeVariantIndex];
  const currentPrice = activeVariant?.price ?? product.basePrice;
  const originalPrice = currentPrice * 1.5; // Mock original price for discount display
  const images = activeVariant?.images || [];

  // Related products mock
  const relatedProducts = PRODUCTS.slice(0, 4);

  const handleAddToCart = () => {
    // If it has sizes but none is selected, don't allow add yet or default
    const actualSize = activeSize || (activeVariant.sizes[0] === "U" ? "U" : activeVariant.sizes[0]);
    
    addToCart({
      id: product.id,
      variantId: activeVariant.id,
      name: product.name,
      price: currentPrice,
      size: actualSize,
      colorName: activeVariant.colorName,
      image: images[0] || "",
    }, quantity);
  };

  return (
    <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-10 py-8 mt-20 sm:mt-24 lg:mt-16">
      {/* Breadcrumbs */}
      <nav className="flex flex-wrap gap-2 pb-6 pt-2 items-center text-sm">
        <Link className="text-primary font-medium hover:underline" href="/">Inicio</Link>
        <span className="text-slate-400 material-symbols-outlined text-xs">chevron_right</span>
        <Link className="text-primary font-medium hover:underline" href="/categoria/collares">Collares</Link>
        <span className="text-slate-400 material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-slate-500 dark:text-slate-400 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery Grid */}
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Mobile Carousel (hidden on md) */}
          <div className="relative block md:hidden aspect-[4/5] w-full rounded-xl overflow-hidden bg-white shadow-sm border border-primary/10">
            {images.length > 0 && (
              <Image
                src={images[activeImageIndex]}
                alt={`${product.name} imagen`}
                fill
                className="object-cover bg-center"
                priority
              />
            )}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md text-primary"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md text-primary"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </>
            )}
            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, idx) => (
                <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === activeImageIndex ? 'w-5 bg-primary' : 'w-2 bg-primary/40'}`} />
              ))}
            </div>
          </div>

          {/* Desktop Grid (hidden on mobile) */}
          <div className="hidden md:grid grid-cols-2 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className={`aspect-square rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm border relative group ${idx === activeImageIndex ? 'border-primary ring-1 ring-primary' : 'border-primary/10'}`}>
                <Image
                  src={img}
                  alt={`${product.name} imagen ${idx + 1}`}
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
            <span className="bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest px-2 py-1 rounded">Edición Limitada</span>
            <h1 className="text-slate-900 dark:text-slate-100 text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <p className="text-2xl font-bold text-primary">${currentPrice.toFixed(2)} MXN</p>
              <span className="text-slate-400 line-through text-lg">${originalPrice.toFixed(2)} MXN</span>
            </div>
          </div>

          {/* Inventory Status */}
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg">
            <span className="material-symbols-outlined text-red-600 dark:text-red-400">warning</span>
            <p className="text-red-600 dark:text-red-400 font-bold text-sm">¡Date prisa! Solo quedan 5 unidades disponibles</p>
          </div>

          {/* Description & Features */}
          <div className="space-y-4 py-4 border-y border-primary/10">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Nuestra {product.name.toLowerCase()} insignia diseñada para brillar en cualquier ocasión. Esta pieza fusiona la elegancia clásica con la durabilidad moderna. Diseñada para la mujer contemporánea que busca sofisticación sin compromisos. 
              {product.material && ` Fabricada en ${product.material}.`}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">water_drop</span>
                <span className="text-sm font-medium">Resistente al agua (Waterproof)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">verified</span>
                <span className="text-sm font-medium">Acero Inoxidable Quirúrgico</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                <span className="text-sm font-medium">Baño de Alta Calidad</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">block</span>
                <span className="text-sm font-medium">Hipoalergénico (Sin Níquel)</span>
              </div>
            </div>
          </div>
          
          {/* Dynamic Variant Selection Added Over design to preserve logic */}
          {product.variants.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-500">Color: <span className="text-slate-900 dark:text-slate-100">{activeVariant.colorName}</span></span>
              </div>
              <div className="flex gap-3">
                {product.variants.map((variant, idx) => (
                  <button
                    key={variant.id}
                    onClick={() => {
                      setActiveVariantIndex(idx);
                      setActiveImageIndex(0);
                      setActiveSize(null);
                    }}
                    className={`w-8 h-8 rounded-full border transition-all ${activeVariantIndex === idx ? 'ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark border-transparent' : 'border-slate-200 hover:scale-110'}`}
                    style={{ backgroundColor: variant.colorHex }}
                    title={variant.colorName}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Dynamic Size Selection Added Over design to preserve logic */}
          {activeVariant?.sizes && activeVariant.sizes.length > 0 && activeVariant.sizes[0] !== "U" && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-500">Talla</span>
                <button className="text-xs font-medium uppercase tracking-widest text-primary hover:underline transition-all">GUÍA DE TALLAS</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeVariant.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setActiveSize(size)}
                    className={`h-12 min-w-[3rem] px-4 flex items-center justify-center border rounded font-medium transition-colors ${
                      activeSize === size 
                        ? 'border-primary bg-primary text-white' 
                        : 'border-primary/20 text-slate-600 hover:border-primary dark:text-slate-300 dark:border-white/20 dark:hover:border-primary'
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
              <div className="flex justify-between items-center border border-primary/30 rounded px-2 bg-white dark:bg-slate-900 h-14 md:h-12 w-full max-w-[200px] md:w-auto shrink-0 transition-colors hover:border-primary">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 text-primary hover:bg-primary/10 rounded-full h-10 w-10 flex items-center justify-center font-medium">-</button>
                <input className="w-12 text-center border-none focus:ring-0 bg-transparent font-bold text-slate-900 dark:text-slate-100 p-0" readOnly type="number" value={quantity} />
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 text-primary hover:bg-primary/10 rounded-full h-10 w-10 flex items-center justify-center font-medium">+</button>
              </div>
              
              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart} 
                className="w-full md:w-auto md:flex-1 bg-primary text-white font-bold h-14 md:h-12 rounded-[12px] md:rounded-lg hover:bg-slate-900 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                <span className="material-symbols-outlined">shopping_bag</span>
                Añadir al carrito
              </button>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="flex flex-col gap-3 pt-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-slate-500 mt-1">local_shipping</span>
              <div>
                <p className="text-sm font-bold">Envío Express Gratis</p>
                <p className="text-xs text-slate-500">En pedidos mayores a $999 MXN. Entrega de 2 a 4 días hábiles.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-slate-500 mt-1">restart_alt</span>
              <div>
                <p className="text-sm font-bold">Garantía de Satisfacción</p>
                <p className="text-xs text-slate-500">30 días para cambios y devoluciones sin costo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs/Details Bottom */}
      <div className="mt-16 border-t border-primary/10 pt-10">
        <div className="flex gap-4 sm:gap-8 border-b border-primary/10 mb-8 overflow-x-auto pb-1 justify-center sm:justify-start no-scrollbar">
          <button 
            onClick={() => setActiveTab("specs")} 
            className={`pb-4 border-b-2 whitespace-nowrap ${activeTab === "specs" ? 'border-primary text-primary font-bold' : 'border-transparent text-slate-400 font-medium hover:text-slate-600 transition-colors'}`}
          >
            Especificaciones
          </button>
          <button 
            onClick={() => setActiveTab("care")} 
            className={`pb-4 border-b-2 whitespace-nowrap ${activeTab === "care" ? 'border-primary text-primary font-bold' : 'border-transparent text-slate-400 font-medium hover:text-slate-600 transition-colors'}`}
          >
            Cuidado de la Joya
          </button>
        </div>
        
        {activeTab === "specs" ? (
          <div className="grid md:grid-cols-2 gap-10 p-4 sm:p-6 md:p-8 rounded-xl bg-white dark:bg-slate-800 border border-primary/10">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Detalles Técnicos</h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex flex-col sm:flex-row sm:justify-between border-b border-primary/10 pb-2 gap-1 sm:gap-0 items-center sm:items-start text-center sm:text-left"><span className="font-medium text-[10px] uppercase tracking-widest text-slate-400">Material Base</span><span className="font-bold">Acero Inoxidable 316L</span></li>
                <li className="flex flex-col sm:flex-row sm:justify-between border-b border-primary/10 pb-2 gap-1 sm:gap-0 items-center sm:items-start text-center sm:text-left"><span className="font-medium text-[10px] uppercase tracking-widest text-slate-400">Acabado</span><span className="font-bold">PVD {activeVariant.colorName}</span></li>
                <li className="flex flex-col sm:flex-row sm:justify-between border-b border-primary/10 pb-2 gap-1 sm:gap-0 items-center sm:items-start text-center sm:text-left"><span className="font-medium text-[10px] uppercase tracking-widest text-slate-400">Largo</span><span className="font-bold">40cm + 5cm de extensión</span></li>
                <li className="flex flex-col sm:flex-row sm:justify-between border-b border-primary/10 pb-2 gap-1 sm:gap-0 items-center sm:items-start text-center sm:text-left"><span className="font-medium text-[10px] uppercase tracking-widest text-slate-400">Peso</span><span className="font-bold">12.5 gramos</span></li>
              </ul>
            </div>
            <div className="p-4 sm:p-6 rounded-xl border text-white border-white/30" style={{ backgroundColor: "#9E8E80" }}>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-white">
                <span className="material-symbols-outlined">info</span>
                Información de Calidad
              </h3>
              <p className="text-sm text-white/90 leading-relaxed mb-4">
                Nuestras piezas waterproof están fabricadas con tecnología de recubrimiento PVD (Physical Vapor Deposition), lo que las hace hasta 10 veces más resistentes que el chapado convencional.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
                <span className="text-[10px] font-bold text-white border border-white/40 px-2 py-1 rounded">SIN PLOMO</span>
                <span className="text-[10px] font-bold text-white border border-white/40 px-2 py-1 rounded">REUTILIZABLE</span>
                <span className="text-[10px] font-bold text-white border border-white/40 px-2 py-1 rounded">ÉMISIONES BAJAS</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-8 rounded-xl bg-white dark:bg-slate-800 border border-primary/10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-center sm:text-left">
            Nuestras joyas están diseñadas para durar, pero un cuidado adecuado ayudará a mantener su brillo original por más tiempo. Evite el contacto directo con perfumes, cremas corporales y productos de limpieza. Recomendamos guardar su joya en su empaque original cuando no esté en uso.
          </div>
        )}
      </div>

      {/* Related Products Section */}
      <section className="mt-20 bg-white dark:bg-slate-900 py-12 px-6 rounded-xl border border-primary/10">
        <h2 className="text-2xl font-bold mb-8 text-black dark:text-white">Productos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
             <ProductCard key={p.id} product={p} forceAddMode="AÑADIR AL CARRITO" />
          ))}
        </div>
      </section>
    </main>
  );
}
