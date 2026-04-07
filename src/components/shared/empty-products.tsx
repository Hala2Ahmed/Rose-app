import React from "react";
import { Package } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function EmptyState({
  title = "product",
}: {
  title?: string;
}) {
  const t = await getTranslations("common");
  return (
    <div className="min-h-96 bg-gray-50 flex items-center justify-center p-4 dark:bg-zinc-800">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4 dark:bg-zinc-500">
          <Package className="w-10 h-10 text-gray-400 dark:text-zinc-700" />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-2 dark:text-zinc-200">
          {t("emptyState", { title })}
        </h2>
      </div>
    </div>
  );
}
