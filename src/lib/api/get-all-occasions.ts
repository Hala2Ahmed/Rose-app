import { allOccasionsService } from "@/app/[locale]/(site)/(homepage)/_services/all-occasion.service";
import { OccasionResponse } from "../types/occasions.types";

type OccasionResult =
  | {
      success: true;
      data: OccasionResponse;
    }
  | {
      success: false;
      error: string;
      data: [];
    };

interface GetOccasionsParams {
  limit?: number;
  page?: number;
}

export async function getAllOccasions(
  params: GetOccasionsParams = {},
): Promise<OccasionResult> {
  try {
    const data = await allOccasionsService(params);
    return { success: true, data: data };
  } catch (error) {
    console.error("Error fetching occasions:", error);
    return {
      success: false,
      error: "Failed to fetch occasions",
      data: [],
    };
  }
}
