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
    <Card className="w-[36.5rem] h-[21rem] p-6 overflow-hidden shadow-none border-white md:mt-0 dark:border-zinc-800 dark:bg-zinc-800 rounded-2xl">
      <div className="h-full overflow-auto pr-2 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        <h2 className="font-semibold text-2xl mb-4">{t("all-categories")}</h2>

        {categoriesStats.data.statistics?.map((category) => (
          <div
            key={category._id}
            className="flex justify-between items-center border-b py-2 dark:border-zinc-600">
            <p>{category.name}</p>
            <span className="font-medium bg-[#0000000D] py-1 px-2 rounded-lg dark:bg-zinc-900">
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
