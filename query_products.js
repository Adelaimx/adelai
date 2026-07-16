const { SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN } = process.env;

async function fetchProducts() {
  const res = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: `
        {
          products(first: 5) {
            edges {
              node {
                title
                variants(first: 5) {
                  edges {
                    node {
                      title
                      selectedOptions { name value }
                      colorHex: metafield(namespace: "custom", key: "color") { value }
                    }
                  }
                }
              }
            }
          }
        }
      `
    })
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

fetchProducts();
