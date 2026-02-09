// This code for my next task (not for this sprint)
import { CartResponse } from "@/lib/types/cart";

export async function fetchCart() {
  // Fetch the current user's cart items (GET request)
  const res = await fetch("/api/cart", { cache: "no-store" });
  const payload: ApiResponse<CartResponse> = await res.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.cart.cartItems || [];
}
