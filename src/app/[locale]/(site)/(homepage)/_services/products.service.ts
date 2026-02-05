import { ProductsResponse } from "@/lib/types/products";

// const BASE_AUTH_URL = `${process.env.API_URL!}/products`;
const BASE_AUTH_URL = `https://flower.elevateegy.com/api/v1/products`;

export async function getProducts(
  page: number,
  limit: number,
  filters: Record<string, any> = {},
  token?: string,
): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...filters,
  }).toString();
  const response = await fetch(`${BASE_AUTH_URL}?${searchParams}`, {
    cache: "no-store",
    headers: {
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
  });
  const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || "Failed to fetch products");
  return payload;
}
