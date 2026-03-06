import { SingleOccasionResponse } from "@/lib/types/occasions.types";

export async function getSingleOccasionService(
  occasionId: string | string[],
): Promise<SingleOccasionResponse> {
  const response = await fetch(`/api/occasions/${occasionId}`);

  const data: SingleOccasionResponse = await response.json();

  return data;
}
