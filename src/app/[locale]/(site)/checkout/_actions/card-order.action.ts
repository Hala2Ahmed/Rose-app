"use server";

import {
  CreateCardOrderPayload,
  CreateCardOrderResponse,
} from "@/lib/types/address";
import getToken from "@/lib/utils/manage-token";

export const createCardOrder = async ({
  shippingAddress,
  clientToken,
}: CreateCardOrderPayload): Promise<CreateCardOrderResponse> => {
  const token = await getToken();

  if (!token) throw new Error("Not logged in");

  const response = await fetch(
    `${process.env.API_URL}/orders/checkout?url=${process.env.BASE_URL}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.accessToken || clientToken}`,
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
