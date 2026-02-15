"use server";

import { getServerSession } from "next-auth";
import { getToken } from "../utils/manage-token";
import { authOptions } from "@/auth";
import { RecommendationsResponse } from "../types/recommendations";

export async function fetchRecommendations() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user?._id) {
      console.warn("No session or userId found");
      return null;
    }

    const token = await getToken();

    if (!token || !token?.accessToken) {
      console.warn("No access token found");
      return null;
    }

    const userId = session.user._id;

    if (!process.env.API_URL) {
      console.error("NEXT_PUBLIC_API_URL is not defined");
      return null;
    }

    const res = await fetch(
      `${process.env.API_URL}/related/recommendations/${userId}`,
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
      console.error("API Error:", payload.error);
      return null;
    }

    return payload;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return null;
  }
}
