//TODO: Remove test component
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { renderStars } from "@/lib/utils/render-stars";
import { Product } from "@/lib/types/products";

type BestSellingCardProps = {
    data: Product;
};

export default function RelatedProductCard({ data }: BestSellingCardProps) {
    return (
        <article className="w-full relative">
            <div className="relative h-72 rounded-2xl overflow-hidden">
                <Image
                    src={data.imgCover}
                    alt={data.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJiIj48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iNDc1IiBmaWx0ZXI9InVybCgjYikiIGZpbGw9IiNjY2MiLz48L3N2Zz4="
                    placeholder="blur"
                    quality={85}
                    className="object-cover"
                />

                {/* Out Of stock state */}
                {data.quantity <= 0 && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        OUT OF STOCK
                    </div>
                )}

            </div>
            <h3 className="mt-2 text-maroon-700 text-lg font-medium">
                {data.title.split(" ").slice(0, 4).join(" ")}
            </h3>
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex gap-1 my-1">{renderStars(data.rateAvg)}</div>

                    {/* {Product has a discount} */}

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

                {/* {Add to cart button} */}

                <button className="bg-maroon-600 hover:bg-maroon-700 transition-colors text-white w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                    <ShoppingCart className="w-5 h-5" />
                </button>
            </div>
        </article>
    );
}
