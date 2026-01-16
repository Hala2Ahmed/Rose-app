import {
  BestSellingResponse,
  BestSellingProduct,
  GetBestSellingParams,
} from "@/lib/types/best-selling.types";

export async function bestSellingService(
  params?: GetBestSellingParams
): Promise<BestSellingProduct[]> {
  const url = new URL(`${process.env.API_URL}/products`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const response = await fetch(url.toString(), {});

  const data: BestSellingResponse = await response.json();
  return data.products;
}
