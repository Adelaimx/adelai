const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = '2024-01';

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: any;
}): Promise<T> {
  if (!domain || !storefrontAccessToken) {
    throw new Error('Las variables de entorno de Shopify no están configuradas.');
  }

  const endpoint = `https://${domain}/api/${API_VERSION}/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = (await result.json()) as GraphQLResponse<T>;

    if (body.errors) {
      throw body.errors[0];
    }

    if (!body.data) {
      throw new Error('No data returned from Shopify');
    }

    return body.data;
  } catch (e: any) {
    console.error('Error fetching from Shopify:', e);
    throw new Error(e.message || 'Error desconocido al conectar con Shopify');
  }
}
