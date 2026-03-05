import { OccasionResponse } from "@/lib/types/occasions.types";

export async function fetchOccasions({
  page = 1,
  limit = 10,
  query = "",
} = {}): Promise<OccasionResponse> {
  const url = new URL(`${process.env.API_URL}/occasions`);
  url.searchParams.append("limit", String(limit));
  url.searchParams.append("page", String(page));
  url.searchParams.append("search", String(query));

  const res = await fetch(url.toString(), {
    next: { tags: ["occasions"] },
  });

  if (!res.ok) {
    throw new Error(`Unexpected response status: ${res.status}`);
  }

  return res.json();
}
