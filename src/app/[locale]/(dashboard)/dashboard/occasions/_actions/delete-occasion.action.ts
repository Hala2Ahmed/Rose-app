"use server";

import { redirect } from "@/i18n/navigation";
import { DeleteOccasionResponse } from "@/lib/types/occasions.types";
import getToken from "@/lib/utils/manage-token";
import { getLocale } from "next-intl/server";
import { revalidateTag } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function deleteOccasionAction(
  occasionId: string,
  currentPage: number,
  totalItemsOnPage: number,
): Promise<ApiResponse<DeleteOccasionResponse>> {
  const token = await getToken();
  const locale = await getLocale();

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
      redirect({
        href: `/dashboard/occasions?page=${currentPage - 1}`,
        locale,
      });
    }

    return response.json();
  } catch (error) {
    if (isRedirectError(error)) throw error;
    throw error;
  }
}
