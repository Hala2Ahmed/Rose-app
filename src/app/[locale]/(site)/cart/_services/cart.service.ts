"use client";

import { CartResponse } from "@/lib/types/cart";

export async function fetchServerCart() {
  // Fetch the user's cart from the server
  const res = await fetch("/api/cart");
  const payload: ApiResponse<CartResponse> = await res.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.cart?.cartItems || [];
}

export async function addProductToServerCart(
  productId: string,
  quantity: number,
) {
  // Add a product to the user's cart
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product: productId, quantity }),
  });
  const payload: ApiResponse<CartResponse> = await res.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.cart?.cartItems || [];
}
