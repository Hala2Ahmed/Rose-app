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
  bestSeller: BestSellingProduct[];
};
