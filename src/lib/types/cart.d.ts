export type CartItem = {
  _id?: string;
  product: ProductDetails;
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
};

export type CartResponse = {
  message: string;
  numOfCartItems: number;
  cart: Cart;
};
