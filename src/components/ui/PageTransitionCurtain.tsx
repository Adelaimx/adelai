"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function PageTransitionCurtain() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useGSAP(() => {
    // Force scroll to top on any route change to fix the bug where pages load scrolled down
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const curtain = document.getElementById("page-transition-curtain");
    if (curtain && curtain.getAttribute("data-animating") === "true") {
      gsap.to(curtain, {
        left: "100%",
        duration: 0.5,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(curtain, { left: "-100%" });
          curtain.setAttribute("data-animating", "false");
        }
      });
    }
  }, [pathname, searchParams]);

  return (
    <div
      id="page-transition-curtain"
      className="fixed inset-y-0 w-full bg-[#3f292b] z-[9998] pointer-events-none flex items-center justify-center"
      style={{ left: "-100%" }}
      data-animating="false"
    >
        {/* We can put a small logo or just leave it blank as a solid color curtain */}
        <span className="text-[#cfa25c] font-serif text-4xl tracking-widest opacity-50">
            ADELAI
        </span>
    </div>
  );
}
