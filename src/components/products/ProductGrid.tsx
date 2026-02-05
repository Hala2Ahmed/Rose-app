"use client"; 
import { useRouter, useSearchParams } from "next/navigation"; 
import BestSellingCard from "@/app/[locale]/(site)/(homepage)/_components/best-selling/best-selling-card"; 
import ProductCardSkeleton from "@/components/skeletons/product-card.skeleton"; 
import { AppPagination } from "@/components/ui/pagination"; 
import { useProducts } from "@/hooks/useProducts"; 
import { useWishlist } from "@/hooks/useWishlist"; 
// Props for the ProductGrid component

interface Props { 
  initialPage: number; // initial page number from SSR or default
  initialData: any;    // initial product data (optional SSR)
}
export default function ProductGrid({ initialPage, initialData }: Props) { 
  const router = useRouter(); 
  const searchParams = useSearchParams(); 
  const { toggleWishlist } = useWishlist(); 
  // Get wishlist toggle function from hook

  // Determine current page from URL or fallback to initialPage
  const page = Number(searchParams.get("page") ?? initialPage); 

  // Extract filters from URL query params (excluding "page")
  const filters = Object.fromEntries( 
    [...searchParams.entries()].filter(([k]) => k !== "page"), 
  ); 

  // Fetch products using the custom hook
  const { data, isLoading, isFetching, error } = useProducts({ 
    page, 
    filters, 
    initialData, 
  }); 

  const products = data?.products ?? []; 
  const totalPages = data?.metadata?.totalPages ?? 1; 
  // Fallback to 1 page if metadata is missing

  // Handle pagination click
  const handlePageChange = (p: number) => { 
    const params = new URLSearchParams(searchParams.toString()); 
    params.set("page", String(p)); 
    router.push(`?${params.toString()}`); 
    // Update URL with new page while keeping filters
  }; 

  // Show error message if fetching fails
  if (error) { 
    return <p className="text-center text-red-500">Failed to load products</p>; 
  } 

  return ( 
    <div className="space-y-10"> 
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> 
        {isLoading 
          ? Array.from({ length: 12 }).map((_, i) => ( 
              <ProductCardSkeleton key={i} /> 
              // Show skeleton loaders while initial load
            )) 
          : products.map((product) => ( 
              <BestSellingCard 
                key={product._id} 
                data={product} 
                onWishlistToggle={(id) => toggleWishlist(id)} 
                // Toggle wishlist when heart icon clicked
              /> 
            ))} 
      </div> 

      {/* Pagination */}
      {totalPages > 1 && ( 
        <div className="flex justify-center"> 
          <AppPagination 
            page={page} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          /> 
        </div> 
      )} 

      {/* Show loading skeletons for background fetching (isFetching) */}
      {isFetching && !isLoading && ( 
        <div className="grid grid-cols-3 gap-6 opacity-60"> 
          {Array.from({ length: 4 }).map((_, i) => ( 
            <ProductCardSkeleton key={i} /> 
            // Partial skeletons for smooth UX during page/filter changes
          ))} 
        </div> 
      )} 
    </div> 
  ); 
}
