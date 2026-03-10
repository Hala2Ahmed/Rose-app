import { CategoriesResponse } from "../types/categories";

export async function fetchCategories({
  page = 1,
  limit = 10,
  query = "",
} = {}): Promise<CategoriesResponse> {
  const url = new URL(`${process.env.API_URL}/categories`);
  url.searchParams.append("limit", String(limit));
  url.searchParams.append("page", String(page));
  url.searchParams.append("search", String(query));

  const res = await fetch(url.toString(), {
    next: { tags: ["categories"] },
  });

  if (!res.ok) {
    throw new Error(`Unexpected response status: ${res.status}`);
  }

  return res.json();
}
