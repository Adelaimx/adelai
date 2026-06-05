'use client';

import { ProductCard } from '@/components/ui/ProductCard';
import { Product } from '@/lib/shopify/types';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, useCallback, useState, useEffect } from 'react';
import { categorizeSize, getProductCategory } from '@/lib/utils/categorizeSize';

interface ProductGridProps {
  products: Product[];
}

const ITEMS_PER_PAGE = 6;

export function ProductGrid({ products }: ProductGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Active filters from URL
  const selectedColor = searchParams.get('color')?.toLowerCase();
  const selectedTamano = searchParams.get('tamano'); // 'Delicado', 'Clásico', etc.
  const selectedLargo = searchParams.get('largo'); // 'Corto', 'Medio', etc.
  const isAjustable = searchParams.get('ajustable') === 'true';
  const exactSize = searchParams.get('talla_exacta'); // Original raw size
  const selectedMaterial = searchParams.get('material')?.toLowerCase();
  const sortBy = searchParams.get('sort') || 'recent';

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedColor,
    selectedTamano,
    selectedLargo,
    isAjustable,
    exactSize,
    selectedMaterial,
    sortBy,
  ]);

  // Filter products based on URL params
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Color filter matching (checking inside Shopify variant options)
        if (selectedColor) {
          const hasColor = product.variants?.edges.some(({ node }) => {
            const colorOption = node.selectedOptions
              .find((o) => o.name === 'Color')
              ?.value?.toLowerCase();
            if (!colorOption) return false;

            return (
              colorOption === selectedColor ||
              (selectedColor === 'oro' && colorOption.includes('oro')) ||
              (selectedColor === 'plata' && colorOption.includes('plata')) ||
              (selectedColor === 'bicolor' &&
                (colorOption === 'bicolor' || colorOption === 'bi color'))
            );
          });
          if (!hasColor) return false;
        }

        // Semantic Size & Exact Size matching
        if (selectedTamano || selectedLargo || isAjustable || exactSize) {
          // We need to check if ANY of the product variants matches the selected semantic filters simultaneously.
          // Or if one variant matches tamano and another matches largo? Usually it's per variant.
          const pCat = getProductCategory(product);

          const hasMatchingVariant = product.variants?.edges.some(
            ({ node }) => {
              const sizeOption = node.selectedOptions.find(
                (o) => o.name === 'Talla' || o.name === 'Size',
              )?.value;
              if (!sizeOption) return false;

              const info = categorizeSize(sizeOption, pCat);

              if (selectedTamano && info.semanticSize !== selectedTamano)
                return false;
              if (selectedLargo && info.chainLength !== selectedLargo)
                return false;
              if (isAjustable && !info.isAdjustable) return false;
              if (exactSize && info.rawSize !== exactSize) return false;

              return true;
            },
          );

          if (!hasMatchingVariant) return false;
        }

        // Material filter matching
        // Note: In a real Shopify setup, material might be a metafield or a tag. We'll check tags.
        if (selectedMaterial) {
          const hasMaterialTag = product.tags?.some(
            (tag) =>
              tag.toLowerCase().replace(/\s+/g, '_') === selectedMaterial,
          );
          if (!hasMaterialTag) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
        const priceB = parseFloat(b.priceRange.minVariantPrice.amount);

        if (sortBy === 'price_asc') return priceA - priceB;
        if (sortBy === 'price_desc') return priceB - priceA;
        return 0; // "recent" defaults to array order
      });
  }, [
    products,
    selectedColor,
    selectedTamano,
    selectedLargo,
    isAjustable,
    exactSize,
    selectedMaterial,
    sortBy,
  ]);

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
        params.set('sort', value);
      } else {
        params.delete('sort');
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Initial sync
    window.dispatchEvent(
      new CustomEvent('filter-state-change', { detail: { isOpen: false } }),
    );

    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail !== undefined) {
        setIsFilterOpen(customEvent.detail.isOpen);
      }
    };
    window.addEventListener('filter-state-change', handleToggle);
    return () =>
      window.removeEventListener('filter-state-change', handleToggle);
  }, []);

  return (
    <main className="flex-1 px-6 py-12 lg:px-12">
      {/* Controls */}
      <div className="mb-10 flex flex-wrap items-center justify-end gap-4 border-b border-primary-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            ORDENAR POR:
          </span>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="border-none bg-transparent py-0 pr-8 text-[11px] font-bold uppercase tracking-widest text-slate-900 focus:ring-0 dark:text-dark outline-none cursor-pointer"
          >
            <option value="recent">Más Recientes</option>
            <option value="price_asc">Precio: Menor a Mayor</option>
            <option value="price_desc">Precio: Mayor a Menor</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {paginatedProducts.length > 0 ? (
        <div
          className={`grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 transition-all duration-500 ${isFilterOpen ? 'lg:grid-cols-2 xl:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'}`}
        >
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              forceAddMode="AÑADIR AL CARRITO"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <span className="material-symbols-outlined text-4xl text-primary/30 mb-4">
            search_off
          </span>
          <h3 className="text-lg font-serif text-slate-600 dark:text-slate-300">
            No se encontraron productos con estos filtros.
          </h3>
          <p className="text-sm text-slate-400 mt-2">
            Intenta eliminar algunos filtros para ver más resultados.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-20 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-lg">
              chevron_left
            </span>
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-lg">
              chevron_right
            </span>
          </button>
        </div>
      )}
    </main>
  );
}
