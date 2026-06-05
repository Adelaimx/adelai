'use client';

import React, { createContext, useContext, useState, useTransition } from 'react';
import { Cart } from '../lib/shopify/types';
import { addCartItem, addCartItems, removeCartItem, updateItemQuantity } from '../app/actions/cart';

interface CartContextType {
  cart: Cart | undefined;
  cartCount: number;
  isCartOpen: boolean;
  isPending: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  addMultipleToCart: (lines: { merchandiseId: string; quantity: number }[]) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, variantId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
  initialCart
}: {
  children: React.ReactNode;
  initialCart: Cart | undefined;
}) {
  const [cart, setCart] = useState<Cart | undefined>(initialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const cartCount = cart?.totalQuantity || 0;

  const addToCart = async (variantId: string, quantity: number = 1) => {
    startTransition(async () => {
      const res = await addCartItem(variantId, quantity);
      if (res.error) {
        console.error(res.error);
        alert(res.error);
      } else if (res.cart) {
        setCart(res.cart);
        setIsCartOpen(true);
      }
    });
  };

  const addMultipleToCart = async (lines: { merchandiseId: string; quantity: number }[]) => {
    startTransition(async () => {
      const res = await addCartItems(lines);
      if (res.error) {
        console.error(res.error);
        alert(res.error);
      } else if (res.cart) {
        setCart(res.cart);
        setIsCartOpen(true);
      }
    });
  };

  const removeFromCart = async (lineId: string) => {
    startTransition(async () => {
      const res = await removeCartItem(lineId);
      if (res.error) {
        console.error(res.error);
      } else if (res.cart) {
        setCart(res.cart);
      }
    });
  };

  const updateQuantity = async (lineId: string, variantId: string, quantity: number) => {
    startTransition(async () => {
      const res = await updateItemQuantity(lineId, variantId, quantity);
      if (res.error) {
        console.error(res.error);
      } else if (res.cart) {
        setCart(res.cart);
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        isCartOpen,
        isPending,
        setIsCartOpen,
        addToCart,
        addMultipleToCart,
        removeFromCart,
        updateQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
