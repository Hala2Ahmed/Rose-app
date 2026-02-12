"use client";

import { Dispatch, SetStateAction } from "react";
import useUserAddresses from "../../../hooks/addresses/use-user-addresses";
import AddressSkeleton from "../../skeletons/user-addresses/address.skeleton";
import Address from "./address";
import type { AddressOperations } from "../../../lib/types/addresses";
import { Button } from "../../ui/button";

type UserAddresses = {
    setOperationStep: Dispatch<SetStateAction<AddressOperations>>;
}

export default function AllAddresses({ setOperationStep }: UserAddresses) {
    const { addresses, isLoading } = useUserAddresses();

    return (
        <div className="flex flex-col gap-9">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-200">
                {/* Title */}
                <span className="font-bold text-3xl leading-100 text-zinc-800">
                    My Addresses
                </span>

                {/* Add button */}
                <Button variant="secondary">
                    Add a New Address
                </Button>
            </div>

            {/*Addresses */}
            <div className="flex flex-col gap-9">
                {isLoading ? (
                    // Skeleton
                    Array.from({ length: 3 }).map((_, index) => (
                        <AddressSkeleton key={index} />
                    ))
                ) : (
                    // User addresses
                    addresses?.addresses?.map((address) => (
                        <Address
                            setOperationStep={setOperationStep}
                            key={address._id}
                            address={address}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
