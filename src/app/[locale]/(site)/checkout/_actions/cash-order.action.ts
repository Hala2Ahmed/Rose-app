"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

interface CreateCashOrderPayload {
  shippingAddress: any;
  clientToken?: string; 
}

export const createCashOrder = async ({ shippingAddress, clientToken }: CreateCashOrderPayload) => {

  const session = await getServerSession(authOptions);
  const token = session?.accessToken || clientToken;

  if (!token) throw new Error("Not logged in");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ shippingAddress }),
    cache: "no-store",
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || "Backend rejected request");

  return data;
};