"use server";

import { ResetPasswordStepResponse } from "@/lib/types/auth.type";

export async function resetPasswordAction(fields: {
  email: string;
  newPassword: string;
}) {
  // Send PUT request to reset password endpoint
  const response = await fetch(`${process.env.API_URL}/auth/resetPassword`, {
    method: "PUT",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  });

  const payload: ApiResponse<ResetPasswordStepResponse> = await response.json();

  return payload;
}
