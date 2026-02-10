import { OccasionResponse } from "@/lib/types/occasions.types";

interface AllOccasionsParams {
  page?: number;
  limit?: number;
}

export async function allOccasionsService(): Promise<Occasion[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/occasions?limit=4`,
  );

  const data: OccasionResponse = await response.json();

  return data;
}
