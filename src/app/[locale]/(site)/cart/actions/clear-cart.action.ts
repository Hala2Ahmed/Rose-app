"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function deleteCartAction() {
  const session = await getServerSession(authOptions);
  const { accessToken } = session || {};

  if (!session || !accessToken) {
    throw new Error("Unauthorized");
  }

  // delete all products from the cart
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const payload = await res.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.cart;
}
