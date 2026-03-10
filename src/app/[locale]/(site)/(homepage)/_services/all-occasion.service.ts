import { OccasionResponse } from "@/lib/types/occasions.types";

export async function allOccasionsService(
  params: Record<string, string | number> = {},
): Promise<OccasionResponse> {
  const { page = 1, limit = 10, ...rest } = params;
  const searchParams = new URLSearchParams(
    Object.entries({ page, limit, ...rest }).reduce(
      (acc, [k, v]) => ({ ...acc, [k]: String(v) }),
      {},
    ),
  );
  const response = await fetch(`/api/occasions?${searchParams}`);
  return response.json();
}
