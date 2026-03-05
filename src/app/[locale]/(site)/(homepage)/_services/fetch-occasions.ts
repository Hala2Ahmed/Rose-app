import { OccasionResponse } from "@/lib/types/occasions.types";

export async function fetchOccasions({
  page = 1,
  limit = 10,
  query = "",
} = {}): Promise<OccasionResponse> {
  const url = new URL(`${process.env.API_URL}/occasions`);
  url.searchParams.append("limit", String(limit));
  if (!query) {
    url.searchParams.append("page", String(page));
  }
  url.searchParams.append("search", String(query));

  const response = await fetch(url.toString(), {
    next: { tags: ["occasions"] },
  });

  if (!response.ok) {
    throw new Error(`API responded with status: ${response.status}`);
  }

  return response.json();
}
