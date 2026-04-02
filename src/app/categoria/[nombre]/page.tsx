import { ProductFilter } from "@/components/ui/ProductFilter";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { PRODUCTS } from "@/lib/mockProducts";
import Image from "next/image";
import { ExcellenceSection } from "@/components/ui/ExcellenceSection";

export default async function CategoryPage({ params }: { params: Promise<{ nombre: string }> }) {
  const { nombre } = await params;
  
  // Title formatted (e.g., collares -> COLLARES)
  const categoryTitle = nombre.toUpperCase();

  // Mock data for the category
  const products = PRODUCTS;

  return (
    <div className="relative flex min-h-screen flex-col -mt-20">
      
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/40">
          <Image 
            fill
            alt={`Colección ${categoryTitle}`} 
            className="object-cover mix-blend-overlay" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwaqmawSFWorJ3TDv-aYqn-46jMniwqFOp6pROZgT-mqbFDfTU2-ltdHAMkmI3KE3uT8yViLyIA6PJMCJShK-3cKO-wu4hy53-VoZ1aii3e00jGk7iawSIHua8G3gGLDNP-lRoracrHM7QIP91nqE7t0mKzUsKN-XlDzDDkBQz8bTdtFA30YlGQPOedaauSfZKq9AgT4jkLcVNsBGObFdoU6dem6zjqTYNvsqDnF-CzIZZgVf5PS3oO_JJ1nzo7y0Vd_o4dgUUdCM" 
            priority
          />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center mt-20">
          <h1 className="text-4xl font-bold tracking-[0.15em] text-white lg:text-7xl font-serif uppercase">
            {categoryTitle}
          </h1>
        </div>
      </section>

      {/* Content with Sidebar */}
      <div className="mx-auto flex flex-col lg:flex-row w-full max-w-7xl items-stretch gap-0 px-0 py-0">
        <ProductFilter />
        <ProductGrid products={products} />
      </div>

      {/* Excellence Section */}
      <ExcellenceSection />
    </div>
  );
}
