"use client";

import { cn } from "@/lib/utils/tailwind-merge";
import { useTranslations, useLocale } from "next-intl";
import { PhoneIcon, MoveRight, MoveLeft } from "lucide-react";
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DialogCom from "./dialog-component";
import useAddresses from "../../../../../hooks/shared/use-addresses";
import ShippingAddressSkeleton from "@/components/skeletons/address-skeleton";

//Types
interface ShippingAddressStepProps {
  selectedAddress: string;
  setSelectedAddress: (address: string) => void;
  onNext: () => void;
}

const ShippingAddressStep: React.FC<ShippingAddressStepProps> = ({
  selectedAddress,
  setSelectedAddress,
  onNext,
}) => {

  //Translation
  const t = useTranslations("cart.address");
  const locale = useLocale();
  const isRTL = locale === "ar";

  //Hooks
  const { addresses, isLoading, error } = useAddresses();

  // Auto select first address
  useEffect(() => {
    if (addresses?.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0]._id);
    }
  }, [addresses, selectedAddress, setSelectedAddress]);

  // Handle Next Click
  const handleNext = () => {
  if (!selectedAddress) return;

  const selected = addresses.find(addr => addr._id === selectedAddress);
  if (!selected) return;

  localStorage.setItem("selectedAddress", JSON.stringify(selected));

  onNext();
};

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">{t("title")}</h1>

      {/*  Loading */}
      {isLoading && <ShippingAddressSkeleton />}

      {/*  Error */}
      {!isLoading && error && (
        <p className="text-red-500 text-lg mb-4">
          {t("error") || "Failed to load addresses"}
        </p>
      )}

      {/*  Empty */}
      {!isLoading && !error && addresses?.length === 0 && (
        <p className="text-zinc-500 text-lg mb-4">
          {t("empty") || "No saved addresses found"}
        </p>
      )}

      {/* Addresses */}
      {!isLoading && !error && addresses?.length > 0 && (
        <div className="space-y-3 mb-3 max-h-[320px] overflow-y-auto scrollbar-hide">
          {addresses.map((address) => {
            const isSelected = selectedAddress === address._id;

            return (
              <Card
                key={address._id}
                onClick={() => setSelectedAddress(address._id)}
                className={cn(
                  "relative cursor-pointer transition-all",
                  isSelected
                    ? "bg-maroon-600 text-zinc-50 border-maroon-600 dark:bg-softPink-200 dark:border-softPink-200 dark:text-zinc-800"
                    : "border-zinc-300 text-zinc-800 hover:bg-zinc-50 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:border-zinc-700 dark:text-zinc-50",
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-semibold">{address.city}</h3>

                    <div className="flex items-center gap-1.5">
                      <div
                        className={cn(
                          "rounded-full w-8 h-8 p-1.5",
                          isSelected
                            ? "bg-zinc-50 text-maroon-600 "
                            : "bg-maroon-600 text-zinc-50 dark:bg-softPink-200 dark:text-zinc-800",
                        )}
                      >
                        <PhoneIcon size={20} />
                      </div>

                      <span
                        className={cn(
                          "text-lg",
                          isSelected ? "text-zinc-50 dark:text-zinc-800" : "text-zinc-500 dark:text-zinc-50",
                        )}
                      >
                        {address.phone}
                      </span>
                    </div>
                  </div>

                  <p
                    className={cn(
                      "w-fit px-3 rounded-full",
                      isSelected
                        ? "text-zinc-50 bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-800"
                        : "text-zinc-800 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-50",
                    )}
                  >
                    {address.street}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* OR */}
      <div className="my-3 flex items-center justify-center">
        <Separator className="w-full max-w-xs" />
        <span className="mx-2.5 text-zinc-500 text-lg font-semibold dark:text-zinc-100">OR</span>
        <Separator className="w-full max-w-xs dark:text-zinc-100" />
      </div>

      {/* Add new address */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="w-full mb-12">
            {t("add")}
          </Button>
        </DialogTrigger>
        <DialogCom />
      </Dialog>

      {/* Next */}
      <div className="text-end">
        <Button
          onClick={handleNext}
          disabled={!selectedAddress}
          className="w-40"
        >
          {t("next")}
          {!isRTL && <MoveRight size={20} />}
          {isRTL && <MoveLeft size={20} />}
        </Button>
      </div>
    </div>
  );
};

export default ShippingAddressStep;
