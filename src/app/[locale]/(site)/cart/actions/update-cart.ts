"use server";

import { getServerSession } from "next-auth";
import type { CartResponse } from "@/lib/types/cart";
import { authOptions } from "@/auth";

export async function updateCartAction(productId: string, quantity: number) {
  const session = await getServerSession(authOptions);
  const { accessToken } = session || {};

  if (!session || !accessToken) {
    throw new Error("Unauthorized");
  }

  // Update a product
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
