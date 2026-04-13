import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://adelai.es';

  // List of paths
  const paths = [
    '',
    '/nosotros',
    '/best-sellers',
    '/categoria/anillos',
    '/categoria/aretes',
    '/categoria/collares',
    '/categoria/brazaletes',
  ];

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));
}
