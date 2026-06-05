import { getCollections } from '../lib/shopify/queries/collection';
import { BestSellersCarousel } from '@/components/ui/BestSellersCarousel';
import { ShopTheLookClient } from '@/components/ui/ShopTheLookClient';
import Image from 'next/image';
import { TransitionLink as Link } from '@/components/ui/TransitionLink';
import { getProducts } from '@/lib/shopify/queries/product';
import { HeroScrollClient } from '@/components/ui/HeroScrollClient';
import { InfoScrollClient } from '@/components/ui/InfoScrollClient';
import { CategoryGridScrollClient } from '@/components/ui/CategoryGridScrollClient';

export default async function Home() {
  const allProducts = await getProducts();
  const collections = await getCollections();
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
      <CategoryGridScrollClient />

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
      <section className="py-0 border-y border-primary/10">
        <div className="flex flex-col md:flex-row min-h-[600px]">
          {/* Left Column: Nuevos Productos */}
          <div className="w-full md:w-1/2 relative group overflow-hidden h-96 md:h-[600px]">
            <Image
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuUFauSEKOFmIaXHmoyHGebNyioRSRkEunQHQFcdAp4tRH_swD6cT6UF2O_z7pqP07G-Zt5SOPZYdBC6tGjtiojiWZvT943Z9UpLhwWdyvDVehC6ZAVhl98mlm8pyHFcepHMRE2FQVzoaIbaoU0WkMQM1cwI6gs79bc0p2Tr3shT1d4Q6skfjo25nSGlKxxHFqAuPFsF76jaGG7WaV81HQb_LVBp_37vIj--NqoResi46_OyGeZ6_sZ2flTTrGs3F2HGw1AoLtbUA"
              alt="Nuevos lanzamientos de joyería minimalista ADELAI"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center pointer-events-none">
              <div className="text-center px-6 pointer-events-auto">
                <h2 className="font-serif text-4xl md:text-5xl text-white tracking-wider mb-6">
                  NUEVOS PRODUCTOS
                </h2>
              </div>
            </div>
          </div>

          {/* Right Column: 2x2 Grid */}
          <div className="w-full md:w-1/2 relative h-[600px] flex flex-col">
            <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
              {[
                {
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjejwGCrsFyxcMBreFpu--CS9ksbDy0B-XrCNmDYjtB-19eMKyszPhKbf0I6tT3aSBicoHl-p6ezELMH0P3_xvtk2bzQD3jnRnM5dwIQahidt_Jy4Oc-WLWGdykNfMTFwuc3zEdsQKRhckJYuEEg37yaPiXweVTLIXi643vtTgWemDiWFJ64tIl-FqS8FjMjmunnmOtJ6c9ZFjY01tNPkAi_IT2No25-pLsvvn-dUfZSTllO6W2_U5aFzVdnTsKEq-WzOtpnLt9g4',
                  tag: 'Anillos',
                  link: '/categoria/anillos',
                },
                {
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMAUlmMFtrDmUwIiFDCRWKlcJP0aDcKrS6073XU8y4SFsc_lejeLGhG_u4zw1rrcuxnZ9rBeJ0sAmtTJDjBqjTDHvu-RSpIAGO1hLS0E8t7LAXXih_tUuTLuTsE2O7ILyyYraSnj6JlN84mkQ0NwDpDJs3YFo7iBduqGXoMhPPLMnLQUXTgBj-j1BhN1AvIY_FenvhOiLneKVY6zWMlpaIKUC6QInq2J6kdKNfIyhVAs',
                  tag: 'Aretes',
                  link: '/categoria/aretes',
                },
                {
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWv-8_OpdjyYjpZYoQw5H88KKjED3e06v5LfPU22HNLPEGQnrhCF5tr9mRILKNIlBLK3WM2ZMRuZg8BIsouz6IuSTwsMlbT-CqflCbSCxWOyL_LYc3YNjS6aybpsWQBWGakS5Ni8pdlBx9n-PZrflwnD6-SNT61EKQGnqBB8FGEhQNa4VxJUUHUcXsPW9FS_aBQeTtHjFx25aypJHHthsJ1lruEwzYUL9CminsaEs5lx7pKuZM1aZb4IqWPKYBMwsUe7qPsgm-i3k',
                  tag: 'Collares',
                  link: '/categoria/collares',
                },
                {
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpLH5HGc1kmArtJ6BJmlS3bw5cpNmRMsgkv2GRxXlwy-_cb07XX7fLTzX__AnK-SI5IOtVmqsBMrVLEfFgIUaFeMJSWTZDAdT3XVta8goLP4KLgKFmxSviKLOtQOehxk8m-v26e5_q7PSDBj9KSF33pAhEXf1DD6e9Q5Rgw3HX56MRMet0wgkuoSNFL7gEMj2SahyFeodgEAcewCal27sKqHzMRoVGNySEGCMUriNIznYg89IL9CFQEpUkqvjkrP9ZMX3lcGRjH1I',
                  tag: 'Pulseras',
                  link: '/categoria/brazaletes',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
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
                </div>
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAuUFauSEKOFmIaXHmoyHGebNyioRSRkEunQHQFcdAp4tRH_swD6cT6UF2O_z7pqP07G-Zt5SOPZYdBC6tGjtiojiWZvT943Z9UpLhwWdyvDVehC6ZAVhl98mlm8pyHFcepHMRE2FQVzoaIbaoU0WkMQM1cwI6gs79bc0p2Tr3shT1d4Q6skfjo25nSGlKxxHFqAuPFsF76jaGG7WaV81HQb_LVBp_37vIj--NqoResi46_OyGeZ6_sZ2flTTrGs3F2HGw1AoLtbUA',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDpLH5HGc1kmArtJ6BJmlS3bw5cpNmRMsgkv2GRxXlwy-_cb07XX7fLTzX__AnK-SI5IOtVmqsBMrVLEfFgIUaFeMJSWTZDAdT3XVta8goLP4KLgKFmxSviKLOtQOehxk8m-v26e5_q7PSDBj9KSF33pAhEXf1DD6e9Q5Rgw3HX56MRMet0wgkuoSNFL7gEMj2SahyFeodgEAcewCal27sKqHzMRoVGNySEGCMUriNIznYg89IL9CFQEpUkqvjkrP9ZMX3lcGRjH1I',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDWv-8_OpdjyYjpZYoQw5H88KKjED3e06v5LfPU22HNLPEGQnrhCF5tr9mRILKNIlBLK3WM2ZMRuZg8BIsouz6IuSTwsMlbT-CqflCbSCxWOyL_LYc3YNjS6aybpsWQBWGakS5Ni8pdlBx9n-PZrflwnD6-SNT61EKQGnqBB8FGEhQNa4VxJUUHUcXsPW9FS_aBQeTtHjFx25aypJHHthsJ1lruEwzYUL9CminsaEs5lx7pKuZM1aZb4IqWPKYBMwsUe7qPsgm-i3k',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDMAUlmMFtrDmUwIiFDCRWKlcJP0aDcKrS6073XU8y4SFsc_lejeLGhG_u4zw1rrcuxnZ9rBeJ0sAmtTJDjBqjTDHvu-RSpIAGO1hLS0E8t7LAXXih_tUuTLuTsE2O7ILyyYraSnj6JlN84mkQ0NwDpDJs3YFo7iBduqGXoMhPPLMnLQUXTgBj-j1BhN1AvIY_FenvhOiLneKVY6zWMlpaIKUC6QInq2J6kdKNfIyhVAs',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBa2srlckwWuEHT9SXg81hVs1c9aV_KViIlBRUqAGxMpJcwNYcbj7_M-NreU_rkzrTxeL1To_RsdGuGDWziY003DfxSBqcFWC6C3hWl6JCjTJii71yLlQ7S7Vj8C2x6nQ1lqtxL1cPfAlHDDcGIeoRDs1ZncrRQm1XEZIVi26LC_gL8GPL1E0fWrpMq8fhUmiO566rjGCAjNDuXS0GBhSJwIIZGBkmfX3vI2MnAdyzy4pb4Wg6H3R_M2gKXWdf0BFte7Q6VXbKEZfw',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAjejwGCrsFyxcMBreFpu--CS9ksbDy0B-XrCNmDYjtB-19eMKyszPhKbf0I6tT3aSBicoHl-p6ezELMH0P3_xvtk2bzQD3jnRnM5dwIQahidt_Jy4Oc-WLWGdykNfMTFwuc3zEdsQKRhckJYuEEg37yaPiXweVTLIXi643vtTgWemDiWFJ64tIl-FqS8FjMjmunnmOtJ6c9ZFjY01tNPkAi_IT2No25-pLsvvn-dUfZSTllO6W2_U5aFzVdnTsKEq-WzOtpnLt9g4',
            ].map((img, idx) => (
              <div
                key={idx}
                className="aspect-square bg-slate-200 overflow-hidden group relative w-full h-full"
              >
                <Image
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  src={img}
                  alt={`Comunidad ${idx + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
