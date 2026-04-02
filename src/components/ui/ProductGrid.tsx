"use client";

import { ProductCard } from "@/components/ui/ProductCard";
import { Product } from "@/types/design";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useCallback, useState, useEffect } from "react";

interface ProductGridProps {
  products: Product[];
}

const ITEMS_PER_PAGE = 6;

export function ProductGrid({ products }: ProductGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Active filters from URL
  const selectedColor = searchParams.get("color");
  const selectedSize = searchParams.get("talla");
  const selectedMaterial = searchParams.get("material");
  const sortBy = searchParams.get("sort") || "recent";

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedColor, selectedSize, selectedMaterial, sortBy]);

  // Filter products based on URL params
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Color filter matching (checking inside variants)
      if (selectedColor) {
        const hasColor = product.variants.some((v) => 
          v.colorName.toLowerCase().replace(/\s+/g, '_') === selectedColor ||
          (selectedColor === "oro" && v.colorName.toLowerCase().includes("oro")) ||
          (selectedColor === "plata" && v.colorName.toLowerCase().includes("plata"))
        );
        if (!hasColor) return false;
      }

      // Size filter matching (checking inside variants)
      if (selectedSize) {
        const hasSize = product.variants.some((v) => v.sizes.includes(selectedSize));
        if (!hasSize) return false;
      }

      // Material filter matching
      if (selectedMaterial && product.material) {
          // Simple match, mock products need 'material' fields updated for this to be perfect.
          const currentMat = product.material.toLowerCase().replace(/\s+/g, '_');
          if (currentMat !== selectedMaterial) return false;
      }

      return true;
    }).sort((a, b) => {
        if (sortBy === "price_asc") return a.basePrice - b.basePrice;
        if (sortBy === "price_desc") return b.basePrice - a.basePrice;
        return 0; // "recent" defaults to array order
    });

  }, [products, selectedColor, selectedSize, selectedMaterial, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Handle Sort Change
  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== 'recent') {
        params.set("sort", value);
      } else {
        params.delete("sort");
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  return (
    <main className="flex-1 px-6 py-12 lg:px-12">
      {/* Controls */}
      <div className="mb-10 flex flex-wrap items-center justify-between lg:justify-end gap-4">
        {/* Mobile Filter Trigger (Moved to ProductFilter.tsx) */}

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">ORDENAR POR:</span>
          <select 
            value={sortBy}
            onChange={handleSortChange}
            className="border-none bg-transparent py-0 pr-8 text-[11px] font-bold uppercase tracking-widest text-slate-900 focus:ring-0 dark:text-white outline-none cursor-pointer"
          >
            <option value="recent">Más Recientes</option>
            <option value="price_asc">Precio: Menor a Mayor</option>
            <option value="price_desc">Precio: Mayor a Menor</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} forceAddMode="AÑADIR AL CARRITO" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
            <span className="material-symbols-outlined text-4xl text-primary/30 mb-4">search_off</span>
            <h3 className="text-lg font-serif text-slate-600 dark:text-slate-300">No se encontraron productos probando sus filtros.</h3>
            <p className="text-sm text-slate-400 mt-2">Intente eliminar algunos filtros para ver más resultados.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-20 flex items-center justify-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button 
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`flex h-10 w-10 items-center justify-center rounded-sm text-[11px] font-bold transition-colors ${
                    currentPage === pageNum 
                      ? 'bg-primary text-white border border-primary' 
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
        </div>
      )}
    </main>
  );
}
