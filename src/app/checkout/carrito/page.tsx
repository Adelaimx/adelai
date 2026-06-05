"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutShippingPage() {
  const { cart } = useCart();
  const cartItems: any[] = []; // Obsolete mock
  const cartTotal = 0; // Obsolete mock

  const taxes = cartTotal * 0.16;
  const shipping = cartTotal > 999 ? 0 : 150;
  const grandTotal = cartTotal + taxes + shipping;

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          {/* Step Indicator */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-1 block">Paso 1 de 3</span>
                <h1 className="text-3xl font-bold">Información de Envío</h1>
              </div>
              <span className="text-sm font-medium text-primary">33% completado</span>
            </div>
            <div className="w-full bg-primary/10 h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-1/3 transition-all duration-500"></div>
            </div>
          </div>
          
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <section>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span>
                Datos Personales
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Nombre</label>
                  <input className="w-full rounded-lg border-primary/20 bg-white dark:bg-primary/5 focus:border-primary focus:ring-primary h-12 px-4" placeholder="Ej. Ana" type="text"/>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Apellidos</label>
                  <input className="w-full rounded-lg border-primary/20 bg-white dark:bg-primary/5 focus:border-primary focus:ring-primary h-12 px-4" placeholder="Ej. García" type="text"/>
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Correo Electrónico</label>
                  <input className="w-full rounded-lg border-primary/20 bg-white dark:bg-primary/5 focus:border-primary focus:ring-primary h-12 px-4" placeholder="ana.garcia@ejemplo.com" type="email"/>
                </div>
              </div>
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                Dirección de Entrega
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Calle y Número</label>
                  <input className="w-full rounded-lg border-primary/20 bg-white dark:bg-primary/5 focus:border-primary focus:ring-primary h-12 px-4" placeholder="Av. Insurgentes Sur 123, Int 4" type="text"/>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Código Postal</label>
                  <input className="w-full rounded-lg border-primary/20 bg-white dark:bg-primary/5 focus:border-primary focus:ring-primary h-12 px-4" placeholder="01000" type="text"/>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Ciudad</label>
                  <input className="w-full rounded-lg border-primary/20 bg-white dark:bg-primary/5 focus:border-primary focus:ring-primary h-12 px-4" placeholder="Ciudad de México" type="text"/>
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Estado / Provincia</label>
                  <select className="w-full rounded-lg border-primary/20 bg-white dark:bg-primary/5 focus:border-primary focus:ring-primary h-12 px-4 text-slate-900 dark:text-slate-100">
                    <option>Seleccionar estado</option>
                    <option>Ciudad de México</option>
                    <option>Jalisco</option>
                    <option>Nuevo León</option>
                  </select>
                </div>
              </div>
            </section>
            <div className="pt-6">
              <Link href="/checkout/pago" className="w-full md:w-auto px-10 py-4 bg-primary text-white font-bold rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
                Continuar al Pago
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </form>
        </div>
        
        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-6">Resumen del pedido</h3>
            
            <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2">
              {cartItems.length === 0 ? (
                <p className="text-sm text-slate-500 italic pb-4">Tu carrito está vacío.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.id}-${item.variantId}-${item.size}`} className="flex gap-4">
                    <div className="size-20 rounded-lg bg-cover bg-center border border-primary/10 shrink-0 relative overflow-hidden">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-sm">{item.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Cantidad: {item.quantity}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {item.size !== "U" && `Talla: ${item.size} • `}{item.colorName}
                      </p>
                      <p className="text-sm font-bold mt-1 text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="space-y-3 py-6 border-t border-primary/10">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Envío</span>
                <span className={`${shipping === 0 ? 'text-green-600 dark:text-green-400' : 'text-slate-900 dark:text-slate-100'} font-medium`}>
                  {cartItems.length === 0 ? "$0.00" : shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Impuestos (16% IVA)</span>
                <span className="font-medium">${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-extrabold pt-4 border-t border-primary/10">
                <span>Total</span>
                <span className="text-primary">${cartItems.length > 0 ? grandTotal.toFixed(2) : "0.00"}</span>
              </div>
            </div>
            
            <div className="mt-6 flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-dashed border-primary/30">
              <span className="material-symbols-outlined text-primary">local_offer</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm w-full p-0" placeholder="Código de descuento" type="text"/>
              <button className="text-xs font-bold uppercase text-primary hover:underline">Aplicar</button>
            </div>
            
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex gap-4 opacity-50 grayscale">
                <span className="material-symbols-outlined text-3xl">credit_card</span>
                <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                <span className="material-symbols-outlined text-3xl">payments</span>
              </div>
              <p className="text-[10px] text-center text-slate-400 uppercase tracking-tighter">Pago seguro encriptado SSL de 256 bits</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
