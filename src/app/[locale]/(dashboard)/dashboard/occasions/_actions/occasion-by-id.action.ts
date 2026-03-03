"use server";

import { SingleOccasionResponse } from "@/lib/types/occasions.types";

export async function getSingleOccasionAction(
  occasionId: string|string[],
): Promise<SingleOccasionResponse> {
  const response = await fetch(
    `${process.env.API_URL}/occasions/${occasionId}`,
  );
  const data: SingleOccasionResponse = await response.json();

  return data;
}
