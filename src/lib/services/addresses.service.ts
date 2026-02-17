import type { AddressesPayload } from "@/lib/types/address";

export async function getAddresses(): Promise<
  AddressesPayload["addresses"]
> {
  const res = await fetch("/api/addresses", {
    cache: "no-store",
  });

  const payload: ApiResponse<AddressesPayload> =
    await res.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.addresses ?? [];
}