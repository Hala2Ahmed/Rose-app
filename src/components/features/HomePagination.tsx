"use client";

import { useState } from "react";
import { AppPagination } from "../ui/pagination";

export default function HomePagination() {
  const [page, setPage] = useState(5); 
  const totalPages = 20;

  return (
    <AppPagination page={page} totalPages={totalPages} onPageChange={setPage} />
  );
}
