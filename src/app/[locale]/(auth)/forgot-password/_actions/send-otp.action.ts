"use server";

import { EmailStepFields, EmailStepResponse } from "@/lib/types/auth.type";

export async function sendOtpAction(fields: EmailStepFields) {
  // Send POST request to forgot password endpoint
  const response = await fetch(`${process.env.API_URL}/auth/forgotPassword`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  });

  const payload: ApiResponse<EmailStepResponse> = await response.json();

  return payload;
}
