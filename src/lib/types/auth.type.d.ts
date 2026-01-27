import { DefaultSession } from "next-auth";

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
        }
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








