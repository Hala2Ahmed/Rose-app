"use server";

import { DeleteOccasionResponse } from "@/lib/types/occasions.types";
import getToken from "@/lib/utils/manage-token";
import { revalidateTag } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

export async function deleteOccasionAction(
  occasionId: string,
  currentPage: number,
  totalItemsOnPage: number,
): Promise<ApiResponse<DeleteOccasionResponse>> {
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.API_URL}/occasions/${occasionId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete occasion");
    }

    revalidateTag("occasions");

    if (totalItemsOnPage === 1 && currentPage > 1) {
      redirect(`/dashboard/occasions?page=${currentPage - 1}`);
    }

    return response.json();
  } catch (error) {
    if (isRedirectError(error)) throw error;
    throw error;
  }
}
