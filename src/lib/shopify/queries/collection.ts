import { shopifyFetch } from '../index';
import { Collection, Connection } from '../types';

const collectionFragment = `
  fragment collectionFragment on Collection {
    id
    handle
    title
    description
    descriptionHtml
    updatedAt
    image {
      url
      altText
      width
      height
    }
    seo {
      title
      description
    }
    products(first: 20) {
      edges {
        node {
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
          variants(first: 100) {
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
        }
      }
    }
  }
`;

export async function getCollections(query?: string): Promise<Collection[]> {
  const q = `
    query getCollections($query: String) {
      collections(first: 100, query: $query) {
        edges {
          node {
            ...collectionFragment
          }
        }
      }
    }
    ${collectionFragment}
  `;

  const res = await shopifyFetch<{ collections: Connection<Collection> }>({
    query: q,
    variables: { query },
  });

  return res.collections.edges.map((e) => e.node);
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
  const query = `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        ...collectionFragment
      }
    }
    ${collectionFragment}
  `;

  const res = await shopifyFetch<{ collection: Collection }>({
    query,
    variables: { handle },
  });

  return res.collection;
}
