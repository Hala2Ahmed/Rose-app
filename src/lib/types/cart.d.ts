import type { ProductDetails } from "@/lib/types/product-details";

export type CartProduct = Omit<ProductDetails, "isInWishlist"> & {
  id?: string;
  slug: string;
  description: string;
  images: string[];
  sold: number;
  category?: string;
  occasion?: string;
  isSuperAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type GuestCartProduct = Pick<
  ProductDetails,
  "_id" | "title" | "imgCover" | "price" | "priceAfterDiscount" | "rateAvg" | "rateCount" | "quantity"
>;

export type CartItem = {
  _id?: string;
  product: CartProduct | GuestCartProduct;
  price?: number;
  quantity: number;
};

export type Cart = {
  _id?: string;
  user?: string;
  cartItems: CartItem[];
  discount?: number;
  totalPrice: number;
  totalPriceAfterDiscount?: number;
  appliedCoupons?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type CartResponse = {
  message: string;
  numOfCartItems: number;
  cart: Cart;
};

export type UpdaterProps = {
  productId: string;
  stock: number;
  initialQty: number;
};