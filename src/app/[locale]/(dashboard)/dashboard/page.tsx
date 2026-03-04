import TopSellingProducts from "./_components/top-selling-products";
import LowStockProducts from "./_components/low-stock-products";


export default function Page() {
  return (
    <div className="bg-zinc-50 w-full min-h-screen p-10 md:flex gap-6">
      <TopSellingProducts />
      <LowStockProducts />
    </div>
  );
}