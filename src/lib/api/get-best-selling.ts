import { bestSellingService } from "@/app/(homepage)/_features/best-selling/service/best-selling.service";
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

export async function getBestSelling(): Promise<BestSellingResult> {
  try {
    const data = await bestSellingService();
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
