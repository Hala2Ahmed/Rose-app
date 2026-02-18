"use server";

import { JSON_HEADER } from "@/lib/constants/api.constance";
import getToken from "@/lib/utils/manage-token";

export async function DeleteAccountAction() {
  const token = await getToken();
  const response = await fetch(`${process.env.API_URL}/auth/deleteMe`, {
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      ...JSON_HEADER,
    },
    method: "DELETE",
  });

  return response.json();
}
