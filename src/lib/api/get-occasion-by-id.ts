import { getSingleOccasionService } from "@/app/[locale]/(dashboard)/dashboard/occasions/_services/get-occasion-by-id";
import { SingleOccasionResponse } from "../types/occasions.types";

type OccasionResult =
  | {
      success: true;
      data: SingleOccasionResponse;
    }
  | {
      success: false;
      error: string;
      data: null;
    };

export async function getOccasionById(
  occasionId: string | string[],
): Promise<OccasionResult> {
  try {
    const data = await getSingleOccasionService(occasionId);

    return { success: true, data: data };
  } catch (error) {
    console.error("Error fetching occasions:", error);
    return {
      success: false,
      error: "Failed to fetch occasions",
      data: null,
    };
  }
}
