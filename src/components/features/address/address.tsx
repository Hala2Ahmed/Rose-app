"use client";

import { DeleteAddressDialog } from "@/components/shared/confirmation-dialog";
import type { Address, AddressOperations } from "@/lib/types/addresses";
import { ADDRESS_OPERATIONS } from "@/lib/constants/address.constants";
import useDeleteAddress from "@/hooks/addresses/use-delete-address";
import { MapPin, PenLine, Phone, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type AddressProps = {
    address: Address,
    setOperationStep: Dispatch<SetStateAction<AddressOperations>>;
    setAddressId: Dispatch<SetStateAction<string>>;
}

export default function Address({ address, setOperationStep, setAddressId }: AddressProps) {
    // states 
    const [open, setOpen] = useState(false);

    // mutation 
    const { deleteAddress, isPending } = useDeleteAddress();

    // Translation
    const t = useTranslations("address");
    console.log(t("add-address-title"));

    // Functions
    function confirmDeleteAddress() {
        deleteAddress(address._id, {
            onSuccess: () => {
                setOpen(false);
                toast.success(t("success-delete"))
            },
            onError: () => {
                toast.error(t("error"))
            }
        })
    }

    return (
        <div
            className="flex flex-col gap-4 rounded-md border ps-4 pe-7 pb-5 relative transition-colors duration-300 border-zinc-300 hover:border-maroon-600">
            {/* Street */}
            <div className="font-semibold text-2xl leading-100 text-maroon-600
            bg-white dark:bg-zinc-900 p-2.5 absolute top-0 -translate-y-1/2">
                {address.street}
            </div>

            {/* Info */}
            <div className="flex justify-between mt-6">
                {/* City */}
                <div className="flex gap-2.5">
                    <span className="flex flex-col justify-center items-center w-8 h-8 rounded-full bg-emerald-500">
                        <MapPin className="text-4xl text-white" />
                    </span>
                    <span className="font-semibold text-2xl leading-100">{address.city}</span>
                </div>

                {/* Phone */}
                <div className="flex gap-2.5">
                    <Phone />
                    <span className="font-medium text-lg leading-100 text-zinc-600">{address.phone}</span>
                </div>
            </div>

            {/* address */}
            <div className="w-fit font-medium text-base leading-100 text-zinc-800 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800 rounded-full py-1 px-3">
                {t.rich("address-format", {
                    username: address.username,
                    street: address.street,
                    city: address.city,
                })}
            </div>

            {/*Mutation operations */}
            <div className="flex flex-col gap-1.5 mt-6 absolute ltr:right-0 ltr:translate-x-1/2
                            rtl:left-0  rtl:-translate-x-1/2">
                {/*Update address */}
                <span
                    onClick={() => {
                        setOperationStep(ADDRESS_OPERATIONS.UPDATE)
                        setAddressId(address._id);
                    }}
                    className="flex flex-col items-center justify-center w-9 h-9 rounded-full border
                            border-zinc-400 cursor-pointer bg-white dark:bg-zinc-800"
                >
                    <PenLine
                        width={"1.125rem"}
                        height={"1.125rem"}
                    />
                </span>

                {/* Delete address */}
                <DeleteAddressDialog
                    onConfirm={confirmDeleteAddress}
                    category={t("address")}
                    isPending={isPending}
                    open={open}
                    setOpen={setOpen}
                    trigger={
                        <span
                            className="flex flex-col items-center justify-center w-9 h-9 
                            rounded-full border border-red-600 bg-red-600 cursor-pointer"
                        >
                            <Trash2
                                width={"1.125rem"}
                                height={"1.125rem"}
                                className="text-white"
                            />
                        </span>
                    }
                />
            </div>
        </div>
    )
}
