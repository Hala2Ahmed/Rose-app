import { StatisticsResponse } from "@/lib/types/dashboard-overview.types";
import getToken from "@/lib/utils/manage-token";

export async function getStatisticsService(): Promise<StatisticsResponse> {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/statistics/overall`,
    {
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
    },
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch statistics");
  }
  const data: StatisticsResponse = await response.json();

  return data;
}
