import { Occasion, OccasionResponse } from "@/lib/types/occasions.types";

export async function allOccasionsService(): Promise<Occasion[]> {
  const response = await fetch(
    `https://flower.elevateegy.com/api/v1/occasions`
  );

  const data: OccasionResponse = await response.json();
  return data.occasions;
}
