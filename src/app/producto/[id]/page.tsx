import { ProductDetailsClient } from "@/components/ui/ProductDetailsClient";
import { PRODUCTS } from "@/lib/mockProducts";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
    return {
        title: `${product.name} | ADELAI`,
    };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Try to find exact match in mock DB, if not, fallback to the first one for demonstration
  let product = PRODUCTS.find((p) => p.id === id);
  
  if (!product) {
      // Depending on rules, you could return notFound() here, but for development
      // falling back to a dummy product is better since most catalog items aren't mocked precisely yet.
      product = {
          id: id,
          name: id.replace(/-/g, " "),
          basePrice: 1500.0,
          variants: [
            {
              id: "gen-v1",
              colorName: "Oro",
              colorHex: "#D4AF37",
              sizes: ["U"],
              images: [
                "https://images.unsplash.com/photo-1599643478514-4a110186121f?q=80&w=800&auto=format&fit=crop"
              ],
            }
          ],
      }
  }

  return <ProductDetailsClient product={product} />;
}
