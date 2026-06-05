import { shopifyFetch } from '../index';
import { Product, Connection } from '../types';

const productFragment = `
  fragment productFragment on Product {
    id
    handle
    title
    description
    descriptionHtml
    productType
    tags
    options {
      name
      values
    }
    priceRange {
      maxVariantPrice { amount currencyCode }
      minVariantPrice { amount currencyCode }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          selectedOptions { name value }
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          colorHex: metafield(namespace: "custom", key: "color") {
            value
          }
          image { url altText width height }
        }
      }
    }
    featuredImage { url altText width height }
    images(first: 20) {
      edges {
        node { url altText width height }
      }
    }
    seo { title description }
    updatedAt
  }
`;

export async function getProducts({
  sortKey = 'TITLE',
  reverse = false,
  query: searchQuery = ''
}: {
  sortKey?: string;
  reverse?: boolean;
  query?: string;
} = {}): Promise<Product[]> {
  const query = `
    query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
      products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
        edges {
          node {
            ...productFragment
          }
        }
      }
    }
    ${productFragment}
  `;

  const res = await shopifyFetch<{ products: Connection<Product> }>({
    query,
    variables: { sortKey, reverse, query: searchQuery },
    tags: ['products'] // Next.js Cache Tag
  });

  return res.products.edges.map(edge => edge.node);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        ...productFragment
      }
    }
    ${productFragment}
  `;

  const res = await shopifyFetch<{ product: Product | null }>({
    query,
    variables: { handle },
    tags: ['products'] // Next.js Cache Tag
  });

  return res.product || undefined;
}
