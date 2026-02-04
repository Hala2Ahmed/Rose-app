import { NextRequest, NextResponse } from "next/server";
import { Reviews } from "@/lib/types/reviews";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId") ?? "1";

    const response = await fetch(`${process.env.API_URL!}/products/${productId}/reviews`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data: ApiResponse<PaginationData<Reviews>> = await response.json();

    if ("error" in data) {
        throw new Error(data.error);
    }

    return NextResponse.json(data, { status: response.status });
}