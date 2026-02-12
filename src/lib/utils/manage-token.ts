import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

const cookieName =
  process.env.NODE_ENV === "production"
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";

export async function getToken() {
  const tokenCookie = cookies().get(cookieName)?.value;

  try {
    const jwt = await decode({
      token: tokenCookie,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    return jwt;
  } catch (error) {
    console.error("Error decoding token", error);
    return null;
  }
}
