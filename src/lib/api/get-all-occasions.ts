import { allOccasionsService } from "@/app/[locale]/(homepage)/_services/all-occasion.service";
import { Occasion } from "../types/occasions.types";

type OccasionResult =
  | {
      success: true;
      data: Occasion[];
    }
  | {
      success: false;
      error: string;
      data: [];
    };

export async function getAllOccasions(): Promise<OccasionResult> {
  try {
    const data = await allOccasionsService();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching best selling products:", error);
    return {
      success: false,
      error: "Failed to fetch best selling items",
      data: [],
    };
  }
}
