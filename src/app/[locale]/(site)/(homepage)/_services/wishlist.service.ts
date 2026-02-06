const API_URL = "https://flower.elevateegy.com/api/v1";

// add product to wishlist
export async function addToWishlist(productId: string, accessToken: string) {
  const response = await fetch(`${API_URL}/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      productId,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to add to wishlist");
  }
  const payload = await response.json();

  return payload;
}

// remove product from wishlist
export async function removeFromWishlist(
  productId: string,
  accessToken: string,
) {
  const response = await fetch(`${API_URL}/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to remove from wishlist");
  }
  const payload = await response.json();
  return payload;
}
