import { shopifyFetch } from '../index';
import { Cart } from '../types';

const cartFragment = `
  fragment cartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount { amount currencyCode }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions { name value }
              product {
                id
                handle
                title
                featuredImage { url altText width height }
              }
            }
          }
        }
      }
    }
  }
`;

export async function createCart(): Promise<Cart> {
  const query = `
    mutation cartCreate {
      cartCreate {
        cart {
          ...cartFragment
        }
      }
    }
    ${cartFragment}
  `;

  const res = await shopifyFetch<{ cartCreate: { cart: Cart } }>({ query, cache: 'no-store' });
  return res.cartCreate.cart;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<Cart> {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...cartFragment
        }
      }
    }
    ${cartFragment}
  `;

  const res = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>({
    query,
    variables: { cartId, lines },
    cache: 'no-store'
  });
  return res.cartLinesAdd.cart;
}

export async function updateCart(cartId: string, lines: { id: string; merchandiseId: string; quantity: number }[]): Promise<Cart> {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...cartFragment
        }
      }
    }
    ${cartFragment}
  `;

  const res = await shopifyFetch<{ cartLinesUpdate: { cart: Cart } }>({
    query,
    variables: { cartId, lines },
    cache: 'no-store'
  });
  return res.cartLinesUpdate.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...cartFragment
        }
      }
    }
    ${cartFragment}
  `;

  const res = await shopifyFetch<{ cartLinesRemove: { cart: Cart } }>({
    query,
    variables: { cartId, lineIds },
    cache: 'no-store'
  });
  return res.cartLinesRemove.cart;
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...cartFragment
      }
    }
    ${cartFragment}
  `;

  const res = await shopifyFetch<{ cart: Cart }>({
    query,
    variables: { cartId },
    cache: 'no-store'
  });
  return res.cart;
}
