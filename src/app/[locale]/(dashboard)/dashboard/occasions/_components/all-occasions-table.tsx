import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ActionButtons from "./actions-buttons";
import { PaginationControl } from "./pagination-control";
import { getAllOccasions } from "@/app/[locale]/(site)/(homepage)/_services/get-all-occasions-server";
import { getFormatter, getTranslations } from "next-intl/server";
import EmptyState from "@/components/shared/empty-products";
import AllOccasionsHeader from "./all-occasions-header";

export async function AllOccasionsTable({
  page,
  query,
}: {
  page: number;
  query: string;
}) {
  //translations
  const t = await getTranslations("dashboard.occasions");
  const formatter = await getFormatter();

  //function
  const allData = await getAllOccasions({
    page: page,
    limit: query ? 99 : 12,
    query: query,
  });

  //empty state
  if (allData?.data?.occasions.length == 0) {
    return (
      <div className="rounded-2xl p-6 bg-white">
        <AllOccasionsHeader />
        <EmptyState title={t("occasion")} />
      </div>
    );
  }

  const totalPages = allData.data?.metadata.totalPages || 1;

  return (
    <>
      <div className="rounded-2xl p-6 bg-white">
        <AllOccasionsHeader />
        <Table>
          {/* Table Header */}
          <TableHeader className="bg-zinc-50 rounded-lg">
            <TableRow>
              <TableHead className="w-[100px] rounded-tl-md text-zinc-900">
                {t("name")}
              </TableHead>
              <TableHead className="text-zinc-900">{t("products")}</TableHead>
              <TableHead></TableHead>
              <TableHead className="text-right rounded-tr-md "></TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {allData?.data?.occasions.map((occasion) => (
              <TableRow key={occasion._id}>
                <TableCell className="font-medium">{occasion.name}</TableCell>
                <TableCell>
                  {t("product", {
                    count: occasion.productsCount,
                    formattedCount: formatter.number(occasion.productsCount),
                  })}
                </TableCell>
                <TableCell></TableCell>

                {/* Action Buttons */}
                <TableCell className="text-right">
                  <ActionButtons
                    occasionId={occasion._id}
                    currentPage={page}
                    totalItemsOnPage={allData.data.occasions.length}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination - outside white bg */}
      <div className="mt-6">
        <PaginationControl page={page} totalPages={totalPages} />
      </div>
    </>
  );
}
