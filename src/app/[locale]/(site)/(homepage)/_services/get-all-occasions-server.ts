import { OccasionResponse } from "@/lib/types/occasions.types";
import { fetchOccasions } from "./fetch-occasions";

type OccasionResult =
  | { success: true; data: OccasionResponse }
  | { success: false; error: string; data: null };

export async function getAllOccasions(
  params: Record<string, string | number> = {},
): Promise<OccasionResult> {
  try {
    const data = await fetchOccasions(params);
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching occasions:", error);
    return { success: false, error: "Failed to fetch occasions", data: null };
  }
}
