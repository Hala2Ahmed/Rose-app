import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Orders } from "@/lib/types";

// fetch all orders 
export async function allOrdersService() {
  // get token 
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      cache: "no-store",
      headers: {
        ...(token && {Authorization: `Bearer ${token}`})
      },
    }
  );
  const data: Orders[] = await response.json();
  return data;
}
