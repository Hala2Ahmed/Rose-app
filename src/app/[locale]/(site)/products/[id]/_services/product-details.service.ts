import { ProductDetails } from "@/lib/types/product-details";

export async function getProductDetails(id: string): Promise<ProductDetails> {
  const response = await fetch(
    `https://flower.elevateegy.com/api/v1/products/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const payload: ApiResponse<{ product: ProductDetails }> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.product;
}
