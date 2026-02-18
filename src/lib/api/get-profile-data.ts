import { getProfileService } from "@/app/[locale]/(site)/profile/_services/get-profile-data.service";

export async function getProfileDataFromServer() {
  try {
    const data = await getProfileService();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error || "failed to fetch user data",
      data: [],
    };
  }
}
