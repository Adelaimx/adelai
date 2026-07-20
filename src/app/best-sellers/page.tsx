import { ProductFilter } from "@/components/ui/ProductFilter";
import { CategoryHero } from "@/components/ui/CategoryHero";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { getProducts } from "@/lib/shopify/queries/product";
import { getCollections } from "@/lib/shopify/queries/collection";
import { ExcellenceSection } from "@/components/ui/ExcellenceSection";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Sellers | ADELAI',
  description: 'Descubre las piezas más amadas de ADELAI. Joyería minimalista y consciente que resalta tu belleza.',
  alternates: {
    canonical: '/best-sellers',
  },
};

export default async function BestSellersPage() {
  // Fetch real data from Shopify
  const collections = await getCollections();
  const bestSellersCollection = collections.find(c => c.title.toLowerCase().includes('best seller') || c.handle.includes('best-seller'));
  
  let products = [];
  if (bestSellersCollection) {
    products = bestSellersCollection.products.edges.map(e => e.node);
  } else {
    products = await getProducts({ sortKey: 'BEST_SELLING' });
  }

  return (
    <div className="relative flex min-h-screen flex-col -mt-20">
      
      {/* Hero Section */}
      <CategoryHero 
        categoryTitle="BEST SELLERS" 
        imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuA_Abda0HehFpEpX1w6fD1FiKYI5vIott_94hn9__hN4NQKrvFSnqayTm0jBFgfUldPdimwBTJiKPzqf90buSo7tOgPUSgBkv4aWXBWOQnaK1jDuKv_q1B9Mk3DYMgh1yU9ECKiyjziW7h1-El9-s8tuRRv5NWVvlC8p7MgQVu3JXfk8D5PCdr3H3B50evuTgGB5C92mEuf2HLgMsnYSMmU6HPLgi7iRAySQPDJwjiWpMypD99uhFlBC27xUqPzG1gz8I11C_yIC9U" 
      />

      {/* Content with Sidebar */}
      <div className="mx-auto flex flex-col lg:flex-row w-full max-w-7xl items-stretch gap-0 px-0 py-0">
        <ProductFilter products={products} />
        <ProductGrid products={products} />
      </div>

      {/* Excellence Section */}
      <ExcellenceSection />
    </div>
  );
}
