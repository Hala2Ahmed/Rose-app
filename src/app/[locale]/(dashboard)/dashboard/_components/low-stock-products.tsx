"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/tailwind-merge";
import { useProducts } from "../../../../../hooks/useProducts";
import { useTranslations } from "next-intl";
import { Product } from "@/lib/types/products";
import TopSellingProductsSkeleton from "@/components/skeletons/top-selling-products-skeleton";

type ProductStockUI = {
  id: string;
  name: string;
  stock: number;
};

export default function LowStockProducts() {
  
  //Translation
  const t = useTranslations("dashboard");

  //Hooks
  const { data, isLoading, isError, error } = useProducts({
    page: 1,
    limit: 9999,
    filters: { sort: "quantity" },
  });

  if (isLoading) {
    return <TopSellingProductsSkeleton />;
  }

  if (isError) {
    return <p className="text-red-600">{error?.message}</p>;
  }

  //Variables
  const products: ProductStockUI[] =
    data?.products?.map((product: Product) => ({
      id: product._id,
      name: product.title,
      stock: Math.max(0, product.quantity ?? 0),
    })) ?? [];

  return (
    <Card className="rounded-2xl border-none shadow-none bg-white w-[33.5rem] h-[28rem]">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-zinc-800">
          {t("low_stock")}
        </h2>

        {/* products in stock */}
        <div className="divide-y divide-zinc-200 overflow-y-auto h-[21.5rem] scrollbar-hide">
          {products.map((product) => {
            const isLow = product.stock < 5;

            return (
              <div
                key={product.id}
                className="flex items-center justify-between py-3"
              >
                <span className="truncate max-w-[220px] text-zinc-800">
                  {product.name}
                </span>

                <span
                  className={cn(
                    "text-sm font-medium",
                    isLow ? "text-red-600" : "text-zinc-700",
                  )}
                >
                  {product.stock} {t("products")}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
