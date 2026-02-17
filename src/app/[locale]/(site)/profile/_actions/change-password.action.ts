"use server";

import { JSON_HEADER } from "@/lib/constants/api.constance";
import { ChangePasswordFields } from "@/lib/types/auth";
import { ChangePasswordResponse } from "@/lib/types/auth.type";
import getToken from "@/lib/utils/manage-token";

export async function changePasswordAction(
  data: ChangePasswordFields,
): Promise<ApiResponse<ChangePasswordResponse>> {
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}/auth/change-password`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      ...JSON_HEADER,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
