"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import {
  createCardOrderPayload,
  createCardOrderResponse,
} from "@/lib/types/address";

export const createCardOrder = async ({
  shippingAddress,
  clientToken,
}: createCardOrderPayload): Promise<createCardOrderResponse> => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken || clientToken;

  if (!token) throw new Error("Not logged in");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/checkout?url=${process.env.BASE_URL}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ shippingAddress }),
      cache: "no-store",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Checkout session failed");
  }

  return data;
};
