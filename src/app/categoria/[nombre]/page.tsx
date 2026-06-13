import { ProductFilter } from '@/components/ui/ProductFilter';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { getProducts } from '@/lib/shopify/queries/product';
import { ExcellenceSection } from '@/components/ui/ExcellenceSection';
import { CategoryHero } from '@/components/ui/CategoryHero';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ nombre: string }>;
}) {
  const { nombre } = await params;

  // Title formatted (e.g., collares -> COLLARES)
  const categoryTitle = nombre.toUpperCase();

  // Search Shopify products matching the category name
  const products = await getProducts({ query: nombre });

  return (
    <div className="relative flex min-h-screen flex-col -mt-20">
      {/* Hero Section */}
      <CategoryHero 
        categoryTitle={categoryTitle} 
        imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDwaqmawSFWorJ3TDv-aYqn-46jMniwqFOp6pROZgT-mqbFDfTU2-ltdHAMkmI3KE3uT8yViLyIA6PJMCJShK-3cKO-wu4hy53-VoZ1aii3e00jGk7iawSIHua8G3gGLDNP-lRoracrHM7QIP91nqE7t0mKzUsKN-XlDzDDkBQz8bTdtFA30YlGQPOedaauSfZKq9AgT4jkLcVNsBGObFdoU6dem6zjqTYNvsqDnF-CzIZZgVf5PS3oO_JJ1nzo7y0Vd_o4dgUUdCM"
      />

      <div className="mx-auto flex flex-col lg:flex-row w-full max-w-7xl items-stretch gap-0 px-0 py-0">
        <ProductFilter products={products} />
        <ProductGrid products={products} />
      </div>

      {/* Excellence Section */}
      <ExcellenceSection />
    </div>
  );
}
