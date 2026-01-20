import z from "zod";

import { registerSchema } from "../schemes/auth.schema";

export type RegisterFields = z.infer<ReturnType<typeof registerSchema>>;
export type RegisterResponse = {
  token: string;
  //until user of next auth is ready
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    photo: string;
    phone: string;
    wishlist: [];
    addresses: [];
    role: string;
    createdAt: string;
  };
};
