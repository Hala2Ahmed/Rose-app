"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/tailwind-merge";
import TopSellingProductsSkeleton from "@/components/skeletons/top-selling-products-skeleton";
import { useTranslations } from "next-intl";
import { useProducts } from "../../../../../hooks/useProducts";
import { Product } from "@/lib/types/products";

type TopSellingProductUI = {
  id: string;
  name: string;
  price: number;
  sales: number;
};

export default function TopSellingProducts() {

  //Translation
  const t = useTranslations("dashboard");

  //Hooks
  const { data, isLoading, isError, error } = useProducts({
    page: 1,
    limit: 9999,
    filters: { sort: "-sold" },
  });

  if (isLoading) {
    return <TopSellingProductsSkeleton />;
  }

  if (isError) {
    return <p className="text-red-600">{error?.message}</p>;
  }

  //Variables
  const products: TopSellingProductUI[] =
    data?.products?.map((product: Product) => ({
      id: product._id,
      name: product.title,
      price: product.priceAfterDiscount ?? product.price,
      sales: product.sold ?? 0,
    })) ?? [];

  return (
    <Card className="rounded-2xl border-none shadow-none bg-white w-[33.5rem] h-[28rem]">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-zinc-800">
          {t("top_selling")}
        </h2>

        <div className="space-y-2.5 overflow-y-auto h-[21.5rem] scrollbar-hide">
          {products.map((product, index) => {
            const isTop1 = index === 0;
            const isTop2 = index === 1;
            const isTop3 = index === 2;

            {/* products */}
            return (
              <div
                key={product.id}
                className={cn(
                  "flex items-center justify-between px-2.5 py-1.5 rounded-sm transition-colors text-zinc-800",
                  isTop1 &&
                    "bg-gradient-to-r from-[#DFAC1640] to-[#DFAC1640]/10",
                  isTop2 && "bg-gradient-to-r from-[#dddfe5] to-[#dddfe5]/35",
                  isTop3 && "bg-gradient-to-r from-[#e4d1c1] to-[#e4d1c1]/35",
                  !isTop1 && !isTop2 && !isTop3 && "bg-zinc-100",
                )}
              >
                <div className="flex items-center gap-1 min-w-0">
                  <p className="font-semibold truncate max-w-[220px]">
                    {product.name}
                  </p>
                  <span className="text-xs whitespace-nowrap">
                    ({product.price.toLocaleString()} EGP)
                  </span>
                </div>

                <div className="flex items-center text-sm gap-1">
                  <span className="font-bold">{product.sales}</span>
                  <span>{t("sales")}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
