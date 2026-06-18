"use client";

import { AppPagination } from "@/components/ui/pagination";
import { useState } from "react";

export default function HomePagination() {
  // Example state for current page
  const [page, setPage] = useState(5);
  const totalPages = 10;
  return (
    <AppPagination page={page} totalPages={totalPages} onPageChange={setPage} />
  );
}
