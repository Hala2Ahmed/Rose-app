import RelatedProducts from "@/components/features/related-products/related-products";
import { getProductDetails } from "../_actions/product-content.action";
import ProductReviews from "./reviews/product-reviews";
import ProductInfo from "./product-info";

export default async function ProductContent({ id }: { id: string }) {
  let product;
  try {
    product = await getProductDetails(id);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return (
    <div className="flex flex-col gap-12">
      {/* Product details */}
      < ProductInfo product={product} />;

      {/* Product's reviews */}
      <ProductReviews productId={id} rateAvg={product.rateAvg} rateCount={product.rateCount} />

      {/* Related products */}
      <RelatedProducts categoryId={product.category} />
    </div>
  )
}
