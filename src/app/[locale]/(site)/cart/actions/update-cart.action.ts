"use server";

import { JSON_HEADER } from "@/lib/constants/api.constance";
import type { CartResponse } from "@/lib/types/cart";
import getToken from "@/lib/utils/manage-token";

export async function updateCartAction(productId: string, quantity: number) {
  const token = await getToken();

  if (!token || !token?.accessToken) {
    throw new Error("Unauthorized");
  }

  // Update a product
  const res = await fetch(
    `${process.env.API_URL}/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify({ quantity }),
    },
  );

  const payload: ApiResponse<CartResponse> = await res.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.cart;
}
