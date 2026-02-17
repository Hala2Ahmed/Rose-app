//Address types
export type Address = {
  _id: string;
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
};

export type AddressesPayload = {
  addresses: Address[];
};

//Cash checkout types
export type CreateCashOrderPayload = {
  shippingAddress: Omit<Address, "_id" | "username">;
  clientToken?: string;
};

export type CreateCashOrderResponse = {
  message: string;
};

//Card checkout types
export type CreateCardOrderPayload = {
  shippingAddress: Omit<Address, "_id" | "username">;
  clientToken?: string;
};

export type StripeCheckoutSession = {
  id: string;
  url: string;
  payment_status: string;
  status: string;
  success_url: string;
  cancel_url: string;
};

export type CreateCardOrderResponse = {
  message: string;
  session: StripeCheckoutSession;
};
