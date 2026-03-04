import { SingleOccasionResponse } from "../types/occasions.types";
import { getSingleOccasionAction } from "@/app/[locale]/(dashboard)/dashboard/occasions/_actions/occasion-by-id.action";

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
    const data = await getSingleOccasionAction(occasionId);
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
