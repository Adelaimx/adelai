"use client";

import { useRef } from "react";
import Image from "next/image";
import { InstagramPost } from "@/lib/instagram";

interface InstagramCarouselProps {
  posts: InstagramPost[];
}

export function InstagramCarousel({ posts }: InstagramCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Usaremos las imágenes de la carpeta encabezados como fallback o contenido principal
  const displayPosts = posts.length > 0 ? posts : [
    { id: '1', media_url: '/encabezados/Anillos_Encabezado.jpeg', media_type: 'IMAGE', permalink: 'https://www.instagram.com/adelai.mx?igsh=MWhuemJ4bjltYnBm' },
    { id: '2', media_url: '/encabezados/Brazaletes_Encabezado.jpeg', media_type: 'IMAGE', permalink: 'https://www.instagram.com/adelai.mx?igsh=MWhuemJ4bjltYnBm' },
    { id: '3', media_url: '/encabezados/Encabezado_Aretes.png', media_type: 'IMAGE', permalink: 'https://www.instagram.com/adelai.mx?igsh=MWhuemJ4bjltYnBm' },
    { id: '4', media_url: '/encabezados/Encabezado_Collares.jpeg', media_type: 'IMAGE', permalink: 'https://www.instagram.com/adelai.mx?igsh=MWhuemJ4bjltYnBm' },
    { id: '5', media_url: '/encabezados/Encabezado_Nostros.jpeg', media_type: 'IMAGE', permalink: 'https://www.instagram.com/adelai.mx?igsh=MWhuemJ4bjltYnBm' },
  ] as InstagramPost[];

  return (
    <div className="relative group">
      {/* Botón Anterior */}
      <button 
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100" 
        aria-label="Anterior foto"
      >
        <span className="material-symbols-outlined text-sm">chevron_left</span>
      </button>

      {/* Contenedor del Carrusel */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {displayPosts.map((post, idx) => {
          // If video, use thumbnail, else media_url
          const imgUrl = post.media_type === 'VIDEO' && post.thumbnail_url 
            ? post.thumbnail_url 
            : post.media_url;

          return (
            <div 
              key={post.id || idx}
              // Responsividad: 2 en móvil, 3 en tablet, 5 en desktop
              className="snap-start min-w-[calc(50%-0.25rem)] md:min-w-[calc(33.333%-0.33rem)] lg:min-w-[calc(20%-0.4rem)] flex-shrink-0"
            >
              <a 
                href={post.permalink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="aspect-square block bg-slate-200 overflow-hidden relative w-full h-full group/item"
                title={post.caption || "Instagram post"}
              >
                <Image
                  fill
                  className="object-cover transition-all duration-700 group-hover/item:scale-110"
                  src={imgUrl}
                  alt={`Comunidad ADELAI ${idx + 1}`}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                
                {/* Overlay con icono de Instagram al hacer hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
              </a>
            </div>
          );
        })}
      </div>

      {/* Botón Siguiente */}
      <button 
        onClick={scrollRight}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100" 
        aria-label="Siguiente foto"
      >
        <span className="material-symbols-outlined text-sm">chevron_right</span>
      </button>
    </div>
  );
}
