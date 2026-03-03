"use server";

import { JSON_HEADER } from "@/lib/constants/api.constance";
import { OccasionFields } from "./../../../../../../lib/types/occasions.types";
import { AddOccasionResponse } from "@/lib/types/occasions.types";
import getToken from "@/lib/utils/manage-token";
import { revalidateTag } from "next/cache";

export async function updateOccasionAction(
  data: OccasionFields,
  occasionId: string | string[],
): Promise<ApiResponse<AddOccasionResponse>> {
  const token = await getToken();
  const response = await fetch(
    `${process.env.API_URL}/occasions/${occasionId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
        ...JSON_HEADER,
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to edit occasion:  ${error.error}`);
  }
  revalidateTag("occasions");

  return response.json();
}
