import { OccasionResponse } from "@/lib/types/occasions.types";

export async function fetchOccasions(
  params: Record<string, string | number> = {},
): Promise<OccasionResponse> {
  const url = new URL(`${process.env.API_URL}/occasions`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  const response = await fetch(url.toString(), {
    next: { tags: ["occasions"] },
  });

  if (!response.ok) {
    throw new Error(`API responded with status: ${response.status}`);
  }

  return response.json();
}
