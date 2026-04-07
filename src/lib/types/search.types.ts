/**
 * Search feature types.
 */

/** Product shape for search results and list items */
export interface Product {
  _id: string;
  slug: string;
  title: string;
  imgCover: string;
  price: number;
  priceAfterDiscount?: number;
  rateAvg: number;
  rateCount: number;
  quantity: number;
}

/** API response for product search / list */
export interface SearchResponse {
  products: Product[];
  nextPage: number | null;
}

/** Params for getProducts / fetchSearchProducts */
export interface SearchProductsParams {
  page: number;
  limit: number;
  keyword?: string;
}

// Backward compatibility
export type SearchProduct = Product;
export type SearchProductsResponse = SearchResponse;
