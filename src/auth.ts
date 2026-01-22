import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/api.constance";
import type { LoginResponse } from "./lib/types/auth.type";

export const authOptions: NextAuthOptions = {

    pages: {
        signIn: "/login",
        error: "/login",
    },

    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },

            authorize: async (credentials) => {
                const response = await fetch(`${process.env.API_URL}/auth/signin`, {
                    method: "POST",
                    headers: JSON_HEADER,
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                });

                const payload: ApiResponse<LoginResponse> = await response.json();

                if (!response.ok || "error" in payload) {
                    throw new Error(
                        "error" in payload ? payload.error : "Authentication failed"
                    );
                }

                return {
                    id: payload.user._id,
                    ...payload.user,
                    accessToken: payload.token,
                };
            },
        }),
    ],

    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.user = {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                };
            }
            return token;
        },

        session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user = token.user;
            return session;
        },


    },
};
