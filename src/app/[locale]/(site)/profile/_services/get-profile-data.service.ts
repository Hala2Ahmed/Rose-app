import { UpdateProfileResponse } from "@/lib/types/auth.type";

export async function getProfileService(): Promise<
  ApiResponse<UpdateProfileResponse>
> {
  const response = await fetch(`/api/profile-data`);
  return response.json();
}
