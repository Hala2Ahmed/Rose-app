import { CartResponse } from "@/lib/types/cart";

export async function fetchCartResponse(): Promise<CartResponse> {
  const res = await fetch("/api/cart", { cache: "no-store" });
  const payload: ApiResponse<CartResponse> = await res.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
