"use server";

import { RegisterFields } from "@/lib/types/auth";
import { RegisterResponse } from "@/lib/types/auth.type";

export async function registerAction(
  data: RegisterFields,
): Promise<ApiResponse<RegisterResponse>> {
  const response = await fetch(`${process.env.API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
