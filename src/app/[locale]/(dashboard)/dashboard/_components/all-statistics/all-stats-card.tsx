import { Card } from "@/components/ui/card";
import React from "react";
import StatisticsItem from "./stats-item";
import getOverallStatistics from "@/lib/api/get-statistics";

export default async function AllStatsCard() {
  //function
  const result = await getOverallStatistics();

  //error state
  if (!result.success || !result.data) {
    throw new Error("Failed to load statistics");
  }

  //variable
  const stats = result.data.statistics;

  return (
    <Card className="w-[33.5rem] h-[28rem] grid grid-cols-2 py-6 px-6 gap-4 shadow-none border-white  ms-4 ">
      <StatisticsItem stats={stats} />
    </Card>
  );
}
