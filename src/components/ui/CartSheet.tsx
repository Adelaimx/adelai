"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/contexts/CartContext";
import gsap from "gsap";

export function CartSheet() {
  const { 
    cart,
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity,
    isPending
  } = useCart();

  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when cart is open and handle animations
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(containerRef.current, { display: 'block' });
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(drawerRef.current, 
        { x: '100%' }, 
        { x: '0%', duration: 0.6, ease: 'back.out(1.2)' }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(drawerRef.current, { 
        x: '100%', 
        duration: 0.5, 
        ease: 'back.in(1.2)',
        onComplete: () => {
          gsap.set(containerRef.current, { display: 'none' });
        }
      });
    }
  }, [isCartOpen]);

  const cartLines = cart?.lines?.edges.map((e) => e.node) || [];
  const cartTotal = parseFloat(cart?.cost?.totalAmount?.amount || "0");
  const cartCount = cart?.totalQuantity || 0;

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 hidden" aria-hidden={!isCartOpen}>
      {/* Backdrop Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm opacity-0"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Shopping Cart Sidebar Drawer */}
      <div 
        ref={drawerRef}
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-background-light shadow-2xl flex flex-col translate-x-full will-change-transform ${isPending ? 'opacity-70 pointer-events-none' : ''}`}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary/10">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">shopping_bag</span>
            <h2 className="text-lg font-bold tracking-tight uppercase">Tu Carrito</h2>
            <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-red-500 hover:text-white hover:rotate-90 rounded-full transition-all duration-300"
            title="Cerrar"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartLines.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <span className="material-symbols-outlined text-6xl text-primary/20">production_quantity_limits</span>
              <p className="font-bold text-secondary">Tu carrito está vacío</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="btn-secondary mt-4"
              >
                Seguir Comprando
              </button>
            </div>
          ) : (
            cartLines.map((item) => {
              const product = item.merchandise.product;
              const title = product.title;
              const variantTitle = item.merchandise.selectedOptions.map(o => o.value).join(' / ');
              const price = parseFloat(item.cost.totalAmount.amount);
              const imageUrl = product.featuredImage?.url || "";

              return (
                <div key={item.id} className="flex gap-4 group">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-primary/5 relative">
                    {imageUrl && (
                      <Image 
                        src={imageUrl} 
                        alt={title} 
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">{title}</h3>
                        {variantTitle !== "Default Title" && (
                          <p className="text-xs text-secondary mt-1 uppercase">
                            {variantTitle}
                          </p>
                        )}
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-secondary/70 hover:text-red-500 transition-colors"
                        title="Eliminar"
                      >
                        <span className="material-symbols-outlined text-xl">delete_outline</span>
                      </button>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-primary/20 rounded-lg h-8">
                        <button 
                          onClick={() => updateQuantity(item.id, item.merchandise.id, item.quantity - 1)}
                          className="px-2 text-primary hover:bg-primary/5 h-full"
                        >-</button>
                        <span className="px-3 text-xs font-bold text-primary">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.merchandise.id, item.quantity + 1)}
                          className="px-2 text-primary hover:bg-primary/5 h-full"
                        >+</button>
                      </div>
                      <p className="text-sm font-bold text-primary">${price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer / Summary */}
        {cartLines.length > 0 && (
          <div className="p-6 bg-primary/5 border-t border-primary/10 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs uppercase tracking-widest text-secondary">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs uppercase tracking-widest text-secondary">
                <span>Envío</span>
                <span className="text-primary font-bold">{cartTotal > 999 ? "Gratis" : "Calculado en Checkout"}</span>
              </div>
              <div className="pt-2 flex justify-between text-base font-bold uppercase tracking-widest text-primary">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            {cart?.checkoutUrl ? (
              <a href={cart.checkoutUrl} className="btn-primary w-full py-4 text-sm rounded">
                Finalizar Compra
                <span className="material-symbols-outlined text-lg">arrow_right_alt</span>
              </a>
            ) : (
              <button disabled className="btn-primary w-full py-4 text-sm opacity-50 cursor-not-allowed rounded">
                Cargando...
              </button>
            )}
            
            <p className="text-[10px] text-center text-secondary/70 uppercase tracking-widest leading-relaxed">
              Impuestos incluidos. Envío calculado al finalizar el pedido.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
