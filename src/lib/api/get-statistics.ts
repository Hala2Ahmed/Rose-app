import { getStatisticsService } from "@/app/[locale]/(dashboard)/dashboard/_services/get-statistics.service";

export default async function getOverallStatistics() {
  try {
    const data = await getStatisticsService();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error || "failed to fetch statistics ",
      data: null,
    };
  }
}
