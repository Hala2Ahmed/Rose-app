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

  const response = await fetch(url.toString(), {
    next: { tags: ["categories"] },
  });

  if ("error" in response) {
    throw new Error(`API responded with status: ${response.status}`);
  }

  return response.json();
}
