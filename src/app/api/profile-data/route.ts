import { JSON_HEADER } from "@/lib/constants/api.constance";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || process.env.API_URL}/auth/profile-data`,
      {
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
          ...JSON_HEADER,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || "Failed to fetch user data" },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error || "Failed to fetch user data" },
      { status: 500 },
    );
  }
}
