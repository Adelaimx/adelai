"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutConfirmationPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  
  // Snapshot the cart data so it remains visible even after clearing the global state
  const [orderItems] = useState(cartItems);
  const [orderTotal] = useState(cartTotal);
  const [orderNumber] = useState(`ADL-${Math.floor(10000 + Math.random() * 90000)}`);
  
  // Automatically clear the cart when the confirmation page mounts successfully
  useEffect(() => {
    if (cartItems.length > 0) {
      clearCart();
    }
  }, [cartItems.length, clearCart]);

  const taxes = orderTotal * 0.16;
  const shipping = orderTotal > 999 ? 0 : 150;
  const grandTotal = orderTotal + taxes + shipping;

  return (
    <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white dark:bg-background-dark p-8 md:p-12 rounded-xl shadow-sm border border-primary/10">
        
        {/* Success Icon/Illustration */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined !text-5xl">check_circle</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">¡Gracias por tu compra!</h1>
          <p className="text-slate-500 font-medium">Pedido #{orderNumber}</p>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-md">Hemos recibido tu pedido y te hemos enviado un correo electrónico de confirmación con los detalles.</p>
        </div>

        {/* Order Content */}
        <div className="space-y-8">
          {/* Products Summary */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 border-b border-primary/10 pb-2">Resumen del Pedido</h3>
            
            {orderItems.length === 0 ? (
               <p className="text-sm text-slate-500 italic py-4">No hay productos recientes en la memoria de la sesión.</p>
            ) : (
              orderItems.map((item) => (
                <div key={`${item.id}-${item.variantId}-${item.size}`} className="flex items-center gap-4 py-3 border-b border-primary/5">
                  <div className="h-20 w-20 flex-shrink-0 bg-background-light rounded overflow-hidden relative border border-primary/10">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</h4>
                    <p className="text-sm text-slate-500">
                      {item.size !== "U" && `Talla: ${item.size} | `}Cantidad: {item.quantity}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.colorName}</p>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))
            )}
          </div>

          {/* Shipping and Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Dirección de Envío</h3>
              <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                <p className="font-semibold text-slate-800 dark:text-slate-200">María García</p>
                <p>Av. Insurgentes Sur 123, Int 4</p>
                <p>01000 Ciudad de México</p>
                <p>contacto@ejemplo.com</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Método de Envío</h3>
              <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                <p className="font-semibold text-slate-800 dark:text-slate-200">Envío Estándar</p>
                <p>Entrega estimada: 3-5 días hábiles</p>
              </div>
            </div>
          </div>

          {/* Totals */}
          <div className="bg-primary/5 p-6 rounded-lg space-y-2 border border-primary/10">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
              <span className="text-slate-900 dark:text-slate-100">${orderTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Envío</span>
              <span className="text-slate-900 dark:text-slate-100">{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Impuestos (16% IVA)</span>
              <span className="text-slate-900 dark:text-slate-100">${taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-primary/10">
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">Total</span>
              <span className="text-lg font-bold text-primary">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="w-full sm:w-auto px-10 py-4 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:brightness-110 transition-all uppercase tracking-widest text-sm flex items-center justify-center">
            Volver a la Tienda
          </Link>
          <button className="w-full sm:w-auto px-10 py-4 border border-primary/30 text-primary font-bold rounded-lg hover:bg-primary/5 transition-all uppercase tracking-widest text-sm">
            Seguir Pedido
          </button>
        </div>
      </div>
    </div>
  );
}
