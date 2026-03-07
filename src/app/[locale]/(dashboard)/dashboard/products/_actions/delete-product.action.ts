"use server";

import { redirect } from "@/i18n/navigation";
import getToken from "@/lib/utils/manage-token";
import { getLocale } from "next-intl/server";
import { isRedirectError } from "next/dist/client/components/redirect";
import { DeleteProductResponse } from "@/lib/types/products";

export async function deleteProductAction(
  productId: string,
  currentPage: number,
  totalItemsOnPage: number,
): Promise<ApiResponse<DeleteProductResponse>> {
  const token = await getToken();
  const locale = await getLocale();

  try {
    const response = await fetch(
      `${process.env.API_URL}/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      },
    );

    const text = await response.text();
    const data: DeleteProductResponse = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const errorData = data as unknown as ErrorResponse;
      throw new Error(errorData.error || "Failed to delete product");
    }

    if (totalItemsOnPage === 1 && currentPage > 1) {
      redirect({
        href: `/dashboard/products?page=${currentPage - 1}`,
        locale,
      });
    }

    return data;
  } catch (error) {
    if (isRedirectError(error)) throw error;
    throw error;
  }
}
