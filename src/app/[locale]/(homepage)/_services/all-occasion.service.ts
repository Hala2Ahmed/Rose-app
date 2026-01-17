import { Occasion, OccasionResponse } from "@/lib/types/occasions.types";

export async function allOccasionsService(): Promise<Occasion[]> {
  const response = await fetch(`${process.env.API_URL}/occasions?limit=4`);

  const data: OccasionResponse = await response.json();
  return data.occasions;
}
