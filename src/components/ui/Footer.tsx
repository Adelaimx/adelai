import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        <div className="col-span-1 md:col-span-1 flex flex-col h-full">
          <div>
            <h2 className="font-serif text-3xl tracking-[0.2em] font-light mb-8 text-white">ADELAI</h2>
            <p className="text-xs text-accent/60 leading-loose uppercase tracking-widest max-w-sm">
              Joyería atemporal para la mujer moderna. Diseñada en España, amada en todo el mundo.
            </p>
          </div>

          <div className="mt-auto pt-10 flex gap-6 opacity-60">
            {/* Instagram Icon */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-100 hover:text-primary transition-all pb-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            {/* TikTok Icon */}
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:opacity-100 hover:text-primary transition-all pb-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            </a>
            {/* Facebook Icon */}
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:opacity-100 hover:text-primary transition-all pb-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            {/* WhatsApp Icon */}
            <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="hover:opacity-100 hover:text-primary transition-all pb-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-8">Colecciones</h4>
          <ul className="space-y-4 text-xs tracking-widest text-accent/80">
            <li><Link className="hover:text-primary transition-colors block" href="/">Inicio</Link></li>
            <li><Link className="hover:text-primary transition-colors block" href="/best-sellers">Best Sellers</Link></li>
            <li><Link className="hover:text-primary transition-colors block" href="/nosotros">Nosotros</Link></li>
            <li><Link className="hover:text-primary transition-colors block" href="/categoria/collares">Collares</Link></li>
            <li><Link className="hover:text-primary transition-colors block" href="/categoria/anillos">Anillos</Link></li>
            <li><Link className="hover:text-primary transition-colors block" href="/categoria/aretes">Aretes</Link></li>
            <li><Link className="hover:text-primary transition-colors block" href="/categoria/brazaletes">Brazaletes</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-8">Servicio</h4>
          <ul className="space-y-4 text-xs tracking-widest text-accent/80">
            <li><Link className="hover:text-primary transition-colors block" href="/nosotros">Envíos y Devoluciones</Link></li>
            <li><Link className="hover:text-primary transition-colors block" href="/nosotros">Cuidado de Joyas</Link></li>
            <li><Link className="hover:text-primary transition-colors block" href="/nosotros">Guía de Tallas</Link></li>
            <li><Link className="hover:text-primary transition-colors block" href="/nosotros">Contacto</Link></li>
          </ul>
        </div>
        
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-accent/10 flex flex-col md:flex-row justify-between gap-6">
        <p className="text-[10px] tracking-widest opacity-40 uppercase">© {new Date().getFullYear()} ADELAI Jewelry. Todos los derechos reservados.</p>
        <p className="text-[10px] tracking-widest opacity-40 uppercase">
          Desarrollado por <a href="https://blackcherrydevs.vercel.app/" target="_blank" rel="noreferrer" className="underline hover:opacity-100 hover:text-white transition-all">BlackCherry</a>
        </p>
      </div>
    </footer>
  );
}
