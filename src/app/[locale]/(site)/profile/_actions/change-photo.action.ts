"use server";

import getToken from "@/lib/utils/manage-token";

export async function changePhotoAction(
  formData: FormData,
): Promise<ApiResponse<{ photo: string }>> {
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}/auth/upload-photo`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: formData,
  });

  return response.json();
}
