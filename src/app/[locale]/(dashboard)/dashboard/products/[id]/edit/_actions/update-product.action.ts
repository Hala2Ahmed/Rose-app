"use server";

import { JSON_HEADER } from "@/lib/constants/api.constance";
import { UpdateProductFormData } from "@/lib/types/products-dashboard";
import getToken from "@/lib/utils/manage-token";

export async function updateProductAction(
  data: UpdateProductFormData,
  id: string,
) {
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      ...JSON_HEADER,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
