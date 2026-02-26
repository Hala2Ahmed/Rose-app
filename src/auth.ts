import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/api.constance";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login",
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
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),

          headers: JSON_HEADER,
        });

        const payload: ApiResponse<User> = await response.json();
        if (!response.ok || "error" in payload) {
          throw new Error(
            "error" in payload ? payload.error : "Authentication failed",
          );
        }

        return {
          id: payload.user._id,
          token: payload.token,
          user: payload.user,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = (user as any).token;
        token.user = (user as any).user;
      }
      if (trigger === "update" && session) {
        token.user = {
          ...token.user,
          ...session.user,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = token.user as any;
      return session;
    },
  },
};
