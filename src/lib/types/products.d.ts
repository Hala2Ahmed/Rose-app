export type Product = {
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
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  sold: number;
  rateAvg: number;
  rateCount: number;
  favoriteId: string;
  isInWishlist: boolean;
};

export type Products = {
  products: Product[];
};

export type ProductsResponse = PaginationData<Products>;

export type DeleteProductResponse = {
  message: string;
  product: Product;
};