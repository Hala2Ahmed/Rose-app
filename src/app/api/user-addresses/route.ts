import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { Addresses } from "@/lib/types/addresses";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });

    if (!token?.accessToken) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const response = await fetch(`${process.env.API_URL!}/addresses`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token.accessToken}`,
            "Content-Type": "application/json",
        },
    });

    const data: ApiResponse<PaginationData<Addresses>>  = await response.json();
    return NextResponse.json(data, { status: response.status });
}