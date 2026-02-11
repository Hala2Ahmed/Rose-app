"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function deleteProductAction(productId: string) {
  const session = await getServerSession(authOptions);
  const { accessToken } = session || {};

  if (!session || !accessToken) {
    throw new Error("Unauthorized");
  }

  // Delete a specific product from the user's cart
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const payload = await res.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.cart;
}
