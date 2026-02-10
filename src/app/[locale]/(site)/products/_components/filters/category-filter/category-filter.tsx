"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCategories } from "../../../_hooks/use-category";
import { Category } from "@/lib/types/categories";
import CategoryList from "./category-list";
import CategorySkeleton from "@/components/skeletons/category-filter.skeleton";
import FilterTitle from "../../filter-title";

export default function CategoryFilter() {
  //Translation
  const t = useTranslations("products.filters");

  //Navigation
  const router = useRouter();

  //Hooks
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const { categories, isLoading, error, fetchNextPage, hasNextPage } =
    useCategories(10);

  const allCategories: Category[] = useMemo(
    () => categories?.pages.flatMap((p) => p.categories) ?? [],
    [categories],
  );

  const isFilterSelected = selectedCategory !== null;

  //Function
  const updateCategory = (id?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (id) params.set("category", id);
    else params.delete("category");

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  if (isLoading) return <CategorySkeleton />;
  if (error) return <p className="text-sm text-red-500">{t("error")}</p>;

  return (
    <div className="border-b mb-5">
      {/*  Filter header */}
      <FilterTitle
        title={t("category-title")}
        isFilterSelected={isFilterSelected}
        paramsToReset={["category"]}
      />

      {/* categories list */}
      <CategoryList
        categories={allCategories}
        selectedCategory={selectedCategory}
        onSelect={updateCategory}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        loadingLabel={t("loading")}
        endLabel={t("end-of-list")}
      />
    </div>
  );
}
