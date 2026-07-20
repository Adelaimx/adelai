"use client";

import Link, { LinkProps } from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export function TransitionLink({ children, href, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter();

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) onClick(e);
    e.preventDefault();
    
    // We only animate if we are actually changing paths (not just hash changes or same page)
    const currentPath = window.location.pathname;
    const targetPath = typeof href === 'string' ? href.split('?')[0].split('#')[0] : (href as any).pathname || '';
    
    if (currentPath === targetPath) {
      router.push(href as any);
      return;
    }

    // GSAP Exit Animation
    const curtain = document.getElementById("page-transition-curtain");

    if (curtain) {
      curtain.setAttribute("data-animating", "true");
      
      await new Promise((resolve) => {
        gsap.fromTo(curtain, 
          { left: "-100%" },
          { 
            left: "0%", 
            duration: 0.4, 
            ease: "power4.inOut",
            onComplete: resolve
          }
        );
      });
    }

    // Force scroll to top while the curtain is covering the screen
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Push the new route. 
    // The new route will trigger template.tsx which handles the Enter animation.
    router.push(href);
  };

  return (
    <Link {...props} href={href} onClick={handleTransition}>
      {children}
    </Link>
  );
}
