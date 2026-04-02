"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string; // Base product ID
  variantId: string; // ID of the specific color variant
  name: string;
  price: number;
  quantity: number;
  size: string;
  colorName: string;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (item: Omit<CartItem, "quantity">, quantityToAdd?: number) => void;
  removeFromCart: (uniqueId: string) => void;
  updateQuantity: (uniqueId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Helper to generate a unique key for items (combining product ID, variant, and size)
  const getUniqueId = (item: Pick<CartItem, "id" | "variantId" | "size">) => {
    return `${item.id}-${item.variantId}-${item.size}`;
  };

  const addToCart = (newItem: Omit<CartItem, "quantity">, quantityToAdd: number = 1) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => getUniqueId(item) === getUniqueId(newItem)
      );

      if (existingItemIndex >= 0) {
        // Increase quantity if it already exists
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].quantity += quantityToAdd;
        return updatedCart;
      }

      // Add new item
      return [...prev, { ...newItem, quantity: quantityToAdd }];
    });
    
    // Automatically open cart when adding
    setIsCartOpen(true);
  };

  const removeFromCart = (uniqueId: string) => {
    setCartItems((prev) => prev.filter((item) => getUniqueId(item) !== uniqueId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (uniqueId: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        getUniqueId(item) === uniqueId ? { ...item, quantity } : item
      )
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
