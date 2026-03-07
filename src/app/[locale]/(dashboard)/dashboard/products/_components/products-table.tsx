"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProducts } from "@/hooks/use-products";
import { AppPagination } from "@/components/ui/pagination";
import { Product } from "@/lib/types/products";
import ActionButtons from "./products-table-buttons";
import { useFormatter, useTranslations } from "next-intl";
import { ProductsTableSkeleton } from "@/components/skeletons/products-table.skeleton";
import { useSearchParams } from "next/navigation";

export default function ProductsTable() {
  //Translation
  const t = useTranslations("dashboard.products-table");

  //Search
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  //Hooks
  const [page, setPage] = useState<number>(1);
  const formatter = useFormatter();
  const { data, isLoading, isError, error } = useProducts({
    page,
    limit: 12,
    filters: {
      keyword: search,
    },
  });

  useEffect(() => {
    setPage(1);
  }, [search]);

  //Variables
  const products: Product[] = data?.products ?? [];
  const totalPages: number = data?.metadata?.totalPages ?? 1;

  if (isLoading) return <ProductsTableSkeleton />;

  if (isError) return <p className="text-red-600">{error?.message}</p>;

  return (
    <div className="space-y-6">
      <Table className="w-[66rem]">
        {/* Table Head */}
        <TableHeader className="bg-zinc-50 rounded-lg">
          <TableRow>
            <TableHead className="rounded-tl-xl text-sm font-medium text-zinc-900 w-40 px-5">
              {t("name")}
            </TableHead>
            <TableHead className="text-sm font-medium text-zinc-900 w-40">
              {t("price")}
            </TableHead>
            <TableHead className="text-sm font-medium text-zinc-900 w-40">
              {t("stock")}
            </TableHead>
            <TableHead className="text-sm font-medium text-zinc-900 w-40">
              {t("sales")}
            </TableHead>
            <TableHead className="text-sm font-medium text-zinc-900 w-40">
              {t("ratings")}
            </TableHead>
            <TableHead className="text-right rounded-tr-xl w-40 px-5"></TableHead>
          </TableRow>
        </TableHeader>

        {/* Products List */}
        <TableBody>
          {products.map((product: Product) => {
            const stock: number = Math.max(product.quantity ?? 0, 0);

            return (
              <TableRow key={product._id} className="hover:bg-maroon-50">
                {/* Name */}
                <TableCell className="font-semibold text-sm text-zinc-800 truncate max-w-[120px] px-5">
                  {product.title}
                </TableCell>

                {/* Price */}
                <TableCell className="text-sm text-zinc-800">
                  {t("price-value", {
                    formattedValue: formatter.number(
                      product.priceAfterDiscount ?? product.price,
                    ),
                  })}
                </TableCell>

                {/* Stock */}
                <TableCell
                  className={
                    stock < 5
                      ? "text-red-600 font-semibold text-sm"
                      : "text-zinc-800 text-sm"
                  }
                >
                  {t("stock-value", {
                    count: stock,
                    formattedCount: formatter.number(stock),
                  })}
                </TableCell>

                {/* Sales */}
                <TableCell className="text-sm text-zinc-800">
                  {t("sales-value", {
                    count: product.sold ?? 0,
                    formattedCount: formatter.number(product.sold ?? 0),
                  })}
                </TableCell>

                {/* Rating */}
                <TableCell className="text-zinc-800">
                  <span className="font-semibold text-sm">
                    {formatter.number(product.rateAvg ?? 0)}/5
                  </span>
                  <span className="text-xs">
                    ({formatter.number(product.rateCount ?? 0)})
                  </span>
                </TableCell>

                {/* Edit and Delete Buttons */}
                <TableCell className="text-right px-5">
                  <ActionButtons
                    productId={product._id}
                    currentPage={page}
                    totalItemsOnPage={products.length}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Pagination */}
      <AppPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
