"use client";

import { MapPin, PenLine, Phone, Trash2 } from "lucide-react";
import type { Address, AddressOperations } from "@/lib/types/addresses";
import { Dispatch, SetStateAction } from "react";
import { ADDRESS_OPERATIONS } from "../../../lib/constants/address.constants";

type AddressProps = {
    address: Address,
    setOperationStep: Dispatch<SetStateAction<AddressOperations>>;
}

export default function Address({ address, setOperationStep }: AddressProps) {
    return (
        <div className="flex flex-col gap-4 rounded-md border border-zinc-300 ps-4 pe-7 pb-5 relative">
            {/* Street */}

            <div className="font-semibold text-2xl leading-100 text-maroon-600 bg-white p-2.5 absolute top-0 -translate-y-1/2">
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
                    <span className="font-medium text-lg leading-100 text-zinc-600">+{address.phone}</span>
                </div>
            </div>

            {/* address */}
            {/* //TODO: */}
            <div className="w-fit font-medium text-base leading-100 text-zinc-800 bg-zinc-100 rounded-full py-1 px-3">
                21 Ahmed Mohamed St., King Faisal St., Giza
            </div>

            {/*Mutation operations */}
            <div className="flex flex-col gap-1.5 mt-6 absolute end-0 translate-x-1/2">
                {/*Update address */}
                <span
                    onClick={() => setOperationStep(ADDRESS_OPERATIONS.UPDATE)}
                    className="flex flex-col items-center justify-center w-9 h-9 rounded-full border border-zinc-400 cursor-pointer"
                >
                    <PenLine
                        width={"1.125rem"}
                        height={"1.125rem"}
                    />
                </span>

                {/* Delete address */}
                <span
                    className="flex flex-col items-center justify-center w-9 h-9 rounded-full border border-red-600 bg-red-600 cursor-pointer"
                >
                    <Trash2
                        width={"1.125rem"}
                        height={"1.125rem"}
                        className="text-white"
                    />
                </span>
            </div>
        </div>
    )
}
