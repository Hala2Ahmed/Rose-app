'use server'

import { authOptions } from "@/auth";
import { Orders } from "@/lib/types";
import { getServerSession } from "next-auth";

// fetch all orders 
export async function allOrdersService() {
  // get token 
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  // is Authorized
  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      cache: "no-store",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
    }
    );

    // Session expired
    if (!response.ok) {
      if (response.status === 401) throw new Error("Session expired");
      throw new Error("Failed to fetch orders");
    }

    const data: Orders[] = await response.json();
    return data;

  } catch (error) {
    console.error("Orders Service Error:", error);
    return { success: false, error: error };
  }

}
