import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ProductsTableSkeleton() {
  return (
    <div className="rounded-2xl p-6 bg-white space-y-6">
      <Table className="w-[66rem]">
        <TableHeader className="bg-zinc-50 rounded-lg">
          <TableRow>
            <TableHead className="rounded-tl-xl text-sm font-medium text-zinc-900 w-40 px-5">
              Name
            </TableHead>
            <TableHead className="text-sm font-medium text-zinc-900 w-40">
              Price
            </TableHead>
            <TableHead className="text-sm font-medium text-zinc-900 w-40">
              Stock
            </TableHead>
            <TableHead className="text-sm font-medium text-zinc-900 w-40">
              Sales
            </TableHead>
            <TableHead className="text-sm font-medium text-zinc-900 w-40">
              Ratings
            </TableHead>
            <TableHead className="text-right rounded-tr-xl w-40 px-5" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 12 }).map((_, i) => (
            <TableRow key={i}>
              {/* Name */}
              <TableCell className="px-5">
                <Skeleton className="h-4 w-28" />
              </TableCell>

              {/* Price */}
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>

              {/* Stock */}
              <TableCell>
                <Skeleton className="h-4 w-10" />
              </TableCell>

              {/* Sales */}
              <TableCell>
                <Skeleton className="h-4 w-10" />
              </TableCell>

              {/* Ratings */}
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>

              {/* Action Buttons */}
              <TableCell className="px-5">
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-8 w-16 rounded-md" />
                  <Skeleton className="h-8 w-16 rounded-md" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
