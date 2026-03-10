import { CategoiresStatisticsResponse } from "@/lib/types/dashboard-overview.types";
import getToken from "@/lib/utils/manage-token";

export async function getCategoriesStatsService(): Promise<CategoiresStatisticsResponse> {
  const token = await getToken();
  const response = await fetch(`${process.env.API_URL}/statistics/categories`, {
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch categoires statistics");
  }
  const data: CategoiresStatisticsResponse = await response.json();

  return data;
}
