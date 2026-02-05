"use client"; 
import { ShoppingCart, HeartPlus, HeartMinus } from "lucide-react"; 
import Image from "next/image"; 
import React from "react"; 
import { BestSellingProduct } from "@/lib/types/best-selling.types"; 
import { renderStars } from "@/lib/utils/render-stars"; 

// Props for the BestSellingCard component
type BestSellingCardProps = { 
  data: BestSellingProduct; // Product data
  onWishlistToggle?: (productId: string) => void; // Optional callback to add/remove from wishlist
};

// BestSellingCard component
export default function BestSellingCard({ 
  data, 
  onWishlistToggle, 
}: BestSellingCardProps) { 
  return ( 
    <article className="w-full relative group">
      <div className="relative h-72 rounded-2xl overflow-hidden">
        <Image 
          src={data.imgCover} // Product image URL
          alt={data.title} // Alt text for accessibility
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,..." 
          quality={85} 
          className="object-cover" 
        /> 

        {/* Wishlist button  */}
        {onWishlistToggle && ( 
          <button 
            onClick={() => onWishlistToggle(data._id)} 
            // Call the toggle function with product ID
            className={`group absolute top-4 left-4 h-9 rounded-full flex items-center gap-2 overflow-hidden 
              transition-all duration-300 ease-in-out 
              ${data.isInWishlist ? "bg-black text-white" : "bg-white/90 text-maroon-600 hover:bg-white"} 
              w-9 hover:w-44`} 
            // Styles: expands width on hover and changes color based on wishlist status
          > 
            <span className="w-9 h-9 flex items-center justify-center shrink-0"> 
              {/* Icon container */}
              {data.isInWishlist ? ( 
                <HeartMinus className="w-5 h-5" /> // Icon for removing from wishlist
              ) : ( 
                <HeartPlus className="w-5 h-5" /> // Icon for adding to wishlist
              )} 
            </span> 

            <span 
              className="whitespace-nowrap text-xs font-medium opacity-0 translate-x-2 
                transition-all duration-300 
                group-hover:opacity-100 group-hover:translate-x-0" 
            > 
              {/* Text appears on hover */}
              {data.isInWishlist ? "Remove from wishlist" : "Add to wishlist"} 
            </span> 
          </button> 
        )} 

        {/* Out of stock badge */}
        {data.quantity <= 0 && ( 
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium"> 
            OUT OF STOCK 
          </div> 
        )} 
      </div> 

      {/* Product title */}
      <h3 className="mt-2 text-maroon-700 text-lg font-medium line-clamp-2"> 
        {data.title.split(" ").slice(0, 4).join(" ")} 
        {/* Show only the first 4 words to prevent overflow */}
      </h3> 

      {/* Price, rating, and add to cart */}
      <div className="flex items-center justify-between"> 
        <div> 
          {/* Star rating */}
          <div className="flex gap-1 my-1">{renderStars(data.rateAvg)}</div> 

          {/* Price display */}
          <p className="text-maroon-700 font-medium mb-2"> 
            {data.priceAfterDiscount && data.priceAfterDiscount < data.price ? ( 
              <> 
                {data.priceAfterDiscount.toFixed(2)} EGP{" "} 
                <span className="text-zinc-400 line-through"> 
                  {data.price.toFixed(2)} EGP 
                </span> 
              </> 
            ) : ( 
              `${data.price.toFixed(2)} EGP` 
            )} 
          </p> 
        </div> 

        {/* Add to cart button */}
        <button 
          disabled={data.quantity <= 0} 
          // Disabled if out of stock
          className="bg-maroon-600 hover:bg-maroon-700 transition-colors text-white w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed" 
        > 
          <ShoppingCart className="w-5 h-5" /> 
        </button> 
      </div> 
    </article> 
  ); 
}
