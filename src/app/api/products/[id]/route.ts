import { NextRequest, NextResponse } from "next/server";
import { ProductDetails } from "@/lib/types/product-details";

// Fetch product details by ID from external API
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params; // Extract product ID from route params

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const payload: ApiResponse<{ product: ProductDetails }> = await res.json();

    if ("error" in payload) {
      return NextResponse.json({ error: payload.error }, { status: 400 });
    }

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}
