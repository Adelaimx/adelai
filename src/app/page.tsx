import { BestSellersCarousel } from "@/components/ui/BestSellersCarousel";
import { Product } from "@/types/design";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/mockProducts";

export default function Home() {
  const bestSellers = PRODUCTS.slice(0, 4);

  return (
    <div className="relative flex flex-col pt-0 transition-colors duration-300">
      
      {/* 1. Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col md:flex-row -mt-20">
        <div className="absolute inset-0 hero-gradient z-10 pointer-events-none"></div>
        <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden relative">
          <Image
            fill
            className="object-cover"
            alt="Hero jewelry image 1"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCToxH35ucCQhFBR_r_PVV4aM-nURecRbVk4ZUm_JB4NiuQVinUKPs49dhFR1TnuSCvL8WTuD05yW7NNqb7vGc-3NLTnJiRnGHUMLTkVO5RBq2lsYzpRr9gZlKntYeFbBfwJZEPo6e1iixjChM_pHc6xm8riwW5pfSf3_ECxymmYLXLkM_9V5J3RJy4ZSiACUQ4fFT9otH5rPoKRjcNsn9Ad64Rq4s4ssnpKHAOjfyylEAJ3L9MJWsHiN6uQ0CPrWMoIaOWzEqqrMg"
            priority
          />
        </div>
        <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden relative">
          <Image
            fill
            className="object-cover"
            alt="Hero jewelry image 2"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1_lj_a6B6k-Jg32qXpsslhM46PNKs4A68vrQKyi9b8aQDfqtZtTfX_h3uaEuZhq4ghJ1apum2ZwFbEKFLtZOPedpvypnQLwCKIh6Z4XJB203XAXeFAMBD2RGeF4IJdvG9njtAUjlMnlyW13FJ9rJU_-UrjCptFoi4E3nO_Kf_sGi0A-gMeaoGrSaxy4z7Dd_656W9PCmO5Dmx1dAf4m_LyrSkuj-EFDxg5g4ykpcLRBMFuFTFEUoo_DRJblKRfiO4kvrsbKev2fM"
            priority
          />
        </div>

        {/* Centered Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col items-center text-center text-white px-6 justify-end pb-20 pointer-events-none">
          <h2 className="font-serif italic opacity-90 drop-shadow-md text-[10px] md:text-xs mb-2 tracking-[0.2em] uppercase">
            Disponible Ahora
          </h2>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tighter mb-6 uppercase drop-shadow-lg">
            Nueva Colección
          </h1>
        </div>
      </section>

      {/* 2. Info Section */}
      <section className="bg-white dark:bg-background-dark py-16 border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="flex flex-col items-center text-center gap-4">
            <span className="material-symbols-outlined text-primary text-3xl">water_drop</span>
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-1">RESISTENTE AL AGUA</h3>
              <p className="text-xs text-secondary dark:text-accent max-w-[240px] mx-auto">Calidad duradera diseñada para acompañarte en cada momento de tu día.</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center gap-4 border-y md:border-y-0 md:border-x border-primary/10 py-8 md:py-0 px-4">
            <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-1">ACERO INOXIDABLE</h3>
              <p className="text-xs text-secondary dark:text-accent max-w-[240px] mx-auto">Material premium hipoalergénico con baño de oro de 18k de alta calidad.</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center gap-4">
            <span className="material-symbols-outlined text-primary text-3xl">eco</span>
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-1">DISEÑO CONSCIENTE</h3>
              <p className="text-xs text-secondary dark:text-accent max-w-[240px] mx-auto">Piezas creadas con un propósito ético y procesos de producción responsables.</p>
            </div>
          </div>
          
        </div>
      </section>

      {/* 3. Shop by Category (Responsive Grid) */}
      <section className="py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          
          {[
            { tag: "Anillos", link: "/categoria/anillos", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJNoMj8e16sQdafjarzGK2anFCGYo-_tQQbBmBoVcLMxshNWum9BfUiwO7mhHbPYkvDWusJa7_rUEaIuClxM080K8-7sEgjsHvZ4X6tgeW2pOtzbcOYCS-Bqsxze3kEN8cEgC5nocRInf_1PXAjTlRzog2GUUC5WYyAFnIrfWCalTMH2WyceOy5qa7A0b9yrQWFHOoUSlvR0NNQMsLUpmYephJrAQTwdmQrsPu2_jrahtqEgvXdyksHRfBy9gOtpJZ9LBnKf2gmfw" },
            { tag: "Aretes", link: "/categoria/aretes", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9nztw0kmTmE94-3F0WOr6ye24eP0CAf7sFOFWR3MMxVzvtwmRIMJcbrVSLb59nlitJvOFYC8mPN8LSbcZO8ePUzwd_n3QDv2f3iD1r7CwkGH8esJ84yg0HM7GHg7MainX5_Uj_wntH4n6nn0d_WNM6-Vlz32vZbxWGDH3KdozrrxWcGBxEgCsxVRFhXq06fZe__PpMekTKGBQCU-fcz3yZwGQK8DwNkf1GriJhdN4We6zWmFTX_zOD2Mo6eo829XEGWJ8dwV0oZA" },
            { tag: "Collares", link: "/categoria/collares", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2tPX_NMTEXjss03tcGWy10N9tb2cxmwaa4Y96sycCC5Z6HIW0eVxeGeWNrwHy7jICiF75xY-KErCy-CAcVqLkVmMFPaaVkZfibw9ybHb6_810kTtBQ1uxluIyEI3jhun8H8zCAzJ2V_qGPfu7kOX5zYnZv6bmoIjNdt5XbkjfYa-BGWfVNPAghHpqunfDGBtOXurMk3H8QcXDIZ_5cJgM1ezcVqdllTWBCyXHQDmDzCvSh86PhTR7xd1twt7nwr9SF_090Wkqu7U" },
            { tag: "Pulseras", link: "/categoria/brazaletes", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7k3DTqxmySizTBhyh_i8bvW3CcyRcQoE2PmY2cEvjbZRSPsxLm0VIjczyZgN7m-qR29kM9Fcr9f3-cIhN1duIX7dt13nD_GQMv2LPWFoWnYRyzfkwlCt9GG3a8IylWwVwcC0TEX1bFN-I6nkCTQVRXiHsaE7FC9JWB6yVs3CPCF-KKYm18x6A-EMfgcI3h1zJZ-Q8jcuEGvj6cbIHxBBWXeEMnda5AmYjl_21ZdKUSd8erC4BmPG8lmxttkYIwAzuknsfPwqogK4" }
           ].map((item, idx) => (
            <div key={idx} className="group relative aspect-square overflow-hidden bg-slate-900 block">
              <Image
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                src={item.img}
                alt={item.tag}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <span className="text-white uppercase tracking-[0.4em] font-medium text-lg drop-shadow-md select-none">
                    {item.tag}
                  </span>
                  <Link href={item.link} className="cursor-pointer">
                    <span className="backdrop-blur-md border border-white/50 bg-transparent text-white text-[10px] uppercase tracking-[0.2em] px-4 py-2 rounded-custom transition-all duration-300 font-semibold hover:border-primary hover:bg-primary/20">
                      VER COLECCIÓN
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* 4. Best Sellers Carousel */}
      <section className="py-24 bg-white dark:bg-background-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-end justify-between mb-12 border-b border-primary/20 pb-4">
            <h2 className="font-serif text-3xl md:text-4xl tracking-widest font-light text-slate-900 dark:text-slate-100">Best Sellers</h2>
          </div>
          
          <BestSellersCarousel products={bestSellers} />
        </div>
      </section>

      {/* 5. Editorial Look */}
      <section className="bg-primary/5 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            
            <div className="w-full md:w-1/2 relative">
              <div className="aspect-[4/5] bg-slate-300 overflow-hidden relative z-10 w-full h-full">
                <Image
                  fill
                  className="object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2bHzLdlt8cINufKHBcOBEDOJYilYMICwzAl7vSbyCyn3iAzqK0cnjMNDq9_iDte26ZBYvvUk5Cp50YK8kj5Ul-CdOCxgL_zf1q03isuUWiDl3N1TO7lTSDJK0p9tJaIkUL3_ErfTfjM-b9JyD6nxJpYlfRFGW3WJ1h_wrRvSDGy2ihKENVaC4MbR1iZAT1TVRIk8s1IkCIWPa22Nnj0WSxT22qfLHoWdZunqByeQxOYHl49CvCDMOtClEFkkhEfx4s2VZJd9tHoU"
                  alt="Modelo 1"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 aspect-square bg-white dark:bg-background-dark p-4 shadow-xl z-20 hidden md:block">
                <div className="relative w-full h-full">
                  <Image
                    fill
                    className="object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkrFiMDPl6noFnNKRWCkrjp0vGH3XVlgYpwHynvvZRrzZBh2bOXI28lnqxh5E0U2pqxK6HPbFctC205Sb8ir2z3rckuJ8apBfCfIf-AKbdMcgZYxn7t6W4ljiqzZU12vxLmjJ3xSCErAPWKmfjKFMwKR6XZjWqkQ2r8sI60EMoxZMIOHKghQ55-escp6Z1FyMvnxLgzisZfJTV9xK42_8AqCmz2LFXz2TI-YBz-VNWJ1aEBjBH7bd7fnprw4r4u6BBJ6PFkItc8mw"
                    alt="Detalle"
                  />
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col items-start text-slate-900 dark:text-slate-100">
              <span className="text-primary font-bold tracking-widest uppercase mb-4 text-xs">Editorial Estilo</span>
              <h2 className="font-serif text-5xl font-light mb-6 leading-tight">Comprar el Look: <br/><i className="font-normal">Esencia Dorada</i></h2>
              <p className="text-secondary dark:text-accent mb-10 leading-relaxed max-w-md">Descubre cómo combinar nuestras piezas más icónicas para crear un conjunto que hable de tu personalidad sin decir una palabra. Menos es siempre más.</p>
              
              <div className="space-y-4 w-full max-w-sm mb-10">
                <div className="flex items-center justify-between py-3 border-b border-primary/20">
                  <span className="text-sm font-medium">Collar Luna en Oro</span>
                  <span className="text-sm font-bold text-primary">$85.00</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-primary/20">
                  <span className="text-sm font-medium">Aretes Hoop Minimal</span>
                  <span className="text-sm font-bold text-primary">$45.00</span>
                </div>
              </div>
              
              <Link href="/best-sellers" className="bg-primary text-white px-10 py-4 text-xs font-bold tracking-[0.3em] uppercase hover:bg-slate-900 transition-all rounded-[12px] dark:hover:bg-slate-800">
                COMPRAR LOOK COMPLETO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Featured Products & Grid Section */}
      <section className="py-0 border-y border-primary/10">
        <div className="flex flex-col md:flex-row min-h-[600px]">
          
          {/* Left Column: Nuevos Productos */}
          <div className="w-full md:w-1/2 relative group overflow-hidden h-96 md:h-[600px]">
            <Image
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuUFauSEKOFmIaXHmoyHGebNyioRSRkEunQHQFcdAp4tRH_swD6cT6UF2O_z7pqP07G-Zt5SOPZYdBC6tGjtiojiWZvT943Z9UpLhwWdyvDVehC6ZAVhl98mlm8pyHFcepHMRE2FQVzoaIbaoU0WkMQM1cwI6gs79bc0p2Tr3shT1d4Q6skfjo25nSGlKxxHFqAuPFsF76jaGG7WaV81HQb_LVBp_37vIj--NqoResi46_OyGeZ6_sZ2flTTrGs3F2HGw1AoLtbUA"
              alt="Nuevos"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center pointer-events-none">
              <div className="text-center px-6 pointer-events-auto">
                <h2 className="font-serif text-4xl md:text-5xl text-white tracking-wider mb-6">NUEVOS PRODUCTOS</h2>
              </div>
            </div>
          </div>
          
          {/* Right Column: 2x2 Grid */}
          <div className="w-full md:w-1/2 relative h-[600px] flex flex-col">
            <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
              {[
                { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjejwGCrsFyxcMBreFpu--CS9ksbDy0B-XrCNmDYjtB-19eMKyszPhKbf0I6tT3aSBicoHl-p6ezELMH0P3_xvtk2bzQD3jnRnM5dwIQahidt_Jy4Oc-WLWGdykNfMTFwuc3zEdsQKRhckJYuEEg37yaPiXweVTLIXi643vtTgWemDiWFJ64tIl-FqS8FjMjmunnmOtJ6c9ZFjY01tNPkAi_IT2No25-pLsvvn-dUfZSTllO6W2_U5aFzVdnTsKEq-WzOtpnLt9g4", tag: "Anillos", link: "/categoria/anillos" },
                { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMAUlmMFtrDmUwIiFDCRWKlcJP0aDcKrS6073XU8y4SFsc_lejeLGhG_u4zw1rrcuxnZ9rBeJ0sAmtTJDjBqjTDHvu-RSpIAGO1hLS0E8t7LAXXih_tUuTLuTsE2O7ILyyYraSnj6JlN84mkQ0NwDpDJs3YFo7iBduqGXoMhPPLMnLQUXTgBj-j1BhN1AvIY_FenvhOiLneKVY6zWMlpaIKUC6QInq2J6kdKNfIyhVAs", tag: "Aretes", link: "/categoria/aretes" },
                { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWv-8_OpdjyYjpZYoQw5H88KKjED3e06v5LfPU22HNLPEGQnrhCF5tr9mRILKNIlBLK3WM2ZMRuZg8BIsouz6IuSTwsMlbT-CqflCbSCxWOyL_LYc3YNjS6aybpsWQBWGakS5Ni8pdlBx9n-PZrflwnD6-SNT61EKQGnqBB8FGEhQNa4VxJUUHUcXsPW9FS_aBQeTtHjFx25aypJHHthsJ1lruEwzYUL9CminsaEs5lx7pKuZM1aZb4IqWPKYBMwsUe7qPsgm-i3k", tag: "Collares", link: "/categoria/collares" },
                { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpLH5HGc1kmArtJ6BJmlS3bw5cpNmRMsgkv2GRxXlwy-_cb07XX7fLTzX__AnK-SI5IOtVmqsBMrVLEfFgIUaFeMJSWTZDAdT3XVta8goLP4KLgKFmxSviKLOtQOehxk8m-v26e5_q7PSDBj9KSF33pAhEXf1DD6e9Q5Rgw3HX56MRMet0wgkuoSNFL7gEMj2SahyFeodgEAcewCal27sKqHzMRoVGNySEGCMUriNIznYg89IL9CFQEpUkqvjkrP9ZMX3lcGRjH1I", tag: "Pulseras", link: "/categoria/brazaletes" }
              ].map((item, idx) => (
                <div key={idx} className="relative group overflow-hidden h-full block">
                  <Image fill className="object-cover transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none" src={item.img} alt={item.tag} />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4 select-none">
                      <span className="text-white uppercase tracking-[0.4em] font-medium text-[10px] md:text-sm lg:text-lg drop-shadow-md">{item.tag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Overlaid Block */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 md:p-10 flex flex-col items-center gap-6 pointer-events-auto shadow-2xl rounded-[12px]">
                <h2 className="font-serif text-xl md:text-3xl text-slate-900 dark:text-slate-100 tracking-[0.2em] uppercase text-center">Piezas Destacadas</h2>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 7. Community Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-light mb-4 text-slate-900 dark:text-slate-100 uppercase tracking-widest">Comunidad ADELAI</h2>
            <p className="text-secondary dark:text-accent tracking-widest text-xs">Comparte tu estilo con @ADELAI_JEWELRY</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAuUFauSEKOFmIaXHmoyHGebNyioRSRkEunQHQFcdAp4tRH_swD6cT6UF2O_z7pqP07G-Zt5SOPZYdBC6tGjtiojiWZvT943Z9UpLhwWdyvDVehC6ZAVhl98mlm8pyHFcepHMRE2FQVzoaIbaoU0WkMQM1cwI6gs79bc0p2Tr3shT1d4Q6skfjo25nSGlKxxHFqAuPFsF76jaGG7WaV81HQb_LVBp_37vIj--NqoResi46_OyGeZ6_sZ2flTTrGs3F2HGw1AoLtbUA",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuDpLH5HGc1kmArtJ6BJmlS3bw5cpNmRMsgkv2GRxXlwy-_cb07XX7fLTzX__AnK-SI5IOtVmqsBMrVLEfFgIUaFeMJSWTZDAdT3XVta8goLP4KLgKFmxSviKLOtQOehxk8m-v26e5_q7PSDBj9KSF33pAhEXf1DD6e9Q5Rgw3HX56MRMet0wgkuoSNFL7gEMj2SahyFeodgEAcewCal27sKqHzMRoVGNySEGCMUriNIznYg89IL9CFQEpUkqvjkrP9ZMX3lcGRjH1I",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuDWv-8_OpdjyYjpZYoQw5H88KKjED3e06v5LfPU22HNLPEGQnrhCF5tr9mRILKNIlBLK3WM2ZMRuZg8BIsouz6IuSTwsMlbT-CqflCbSCxWOyL_LYc3YNjS6aybpsWQBWGakS5Ni8pdlBx9n-PZrflwnD6-SNT61EKQGnqBB8FGEhQNa4VxJUUHUcXsPW9FS_aBQeTtHjFx25aypJHHthsJ1lruEwzYUL9CminsaEs5lx7pKuZM1aZb4IqWPKYBMwsUe7qPsgm-i3k",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuDMAUlmMFtrDmUwIiFDCRWKlcJP0aDcKrS6073XU8y4SFsc_lejeLGhG_u4zw1rrcuxnZ9rBeJ0sAmtTJDjBqjTDHvu-RSpIAGO1hLS0E8t7LAXXih_tUuTLuTsE2O7ILyyYraSnj6JlN84mkQ0NwDpDJs3YFo7iBduqGXoMhPPLMnLQUXTgBj-j1BhN1AvIY_FenvhOiLneKVY6zWMlpaIKUC6QInq2J6kdKNfIyhVAs",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuBa2srlckwWuEHT9SXg81hVs1c9aV_KViIlBRUqAGxMpJcwNYcbj7_M-NreU_rkzrTxeL1To_RsdGuGDWziY003DfxSBqcFWC6C3hWl6JCjTJii71yLlQ7S7Vj8C2x6nQ1lqtxL1cPfAlHDDcGIeoRDs1ZncrRQm1XEZIVi26LC_gL8GPL1E0fWrpMq8fhUmiO566rjGCAjNDuXS0GBhSJwIIZGBkmfX3vI2MnAdyzy4pb4Wg6H3R_M2gKXWdf0BFte7Q6VXbKEZfw",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAjejwGCrsFyxcMBreFpu--CS9ksbDy0B-XrCNmDYjtB-19eMKyszPhKbf0I6tT3aSBicoHl-p6ezELMH0P3_xvtk2bzQD3jnRnM5dwIQahidt_Jy4Oc-WLWGdykNfMTFwuc3zEdsQKRhckJYuEEg37yaPiXweVTLIXi643vtTgWemDiWFJ64tIl-FqS8FjMjmunnmOtJ6c9ZFjY01tNPkAi_IT2No25-pLsvvn-dUfZSTllO6W2_U5aFzVdnTsKEq-WzOtpnLt9g4"
            ].map((img, idx) => (
              <div key={idx} className="aspect-square bg-slate-200 overflow-hidden group relative w-full h-full">
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
