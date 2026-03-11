"use server";

import getToken from "@/lib/utils/manage-token";
import type { CartResponse } from "@/lib/types/cart";

export async function fetchCart() {
  const token = await getToken();

  if (!token?.accessToken) {
    return { cartItems: [], totalPrice: 0 };
  }

  const res = await fetch(`${process.env.API_URL}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("fetchCart failed with status:", res.status);
    return { cartItems: [], totalPrice: 0 };
  }

  const payload: ApiResponse<CartResponse> = await res.json();

  if ("error" in payload) {
    console.error("fetchCart API error:", payload.error);
    return { cartItems: [], totalPrice: 0 };
  }

  return payload.cart;
}
