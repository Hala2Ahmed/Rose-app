"use server";

import { getToken } from "@/lib/utils/manage-token";

export async function deleteProductAction(productId: string) {
  const token = await getToken();

  if (!token || !token?.accessToken) {
    throw new Error("Unauthorized");
  }

  // Delete a specific product from the user's cart
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
    },
  );

  const payload = await res.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.cart;
}
