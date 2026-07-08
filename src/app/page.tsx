import { getCollections } from '../lib/shopify/queries/collection';
import { BestSellersCarousel } from '@/components/ui/BestSellersCarousel';
import { ShopTheLookClient } from '@/components/ui/ShopTheLookClient';
import Image from 'next/image';
import { TransitionLink as Link } from '@/components/ui/TransitionLink';
import { getProducts } from '@/lib/shopify/queries/product';
import { HeroScrollClient } from '@/components/ui/HeroScrollClient';
import { InfoScrollClient } from '@/components/ui/InfoScrollClient';
import { CategoryGridScrollClient } from '@/components/ui/CategoryGridScrollClient';
import { getInstagramPosts } from '@/lib/instagram';
import { InstagramCarousel } from '@/components/ui/InstagramCarousel';

export default async function Home() {
  const allProducts = await getProducts();
  const collections = await getCollections();
  const instagramPosts = await getInstagramPosts(15);
  const bestSellersCollection = collections.find(
    (c) =>
      c.title.toLowerCase().includes('best seller') ||
      c.handle.includes('best-seller'),
  );
  const bestSellers = bestSellersCollection
    ? bestSellersCollection.products.edges.map((e) => e.node)
    : allProducts.slice(0, 8);

  // Find "Shop the Look" collection
  const shopTheLookCollection = collections.find((c) =>
    c.title.toLowerCase().startsWith('comprar el look:'),
  );

  // Find "Regalos Exclusivos" collection
  const regalosExclusivosCollection = collections.find((c) =>
    c.title.toLowerCase().includes('regalos exclusivos'),
  );
  const regaloProduct = regalosExclusivosCollection?.products.edges[0]?.node;

  // Find multiple images for the 4 categories to avoid repetition
  const findImages = (keyword: string, fallback: string) => {
    const products = allProducts.filter(p => 
      p.title.toLowerCase().includes(keyword) || 
      p.tags?.some(t => t.toLowerCase().includes(keyword))
    );
    const urls = products.map(p => p.featuredImage?.url).filter(Boolean);
    return {
      img1: urls[0] || fallback,
      img2: urls[1] || urls[0] || fallback
    };
  };

  const anillosImgs = findImages('anillo', 'https://images.unsplash.com/photo-1605100804763-247f67b2548e?q=80&w=800&auto=format&fit=crop');
  const aretesImgs = findImages('arete', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop');
  const collaresImgs = findImages('collar', 'https://images.unsplash.com/photo-1599643478514-4a4e0f04c6b1?q=80&w=800&auto=format&fit=crop');
  const pulserasImgs = findImages('pulsera', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop');

  return (
    <div className="relative flex flex-col pt-0 transition-colors duration-300">
      {/* 1. Hero Section */}
      <HeroScrollClient
        regaloProduct={regaloProduct}
        regalosExclusivosCollection={regalosExclusivosCollection}
      />

      {/* 2. Info Section */}
      <InfoScrollClient />

      {/* 3. Shop by Category (Responsive Grid / Deck of Cards GSAP) */}
      <CategoryGridScrollClient categories={[
        {
          img: anillosImgs.img1,
          tag: 'Anillos',
          link: '/categoria/anillos',
        },
        {
          img: aretesImgs.img1,
          tag: 'Aretes',
          link: '/categoria/aretes',
        },
        {
          img: collaresImgs.img1,
          tag: 'Collares',
          link: '/categoria/collares',
        },
        {
          img: pulserasImgs.img1,
          tag: 'Pulseras',
          link: '/categoria/brazaletes',
        },
      ]} />

      {/* 4. Best Sellers Carousel */}
      <section className="py-24 bg-white dark:bg-background-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-end justify-between mb-12 border-b border-primary/20 pb-4">
            <h2 className="font-serif text-3xl md:text-4xl tracking-widest font-light text-primary">
              Best Sellers
            </h2>
          </div>

          <BestSellersCarousel products={bestSellers} />
        </div>
      </section>

      {/* 5. Editorial Look */}
      {shopTheLookCollection && (
        <ShopTheLookClient collection={shopTheLookCollection} />
      )}

      {/* 6. Featured Products & Grid Section */}
      <section className="featured_Products py-0 border-y border-primary/10">
        <div className="flex flex-col md:flex-row min-h-[600px]">
          {/* Left Column: Joyeros */}
          <Link href="/categoria/joyeros" className="w-full md:w-1/2 relative group overflow-hidden h-96 md:h-[600px] block">
            <Image
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop"
              alt="Joyeros elegantes ADELAI"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="text-center px-6">
                <h2 className="font-serif text-4xl md:text-5xl text-white tracking-wider mb-6 drop-shadow-md">
                  JOYEROS
                </h2>
              </div>
            </div>
          </Link>

          {/* Right Column: 2x2 Grid */}
          <div className="w-full md:w-1/2 relative h-[600px] flex flex-col">
            <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
              {[
                {
                  img: anillosImgs.img2,
                  tag: 'Anillos',
                  link: '/categoria/anillos',
                },
                {
                  img: aretesImgs.img2,
                  tag: 'Aretes',
                  link: '/categoria/aretes',
                },
                {
                  img: collaresImgs.img2,
                  tag: 'Collares',
                  link: '/categoria/collares',
                },
                {
                  img: pulserasImgs.img2,
                  tag: 'Pulseras',
                  link: '/categoria/brazaletes',
                },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className="relative group overflow-hidden h-full block"
                >
                  <Image
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                    src={item.img}
                    alt={`Categoría ${item.tag} - Joyería ADELAI`}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4 select-none">
                      <span className="text-white uppercase tracking-[0.4em] font-medium text-[10px] md:text-sm lg:text-lg drop-shadow-md">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Overlaid Block */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 md:p-10 flex flex-col items-center gap-6 pointer-events-auto shadow-2xl rounded-[12px]">
                <h2 className="font-serif text-xl md:text-3xl text-white tracking-[0.2em] uppercase text-center">
                  Piezas Destacadas
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Community Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-light mb-4 text-primary uppercase tracking-widest">
              Comunidad ADELAI
            </h2>
            <p className="text-secondary dark:text-accent tracking-widest text-xs">
              Comparte tu estilo con @ADELAI_JEWELRY
            </p>
          </div>

          {/* Carrusel de Instagram */}
          <div className="-mx-6">
            <InstagramCarousel posts={instagramPosts} />
          </div>
        </div>
      </section>
    </div>
  );
}
