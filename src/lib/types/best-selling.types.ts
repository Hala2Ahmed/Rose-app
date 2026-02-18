export type BestSellingProduct = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  sold: number;
  rateAvg: number;
  rateCount: number;
};

export type BestSellingResponse = {
  products: BestSellingProduct[];
};

export interface GetBestSellingParams {
  filter?: string;
  occasion?: string;
  limit?: number;
  "price[lte]"?: string | number;
  "price[gte]"?: string | number;
}
