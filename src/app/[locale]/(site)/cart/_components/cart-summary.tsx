"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Ticket, MoveRight, MoveLeft } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";
import { useCartQuery } from "@/hooks/use-cart";

export default function CartSummary() {
  //Translation
  const t = useTranslations("cart.summary");
  const locale = useLocale();
  const isRTL = locale === "ar";

  //Hooks
  const router = useRouter();
  const { data: session } = useSession();

  const { data: cart } = useCartQuery();

  //State
  const total = cart?.totalPrice || 0;
  const isAuthenticated = !!session;
  const isCheckoutDisabled = total === 0 || !isAuthenticated;

  //Function
  const handleCheckout = () => {
    if (isCheckoutDisabled) {
      router.push("/login");
      return;
    }

    router.push("/checkout");
  };

  return (
    <div className="w-full sm:w-[29rem]" dir={isRTL ? "rtl" : "ltr"}>
      {/* Title */}
      <h2 className="text-3xl font-semibold mb-6">{t("title")}</h2>

      {/* Summary Card */}
      <Card className="rounded-2xl border-none bg-zinc-50 dark:bg-zinc-700">
        {/* Coupon Code Section */}
        <CardContent className="p-4 space-y-2.5">
          <div className="flex gap-2.5">
            <Input className="h-12 dark:bg-zinc-600" placeholder={t("coupon-placeholder")} />
            <Button className="h-12">
              <Ticket size={20} />
              {t("apply")}
            </Button>
          </div>

          <div className="h-64 rounded-lg border flex items-center justify-center text-zinc-400 italic">
            {t("no-coupons")}
          </div>

          {/* Total Price */}
          <div className="flex items-center justify-between text-zinc-800 text-2xl font-bold dark:text-zinc-100">
            <span>{t("total")}</span>
            <span>
              {total.toFixed(2)} {t("currency")}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Checkout Button */}
      <Button
        className="w-full h-16 mt-6 gap-2.5 text-xl"
        onClick={handleCheckout}
        disabled={isCheckoutDisabled}
      >
        {t("checkout")}
        {!isRTL && <MoveRight size={24} />}
        {isRTL && <MoveLeft size={24} />}
      </Button>
    </div>
  );
}
