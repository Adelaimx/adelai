import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/shopify/queries/product';
import { getCollections } from '@/lib/shopify/queries/collection';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.adelai.com.mx';

  // Fetch data
  const products = await getProducts();
  const collections = await getCollections();

  // Static paths
  const staticPaths: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/best-sellers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/envios-y-devoluciones`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic Product paths
  const productPaths: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/producto/${product.handle}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // Dynamic Collection (Category) paths
  const collectionPaths: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: `${baseUrl}/categoria/${collection.handle}`,
    lastModified: collection.updatedAt ? new Date(collection.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticPaths, ...productPaths, ...collectionPaths];
}
