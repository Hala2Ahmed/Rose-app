import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { AddressesPayload } from "@/lib/types/address";

async function fetchServerAddresses(
  token: string,
): Promise<AddressesPayload> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/addresses`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  const data: ApiResponse<AddressesPayload> = await res.json();

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data; 
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token?.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const data = await fetchServerAddresses(
      token.accessToken as string,
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching addresses:", error);

    return NextResponse.json(
      { error: "Failed to fetch addresses" },
      { status: 500 },
    );
  }
}