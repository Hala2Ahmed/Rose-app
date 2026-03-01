
const BASE_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export async function getProducts(
  page: number,
  limit: number,
  filters: Record<string, any> = {},
  token?: string
) {
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

  if (!response.ok)
    throw new Error(payload.message || "Failed to fetch products");

  return payload;
}

export async function getProductBySlug(slug: string, token?: string) {
  const response = await fetch(
    `${BASE_AUTH_URL}/slug/${encodeURIComponent(slug)}`,
    {
      cache: "no-store",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );

  const payload = await response.json();

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(payload.message || "Failed to fetch product");
  }

  return payload;
}
