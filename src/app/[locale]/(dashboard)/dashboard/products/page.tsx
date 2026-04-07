import React from "react";
import ProductsTable from "./_components/products-table";
import ProductsTableHeader from "./_components/products-table-header";

export default function Products() {
  return (
    <div className="bg-white p-6 rounded-2xl">
      <ProductsTableHeader />
      <ProductsTable />
    </div>
  );
}
