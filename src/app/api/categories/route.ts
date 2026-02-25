import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Take whatever query params came from the frontend
    const { searchParams } = new URL(request.url);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/categories?${searchParams.toString()}`;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch categories" },
        { status: res.status }
      );
    }

    const data = await res.json();

    // Return backend response as-is
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}