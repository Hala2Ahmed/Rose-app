
import { useQueryClient } from "@tanstack/react-query"; 
import { toast } from "sonner"; 
const WISHLIST_KEY = "guest_wishlist"; 
// Key used in localStorage for guest wishlist
// Helper function to get wishlist from localStorage
function getGuestWishlist(): string[] { 
  if (typeof window === "undefined") return []; 
  // Prevents SSR errors (window is not defined on server)

  try { 
    const data = localStorage.getItem(WISHLIST_KEY); 
    return data ? JSON.parse(data) : []; 
    // Parse JSON or return empty array if not found
  } catch { 
    return []; 
    // Return empty array if parsing fails
  } 
} 

// Helper function to save wishlist to localStorage
function setGuestWishlist(wishlist: string[]) { 
  if (typeof window === "undefined") return; 
  // Prevents SSR errors
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)); 
} 

// Custom hook to manage guest wishlist
export function useWishlist() { 
  const queryClient = useQueryClient(); 
  // Get React Query client to update cached product data
  // Optimistic update: immediately update product cache
  const optimisticUpdate = (productId: string, value: boolean) => { 
    queryClient.setQueriesData( 
      { queryKey: ["products"], exact: false }, 
      (old: any) => { 
        if (!old) return old; 
        // Map through products and update isInWishlist for target product
        return { 
          ...old, 
          products: old.products.map((p: any) => 
            p._id === productId ? { ...p, isInWishlist: value } : p, 
          ), 
        }; 
      }, 
    ); 
  }; 

  // Toggle product in guest wishlist
  const toggleWishlist = (productId: string) => { 
    const wishlist = getGuestWishlist(); 
    const isInWishlist = wishlist.includes(productId); 

    if (isInWishlist) { 
      // Remove from wishlist
      const newWishlist = wishlist.filter((id) => id !== productId); 
      setGuestWishlist(newWishlist); 
      optimisticUpdate(productId, false); 
      toast("Removed from wishlist", { 
        description: "Your wishlist is saved locally", 
      }); 
    } else { 
      // Add to wishlist
      wishlist.push(productId); 
      setGuestWishlist(wishlist); 
      optimisticUpdate(productId, true); 
      toast("Saved for later ", { 
        description: "Your wishlist is saved locally", 
      }); 
    } 
  }; 

  return { toggleWishlist, getGuestWishlist }; 
  // Expose functions to use in components
}
