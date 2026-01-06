import { ShoppingCart, Star, StarHalf } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function BestSellingCard() {
  return (
    <article className="w-80">
      <div className="relative h-72 rounded-2xl overflow-hidden">
        <Image
          src={"/assets/images/image1.png"}
          alt="test"
          fill
          className="object-cover"
        />
      </div>

      <h3 className="mt-2 text-maroon-700 text-lg font-medium">Flower Title</h3>

      <div className="flex gap-1 my-1">
        <Star className="w-4 h-4 fill-[#FBA707] text-[#FBA707]" />
        <StarHalf className="w-4 h-4 fill-[#FBA707] text-[#FBA707]" />
      </div>

      <p className="text-maroon-700 font-medium mb-2">
        250 EGP <span className="text-zinc-400 line-through">255 EGP</span>
      </p>

      <button className="bg-maroon-600 hover:bg-maroon-700 transition-colors text-white w-10 h-10 rounded-full flex items-center justify-center">
        <ShoppingCart className="w-5 h-5" />
      </button>
    </article>
  );
}
