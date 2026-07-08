import { Product } from '../shopify/types';

export type ProductCategory = 'ARETES' | 'COLLARES' | 'BRAZALETES' | 'ANILLOS' | 'JOYEROS' | 'OTROS';

export function getProductCategory(product: Product): ProductCategory {
  const t = (product.productType || product.title + ' ' + (product.tags?.join(' ') || '')).toLowerCase();
  
  if (t.includes('arete') || t.includes('earring') || t.includes('arracada') || t.includes('huggie')) return 'ARETES';
  if (t.includes('collar') || t.includes('necklace') || t.includes('cadena') || t.includes('choker')) return 'COLLARES';
  if (t.includes('brazalete') || t.includes('pulsera') || t.includes('bracelet')) return 'BRAZALETES';
  if (t.includes('anillo') || t.includes('ring')) return 'ANILLOS';
  if (t.includes('joyero') || t.includes('jewelry box')) return 'JOYEROS';
  
  return 'OTROS';
}

export interface SizeCategoryInfo {
  isAdjustable: boolean;
  semanticSize: string | null; // e.g., 'Delicado', 'Corto', '5', etc.
  chainLength: string | null;  // For necklaces: 'Corto', 'Medio', 'Largo'
  rawSize: string;             // Original string for exact filtering
}

export function categorizeSize(rawSize: string, category: ProductCategory): SizeCategoryInfo {
  const s = rawSize.toLowerCase().trim();
  const info: SizeCategoryInfo = {
    isAdjustable: s === 'ajustable' || s === 'adjustable' || s.includes('ajustable'),
    semanticSize: null,
    chainLength: null,
    rawSize,
  };

  // If it's pure text that just says "ajustable" and no measurements, we might not have a semantic size
  // but if it has measurements, we parse them.
  const mmMatches = [...s.matchAll(/(\d+(?:\.\d+)?)\s*mm/g)].map(m => parseFloat(m[1]));
  const cmMatches = [...s.matchAll(/(\d+(?:\.\d+)?)\s*cm/g)].map(m => parseFloat(m[1]));

  if (category === 'ANILLOS') {
    // Rings are exact sizes, e.g., "5", "6", "7"
    // Sometimes it's just the number. If adjustable, we flag it.
    const numMatch = s.match(/^(\d+(?:\.\d+)?)$/);
    if (numMatch) {
      info.semanticSize = numMatch[1];
    }
  } else if (category === 'ARETES') {
    // Aretes rules: Delicado (4-12mm), Clásico (13-25mm), Statement (26mm+)
    if (mmMatches.length > 0) {
      const maxMm = Math.max(...mmMatches);
      if (maxMm <= 12) info.semanticSize = 'Delicado';
      else if (maxMm <= 25) info.semanticSize = 'Clásico';
      else info.semanticSize = 'Statement';
    }
  } else if (category === 'COLLARES') {
    // Collares have Chain (Corto, Medio, Largo) and/or Pendant (Delicado, Clásico, Statement)
    // Chain rules (cm): Corto (35-45cm), Medio (46-60cm), Largo (61cm+)
    if (cmMatches.length > 0) {
      const maxCm = Math.max(...cmMatches);
      if (maxCm <= 45) info.chainLength = 'Corto';
      else if (maxCm <= 60) info.chainLength = 'Medio';
      else info.chainLength = 'Largo';
    }
    // Pendant rules (mm): Delicado (5-15mm), Clásico (16-30mm), Statement (31mm+)
    if (mmMatches.length > 0) {
      const maxMm = Math.max(...mmMatches);
      if (maxMm <= 15) info.semanticSize = 'Delicado';
      else if (maxMm <= 30) info.semanticSize = 'Clásico';
      else info.semanticSize = 'Statement';
    }
  } else if (category === 'BRAZALETES') {
    // Brazaletes rules: Delicado (2-6mm), Clásico (7-15mm), Statement (16mm+)
    if (mmMatches.length > 0) {
      const maxMm = Math.max(...mmMatches);
      if (maxMm <= 6) info.semanticSize = 'Delicado';
      else if (maxMm <= 15) info.semanticSize = 'Clásico';
      else info.semanticSize = 'Statement';
    }
    // Bracelets might also be measured in cm for length, but the user didn't specify cm rules for bracelets.
  }

  return info;
}

export function getStyleAdvice(category: ProductCategory, info: SizeCategoryInfo): { title: string; subtitle: string; description: string; advice: string } {
  const result = {
    title: info.semanticSize || info.chainLength || 'Talla Única',
    subtitle: 'Así lucirá esta pieza',
    description: '',
    advice: ''
  };

  if (category === 'COLLARES') {
    if (info.chainLength === 'Corto') {
      result.description = 'Caída muy cercana al cuello. Enmarca perfectamente el rostro.';
      result.advice = 'Perfecto para escotes abiertos, cuellos V profundos o como base para layering.';
    } else if (info.chainLength === 'Medio') {
      result.description = 'Caída clásica y elegante sobre la clavícula o un poco más abajo.';
      result.advice = 'Muy versátil. Ideal para el día a día y sobre blusas de cuello alto o redondo.';
    } else if (info.chainLength === 'Largo') {
      result.description = 'Caída profunda y dramática, sobre o debajo del pecho.';
      result.advice = 'Ideal para cuellos altos o como la pieza más larga en un look de múltiples collares.';
    } else {
      result.description = 'Ajuste clásico que complementa cualquier tipo de cuello.';
      result.advice = 'Ideal para uso diario y ocasiones casuales.';
    }
  } else if (category === 'ARETES') {
    if (info.semanticSize === 'Delicado') {
      result.description = 'Pieza sutil y minimalista que no compite con tus facciones.';
      result.advice = 'Perfecto para uso diario, segundas perforaciones o para acompañar collares llamativos.';
    } else if (info.semanticSize === 'Clásico') {
      result.description = 'Proporción equilibrada que enmarca el rostro con elegancia.';
      result.advice = 'Tu mejor aliado para la oficina o eventos semiformales.';
    } else if (info.semanticSize === 'Statement') {
      result.description = 'Pieza grande, llamativa y con mucha presencia.';
      result.advice = 'Deja que sean los protagonistas. Combínalos con escotes despejados y sin collar.';
    } else {
      result.description = 'Diseño contemporáneo y adaptable a tu estilo.';
      result.advice = 'Úsalo para agregar un toque de brillo sutil a cualquier outfit.';
    }
  } else if (category === 'BRAZALETES') {
    if (info.semanticSize === 'Delicado') {
      result.description = 'Pulsera delgada y refinada, como una segunda piel.';
      result.advice = 'Úsala sola para un look minimalista o apílala con relojes y otras pulseras.';
    } else if (info.semanticSize === 'Clásico') {
      result.description = 'Grosor intermedio que se nota sin ser abrumador.';
      result.advice = 'Una pieza sólida ideal para elevar un outfit de jeans y blusa blanca.';
    } else if (info.semanticSize === 'Statement') {
      result.description = 'Brazalete grueso y protagonista.';
      result.advice = 'Acompáñalo con ropa de mangas cortas o súbelo sobre mangas ajustadas.';
    } else {
      result.description = 'Ajuste estándar y diseño versátil.';
      result.advice = 'Combina con otras texturas para un look de brazo (arm party) interesante.';
    }
  } else if (category === 'ANILLOS') {
    result.title = `Talla ${info.semanticSize || 'Universal'}`;
    result.description = 'Medida exacta para ajuste perfecto al dedo.';
    result.advice = 'Mide el diámetro interno de un anillo que ya te quede bien para confirmar tu talla ideal.';
  }

  return result;
}
