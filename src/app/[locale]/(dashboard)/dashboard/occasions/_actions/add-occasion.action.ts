"use server";

import { AddOccasionResponse } from "@/lib/types/occasions.types";
import getToken from "@/lib/utils/manage-token";
import { revalidateTag } from "next/cache";

export async function addOccasionAction(
  data: FormData,
): Promise<ApiResponse<AddOccasionResponse>> {
  const token = await getToken();
  const response = await fetch(`${process.env.API_URL}/occasions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: data,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to add occasion:  ${error.error}`);
  }
  revalidateTag("occasions");

  return response.json();
}
