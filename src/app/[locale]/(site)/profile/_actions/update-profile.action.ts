"use server";

import { JSON_HEADER } from "./../../../../../lib/constants/api.constance";
import { UpdateProfileFields } from "@/lib/types/auth";
import { UpdateProfileResponse } from "@/lib/types/auth.type";
import getToken from "@/lib/utils/manage-token";

export async function updateUserProfileAction(
  data: UpdateProfileFields,
): Promise<ApiResponse<UpdateProfileResponse>> {
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}/auth/editProfile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      ...JSON_HEADER,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
