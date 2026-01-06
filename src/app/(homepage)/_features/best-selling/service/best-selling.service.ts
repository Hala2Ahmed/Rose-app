import {
  BestSellingResponse,
  BestSellingProduct,
} from "@/lib/types/best-selling.types";

export async function bestSellingService(): Promise<BestSellingProduct[]> {
  const response = await fetch(
    `https://flower.elevateegy.com/api/v1/best-seller`
  );

  const data: BestSellingResponse = await response.json();
  return data.bestSeller;
}
