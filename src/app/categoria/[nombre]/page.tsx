import { ProductFilter } from '@/components/ui/ProductFilter';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { getProducts } from '@/lib/shopify/queries/product';
import { ExcellenceSection } from '@/components/ui/ExcellenceSection';
import { CategoryHero } from '@/components/ui/CategoryHero';

export async function generateMetadata({ params }: { params: Promise<{ nombre: string }> }) {
  const { nombre } = await params;
  
  // Format title (e.g. collares -> Collares)
  const formattedName = nombre.charAt(0).toUpperCase() + nombre.slice(1);
  const url = `/categoria/${nombre}`;
  
  return {
    title: `${formattedName} | ADELAI`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${formattedName} | ADELAI`,
      url: url,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ nombre: string }>;
}) {
  const { nombre } = await params;

  // Title formatted (e.g., collares -> COLLARES)
  const categoryTitle = nombre.toUpperCase();

  // Mapear cada categoría a su respectiva imagen local
  const heroImages: Record<string, string> = {
    anillos: '/encabezados/Anillos_Encabezado.jpeg',
    brazaletes: '/encabezados/Brazaletes_Encabezado.jpeg',
    aretes: '/encabezados/Encabezado_Aretes.png',
    collares: '/encabezados/Encabezado_Collares.jpeg',
    joyeros: '/encabezados/Encabezado_Joyeros.jpeg',
  };

  // Usar la imagen de la categoría o una imagen por defecto si la categoría no está en la lista
  const defaultHero =
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1920&auto=format&fit=crop';
  const imageUrl = heroImages[nombre.toLowerCase()] || defaultHero;

  // Search Shopify products matching the category name (or all if catalog)
  let queryToUse = nombre;
  if (nombre.toLowerCase() === 'joyeros') {
    queryToUse = 'joyero'; // Buscar en singular para mejor coincidencia en Shopify
  }
  const products = await getProducts({ query: queryToUse });

  return (
    <div className="relative flex min-h-screen flex-col -mt-20">
      {/* Hero Section */}
      <CategoryHero categoryTitle={categoryTitle} imageUrl={imageUrl} />

      <div className="mx-auto flex flex-col lg:flex-row w-full items-stretch gap-0 px-0 py-0">
        <ProductFilter products={products} />
        <ProductGrid products={products} />
      </div>

      {/* Excellence Section */}
      <ExcellenceSection />
    </div>
  );
}
