"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function InitialLoader() {
  const [shouldShow, setShouldShow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<SVGPathElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If the inline script (which runs synchronously before paint) added the hide-loader class, 
    // it means it's a bot or a returning user. We unmount it to free resources.
    if (document.documentElement.classList.contains('hide-loader')) {
      setShouldShow(false);
    } else {
      sessionStorage.setItem("hasVisitedAdelai", "true");
    }
  }, []);

  useGSAP(() => {
    if (!shouldShow) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
      }
    });

    // 1. Animate ADELAI letters from bottom
    tl.fromTo(".adelai-letter", 
      { y: 400, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" }
    );

    // 2. Flash and fade in slogan
    tl.fromTo(".slogan-path", 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.03, ease: "power2.out" },
      "-=0.4"
    );
    
    // Flash effect: animate fill color to white then back to gold
    tl.to(".slogan-path", { fill: "#ffffff", duration: 0.1, stagger: 0.03 }, "-=0.6");
    tl.to(".slogan-path", { fill: "#cfa25c", duration: 0.4, stagger: 0.03 }, "-=0.5");

    // Hold for a moment to let user read
    tl.to({}, { duration: 0.8 });

    // 3. Outro transition
    // Fade out logo first
    tl.to(logoWrapperRef.current, { opacity: 0, y: -50, duration: 0.4, ease: "power2.in" });

    // Animate the curtain up with a curve
    tl.to(curtainRef.current, {
      attr: { d: "M 0 0 L 100 0 L 100 0 Q 50 -30 0 0 Z" },
      duration: 1,
      ease: "power4.inOut"
    }, "-=0.2");

  }, { scope: containerRef, dependencies: [shouldShow] });

  if (!shouldShow) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|speed insights|ptst/i.test(navigator.userAgent);
                var hasVisited = sessionStorage.getItem("hasVisitedAdelai");
                if (isBot || hasVisited) {
                  document.documentElement.classList.add('hide-loader');
                }
              } catch(e) {}
            })();
          `,
        }}
      />
      <div id="initial-loader" ref={containerRef} className="fixed inset-0 z-[9999] pointer-events-none">
        <style dangerouslySetInnerHTML={{__html: `
          #initial-loader .adelai-letter, 
          #initial-loader .slogan-path { 
            opacity: 0; 
          }
        `}} />
      
      {/* Background Curtain SVG */}
      <svg 
        className="absolute inset-0 w-full h-full text-[#3f292b]" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <path 
          ref={curtainRef}
          d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z" 
          fill="currentColor" 
        />
      </svg>

      {/* Logo Content */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div ref={logoWrapperRef} className="w-full max-w-4xl max-h-[80vh] overflow-hidden flex items-center justify-center">
          <svg 
            viewBox="0 0 3508 2481"
            className="w-full h-auto drop-shadow-2xl"
          >
            <g transform="translate(0,2481) scale(0.1,-0.1)" fill="#cfa25c" stroke="none">
              
              {/* ADELAI Letters */}
              {/* Note: I'm grouping them and applying a class to each path so GSAP can target them */}
              <g className="adelai-letters">
                <path className="adelai-letter" d="M12779 16079 c-47 -5 -162 -21 -255 -36 -166 -27 -177 -27 -701 -31 -448 -3 -533 -5 -543 -18 -21 -25 5 -41 78 -47 136 -13 215 -56 266 -147 l31 -55 0 -2340 0 -2340 -21 -45 c-45 -99 -120 -145 -266 -163 -92 -12 -112 -23 -88 -52 11 -13 83 -15 519 -15 457 0 519 -2 641 -20 344 -52 366 -54 690 -54 331 -1 425 7 630 55 236 54 522 180 700 306 110 79 296 255 382 362 299 372 476 845 555 1481 25 206 25 752 0 963 -156 1308 -829 2078 -1919 2196 -112 13 -572 12 -699 0z m656 -64 c531 -82 961 -462 1219 -1076 376 -899 362 -2284 -33 -3149 -115 -252 -232 -423 -410 -601 -215 -214 -443 -336 -737 -396 -74 -15 -136 -18 -374 -17 -267 1 -302 3 -562 38 -152 20 -299 36 -327 36 l-51 0 0 2550 0 2550 43 0 c23 0 110 9 192 20 530 70 798 82 1040 45z"/>
                <path className="adelai-letter" d="M8014 15995 c-12 -29 4 -45 45 -45 115 0 218 -46 253 -113 30 -56 29 -156 -2 -247 -91 -271 -277 -637 -739 -1460 -561 -997 -773 -1465 -861 -1898 -44 -218 -51 -557 -16 -751 68 -375 238 -617 501 -716 674 -255 1483 383 1764 1390 76 276 104 493 103 820 0 343 -37 687 -112 1045 -15 74 -27 136 -26 137 1 1 265 -680 586 -1515 570 -1481 584 -1519 587 -1597 4 -67 1 -85 -16 -112 -27 -44 -70 -63 -165 -77 -66 -9 -81 -15 -84 -30 -2 -10 2 -22 10 -27 7 -5 288 -9 625 -9 536 0 613 2 627 15 29 29 8 41 -87 52 -159 19 -250 62 -341 164 -26 28 -58 77 -73 108 -14 31 -434 1141 -932 2466 l-907 2410 -367 3 c-320 2 -368 0 -373 -13z m486 -730 c159 -412 201 -529 253 -705 162 -547 250 -1105 250 -1595 1 -403 -56 -690 -194 -972 -94 -193 -205 -337 -355 -462 -243 -202 -521 -306 -869 -327 -264 -15 -508 67 -659 222 -225 231 -246 607 -64 1144 129 380 313 750 799 1612 396 702 554 1005 660 1272 37 94 56 131 60 118 4 -9 57 -147 119 -307z"/>
                <path className="adelai-letter" d="M15834 15995 c-13 -32 4 -42 79 -48 79 -7 168 -35 202 -65 39 -33 73 -88 89 -142 15 -51 16 -273 14 -2360 l-3 -2305 -23 -50 c-47 -102 -122 -150 -264 -168 -92 -12 -112 -23 -88 -52 11 -13 213 -15 1650 -15 l1638 0 7 393 c3 215 5 448 3 517 l-3 125 -25 0 c-24 0 -25 -3 -33 -85 -20 -227 -113 -476 -235 -630 -89 -112 -184 -180 -317 -227 l-80 -28 -863 -3 -863 -3 4 1163 c3 1146 3 1164 24 1256 94 408 299 662 623 774 92 31 101 33 255 33 182 0 231 -12 360 -87 91 -53 228 -191 290 -291 92 -149 159 -338 172 -479 6 -70 21 -95 48 -84 14 5 15 52 13 401 -3 339 -5 397 -18 405 -63 41 -382 144 -547 177 -135 27 -411 24 -517 -5 -323 -90 -550 -299 -673 -622 l-32 -85 -1 1273 0 1272 758 0 c847 0 837 0 977 -69 134 -67 233 -170 320 -334 77 -143 145 -385 145 -512 0 -50 21 -75 45 -55 13 11 15 59 15 325 0 171 -3 400 -7 508 l-6 197 -1564 0 c-1381 0 -1564 -2 -1569 -15z"/>
                <path className="adelai-letter" d="M19554 15995 c-13 -32 4 -42 78 -48 95 -8 156 -30 207 -74 52 -44 77 -92 91 -174 8 -45 10 -730 8 -2339 -3 -2153 -4 -2277 -21 -2321 -42 -107 -126 -163 -274 -183 -72 -9 -88 -15 -91 -30 -2 -10 2 -22 10 -27 7 -5 630 -9 1384 -9 l1371 0 7 499 c5 275 5 509 1 521 -5 14 -13 20 -28 18 -19 -3 -23 -13 -34 -103 -14 -121 -26 -175 -60 -280 -96 -296 -272 -491 -513 -571 -50 -17 -107 -18 -657 -22 l-603 -3 0 2399 c0 1689 3 2416 11 2457 14 78 39 125 90 169 50 43 110 64 209 74 71 7 75 8 75 32 l0 25 -628 3 c-552 2 -628 0 -633 -13z"/>
                <path className="adelai-letter" d="M23880 15995 c-20 -24 5 -45 54 -45 64 0 157 -28 196 -59 58 -46 72 -83 67 -181 -3 -75 -10 -102 -62 -230 -114 -288 -248 -547 -670 -1300 -388 -693 -538 -983 -680 -1315 -113 -264 -186 -496 -221 -700 -25 -141 -30 -495 -10 -631 31 -211 81 -357 166 -487 103 -158 245 -262 425 -312 85 -23 276 -31 372 -15 585 94 1120 699 1323 1495 71 277 84 396 85 755 0 237 -5 356 -18 480 -19 168 -74 513 -101 630 -8 35 -14 65 -13 67 5 4 1151 -2980 1164 -3031 29 -113 7 -194 -62 -230 -20 -10 -73 -24 -116 -30 -81 -11 -100 -24 -73 -51 14 -13 91 -15 627 -15 337 0 618 4 625 9 8 5 12 17 10 27 -3 15 -19 21 -97 31 -52 7 -116 20 -143 29 -108 36 -210 128 -267 242 -12 24 -429 1124 -926 2445 -497 1321 -906 2410 -910 2420 -7 16 -34 17 -370 17 -310 0 -364 -2 -375 -15z m490 -737 c164 -428 193 -506 245 -681 107 -355 184 -732 232 -1142 25 -218 25 -726 0 -880 -39 -237 -96 -415 -188 -596 -205 -397 -559 -654 -1014 -735 -149 -26 -374 -24 -488 4 -283 70 -465 244 -527 505 -25 103 -27 313 -5 443 79 462 283 910 935 2064 375 662 519 941 621 1202 30 76 56 137 60 138 3 0 61 -145 129 -322z"/>
                <path className="adelai-letter" d="M27140 15995 c-24 -29 -5 -42 72 -48 146 -12 224 -56 273 -151 l30 -60 3 -2315 c3 -2630 11 -2387 -83 -2478 -60 -58 -108 -77 -226 -89 -73 -7 -93 -21 -69 -49 19 -23 1241 -23 1260 0 24 29 4 40 -90 52 -140 18 -219 67 -264 163 l-21 45 0 2336 0 2335 30 60 c49 95 127 139 272 151 74 6 96 21 72 49 -18 22 -1241 21 -1259 -1z"/>
              </g>

              {/* EVERYTHING SHINE Slogan */}
              <g className="slogan-letters">
                <path className="slogan-path" d="M19151 9454 c-119 -32 -199 -97 -250 -204 -23 -48 -26 -68 -26 -155 0 -87 3 -107 27 -157 75 -161 262 -246 450 -204 49 11 95 29 125 49 l48 32 0 140 0 140 -37 3 -38 3 0 -126 0 -126 -56 -26 c-50 -23 -65 -25 -147 -21 -133 6 -206 48 -262 150 -27 48 -30 62 -30 143 0 73 4 98 22 131 36 67 70 101 135 133 54 27 71 31 147 31 90 0 153 -20 197 -61 20 -19 20 -19 48 10 l28 29 -53 36 c-94 62 -216 80 -328 50z"/>
                <path className="slogan-path" d="M20775 9464 c-65 -17 -93 -31 -131 -66 -94 -87 -76 -231 36 -288 21 -11 89 -33 150 -50 62 -17 125 -37 140 -45 85 -44 79 -154 -11 -200 -77 -40 -229 -24 -319 35 l-45 30 -14 -30 c-18 -37 -8 -51 63 -84 154 -73 356 -50 432 49 40 53 46 145 12 195 -33 48 -79 77 -162 100 -158 45 -182 53 -213 72 -74 44 -62 149 22 192 62 32 181 29 259 -7 32 -15 60 -27 61 -27 1 0 8 14 15 30 11 27 11 32 -6 45 -49 35 -225 65 -289 49z"/>
                <path className="slogan-path" d="M10030 9095 l0 -365 261 0 260 0 -3 33 -3 32 -217 3 -218 2 0 135 0 135 191 0 190 0 -3 33 -3 32 -187 3 -188 2 0 125 0 125 210 0 210 0 0 35 0 35 -250 0 -250 0 0 -365z"/>
                <path className="slogan-path" d="M10936 9403 c13 -32 86 -196 161 -365 l136 -308 41 0 41 1 155 351 c85 193 156 357 158 365 3 9 -8 13 -36 13 l-39 0 -138 -311 c-76 -170 -141 -307 -145 -302 -4 4 -61 132 -128 283 -66 151 -126 287 -133 303 -11 23 -18 27 -55 27 l-44 0 26 -57z"/>
                <path className="slogan-path" d="M12050 9095 l0 -365 260 0 260 0 0 35 0 35 -220 0 -220 0 0 135 0 135 191 0 190 0 -3 33 -3 32 -187 3 -188 2 0 125 0 125 210 0 210 0 0 35 0 35 -250 0 -250 0 0 -365z"/>
                <path className="slogan-path" d="M13060 9095 l0 -365 40 0 40 0 0 115 0 115 128 0 127 -1 79 -114 80 -115 44 0 44 0 -18 28 c-10 15 -45 65 -79 112 -34 47 -64 90 -68 97 -5 8 6 19 30 32 83 42 123 113 123 213 0 78 -23 131 -78 180 -63 57 -116 68 -319 68 l-173 0 0 -365z m407 266 c100 -57 112 -209 24 -284 -45 -38 -90 -47 -228 -47 l-123 0 0 181 0 181 143 -4 c129 -3 146 -5 184 -27z"/>
                <path className="slogan-path" d="M14003 9448 c3 -7 68 -116 146 -243 l141 -229 0 -123 0 -123 40 0 40 0 0 129 0 130 144 235 145 236 -42 0 -42 0 -118 -195 c-65 -107 -122 -197 -126 -199 -4 -3 -61 84 -127 192 l-120 197 -43 3 c-33 3 -42 0 -38 -10z"/>
                <path className="slogan-path" d="M14962 9428 l3 -33 128 -3 127 -3 0 -329 0 -330 40 0 40 0 0 330 0 330 130 0 130 0 0 35 0 35 -301 0 -300 0 3 -32z"/>
                <path className="slogan-path" d="M15990 9095 l0 -365 40 0 40 0 0 165 0 165 225 0 225 0 0 -165 0 -165 40 0 40 0 0 365 0 365 -40 0 -40 0 0 -160 0 -160 -225 0 -225 0 0 160 0 160 -40 0 -40 0 0 -365z"/>
                <path className="slogan-path" d="M17150 9095 l0 -365 40 0 40 0 0 365 0 365 -40 0 -40 0 0 -365z"/>
                <path className="slogan-path" d="M17770 9095 l0 -365 45 0 45 0 2 288 3 288 228 -288 c220 -277 229 -288 263 -288 l34 0 0 365 0 365 -40 0 -40 0 -2 -291 -3 -291 -230 291 c-227 287 -230 290 -267 291 l-38 0 0 -365z"/>
                <path className="slogan-path" d="M21590 9095 l0 -365 40 0 40 0 0 165 0 165 225 0 225 0 0 -165 0 -165 40 0 40 0 0 365 0 365 -40 0 -40 0 0 -160 0 -160 -225 0 -225 0 0 160 0 160 -40 0 -40 0 0 -365z"/>
                <path className="slogan-path" d="M22750 9095 l0 -365 40 0 40 0 0 365 0 365 -40 0 -40 0 0 -365z"/>
                <path className="slogan-path" d="M23370 9095 l0 -365 40 0 40 0 0 293 1 292 27 -31 c15 -16 120 -148 234 -292 201 -254 209 -262 243 -262 l35 0 0 365 0 365 -40 0 -40 0 -2 -292 -3 -292 -230 291 c-227 288 -230 292 -267 292 l-38 1 0 -365z"/>
                <path className="slogan-path" d="M24530 9095 l0 -365 260 0 260 0 0 35 0 35 -220 0 -220 0 0 135 0 135 190 0 190 0 0 35 0 35 -190 0 -190 0 0 125 0 125 213 2 212 3 3 33 3 32 -255 0 -256 0 0 -365z"/>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
    </>
  );
}
