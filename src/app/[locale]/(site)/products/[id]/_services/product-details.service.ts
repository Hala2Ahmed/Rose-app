import { ProductDetails } from "@/lib/types/product-details";

export async function getProductDetails(id: string): Promise<ProductDetails> {
  // Fetch product details by ID
  const response = await fetch(`/api/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload: ApiResponse<{ product: ProductDetails }> =
    await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.product;
}
