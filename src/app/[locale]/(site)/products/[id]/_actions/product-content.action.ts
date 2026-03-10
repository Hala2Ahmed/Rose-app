"use server";

import { ProductDetails } from "@/lib/types/product-details";

export async function getProductDetails(
  id: string,
  retries = 2,
): Promise<ProductDetails> {
  try {
    const res = await fetch(`${process.env.API_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const payload: ApiResponse<{ product: ProductDetails }> = await res.json();

    if ("error" in payload) {
      throw new Error(payload.error);
    }

    return payload.product;
  } catch (error) {
    console.error(
      `Error fetching product ${id} (retries left: ${retries}):`,
      error,
    );

    // Retry logic
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 500)); // wait 500ms
      return getProductDetails(id, retries - 1);
    }

    throw error;
  }
}
