"use client";

import { Dispatch, SetStateAction } from "react";
import useUserAddresses from "@/hooks/addresses/use-user-addresses";
import AddressSkeleton from "@/components/skeletons/user-addresses/address.skeleton";
import Address from "./address";
import type { AddressOperations } from "../../../lib/types/addresses";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ADDRESS_OPERATIONS } from "@/lib/constants/address.constants";
import { useTranslations } from "next-intl";

type UserAddresses = {
    setOperationStep: Dispatch<SetStateAction<AddressOperations>>;
    setAddressId: Dispatch<SetStateAction<string>>;
}

export default function AllAddresses({ setOperationStep, setAddressId }: UserAddresses) {
    //Hooks
    const { addresses, isLoading } = useUserAddresses();

    // Translation
    const t = useTranslations("address");

    return (
        <div className="flex flex-col gap-9">
            <DialogHeader className="flex flex-row justify-between items-center pb-4 border-b border-zinc-200">
                {/* Title */}
                <DialogTitle className="font-bold text-3xl leading-100 text-zinc-800 dark:text-zinc-50">
                    {t("my-addresses")}
                </DialogTitle>

                {/* Add button */}
                <Button
                    variant="secondary"
                    onClick={() => setOperationStep(ADDRESS_OPERATIONS.ADD)}

                >
                    {t("add-address-title")}
                </Button>
            </DialogHeader>

            {/*Addresses */}
            <div className="flex flex-col gap-9">
                {isLoading ? (
                    // Skeleton
                    Array.from({ length: 3 }).map((_, index) => (
                        <AddressSkeleton key={index} />
                    ))
                ) : (
                    // User addresses
                    addresses?.addresses?.slice(-3).map((address) => (
                        <Address
                            setOperationStep={setOperationStep}
                            setAddressId={setAddressId}
                            key={address._id}
                            address={address}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
