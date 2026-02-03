import { OccasionResponse } from "@/lib/types/occasions.types";

interface AllOccasionsParams {
  page?: number;
  limit?: number;
}

export async function allOccasionsService(
  params: AllOccasionsParams = {},
): Promise<OccasionResponse> {
  const { page = 1, limit = 10 } = params;
  const baseUrl = "http://localhost:3000";

  const response = await fetch(
    `${baseUrl}/api/occasions?limit=${limit}&page=${page}`,
  );
  const data: OccasionResponse = await response.json();

  return data;
}
