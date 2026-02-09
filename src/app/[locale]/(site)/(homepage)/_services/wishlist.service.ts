const BASE_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL!}/wishlist`;

// add product to wishlist
export async function addToWishlist(productId: string, accessToken: string) {
  const response = await fetch(`${BASE_AUTH_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    throw new Error("Failed to add to wishlist");
  }
  const payload = await response.json();
  return payload;
}

// remove product from wishlist
export async function removeFromWishlist(productId: string, accessToken: string) {
  const response = await fetch(`${BASE_AUTH_URL}/${productId}`, {
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
