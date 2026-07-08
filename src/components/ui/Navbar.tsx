"use client";

import { TransitionLink as Link } from "@/components/ui/TransitionLink";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CartSheet } from "./CartSheet";
import { useCart } from "@/contexts/CartContext";
import { MobileMenuDrawer } from "./MobileMenuDrawer";

interface NavbarProps {
  shopifyDomain?: string;
}

export function Navbar({ shopifyDomain = 'adelai-3.myshopify.com' }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsCartOpen, cartCount } = useCart();
  const pathname = usePathname();

  const getLinkClasses = (href: string, isFeatured = false) => {
    const isActive = pathname === href;
    const baseClasses = "text-xs uppercase tracking-widest transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100 text-gold/80 hover:text-gold";
    
    if (isFeatured) {
      return `${baseClasses} font-bold ${isActive ? 'after:scale-x-100 text-gold' : ''}`;
    }
    
    return `${baseClasses} ${isActive ? 'text-gold after:scale-x-100' : ''}`;
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
      <header className="fixed top-0 left-0 w-full z-40 bg-primary/85 backdrop-blur-md border-b border-gold/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left Section */}
        <div className="flex-1 flex gap-8 items-center">
          {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 hover:bg-gold/10 transition-colors lg:hidden rounded-full text-gold"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span className="material-symbols-outlined">{isMobileMenuOpen ? "close" : "menu"}</span>
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
            <h1 className="font-serif text-3xl tracking-[0.2em] font-light shine-text">ADELAI</h1>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex justify-end items-center gap-8">
          <nav className="hidden lg:flex items-center gap-6">
            <Link className={getLinkClasses("/categoria/brazaletes")} href="/categoria/brazaletes">brazaletes</Link>
            <Link className={getLinkClasses("/categoria/anillos")} href="/categoria/anillos">anillos</Link>
            <Link className={getLinkClasses("/categoria/joyeros")} href="/categoria/joyeros">joyeros</Link>
            <Link className={getLinkClasses("/best-sellers", true)} href="/best-sellers">BEST SELLERS</Link>
          </nav>
          
          <div className="flex items-center gap-1 sm:gap-2">
            {/* User Profile / Account Link */}
            <a 
              href={`https://${shopifyDomain}/account`}
              className="p-2 hover:bg-gold/10 rounded-full transition-colors flex items-center justify-center relative text-gold"
              aria-label="Mi Cuenta / Pedidos"
              title="Mi Cuenta / Pedidos"
            >
              <span className="material-symbols-outlined">person</span>
            </a>

            {/* Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="p-2 hover:bg-gold/10 rounded-full transition-colors flex items-center justify-center relative text-gold"
              aria-label={`Ver carrito, ${cartCount} productos`}
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-primary text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* New Animated Mobile Menu Drawer */}
      <MobileMenuDrawer 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      </header>
      <CartSheet />
    </>
  );
}
