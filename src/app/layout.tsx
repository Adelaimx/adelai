import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CartProvider } from "@/contexts/CartContext";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADELAI | Joyería Minimalista y Consciente",
  description: "Joyería atemporal para la mujer moderna. Diseñada en España, amada en todo el mundo. Descubre nuestra colección de collares, anillos y aretes en oro de 18k.",
  keywords: ["joyería", "minimalista", "consciente", "españa", "oro 18k", "acero inoxidable", "atemporal"],
  authors: [{ name: "ADELAI Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://adelai.es",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${manrope.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <CartProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-white px-4 py-2 rounded-md">
            Saltar al contenido
          </a>
          <Navbar />
          <main id="main-content" className="flex-1 mt-20">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
