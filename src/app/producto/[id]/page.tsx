import { ProductDetailsClient } from "@/components/ui/ProductDetailsClient";
import { getProduct, getProducts } from "@/lib/shopify/queries/product";
import { notFound } from "next/navigation";

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

  // Get related products (taking first 4 that are not the current product)
  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4);

  return <ProductDetailsClient product={product} relatedProducts={relatedProducts} />;
}
