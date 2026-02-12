"use server";

import { getServerSession } from "next-auth";
import { getToken } from "../utils/manage-token";
import { authOptions } from "@/auth";
import { RecommendationsResponse } from "../types/recommendations";

export async function fetchRecommendations() {
  const session = await getServerSession(authOptions);

  const token = await getToken();

  if (!token || !token?.accessToken) {
    return null;
  }

  const userId = session?.user._id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/related/recommendations/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
    },
  );

  const payload: ApiResponse<RecommendationsResponse> = await res.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }
  return payload;
}
