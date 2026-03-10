import { CartItem } from "@/lib/types/cart";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function CartProductDetails({item}:{item:CartItem}) {
  //Translation
  const t = useTranslations("product");

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-maroon-700 text-lg font-semibold dark:text-softPink-200">
          {item.product?.title}
        </h2>
        <div className="flex gap-1 mt-1">
          <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
          {item.product?.rateAvg > 0 ? (
            <span className="text-sm text-zinc-700">
              <span className="font-medium">
               {t('rating')} {item.product?.rateAvg.toFixed(1)}/5
              </span>{" "}
              <span className="font-medium text-blue-600">
                ({item.product?.rateCount} {t("rate-count")} )
              </span>
            </span>
          ) : (
            <span className="text-sm text-zinc-400">{t("no-ratings-yet")}</span>
          )}
        </div>
      </div>

      <div>
        <p className="text-2xl font-bold">
          <span className="text-sm font-medium text-maroon-600 dark:text-softPink-200">
            (x{item.quantity})
          </span>{" "}
          {(item.product?.priceAfterDiscount &&
          item.product?.priceAfterDiscount > 0
            ? item.product.priceAfterDiscount
            : item.product?.price
          )?.toFixed(2)}{" "}
          <span className="text-sm font-medium text-zinc-800">EGP</span>
        </p>
      </div>
    </div>
  );
}
