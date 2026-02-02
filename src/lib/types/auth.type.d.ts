import { DefaultSession } from "next-auth";
import z from "zod";
import { registerSchema } from "../schemes/auth.schema";
import {
  emailStepSchema,
  resetPasswordStepSchema,
} from "../schemes/auth.schema";

export type RegisterFields = z.infer<ReturnType<typeof registerSchema>>;

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      photo: string;
      role: "user" | "admin";
      gender: "male" | "female" | "other";
    };
  }

  interface User {
    token: string;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      photo: string;
      role: "user" | "admin";
      gender: "male" | "female" | "other";
      accessToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    user: Session["user"];
  }
}

export interface LoginResponse {
  token: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    photo: string;
    role: "user" | "admin";
    gender: "male" | "female" | "other";
  };
}

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

// Form fields for the email step
export type EmailStepFields = z.infer<ReturnType<typeof emailStepSchema>>;

// Response returned by the email step API
export type EmailStepResponse = {
  message: string;
  info: string;
};

// Form fields for the reset password step
export type ResetPasswordStepFields = z.infer<
  ReturnType<typeof resetPasswordStepSchema>
>;

// Response returned by the reset password step API
export type ResetPasswordStepResponse = {
  message: string;
  token: string;
};
