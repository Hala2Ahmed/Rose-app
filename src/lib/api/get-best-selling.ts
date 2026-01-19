import { BestSellingProduct } from "@/lib/types/best-selling.types";
import { bestSellingService } from "@/app/[locale]/(site)/(homepage)/_services/best-selling.service";

type BestSellingResult =
  | {
      success: true;
      data: BestSellingProduct[];
    }
  | {
      success: false;
      error: string;
      data: [];
    };

interface GetBestSellingParams {
  occasion?: string;
  limit?: number;
}

export async function getBestSelling(
  params?: GetBestSellingParams,
): Promise<BestSellingResult> {
  try {
    const data = await bestSellingService(params);
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
