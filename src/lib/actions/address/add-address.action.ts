"use server";

import type { Addresses, AddressFields } from "../../types/addresses";

export async function addAddressAction(fields: AddressFields) {
    const response = await fetch(`${process.env.API_URL!}/addresses`, {
        method: "PATCH",
        body: JSON.stringify(fields),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const payload: ApiResponse<Addresses> = await response.json();

    return payload;
} 