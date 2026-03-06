import { getCategoriesStatsService } from "@/app/[locale]/(dashboard)/dashboard/_services/get-all-categories-stats.service";
import { CategoiresStatisticsResponse } from "../types/dashboard-overview.types";

export default async function getCategoriesStatistics() {
  try {
    const data = await getCategoriesStatsService();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error || "failed to fetch categories statistics ",
      data: { message: "", statistics: [] } as CategoiresStatisticsResponse,
    };
  }
}
