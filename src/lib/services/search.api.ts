import { getProducts as fetchProducts } from "@/app/[locale]/(site)/(homepage)/_services/products.service";
import type {
  SearchProduct,
  SearchProductsResponse,
} from "@/lib/types/search.types";

/** Fetches a page of products for search/suggestions. Maps API response to SearchProductsResponse. */
export async function getProducts(
  page: number,
  limit: number,
  keyword?: string
): Promise<SearchProductsResponse> {
  const filters: Record<string, string> = {};
  if (keyword) filters.keyword = keyword;

  const payload = await fetchProducts(page, limit, filters);
  const products = (payload.products ?? []) as SearchProduct[];
  const { currentPage = 1, totalPages = 1 } = payload.metadata ?? {};
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return { products, nextPage };
}
