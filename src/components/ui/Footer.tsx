import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-ivory py-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
        
        <div className="col-span-1 md:col-span-1 flex flex-col h-full">
          <div>
            <h2 className="font-serif text-3xl tracking-[0.2em] font-light mb-8 text-gold">ADELAI</h2>
            <p className="text-xs text-accent/60 leading-loose uppercase tracking-widest max-w-sm">
              Joyería atemporal para la mujer moderna. Diseñada en España, amada en todo el mundo.
            </p>
          </div>

          <div className="mt-auto pt-10 flex gap-6 opacity-60">
            {/* Instagram Icon */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:text-gold transition-all pb-2" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            {/* TikTok Icon */}
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:text-gold transition-all pb-2" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            </a>
            {/* Facebook Icon */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:text-gold transition-all pb-2" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:text-gold transition-all pb-2" aria-label="WhatsApp" title="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-8">Colecciones</h4>
          <ul className="space-y-4 text-xs tracking-widest text-accent/80">
            <li><Link className="hover:text-gold transition-colors block" href="/">Inicio</Link></li>
            <li><Link className="hover:text-gold transition-colors block" href="/best-sellers">Best Sellers</Link></li>
            <li><Link className="hover:text-gold transition-colors block" href="/nosotros">Nosotros</Link></li>
            <li><Link className="hover:text-gold transition-colors block" href="/categoria/collares">Collares</Link></li>
            <li><Link className="hover:text-gold transition-colors block" href="/categoria/anillos">Anillos</Link></li>
            <li><Link className="hover:text-gold transition-colors block" href="/categoria/aretes">Aretes</Link></li>
            <li><Link className="hover:text-gold transition-colors block" href="/categoria/brazaletes">Brazaletes</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-8">Servicio</h4>
          <ul className="space-y-4 text-xs tracking-widest text-accent/80">
            <li><Link className="hover:text-gold transition-colors block" href="/nosotros">Envíos y Devoluciones</Link></li>
            <li><Link className="hover:text-gold transition-colors block" href="/nosotros">Cuidado de Joyas</Link></li>
            <li><Link className="hover:text-gold transition-colors block" href="/nosotros">Guía de Tallas</Link></li>
            <li><Link className="hover:text-gold transition-colors block" href="/nosotros">Contacto</Link></li>
          </ul>
        </div>
        
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-accent/10 flex flex-col md:flex-row justify-between gap-6">
        <p className="text-[10px] tracking-widest opacity-40 uppercase">© {new Date().getFullYear()} ADELAI Jewelry. Todos los derechos reservados.</p>
        <p className="text-[10px] tracking-widest opacity-40 uppercase">
          Desarrollado por <a href="https://blackcherrydevs.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-100 hover:text-white transition-all">BlackCherry IT Consulting</a>
        </p>
      </div>
    </footer>
  );
}
