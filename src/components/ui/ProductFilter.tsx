"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export function ProductFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

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
    [searchParams]
  );

  const handleFilter = (key: string, value: string) => {
    // Toggle logic: if already selected, remove it
    const current = searchParams.get(key);
    const newValue = current === value ? "" : value;
    router.push(`?${createQueryString(key, newValue)}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push("?", { scroll: false });
  };

  return (
    <div className="flex flex-col w-full lg:w-72 flex-shrink-0">
      {/* Mobile Toggle Button */}
      <div className="w-full bg-[#B4AFA7] px-6 py-4 lg:hidden flex items-center justify-between text-white border-b border-white/10">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest hover:text-white/80 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">{isOpen ? "close" : "tune"}</span>
          {isOpen ? "Ocultar Filtros" : "Mostrar Filtros"}
        </button>
        {/* Always visible clear button on mobile top bar just in case */}
        {(searchParams.toString() !== "") && (
          <button onClick={clearFilters} className="text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-colors">
            LIMPIAR
          </button>
        )}
      </div>

      <aside className={`${isOpen ? 'block' : 'hidden'} lg:block w-full bg-[#B4AFA7] px-8 py-10 lg:py-12 text-white/90`}>
      <div className="hidden lg:flex items-center justify-between mb-12">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white">FILTROS</h2>
        <button 
          onClick={clearFilters}
          className="text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-colors"
        >
          LIMPIAR
        </button>
      </div>

      <div className="space-y-12">
        {/* Color Filter */}
        <div>
          <h3 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-white">COLOR</h3>
          <div className="flex flex-wrap gap-3 px-1">
            {[
              { id: "oro", hex: "#D4AF37", label: "Oro" },
              { id: "plata", hex: "#C0C0C0", label: "Plata Esterlina" },
              { id: "blanco", hex: "#FFFFFF", label: "Blanco" },
              { id: "oro_rosa", hex: "#B76E79", label: "Oro Rosa" },
            ].map((color) => {
              const isActive = searchParams.get("color") === color.id;
              return (
                <button
                  key={color.id}
                  onClick={() => handleFilter("color", color.id)}
                  className={`h-7 w-7 rounded-full border border-white/20 transition-all ${
                    isActive ? "ring-2 ring-white ring-offset-2 ring-offset-[#B4AFA7]" : "hover:ring-2 hover:ring-white/50 hover:ring-offset-2 hover:ring-offset-[#B4AFA7]"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.label}
                  aria-label={`Filtrar por color ${color.label}`}
                />
              );
            })}
          </div>
        </div>

        {/* Size Filter */}
        <div>
          <h3 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-white">TALLA</h3>
          <div className="grid grid-cols-4 gap-2">
            {["S", "M", "L", "XL", "U"].map((size) => {
              const isActive = searchParams.get("talla") === size;
              return (
                <button
                  key={size}
                  onClick={() => handleFilter("talla", size)}
                  className={`flex h-10 items-center justify-center rounded border text-[10px] transition-colors ${
                    isActive
                      ? "border-white/40 bg-white text-[#B4AFA7] font-bold"
                      : "border-white/10 bg-white/5 font-medium hover:bg-white/10"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Material Section */}
        <div>
          <h3 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-white">MATERIAL</h3>
          <div className="space-y-3 px-1">
            {[
              { id: "oro_18k", label: "Oro 18k" },
              { id: "plata_925", label: "Plata 925" },
              { id: "piedras", label: "Piedras Preciosas" },
            ].map((material) => {
              const isActive = searchParams.get("material") === material.id;
              return (
                <label key={material.id} className="flex items-center gap-3 text-[11px] cursor-pointer group">
                  <div className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-colors ${
                    isActive ? "border-white bg-white" : "border-white/30 group-hover:border-white"
                  }`}>
                    {isActive && <span className="material-symbols-outlined text-[10px] text-[#B4AFA7] font-bold">check</span>}
                  </div>
                  <span className={`transition-colors ${isActive ? "text-white font-bold" : "text-white/70 group-hover:text-white"}`}>
                    {material.label}
                  </span>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isActive}
                    onChange={() => handleFilter("material", material.id)}
                  />
                </label>
              );
            })}
          </div>
        </div>
        
      </div>
    </aside>
    </div>
  );
}
