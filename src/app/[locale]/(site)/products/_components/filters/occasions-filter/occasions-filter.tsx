"use client";

import { Occasion, OccasionResponse } from "@/lib/types/occasions.types";
import FilterTitle from "../../filter-title";
import OccasionsCard from "./occasions-card";
import { useSearchParams } from "next/navigation";
import { useOccasions } from "./hooks/useOccasions";
import InfiniteScroll from "react-infinite-scroll-component";
import OccasionsCardSkeleton from "@/components/skeletons/occasions-card.skeleton";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { SKELETON_ITEMS_COUNT } from "@/lib/constants/occasions-filter.constant";
import EmptyProductState from "@/components/shared/empty-products";

export default function OccasionsFilter() {
  //translations
  const t = useTranslations("products.filters");
  //hooks
  const occasionParams = useSearchParams();
  const { occasions, isLoading, error, hasNextPage, fetchNextPage } =
    useOccasions();

  const allOccasions = useMemo(
    () =>
      occasions?.pages?.flatMap((page: OccasionResponse) => page.occasions) ??
      [],
    [occasions],
  );

  const activeOccasions = useMemo(
    () => new Set(occasionParams.getAll("occasion")),
    [occasionParams],
  );
  const hasOccasionFilter = useMemo(() => {
    const param = occasionParams.get("occasion");
    return Boolean(param?.trim());
  }, [occasionParams]);

  // Initial loading state
  if (isLoading) {
    return (
      <div className="w-full">
        <FilterTitle
          title={t("occasion-title")}
          isFilterSelected={hasOccasionFilter}
          paramsToReset={["occasion"]}
        />
        <div className="grid grid-cols-2 gap-2 mb-4">
          {Array.from({ length: SKELETON_ITEMS_COUNT }).map((_, index) => (
            <OccasionsCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  //Error state
  if (error) {
    return <div>{t("occasions-error")}</div>;
  }

  //empty state
  if (allOccasions?.length === 0) {
    return <EmptyProductState />;
  }

  return (
    <div>
      <FilterTitle
        title={t("occasion-title")}
        isFilterSelected={hasOccasionFilter}
        paramsToReset={["occasion"]}
      />

      <InfiniteScroll
        height={296}
        dataLength={allOccasions.length}
        next={fetchNextPage}
        hasMore={hasNextPage ?? false}
        className="scrollbar-hide"
        loader={
          <div className="grid grid-cols-2 gap-2 mt-4">
            {Array.from({ length: SKELETON_ITEMS_COUNT }).map((_, index) => (
              <OccasionsCardSkeleton key={`loader-${index}`} />
            ))}
          </div>
        }
        endMessage={
          <p className="text-center py-2 text-sm text-gray-500">
            {t("end-of-occasions")}
          </p>
        }>
        <div className="grid grid-cols-2 gap-2  ">
          {allOccasions.map((occ: Occasion) => (
            <OccasionsCard
              imageSrc={occ.image}
              title={occ.name}
              key={occ._id}
              occasionId={occ._id}
              isActive={activeOccasions.has(occ._id)}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
