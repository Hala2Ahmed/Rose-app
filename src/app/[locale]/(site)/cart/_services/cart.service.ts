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

export async function addToCartApi(productId: string, quantity: number) {
  // Add a product to the user's cart (POST request)
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product: productId, quantity }),
  });

  const payload: ApiResponse<CartResponse> = await res.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.cart.cartItems;
}
