'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useMemo } from 'react';
import { Product } from '@/lib/shopify/types';
import { categorizeSize, getProductCategory } from '@/lib/utils/categorizeSize';

interface ProductFilterProps {
  products: Product[];
}

export function ProductFilter({ products }: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [showExactSizes, setShowExactSizes] = useState(false);

  // Helper to update search params
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams],
  );

  // Extract dynamic filters from products
  const colorOptions = useMemo(() => {
    const options = new Map<string, string>(); // id -> hex
    const labels = new Map<string, string>(); // id -> label
    // console.log(
    //   products.filter((product) => product.title == 'Aretes Eleonor'),
    // );

    products.forEach((product) => {
      product.variants?.edges.forEach(({ node }) => {
        const colorName = node.selectedOptions.find(
          (o) => o.name === 'Color',
        )?.value;
        if (colorName) {
          let id = colorName.toLowerCase();
          let label = colorName;

          if (id === 'bicolor' || id === 'bi color') {
            id = 'bicolor';
            label = 'Bicolor';
          }

          if (!options.has(id)) {
            let hex = node.colorHex?.value || '#cccccc';

            if (id === 'dorado' || id === 'oro') {
              hex = '#D4AF37';
            } else if (id === 'bicolor') {
              hex = 'linear-gradient(135deg, #D4AF37 50%, #C0C0C0 50%)';
            } else if (id === 'multi color') {
              hex =
                'linear-gradient(45deg, #ff9a9e 0%, #fecfef 25%, #a1c4fd 50%, #c2e9fb 75%, #fbc2eb 100%)';
            }

            options.set(id, hex);
            labels.set(id, label);
          }
        }
      });
    });

    return Array.from(options.entries()).map(([id, hex]) => ({
      id,
      hex,
      label: labels.get(id) || id,
    }));
  }, [products]);

  const sizeData = useMemo(() => {
    const semanticSizes = new Set<string>();
    const chainLengths = new Set<string>();
    const exactSizes = new Set<string>();
    let hasAdjustable = false;

    products.forEach((product) => {
      const pCat = getProductCategory(product);
      product.variants?.edges.forEach(({ node }) => {
        const sizeOption = node.selectedOptions.find(
          (o) => o.name === 'Talla' || o.name === 'Size',
        )?.value;
        if (sizeOption) {
          exactSizes.add(sizeOption);
          const info = categorizeSize(sizeOption, pCat);
          if (info.isAdjustable) hasAdjustable = true;
          if (info.semanticSize) semanticSizes.add(info.semanticSize);
          if (info.chainLength) chainLengths.add(info.chainLength);
        }
      });
    });

    const semanticOrder = ['Delicado', 'Clásico', 'Statement', '5', '6', '7', '8', '9'];
    const chainOrder = ['Corto', 'Medio', 'Largo'];

    return {
      hasAdjustable,
      semanticSizes: Array.from(semanticSizes).sort((a, b) => {
        const idxA = semanticOrder.indexOf(a);
        const idxB = semanticOrder.indexOf(b);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return a.localeCompare(b);
      }),
      chainLengths: Array.from(chainLengths).sort((a, b) => chainOrder.indexOf(a) - chainOrder.indexOf(b)),
      exactSizes: Array.from(exactSizes).sort((a, b) => {
          // Attempt to sort exact sizes numerically if possible
          const numA = parseFloat(a);
          const numB = parseFloat(b);
          if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
          return a.localeCompare(b);
      }),
    };
  }, [products]);

  const materialOptions = useMemo(() => {
    const PREDEFINED_MATERIALS = [
      { id: 'oro_18k', label: 'Oro 18k' },
      { id: 'plata_925', label: 'Plata 925' },
      { id: 'piedras', label: 'Piedras Preciosas' },
    ];

    // Only return materials that are present as tags in at least one product
    return PREDEFINED_MATERIALS.filter((material) => {
      return products.some((product) =>
        product.tags?.some(
          (tag) => tag.toLowerCase().replace(/\s+/g, '_') === material.id,
        ),
      );
    });
  }, [products]);

  const handleFilter = (key: string, value: string) => {
    // Toggle logic: if already selected, remove it
    const current = searchParams.get(key);
    const newValue = current === value ? '' : value;
    router.push(`?${createQueryString(key, newValue)}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push('?', { scroll: false });
  };

  return (
    <div className="flex flex-col w-full lg:w-72 flex-shrink-0">
      {/* Mobile Toggle Button */}
      <div className="w-full bg-[#B4AFA7] px-6 py-4 lg:hidden flex items-center justify-between text-white border-b border-white/10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest hover:text-white/80 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">
            {isOpen ? 'close' : 'tune'}
          </span>
          {isOpen ? 'Ocultar Filtros' : 'Mostrar Filtros'}
        </button>
        {/* Always visible clear button on mobile top bar just in case */}
        {searchParams.toString() !== '' && (
          <button
            onClick={clearFilters}
            className="text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            LIMPIAR
          </button>
        )}
      </div>

      <aside
        className={`${isOpen ? 'block' : 'hidden'} lg:block w-full bg-[#B4AFA7] px-8 py-10 lg:py-12 text-white/90`}
      >
        <div className="hidden lg:flex items-center justify-between mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white">
            FILTROS
          </h2>
          <button
            onClick={clearFilters}
            className="text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            LIMPIAR
          </button>
        </div>

        <div className="space-y-12">
          {/* Color Filter */}
          {colorOptions.length > 0 && (
            <div>
              <h3 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-white">
                COLOR
              </h3>
              <div className="flex flex-wrap gap-3 px-1">
                {colorOptions.map((color) => {
                  const isActive =
                    searchParams.get('color')?.toLowerCase() === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => handleFilter('color', color.id)}
                      className={`h-7 w-7 rounded-full border border-white/20 cursor-pointer transition-all ${
                        isActive
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-[#B4AFA7]'
                          : 'hover:ring-2 hover:ring-white/50 hover:ring-offset-2 hover:ring-offset-[#B4AFA7]'
                      }`}
                      style={{ background: color.hex }}
                      title={color.label}
                      aria-label={`Filtrar por color ${color.label}`}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Semantic Size Filter */}
          {sizeData.semanticSizes.length > 0 && (
            <div>
              <h3 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-white">
                TAMAÑO
              </h3>
              <div className="flex flex-col gap-3">
                {sizeData.semanticSizes.map((size) => {
                  const isActive = searchParams.get('tamano') === size;
                  return (
                    <label key={size} className="flex items-center gap-3 text-[11px] cursor-pointer group">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        isActive ? 'border-white bg-white' : 'border-white/30 group-hover:border-white'
                      }`}>
                        {isActive && <div className="w-2 h-2 rounded-full bg-[#B4AFA7]" />}
                      </div>
                      <span className={`text-sm transition-colors ${isActive ? 'text-white font-bold' : 'text-white/70 group-hover:text-white'}`}>
                        {size}
                      </span>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isActive}
                        onChange={() => handleFilter('tamano', size)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Chain Length Filter */}
          {sizeData.chainLengths.length > 0 && (
            <div>
              <h3 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-white">
                LARGO CADENA
              </h3>
              <div className="flex flex-col gap-3">
                {sizeData.chainLengths.map((length) => {
                  const isActive = searchParams.get('largo') === length;
                  return (
                    <label key={length} className="flex items-center gap-3 text-[11px] cursor-pointer group">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        isActive ? 'border-white bg-white' : 'border-white/30 group-hover:border-white'
                      }`}>
                        {isActive && <div className="w-2 h-2 rounded-full bg-[#B4AFA7]" />}
                      </div>
                      <span className={`text-sm transition-colors ${isActive ? 'text-white font-bold' : 'text-white/70 group-hover:text-white'}`}>
                        {length}
                      </span>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isActive}
                        onChange={() => handleFilter('largo', length)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Characteristics Filter */}
          {sizeData.hasAdjustable && (
            <div>
              <h3 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-white">
                CARACTERÍSTICAS
              </h3>
              <label className="flex items-center gap-3 text-[11px] cursor-pointer group">
                <div className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-colors ${
                  searchParams.get('ajustable') === 'true' ? 'border-white bg-white' : 'border-white/30 group-hover:border-white'
                }`}>
                  {searchParams.get('ajustable') === 'true' && <span className="material-symbols-outlined text-[10px] text-[#B4AFA7] font-bold">check</span>}
                </div>
                <span className={`text-sm transition-colors ${searchParams.get('ajustable') === 'true' ? 'text-white font-bold' : 'text-white/70 group-hover:text-white'}`}>
                  Ajustable
                </span>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={searchParams.get('ajustable') === 'true'}
                  onChange={() => handleFilter('ajustable', 'true')}
                />
              </label>
            </div>
          )}

          {/* Exact Sizes Toggle & Grid */}
          {sizeData.exactSizes.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <button 
                onClick={() => setShowExactSizes(!showExactSizes)}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {showExactSizes ? 'expand_less' : 'expand_more'}
                </span>
                Medidas Exactas
              </button>

              {showExactSizes && (
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {sizeData.exactSizes.map((size) => {
                    const isActive = searchParams.get('talla_exacta') === size;
                    return (
                      <button
                        key={size}
                        onClick={() => handleFilter('talla_exacta', size)}
                        className={`flex min-h-10 px-2 py-1 text-center items-center justify-center rounded border text-[10px] cursor-pointer transition-colors leading-tight ${
                          isActive
                            ? 'border-white/40 bg-white text-[#B4AFA7] font-bold'
                            : 'border-white/10 bg-white/5 font-medium hover:bg-white/10'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Material Section */}
          {materialOptions.length > 0 && (
            <div>
              <h3 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-white">
                MATERIAL
              </h3>
              <div className="space-y-3 px-1">
                {materialOptions.map((material) => {
                  const isActive = searchParams.get('material') === material.id;
                  return (
                    <label
                      key={material.id}
                      className="flex items-center gap-3 text-[11px] cursor-pointer group"
                    >
                      <div
                        className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-colors ${
                          isActive
                            ? 'border-white bg-white'
                            : 'border-white/30 group-hover:border-white'
                        }`}
                      >
                        {isActive && (
                          <span className="material-symbols-outlined text-[10px] text-[#B4AFA7] font-bold">
                            check
                          </span>
                        )}
                      </div>
                      <span
                        className={`transition-colors ${isActive ? 'text-white font-bold' : 'text-white/70 group-hover:text-white'}`}
                      >
                        {material.label}
                      </span>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isActive}
                        onChange={() => handleFilter('material', material.id)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
