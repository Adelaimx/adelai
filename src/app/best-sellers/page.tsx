import { ProductFilter } from "@/components/ui/ProductFilter";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { PRODUCTS } from "@/lib/mockProducts";

export default function BestSellersPage() {
  // Mock data for the Best Sellers
  const products = PRODUCTS;

  return (
    <div className="relative flex min-h-screen flex-col -mt-20">
      
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-slate-200">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" 
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_Abda0HehFpEpX1w6fD1FiKYI5vIott_94hn9__hN4NQKrvFSnqayTm0jBFgfUldPdimwBTJiKPzqf90buSo7tOgPUSgBkv4aWXBWOQnaK1jDuKv_q1B9Mk3DYMgh1yU9ECKiyjziW7h1-El9-s8tuRRv5NWVvlC8p7MgQVu3JXfk8D5PCdr3H3B50evuTgGB5C92mEuf2HLgMsnYSMmU6HPLgi7iRAySQPDJwjiWpMypD99uhFlBC27xUqPzG1gz8I11C_yIC9U')` }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center mt-20">
          <h1 className="font-serif text-6xl font-light tracking-[0.2em] text-white md:text-8xl">
            BEST SELLERS
          </h1>
        </div>
      </section>

      {/* Content with Sidebar */}
      <div className="mx-auto flex flex-col lg:flex-row w-full max-w-7xl items-stretch gap-0 px-0 py-0">
        <ProductFilter />
        <ProductGrid products={products} />
      </div>

      {/* Excellence Section */}
      <section className="border-t border-primary/10 py-24 bg-background-light dark:bg-background-dark z-10">
        <div className="mx-auto max-w-4xl text-center px-6">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">ADELAI Heritage</span>
          <h2 className="mt-6 font-serif text-4xl font-light italic tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
            ARTESANÍA DE EXCELENCIA
          </h2>
          <div className="mx-auto mt-8 h-px w-24 bg-primary"></div>
          <p className="mt-8 text-sm leading-relaxed tracking-wide text-slate-500 max-w-2xl mx-auto uppercase">
            Cada pieza es cuidadosamente elaborada a mano por maestros joyeros, combinando técnicas tradicionales con el diseño contemporáneo más vanguardista.
          </p>
        </div>
      </section>
    </div>
  );
}
