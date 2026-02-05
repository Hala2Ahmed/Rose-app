"use server";

import { OtpStepFields, OTPStepResponse } from "../../../../../lib/types/auth";

export async function verifyOtpAction(fields: OtpStepFields) {
    const response = await fetch(`${process.env.API_URL!}/auth/verifyResetCode`, {
        method: "POST",
        body: JSON.stringify(fields),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const payload: ApiResponse<OTPStepResponse> = await response.json();

    return payload;
} 