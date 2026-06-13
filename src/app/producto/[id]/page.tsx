import { ProductDetailsClient } from "@/components/ui/ProductDetailsClient";
import { getProduct, getProducts } from "@/lib/shopify/queries/product";
import { notFound } from "next/navigation";
import { getProductCategory } from '@/lib/utils/categorizeSize';
import { Product } from "@/lib/shopify/types";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);
    
    if (!product) {
        return { title: "Producto No Encontrado | ADELAI" };
    }
    
    return {
        title: `${product.title} | ADELAI`,
        description: product.seo?.description || product.description,
    };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const product = await getProduct(id);
  
  if (!product) {
      notFound();
  }

  // Get related products (random product from different categories)
  const allProducts = await getProducts();
  const otherProducts = allProducts.filter(p => p.id !== product.id);
  
  const productsByCategory = new Map<string, Product[]>();
  otherProducts.forEach(p => {
    const cat = getProductCategory(p);
    if (!productsByCategory.has(cat)) {
      productsByCategory.set(cat, []);
    }
    productsByCategory.get(cat)!.push(p);
  });

  const relatedProducts: Product[] = [];
  const categories = Array.from(productsByCategory.keys());
  const shuffledCategories = categories.sort(() => 0.5 - Math.random());
  
  for (const cat of shuffledCategories) {
    if (relatedProducts.length >= 4) break;
    const catProducts = productsByCategory.get(cat)!;
    const randomProduct = catProducts[Math.floor(Math.random() * catProducts.length)];
    relatedProducts.push(randomProduct);
  }

  // Fill remaining slots if we have fewer than 4 categories
  if (relatedProducts.length < 4) {
    const usedIds = new Set(relatedProducts.map(p => p.id));
    const remainingProducts = otherProducts.filter(p => !usedIds.has(p.id));
    const shuffledRemaining = remainingProducts.sort(() => 0.5 - Math.random());
    
    for (const p of shuffledRemaining) {
      if (relatedProducts.length >= 4) break;
      relatedProducts.push(p);
    }
  }

  return <ProductDetailsClient product={product} relatedProducts={relatedProducts} />;
}
