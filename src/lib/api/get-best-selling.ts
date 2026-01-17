import { bestSellingService } from "@/app/[locale]/(homepage)/_services/best-selling.service";
import { BestSellingProduct } from "@/lib/types/best-selling.types";

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
