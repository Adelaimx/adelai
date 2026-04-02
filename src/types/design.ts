export interface ProductVariant {
  id: string;
  colorName: string;
  colorHex: string;
  images: string[];
  sizes: string[];
  price?: number; // Optional price override for a variant
}

export interface Product {
  id: string;
  name: string;
  basePrice: number;
  variants: ProductVariant[];
  category?: string;
  material?: string;
  isNew?: boolean;
}

export interface CarouselProps {
  images: string[];
  alt?: string;
}

export interface NavLink {
  label: string;
  href: string;
  isFeatured?: boolean;
}
