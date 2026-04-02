import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-8xl md:text-9xl font-serif text-primary/20 mb-4 select-none">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-serif text-primary mb-6">
        Página no encontrada
      </h2>
      <p className="text-secondary max-w-md mb-10 text-lg leading-relaxed font-display">
        Lo sentimos, la página que estás buscando no existe o ha sido movida. 
        Te invitamos a seguir explorando nuestras colecciones atemporales.
      </p>
      <Link 
        href="/"
        className="px-8 py-3 bg-primary text-white font-display font-medium rounded-full transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 mb-12"
      >
        Regresar al Inicio
      </Link>
    </div>
  );
}
