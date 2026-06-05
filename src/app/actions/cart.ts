'use server';

import { cookies } from 'next/headers';
import { createCart, addToCart, removeFromCart, updateCart, getCart as getShopifyCart } from '../../lib/shopify/mutations/cart';

const CART_COOKIE_NAME = 'cartId';

async function getCartId() {
  const cookieStore = await cookies();
  return cookieStore.get(CART_COOKIE_NAME)?.value;
}

async function setCartId(cartId: string) {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE_NAME, cartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });
}

export async function getCart() {
  const cartId = await getCartId();
  if (!cartId) return undefined;
  return getShopifyCart(cartId);
}

export async function addCartItem(variantId: string, quantity: number = 1) {
  return addCartItems([{ merchandiseId: variantId, quantity }]);
}

export async function addCartItems(lines: { merchandiseId: string; quantity: number }[]) {
  let cartId = await getCartId();
  let cart;

  if (!cartId) {
    cart = await createCart();
    cartId = cart.id;
    await setCartId(cartId);
  } else {
    cart = await getCart();
  }

  if (!cartId) {
    return { error: 'Error: Could not retrieve or create a cart.' };
  }

  try {
    const updatedCart = await addToCart(cartId, lines);
    return { cart: updatedCart };
  } catch (e: any) {
    console.error(e);
    return { error: 'Error adding items to cart' };
  }
}

export async function removeCartItem(lineId: string) {
  const cartId = await getCartId();
  if (!cartId) return { error: 'Error: No cart found' };

  try {
    const updatedCart = await removeFromCart(cartId, [lineId]);
    return { cart: updatedCart };
  } catch (e: any) {
    console.error(e);
    return { error: 'Error removing item from cart' };
  }
}

export async function updateItemQuantity(lineId: string, variantId: string, quantity: number) {
  const cartId = await getCartId();
  if (!cartId) return { error: 'Error: No cart found' };

  try {
    let updatedCart;
    if (quantity === 0) {
      updatedCart = await removeFromCart(cartId, [lineId]);
    } else {
      updatedCart = await updateCart(cartId, [{ id: lineId, merchandiseId: variantId, quantity }]);
    }
    return { cart: updatedCart };
  } catch (e: any) {
    console.error(e);
    return { error: 'Error updating item quantity' };
  }
}
