"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";

export function AllOccasionsTableSkeleton() {
  const t = useTranslations("dashboard.occasions");
  return (
    <>
      <Table>
        <TableHeader className="bg-zinc-50 rounded-lg dark:bg-zinc-800">
          <TableRow>
            <TableHead className="w-[100px] rounded-tl-md text-zinc-900">
              {t("name")}
            </TableHead>
            <TableHead className="text-zinc-900">{t("products")}</TableHead>
            <TableHead></TableHead>
            <TableHead className="text-right rounded-tr-md"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 12 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[40px]" />
              </TableCell>
              <TableCell></TableCell>
              <TableCell className="flex justify-end gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination Skeleton */}
      <div className="flex items-center justify-center gap-2">
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
    </>
  );
}
