"use client";

import { useState } from "react";
import { ADDRESS_OPERATIONS } from "../../../lib/constants/address.constants";
import AllAddresses from "./user-addresses";
import type { AddressOperations } from "../../../lib/types/addresses";
import FormLayout from "./form-layout";

export default function AddressesLayout() {
    //States
    const [step, setStep] = useState<AddressOperations>(ADDRESS_OPERATIONS.ADD);

    // Variables
    const operations = {
        [ADDRESS_OPERATIONS.GET]: {
            component: <AllAddresses setOperationStep={setStep} />,
        },
        [ADDRESS_OPERATIONS.ADD]: {
            component: <FormLayout />,
        },
        [ADDRESS_OPERATIONS.UPDATE]: {
            component: <></>,
        }
    }
    return operations[step].component;
}
