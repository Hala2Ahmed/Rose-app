"use server";

import { getServerSession } from "next-auth";
import type { AddAddress, AddressFields } from "../../types/addresses";
import getToken from "../../utils/manage-token";
import { authOptions } from "../../../auth";

export async function addAddressAction(fields: AddressFields) {
    const token = await getToken();
    const session = await getServerSession(authOptions);

    if (!token) {
        throw new Error("No token available")
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/addresses`, {
        method: "PATCH",
        body: JSON.stringify({ ...fields, username: session?.user.firstName }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.accessToken}`,

        },
    });

    const payload: ApiResponse<AddAddress> = await response.json();

    return payload;
} 