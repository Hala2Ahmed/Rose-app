export type CartItem = {
  product: ProductDetails;
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  addToCart: (product: ProductDetails, quantity?: number) => Promise<void>;
};

type AddToCartBody = {
  product: string;
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
