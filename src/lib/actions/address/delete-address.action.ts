"use server";

import { getToken } from "../../utils/manage-token";

export async function deleteAddressAction(id: string) {
    const token = await getToken();

    if (!token) {
        throw new Error("No token available")
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/addresses/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token.accessToken}`,
            "Content-Type": "application/json",
        },
    });

    const payload: ApiResponse<null> = await response.json();

    return payload;
} 