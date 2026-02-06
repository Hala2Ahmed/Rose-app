import ProductGrid from "@/components/products/ProductGrid";
import { ProductsResponse } from "@/lib/types/products";
import { getProducts } from "../(homepage)/_services/products.service";
interface PageProps {
  searchParams?: Record<string, string | string[]>;
}

export const revalidate = 0;
// No caching for SSR, ensures fresh data on every request

export default async function ProductsPage({ searchParams }: PageProps) {
  // Default page number from searchParams or fallback to 1
  const initialPage = Number(searchParams?.page ?? 1);

  // Extract filters from searchParams, ignoring "page"
  const filters: Record<string, any> = {};
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== "page") {
        filters[key] = Array.isArray(value) ? value[0] : value;
        // If value is an array, take the first element
      }
    });
  }

  // Fetch initial data from the server for SSR
  let initialData: ProductsResponse | null = null;
  try {
    initialData = await getProducts(initialPage, 12, filters);
    // Fetch 12 products for the current page with filters
  } catch (err) {
    console.error("Failed to fetch products:", err);
    // Log error, but allow page to render without crashing
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page title */}
      <ProductGrid
        initialPage={initialPage}
        initialData={initialData}
        // Pass initial data and page to ProductGrid for client-side rendering
      />
    </div>
  );
}
