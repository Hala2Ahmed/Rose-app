"use server";

import type { CartResponse } from "@/lib/types/cart";
import { getToken } from "@/lib/utils/manage-token";

export async function addToCartAction(productId: string, quantity: number) {
  const token = await getToken();

  if (!token || !token?.accessToken) {
    throw new Error("Unauthorized");
  }

  // Add a product to the user's cart
  const res = await fetch(`${process.env.API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify({ product: productId, quantity }),
  });

  const payload: ApiResponse<CartResponse> = await res.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.cart;
}
