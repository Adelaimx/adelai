"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/contexts/CartContext";

export function CartSheet() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    cartCount, 
    cartTotal, 
    removeFromCart, 
    updateQuantity 
  } = useCart();

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Shopping Cart Sidebar Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-background-dark shadow-2xl z-50 flex flex-col transform transition-transform duration-300 translate-x-0">
        
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
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <span className="material-symbols-outlined text-6xl text-slate-200 dark:text-slate-700">production_quantity_limits</span>
              <p className="font-bold text-slate-500 dark:text-slate-400">Tu carrito está vacío</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-colors uppercase text-xs font-bold tracking-widest"
              >
                Seguir Comprando
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const uniqueId = `${item.id}-${item.variantId}-${item.size}`;
              return (
                <div key={uniqueId} className="flex gap-4 group">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-primary/5">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      width={96} height={96}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">{item.name}</h3>
                        <p className="text-xs text-slate-500 mt-1 uppercase">
                          {item.size !== "U" && `Talla: ${item.size} • `}{item.colorName}
                        </p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(uniqueId)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        title="Eliminar"
                      >
                        <span className="material-symbols-outlined text-xl">delete_outline</span>
                      </button>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-primary/20 rounded-lg h-8">
                        <button 
                          onClick={() => updateQuantity(uniqueId, item.quantity - 1)}
                          className="px-2 text-primary hover:bg-primary/5 h-full"
                        >-</button>
                        <span className="px-3 text-xs font-bold text-slate-900 dark:text-slate-100">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(uniqueId, item.quantity + 1)}
                          className="px-2 text-primary hover:bg-primary/5 h-full"
                        >+</button>
                      </div>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer / Summary */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-primary/5 border-t border-primary/10 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs uppercase tracking-widest text-slate-500">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs uppercase tracking-widest text-slate-500">
                <span>Envío</span>
                <span className="text-primary font-bold">{cartTotal > 999 ? "Gratis" : "Calculado en Checkout"}</span>
              </div>
              <div className="pt-2 flex justify-between text-base font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Link href="/checkout/carrito" onClick={() => setIsCartOpen(false)} className="w-full bg-primary hover:bg-slate-900 dark:hover:bg-slate-700 text-white py-4 font-bold uppercase tracking-[0.2em] text-sm transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 rounded">
              Finalizar Compra
              <span className="material-symbols-outlined text-lg">arrow_right_alt</span>
            </Link>
            
            <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest leading-relaxed">
              Impuestos incluidos. Envío calculado al finalizar el pedido.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
