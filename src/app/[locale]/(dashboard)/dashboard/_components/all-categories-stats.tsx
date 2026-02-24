import { Card } from "@/components/ui/card";
import React from "react";
import { getFormatter, getTranslations } from "next-intl/server";
import EmptyState from "@/components/shared/empty-products";
import getCategoriesStatistics from "@/lib/api/get-categories-stats";

export default async function AllCategoriesStats() {
  //translations
  const t = await getTranslations("dashboard.overview");
  const format = await getFormatter();

  //function
  const categoriesStats = await getCategoriesStatistics();

  // empty state
  if (categoriesStats.data.statistics.length == 0) {
    return <EmptyState title="categories statistics" />;
  }

  return (
    <Card className="md:w-[582px] max-h-[390px] p-6 overflow-hidden shadow-none border-white  mt-6 md:mt-0">
      <div className="h-full overflow-auto pr-2 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        <h2 className="font-semibold text-2xl mb-4">{t("all-categories")}</h2>

        {categoriesStats.data.statistics?.map((category) => (
          <div
            key={category._id}
            className="flex justify-between border-b pb-3 mb-3">
            <p>{category.name}</p>
            <span className="font-medium bg-[#0000000D] py-1 px-2 rounded-lg">
              {t("products", {
                count: category.totalProducts,
                formattedCount: format.number(category.totalProducts),
              })}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
