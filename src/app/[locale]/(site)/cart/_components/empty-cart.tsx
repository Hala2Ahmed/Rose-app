import React from "react";
import Image from "next/image";
import CartHeader from "./cart-header";
import { useTranslations } from "next-intl";

export default function EmptyCart() {
     //Translation
    const t=useTranslations("cart")

  return (
    <div className="flex flex-col gap-8 mb-12">
      <CartHeader cartLength={0} disabled={true} />

      <div className="border border-zinc-200 rounded-xl flex flex-col items-center justify-center py-20">
        <Image
          src="/assets/images/empty-cart.png"
          alt="Empty cart"
          width={250}
          height={214}
          className="mb-4"
        />
        <p className="text-zinc-400 text-lg">
          {t('cart-empty')}
        </p>
      </div>
    </div>
  );
}
