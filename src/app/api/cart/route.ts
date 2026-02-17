import { CartResponse } from "@/lib/types/cart";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Fetch the user's cart.
async function fetchServerCart(token: string): Promise<CartResponse> {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data: ApiResponse<CartResponse> = await res.json();
  if ("error" in data) throw new Error(data.error || "Failed to fetch cart");
  return data;
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token?.accessToken) {
    return NextResponse.json({ cart: { cartItems: [] } });
  }

  try {
    const data = await fetchServerCart(token.accessToken as string);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}
