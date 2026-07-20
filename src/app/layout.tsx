import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { getCart } from "@/app/actions/cart";
import { InitialLoader } from "@/components/ui/InitialLoader";
import { PageTransitionCurtain } from "@/components/ui/PageTransitionCurtain";

const montserrat = localFont({
  src: '../../public/Tipografia/montserrat.regular.otf',
  variable: '--font-montserrat',
  display: 'swap',
});

const carmela = localFont({
  src: '../../public/Tipografia/Carmela.otf',
  variable: '--font-carmela',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.adelai.com.mx"),
  title: "ADELAI | Joyería Minimalista y Consciente",
  description: "Joyería atemporal para la mujer moderna. Diseñada en España, amada en todo el mundo. Descubre nuestra colección de collares, anillos y aretes en oro de 18k.",
  keywords: ["joyería", "minimalista", "consciente", "españa", "oro 18k", "acero inoxidable", "atemporal"],
  authors: [{ name: "ADELAI Team" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://www.adelai.com.mx",
    title: "ADELAI | Joyería Minimalista y Consciente",
    description: "Joyería atemporal para la mujer moderna. Diseñada en España.",
    siteName: "ADELAI Jewelry",
  },
  twitter: {
    card: "summary_large_image",
    title: "ADELAI | Joyería Minimalista y Consciente",
    description: "Joyería atemporal para la mujer moderna. Diseñada en España.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialCart = await getCart();
  const shopifyDomain = process.env.SHOPIFY_STORE_DOMAIN || 'adelai-3.myshopify.com';

  return (
    <html lang="es" className={`${montserrat.variable} ${carmela.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" media="print" />
        <noscript>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
        </noscript>
        <script dangerouslySetInnerHTML={{
          __html: `
            document.querySelectorAll('link[media="print"]').forEach(function(link) {
              link.media = 'all';
            });
          `
        }} />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <InitialLoader />
        <PageTransitionCurtain />
        <CartProvider initialCart={initialCart}>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-white px-4 py-2 rounded-md">
            Saltar al contenido
          </a>
          <Navbar shopifyDomain={shopifyDomain} />
          <main id="main-content" className="flex-1 mt-20">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
