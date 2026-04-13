"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CartSheet } from "./CartSheet";
import { useCart } from "@/contexts/CartContext";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsCartOpen, cartCount } = useCart();
  const pathname = usePathname();

  const getLinkClasses = (href: string, isFeatured = false) => {
    const isActive = pathname === href;
    const baseClasses = "text-xs uppercase tracking-widest transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100";
    
    if (isFeatured) {
      return `${baseClasses} text-primary font-bold ${isActive ? 'after:scale-x-100' : ''}`;
    }
    
    return `${baseClasses} hover:text-primary ${isActive ? 'text-primary after:scale-x-100' : ''}`;
  };

  const mobileLinkClasses = (href: string, isFeatured = false) => {
    const isActive = pathname === href;
    if (isFeatured) {
      return `text-sm uppercase tracking-widest pb-2 text-primary font-bold transition-colors`;
    }
    return `text-sm uppercase tracking-widest pb-2 border-b border-primary/10 transition-colors ${isActive ? 'text-primary font-bold' : 'hover:text-primary'}`;
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 glass-nav border-b border-primary/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left Section */}
        <div className="flex-1 flex gap-8 items-center">
          {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 hover:bg-primary/10 transition-colors lg:hidden rounded-full"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span className="material-symbols-outlined text-slate-900 dark:text-slate-100">{isMobileMenuOpen ? "close" : "menu"}</span>
            </button>
          
          <nav className="hidden lg:flex items-center gap-6">
            <Link className={getLinkClasses("/")} href="/">inicio</Link>
            <Link className={getLinkClasses("/nosotros")} href="/nosotros">nosotros</Link>
            <Link className={getLinkClasses("/categoria/aretes")} href="/categoria/aretes">aretes</Link>
            <Link className={getLinkClasses("/categoria/collares")} href="/categoria/collares">collares</Link>
          </nav>
        </div>

        {/* Center Logo */}
        <div className="flex items-center justify-center">
          <Link href="/">
            <h1 className="font-serif text-3xl tracking-[0.2em] font-light text-slate-900 dark:text-slate-100">ADELAI</h1>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex justify-end items-center gap-8">
          <nav className="hidden lg:flex items-center gap-6">
            <Link className={getLinkClasses("/categoria/brazaletes")} href="/categoria/brazaletes">brazaletes</Link>
            <Link className={getLinkClasses("/categoria/anillos")} href="/categoria/anillos">anillos</Link>
            <Link className={getLinkClasses("/best-sellers", true)} href="/best-sellers">BEST SELLERS</Link>
          </nav>
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="p-2 hover:bg-primary/10 rounded-full transition-colors flex items-center justify-center relative"
            aria-label={`Ver carrito, ${cartCount} productos`}
          >
            <span className="material-symbols-outlined text-slate-900 dark:text-slate-100">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-background-light dark:bg-background-dark border-b border-primary/10 shadow-lg p-6 flex flex-col gap-4 z-40">
          <Link onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClasses("/")} href="/">inicio</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClasses("/nosotros")} href="/nosotros">nosotros</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClasses("/categoria/aretes")} href="/categoria/aretes">aretes</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClasses("/categoria/collares")} href="/categoria/collares">collares</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClasses("/categoria/brazaletes")} href="/categoria/brazaletes">brazaletes</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClasses("/categoria/anillos")} href="/categoria/anillos">anillos</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClasses("/best-sellers", true)} href="/best-sellers">BEST SELLERS</Link>
        </div>
      )}
      </header>
      <CartSheet />
    </>
  );
}
