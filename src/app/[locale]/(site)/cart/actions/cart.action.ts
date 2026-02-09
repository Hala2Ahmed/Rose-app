"use server";

import { getServerSession } from "next-auth";
import type { CartResponse } from "@/lib/types/cart";
import { authOptions } from "@/auth";

export async function addToCartAction(productId: string, quantity: number) {
  const session = await getServerSession(authOptions);
  const { accessToken } = session || {};

  if (!session || !accessToken) {
    throw new Error("Unauthorized");
  }

  // Add a product to the user's cart
  const res = await fetch(`${process.env.API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ product: productId, quantity }),
  });

  const payload: ApiResponse<CartResponse> = await res.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.cart;
}
