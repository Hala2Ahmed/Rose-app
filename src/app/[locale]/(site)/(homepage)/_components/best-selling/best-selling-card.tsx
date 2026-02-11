"use client";

import { useState } from "react";
import { ShoppingCart, HeartPlus, HeartMinus } from "lucide-react";
import Image from "next/image";
import { BestSellingProduct } from "@/lib/types/best-selling.types";
import { renderStars } from "@/lib/utils/render-stars";

type BestSellingCardProps = {
  data: BestSellingProduct;
  onWishlistToggle?: () => void;
  isInWishlist?: boolean;
  onCartToggle?: () => void;
  isInCart?: boolean;
};

export default function BestSellingCard({
  data,
  onWishlistToggle,
  isInWishlist = false,
}: BestSellingCardProps) {
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    if (!onWishlistToggle || isToggling) return;
    setIsToggling(true);
    try {
      await onWishlistToggle();
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <article className="w-full relative group">
      <div className="relative h-72 rounded-2xl overflow-hidden">
        <Image
          src={data.imgCover}
          alt={data.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,..."
          quality={85}
          className="object-cover"
        />

        {onWishlistToggle && (
          <button
            type="button"
            disabled={isToggling}
            onClick={handleToggle}
            className={`group absolute top-4 left-4 h-9 rounded-full flex items-center gap-2 overflow-hidden
              transition-all duration-300 ease-in-out
              ${isInWishlist ? "bg-black text-white" : "bg-white/90 text-maroon-600 hover:bg-white"}
              ${isToggling ? "w-9" : "w-9 hover:w-44"}
              disabled:opacity-70`}
          >
            <span className="w-9 h-9 flex items-center justify-center shrink-0">
              {isInWishlist ? (
                <HeartMinus className="w-5 h-5" />
              ) : (
                <HeartPlus className="w-5 h-5" />
              )}
            </span>

            <span className="whitespace-nowrap text-xs font-medium opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              {isToggling
                ? "Updating..."
                : isInWishlist
                  ? "Remove from wishlist"
                  : "Add to wishlist"}
            </span>
          </button>
        )}

        {data.quantity <= 0 && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            OUT OF STOCK
          </div>
        )}
      </div>

      <h3 className="mt-2 text-maroon-700 text-lg font-medium line-clamp-2">
        {data.title.split(" ").slice(0, 4).join(" ")}
      </h3>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex gap-1 my-1">{renderStars(data.rateAvg)}</div>

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

        <button className="bg-maroon-600 hover:bg-maroon-700 transition-colors text-white w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </article>
  );
}
