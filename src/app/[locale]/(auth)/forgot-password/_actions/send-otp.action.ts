"use server";

import { JSON_HEADER } from "@/lib/constants/api.constance";
import { EmailStepFields, EmailStepResponse } from "@/lib/types/auth.type";

export async function sendOtpAction(fields: EmailStepFields) {
  // Send POST request to forgot password endpoint
  const response = await fetch(`${process.env.API_URL}/auth/forgotPassword`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: { ...JSON_HEADER },
  });

  const payload: ApiResponse<EmailStepResponse> = await response.json();

  return payload;
}
