"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/tailwind-merge";
import { ProductDetails } from "@/lib/types/product-details";

export default function ProductGallery({
  images,
  imgCover,
  _id,
}: Pick<ProductDetails, "images" | "imgCover" | "_id">) {
  const [active, setActive] = useState(imgCover);

  return (
    <div className="grid gap-2.5 max-h-[32.6875rem]">
      {/* Main Image */}
      <Image
        src={active}
        alt="Product image"
        width={605}
        height={402}
        className="object-cover transition duration-300 rounded-xl max-w-[37.8125rem] max-h-[25.125rem]"
      />

      {/* Thumbnails */}
      <div className="grid grid-cols-6 gap-x-2.5">
        {images.map((img, i) => (
          <button
            key={"thumbnail-" + _id + img}
            onClick={() => setActive(img)}
            className={cn(
              "relative cursor-pointer rounded-md overflow-hidden",
              "before:absolute before:inset-0 before:bg-black/30 before:transition-colors before:duration-200",
              "hover:before:bg-black/10",
              (active === img || (active === imgCover && i === 0)) &&
                "ring-2 rounded-md ring-maroon-600 dark:ring-softPink-400 before:bg-black/10 max-w-[5.6875rem] max-h-[6.9375rem]",
            )}
          >
            <Image
              src={img}
              alt={"Thumbnail product image"}
              width={91}
              height={111}
              className="object-cover rounded-md max-w-[5.6875rem] max-h-[6.9375rem]"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
