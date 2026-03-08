"use server";

import {
  CreateCashOrderPayload,
  CreateCashOrderResponse,
} from "@/lib/types/address";
import getToken from "@/lib/utils/manage-token";

export const createCashOrder = async ({
  shippingAddress,
  clientToken,
}: CreateCashOrderPayload): Promise<CreateCashOrderResponse> => {
  const token = await getToken();

  if (!token) throw new Error("Not logged in");

  const response = await fetch(`${process.env.API_URL}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token?.accessToken || clientToken}`,
    },
    body: JSON.stringify({ shippingAddress }),
    cache: "no-store",
  });

  const data = await response.json();
  if (!response.ok)
    throw new Error(data?.message || "Backend rejected request");

  return data;
};
