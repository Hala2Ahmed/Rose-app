"use client";

import { Dispatch, SetStateAction } from "react";
import useUserAddresses from "../../../hooks/addresses/use-user-addresses";
import AddressSkeleton from "../../skeletons/user-addresses/address.skeleton";
import Address from "./address";
import type { AddressOperations } from "../../../lib/types/addresses";
import { Button } from "../../ui/button";
import { DialogHeader } from "../../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ADDRESS_OPERATIONS } from "../../../lib/constants/address.constants";

type UserAddresses = {
    setOperationStep: Dispatch<SetStateAction<AddressOperations>>;
    setAddressId:  Dispatch<SetStateAction<string>>;
}

export default function AllAddresses({ setOperationStep, setAddressId}: UserAddresses) {
    const { addresses, isLoading } = useUserAddresses();

    return (
        <div className="flex flex-col gap-9">
            <DialogHeader className="flex flex-row justify-between items-center pb-4 border-b border-zinc-200">
                {/* Title */}
                <DialogTitle className="font-bold text-3xl leading-100 text-zinc-800">
                    My Addresses
                </DialogTitle>

                {/* Add button */}
                <Button 
                variant="secondary"
                onClick={() => setOperationStep(ADDRESS_OPERATIONS.ADD)}
                >
                    Add a New Address
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
                    addresses?.addresses?.map((address) => (
                        <Address
                            setOperationStep={setOperationStep}
                            setAddressId = {setAddressId}
                            key={address._id}
                            address={address}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
