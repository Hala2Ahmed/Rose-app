const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* ================= Wishlist API ================= */

export async function addToWishlist(
  productId: string,
  accessToken: string
) {
  const res = await fetch(`${API_URL}/wishlist/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    throw new Error("Failed to add to wishlist");
  }

  return res.json();
}

export async function removeFromWishlist(
  productId: string,
  accessToken: string
) {
  const res = await fetch(`${API_URL}/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to remove from wishlist");
  }

  return true;
}
