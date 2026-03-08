export type RecommendedProduct = {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  priceAfterDiscount: number;
  rateAvg: number;
  rateCount: number;
  id: string;
};

export type RecommendationsResponse = {
  message: string;
  count: number;
  recommendations: RecommendedProduct[];
};