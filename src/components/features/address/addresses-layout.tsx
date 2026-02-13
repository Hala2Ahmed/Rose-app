"use client";

import { useState } from "react";
import { ADDRESS_OPERATIONS } from "../../../lib/constants/address.constants";
import AllAddresses from "./user-addresses";
import type { AddressOperations } from "../../../lib/types/addresses";
import FormLayout from "./form-layout";

export default function AddressesLayout() {
    //States
    const [operation, setOperation] = useState<AddressOperations>(ADDRESS_OPERATIONS.GET);
    const [addressId, setAddressId] = useState("");

    // Variables
    const operations = {
        [ADDRESS_OPERATIONS.GET]: {
            component: <AllAddresses setOperationStep={setOperation} setAddressId={setAddressId} />,
        },
        [ADDRESS_OPERATIONS.ADD]: {
            component: <FormLayout
                operation={operation}
                setOperation={setOperation}
                title={"Add a New Address"}
            />,
        },
        [ADDRESS_OPERATIONS.UPDATE]: {
            component: <FormLayout
                id={addressId}
                operation={operation}
                setOperation={setOperation}
                title={"Update Address Info"}
            />,
        }
    }
    return operations[operation].component;
}
