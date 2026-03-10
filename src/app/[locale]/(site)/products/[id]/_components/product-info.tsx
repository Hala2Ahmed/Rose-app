import { Badge } from "@/components/ui/badge";
import { ProductDetails } from "@/lib/types/product-details";
import { HeartPlus, Package, Star } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import React from "react";
import ProductGallery from "./product-gallery";
import { Button } from "@/components/ui/button";
import AddToCartButton from "./add-to-cart-btn";

export default function ProductInfo({ product }: { product: ProductDetails }) {
  //Translation
  const t = useTranslations("product");
  const format = useFormatter();

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 my-8 lg:my-12 overflow-hidden">
      {/* Product images */}
      <div>
        {product?.images && product?.imgCover && (
          <ProductGallery
            images={product.images}
            imgCover={product.imgCover}
            _id={product._id}
          />
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-col max-h-[32.6875rem]">
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-800 pb-2 dark:text-white">
          {product.title}
        </h1>
        {/* Price */}
        <div className="flex flex-wrap gap-2 border-b border-zinc-100 dark:text-white mb-4 py-4">
          {product.priceAfterDiscount ? (
            <>
              <span className="text-2xl sm:text-3xl font-bold line-through text-zinc-300 dark:text-white">
                {product.price}
              </span>
              <span className="text-2xl sm:text-3xl font-semibold text-zinc-800 dark:text-white">
                {format.number(product.priceAfterDiscount, "currency")}
              </span>
            </>
          ) : (
            <span className="text-2xl sm:text-3xl font-semibold text-zinc-800 dark:text-white">
              {format.number(product.price, "currency")}
            </span>
          )}
          <Badge
            variant={product.quantity > 0 ? "subtle" : "secondary"}
            className="flex items-center gap-1 rounded-full ml-1 sm:ml-3"
          >
            <Package className="w-4 h-4 sm:w-5 sm:h-5" />
            {product.quantity > 0
              ? `${product.quantity} ${t("left-in-stock")}`
              : t("out-stock")}
          </Badge>
        </div>

        {/* Rate */}
        <div className="flex gap-2 border-b border-zinc-100 mb-4 py-4">
          <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
          {product.rateCount > 0 ? (
            <span className="text-sm text-zinc-700">
              {t("rate")}:{" "}
              <span className="font-medium">
                {product.rateAvg.toFixed(1)}/5
              </span>{" "}
              <span className="font-medium text-blue-600">
                ({product.rateCount} {t("rate-count")})
              </span>
            </span>
          ) : (
            <span className="text-sm text-zinc-400">{t("no-ratings-yet")}</span>
          )}
        </div>

        <p className="text-zinc-600 dark:text-zinc-400 max-w-[37.8125rem] overflow-y-auto cart-scroll mb-4">
          {product.description}
        </p>

        {/* Buttons */}
        <div className="flex gap-2.5 mt-auto">
          <Button variant="ghost" className="bg-zinc-100 text-zinc-800">
            <HeartPlus className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>

          <AddToCartButton product={product!} />
        </div>
      </div>
    </div>
  );
}
