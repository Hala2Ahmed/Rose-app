import { Suspense } from "react";
import { redirect } from "next/navigation";

import OccasionsFilter from "./_components/filters/occasions-filter/occasions-filter";
import PriceFilter from "./_components/filters/price-filter";
import CategoryFilter from "./_components/filters/category-filter/category-filter";
import RatingFilter from "./_components/filters/rating-filter/rating-filter";
import ResetAllButton from "./_components/filters/reset-all-btn";

import ProductGrid from "@/components/products/ProductGrid";
import ProductCardSkeleton from "@/components/skeletons/product-card.skeleton";
import { ProductsResponse } from "@/lib/types/products";
import { getProducts } from "../(homepage)/_services/products.service";

interface PageProps {
  searchParams?: Record<string, string | string[]>;
}

interface ProductFilters {
  [key: string]: string;
}

export const revalidate = 0;

export default async function ProductsPage({ searchParams }: PageProps) {
  const initialPage = Number(searchParams?.page ?? 1);

  const filters: ProductFilters = {};
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== "page") {
        filters[key] = Array.isArray(value) ? value[0] : value;
      }
    });
  }

  let initialData: ProductsResponse | null = null;
  try {
    initialData = await getProducts(initialPage, 12, filters);
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }

  if (initialData) {
    const totalPages = initialData.metadata.totalPages;

    if (initialPage < 1) {
      const params = new URLSearchParams(
        searchParams as Record<string, string>,
      );
      params.set("page", "1");
      redirect(`?${params.toString()}`);
    }

    if (initialPage > totalPages && totalPages > 0) {
      const params = new URLSearchParams(
        searchParams as Record<string, string>,
      );
      params.set("page", String(totalPages));
      redirect(`?${params.toString()}`);
    }
  }

  return (
    <div className="flex gap-3 max-w-7xl mx-auto px-4 py-8">
      {/* Filters */}
      <div className="w-filtersCard border-e pe-24">
        <div className="w-[277px]">
          <CategoryFilter />
          <OccasionsFilter />
          <RatingFilter />
          <PriceFilter />
          <ResetAllButton />
        </div>
      </div>

      {/* Product List */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <ProductGrid initialPage={initialPage} initialData={initialData} />
      </Suspense>
    </div>
  );
}
