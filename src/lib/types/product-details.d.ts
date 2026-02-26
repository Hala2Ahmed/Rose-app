export type ProductDetails = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  sold: number;
  rateAvg: number;
  rateCount: number;
  isInWishlist: boolean;
  category: sting,
};
