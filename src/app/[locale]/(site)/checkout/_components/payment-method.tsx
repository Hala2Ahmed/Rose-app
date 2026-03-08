"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind-merge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTranslations, useLocale } from "next-intl";
import { Address } from "@/lib/types/address";
import { useCreateCashOrder } from "../_hooks/use-create-cash-order";
import { useCreateCardOrder } from "../_hooks/use-create-card-order";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";

//Types
interface PaymentMethod {
  id: "cash" | "card";
  illustration: React.ReactNode;
}

interface PaymentMethodStepProps {
  onBack: () => void;
  onNext: () => void;
}

const PaymentMethodStep: React.FC<PaymentMethodStepProps> = ({ onBack }) => {
  // Translation
  const t = useTranslations("cart.payment");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const router = useRouter();

  // State
  const [selectedPayment, setSelectedPayment] = useState<"cash" | "card" | "">(
    "",
  );

  // React Query mutation
  const { mutate: createCashOrderMutation, isPending } = useCreateCashOrder();
  const { mutate: createCardOrderMutation, isPending: isCardPending } =
    useCreateCardOrder();

  const paymentMethods: PaymentMethod[] = [
    {
      id: "cash",
      illustration: (
        <img
          src="/assets/payment/cash.png"
          alt={t("methods.cash.title")}
          className="w-48 mx-auto dark:brightness-0 dark:invert"
        />
      ),
    },
    {
      id: "card",
      illustration: (
        <img
          src="/assets/payment/credit.png"
          alt={t("methods.card.title")}
          className="w-48 mx-auto dark:brightness-0 dark:invert"
        />
      ),
    },
  ];

  // Checkout handler
  const handleCheckout = () => {
    if (!selectedPayment) return;

    if (selectedPayment === "cash") {
      handleCashCheckout();
    }

    if (selectedPayment === "card") {
      handleCardCheckout();
    }
  };

  // Cash order
  const handleCashCheckout = () => {
    const storedAddress = localStorage.getItem("selectedAddress");
    if (!storedAddress) {
      toast.error("No address selected");
      return;
    }

    const parsedAddress: Address = JSON.parse(storedAddress);
    const { _id, username, ...shippingAddress } = parsedAddress;

    // Optional token from sessionStorage
    const clientToken = sessionStorage.getItem("accessToken") || undefined;

    createCashOrderMutation(
      { shippingAddress, clientToken },
      {
        onSuccess: () => {
          toast.success("Order created successfully!", {
            duration: 2000,
            onAutoClose: () => router.push("/allOrders"),
          });
          localStorage.removeItem("selectedAddress");
        },
        onError: (error: unknown) => {
          if (error instanceof Error) {
            toast.error(`Cash order failed: ${error.message}`, {
              duration: 3000,
            });
          }
        },
      },
    );
  };

  // Card order
  const handleCardCheckout = () => {
    const storedAddress = localStorage.getItem("selectedAddress");

    if (!storedAddress) {
      toast.error("No address selected");
      return;
    }

    const parsedAddress: Address = JSON.parse(storedAddress);
    const { _id, username, ...shippingAddress } = parsedAddress;

    const clientToken = sessionStorage.getItem("accessToken") || undefined;

    createCardOrderMutation(
      { shippingAddress, clientToken },
      {
        onSuccess: (data) => {
          if (data?.session?.url) {
            window.location.href = data.session.url;
          } else {
            toast.error("Stripe session URL not found");
          }
          localStorage.removeItem("selectedAddress");
        },
        onError: (error: unknown) => {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        },
      },
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-7">
        <Button variant="subtle" onClick={onBack} className="border-none">
          {isRTL ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          {t("back")}
        </Button>

        <h1 className="text-3xl font-semibold">{t("title")}</h1>
      </div>

      {/* Payment cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {paymentMethods.map((method) => {
          const isSelected = selectedPayment === method.id;
          return (
            <Card
              key={method.id}
              onClick={() => setSelectedPayment(method.id)}
              className={cn(
                "cursor-pointer transition-all hover:bg-zinc-50 dark:bg-zinc-700 dark:hover:bg-zinc-600",
                isSelected && "bg-zinc-50 dark:bg-zinc-600",
              )}
            >
              <CardContent className="px-8 py-4 text-center space-y-2.5">
                {method.illustration}
                <h3
                  className={cn(
                    "text-2xl font-semibold",
                    isSelected ? "text-maroon-600 dark:text-softPink-300" : "text-zinc-800 dark:text-zinc-50",
                  )}
                >
                  {t(`methods.${method.id}.title`)}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-300">
                  {t(`methods.${method.id}.description`)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Separator className="mb-8" />

      {/* Footer */}
      <div className="flex justify-end">
        <Button
          onClick={handleCheckout}
          disabled={!selectedPayment}
          loading={isPending || isCardPending}
          className="px-8 py-6 flex items-center gap-2"
        >
          {t("checkout")}
          {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodStep;
