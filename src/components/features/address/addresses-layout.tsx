"use client";

import { useState } from "react";
import { ADDRESS_OPERATIONS } from "@/lib/constants/address.constants";
import AllAddresses from "./All-addresses";
import type { AddressOperations } from "@/lib/types/addresses";
import FormLayout from "./form-layout";
import { useTranslations } from "next-intl";

export default function AddressesLayout() {
    //Translation
    const t = useTranslations("address");

    //States
    const [operation, setOperation] = useState<AddressOperations>(ADDRESS_OPERATIONS.GET);
    const [addressId, setAddressId] = useState("");

    // Variables
    const operations = {
        [ADDRESS_OPERATIONS.GET]: {
            component: <AllAddresses
                setOperationStep={setOperation}
                setAddressId={setAddressId}
            />,
        },
        [ADDRESS_OPERATIONS.ADD]: {
            component: <FormLayout
                operation={operation}
                setOperation={setOperation}
                title={t("add-address-title")}
            />,
        },
        [ADDRESS_OPERATIONS.UPDATE]: {
            component: <FormLayout
                id={addressId}
                operation={operation}
                setOperation={setOperation}
                title={t("update-address-title")}
            />,
        }
    }

    return operations[operation].component;
}
