"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPaymentPage() {
  const { cart } = useCart();
  const cartItems: any[] = []; // Obsolete mock
  const cartTotal = 0; // Obsolete mock
  const [paymentMethod, setPaymentMethod] = useState<"tarjeta" | "paypal" | "transferencia">("tarjeta");

  const taxes = cartTotal * 0.16;
  const shipping = cartTotal > 999 ? 0 : 150;
  const grandTotal = cartTotal + taxes + shipping;

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-20 py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-8 text-sm">
        <Link className="text-slate-400 font-medium hover:text-primary transition-colors" href="/checkout/carrito">Envío</Link>
        <span className="text-slate-300">/</span>
        <span className="text-primary font-bold">Pago</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-400 font-medium">Confirmación</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left Column: Payment Form */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Método de Pago</h1>
            <p className="text-slate-500">Paso 2 de 3 • Selecciona tu forma de pago preferida</p>
          </div>

          {/* Payment Tabs */}
          <div className="mb-8 border-b border-slate-200 dark:border-primary/10 flex overflow-x-auto">
            <div className="flex gap-8">
              <button 
                onClick={() => setPaymentMethod("tarjeta")}
                className={`flex items-center gap-2 border-b-2 pb-4 font-bold text-sm uppercase tracking-wider transition-colors whitespace-nowrap ${paymentMethod === "tarjeta" ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              >
                <span className="material-symbols-outlined text-lg">credit_card</span>
                Tarjeta
              </button>
              <button 
                onClick={() => setPaymentMethod("paypal")}
                className={`flex items-center gap-2 border-b-2 pb-4 font-bold text-sm uppercase tracking-wider transition-colors whitespace-nowrap ${paymentMethod === "paypal" ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              >
                <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
                PayPal
              </button>
              <button 
                onClick={() => setPaymentMethod("transferencia")}
                className={`flex items-center gap-2 border-b-2 pb-4 font-bold text-sm uppercase tracking-wider transition-colors whitespace-nowrap ${paymentMethod === "transferencia" ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              >
                <span className="material-symbols-outlined text-lg">account_balance</span>
                Transferencia
              </button>
            </div>
          </div>

          {/* Card Details Form */}
          {paymentMethod === "tarjeta" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nombre en la tarjeta</label>
                  <input className="w-full rounded border-slate-200 dark:border-primary/20 bg-white dark:bg-primary/5 focus:border-primary focus:ring-primary h-12 px-4 text-slate-900 dark:text-slate-100" placeholder="Como aparece en la tarjeta" type="text"/>
                </div>
                
                <div className="flex flex-col gap-2 relative">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Número de tarjeta</label>
                  <div className="relative">
                    <input className="w-full rounded border-slate-200 dark:border-primary/20 bg-white dark:bg-primary/5 focus:border-primary focus:ring-primary h-12 px-4 pr-12 text-slate-900 dark:text-slate-100" placeholder="0000 0000 0000 0000" type="text"/>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                      <span className="material-symbols-outlined text-slate-300 dark:text-slate-500">credit_card</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Fecha de expiración</label>
                    <input className="w-full rounded border-slate-200 dark:border-primary/20 bg-white dark:bg-primary/5 focus:border-primary focus:ring-primary h-12 px-4 text-slate-900 dark:text-slate-100" placeholder="MM/AA" type="text"/>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">CVV</label>
                    <input className="w-full rounded border-slate-200 dark:border-primary/20 bg-white dark:bg-primary/5 focus:border-primary focus:ring-primary h-12 px-4 text-slate-900 dark:text-slate-100" placeholder="123" type="text"/>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 py-2">
                <input className="rounded border-slate-300 dark:border-primary/30 dark:bg-primary/5 text-primary focus:ring-primary" id="save-card" type="checkbox"/>
                <label className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer" htmlFor="save-card">Guardar información para futuras compras</label>
              </div>
            </div>
          )}

          {paymentMethod === "paypal" && (
            <div className="p-8 border border-primary/20 rounded-xl bg-primary/5 text-center space-y-4">
              <span className="material-symbols-outlined text-4xl text-primary">account_balance_wallet</span>
              <p className="text-slate-700 dark:text-slate-300 font-medium tracking-wide">
                Serás redirigido a PayPal de forma segura para completar tu compra.
              </p>
            </div>
          )}

          {paymentMethod === "transferencia" && (
            <div className="p-8 border border-primary/20 rounded-xl bg-primary/5 space-y-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">Datos para Transferencia (SPEI)</h3>
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <p><strong>Banco:</strong> BBVA Bancomer</p>
                <p><strong>Clabe:</strong> 012345678901234567</p>
                <p><strong>Beneficiario:</strong> ADELAI Jewelry S.A. de C.V.</p>
                <p><strong>Concepto:</strong> Tu número de pedido (se generará al confirmar)</p>
              </div>
              <p className="text-xs text-slate-500 mt-4 italic">El pedido se procesará una vez que recibamos el comprobante de pago.</p>
            </div>
          )}

          <div className="pt-8">
            <Link href="/checkout/confirmacion" className="w-full md:w-auto px-12 py-4 bg-primary text-white font-bold rounded shadow-lg shadow-primary/20 hover:brightness-110 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2">
              Finalizar Pedido
              <span className="material-symbols-outlined">check_circle</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <aside className="w-full lg:w-96">
          <div className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl p-8 sticky top-24 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">Resumen del Pedido</h3>
            
            {/* Items */}
            <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2">
              {cartItems.length === 0 ? (
                <p className="text-sm text-slate-500 italic pb-4">Tu carrito está vacío.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.id}-${item.variantId}-${item.size}`} className="flex gap-4">
                    <div className="size-20 bg-background-light rounded overflow-hidden flex-shrink-0 relative border border-primary/10">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between py-1 flex-grow">
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase">{item.name}</p>
                        <p className="text-xs text-slate-500">
                          {item.size !== "U" && `Talla: ${item.size} • `}{item.colorName}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Cost Breakdown */}
            <div className="space-y-3 border-t border-slate-100 dark:border-primary/10 pt-6 text-sm">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Envío</span>
                <span className={`${shipping === 0 ? 'text-green-600 dark:text-green-400' : 'text-slate-900 dark:text-slate-100'} font-medium`}>
                  {cartItems.length === 0 ? "$0.00" : shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Impuestos (16% IVA)</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-primary/10 text-lg font-bold text-slate-900 dark:text-slate-100">
                <span>Total</span>
                <span className="text-primary">${cartItems.length > 0 ? grandTotal.toFixed(2) : "0.00"}</span>
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400 uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm">lock</span>
              Pago 100% Seguro
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
