import { OccasionResponse } from "@/lib/types/occasions.types";
import { fetchOccasions } from "./fetch-occasions";

type OccasionResult =
  | { success: true; data: OccasionResponse }
  | { success: false; error: string; data: null };

export async function getAllOccasions({
  limit = 10,
  page = 1,
  query = "",
} = {}): Promise<OccasionResult> {
  try {
    const data = await fetchOccasions({ limit, page, query });
    return { success: true, data };
    
  } catch (error) {
    console.error("Error fetching occasions:", error);
    return { success: false, error: "Failed to fetch occasions", data: null };
  }
}
