"use server";

import getToken from "@/lib/utils/manage-token";

export async function addProductAction(formData: FormData) {
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to add product");
  }

  return data;
}
