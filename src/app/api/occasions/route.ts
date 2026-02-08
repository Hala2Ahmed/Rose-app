// app/api/occasions/route.ts
import { OccasionResponse } from "@/lib/types/occasions.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    const url = new URL(`${process.env.API_URL}/occasions`);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: OccasionResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching occasions:", error);
    return NextResponse.json(
      { error: "Failed to fetch occasions" },
      { status: 500 },
    );
  }
}
