"use client";

import { useState } from "react";
import { AppPagination } from "@/components/ui/Pagination";

export default function HomePagination() {
  const [page, setPage] = useState(5);
  const totalPages = 10;
  return (
    <AppPagination page={page} totalPages={totalPages} onPageChange={setPage} />
  );
}
