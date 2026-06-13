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
          availableForSale
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

  try {
    const res = await shopifyFetch<{ collections: Connection<Collection> }>({
      query: q,
      variables: { query },
      tags: ['collections'], // Add Next.js cache tag
    });

    return res.collections.edges.map((e) => {
      const collection = e.node;
      collection.products.edges = collection.products.edges.filter(
        (productEdge) => productEdge.node.availableForSale
      );
      return collection;
    });
  } catch (error) {
    console.error('Error in getCollections:', error);
    return [];
  }
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

  try {
    const res = await shopifyFetch<{ collection: Collection }>({
      query,
      variables: { handle },
      tags: ['collections'], // Add Next.js cache tag
    });

    if (res.collection) {
      res.collection.products.edges = res.collection.products.edges.filter(
        (productEdge) => productEdge.node.availableForSale
      );
    }
    return res.collection;
  } catch (error) {
    console.error('Error in getCollection:', error);
    return undefined;
  }
}
