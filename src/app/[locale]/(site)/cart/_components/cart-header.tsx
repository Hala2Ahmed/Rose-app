"use client";

import { Button } from "@/components/ui/button";
import { BrushCleaning } from "lucide-react";
import React from "react";
import { useClearCart } from "../hooks/use-clear-cart";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function CartHeader({
  cartLength,
  disabled,
}: {
  cartLength: number;
  disabled?: boolean;
}) {
  //Translation
  const t = useTranslations("cart");

  // Hooks
  const { data: session } = useSession();
  const clearCart = useClearCart(!!session?.user);

  return (
    <div className="flex justify-between items-center pb-5 max-w-[782px] w-full">
      <h2 className="font-bold text-5xl text-zinc-800 dark:text-softPink-200">
        {t("cart-header")}{" "}
        <span className="font-medium text-base text-zinc-400">
          {cartLength} {t("products-count")}
        </span>
      </h2>

      <Button
        onClick={() => clearCart.mutate()}
        disabled={disabled || clearCart.isPending}
        variant="secondary"
        className="ms-32"
      >
        <BrushCleaning className="size-5" />
        {clearCart.isPending
          ? t("clean-cart-btn-loading")
          : t("clean-cart-btn")}
      </Button>
    </div>
  );
}
