"use client";

import { useState } from "react";
import type { AddressFields, FormSteps } from "@/lib/types/addresses";
import { FORM_STEPS } from "../../../lib/constants/address.constants";
import AddressDetailsForm from "./address-details-step";
import FormHeader from "./form-header";
import AddressLocationStep from "./address-location-step";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import useAddAddress from "../../../hooks/addresses/use-add-address";
import { AddressSchema } from "../../../lib/schemes/address.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

export default function FormLayout() {
    //Translation
    const t = useTranslations("address");

    // States
    const [step, setStep] = useState<FormSteps>(FORM_STEPS.DETAILS);

    // variables
    const steps = {
        [FORM_STEPS.DETAILS]: {
            header: <FormHeader header={"Add a New Address"} description={"Enter address details"} />,
            component: <AddressDetailsForm setStep={setStep} />,
        },
        [FORM_STEPS.LOCATION]: {
            header: <FormHeader header={"Add a New Address"} description={"Find Your Location"} />,
            component: <AddressLocationStep />,
        },
    }

    // Mutation
    const { isPending, error, addAddress } = useAddAddress();

    // Form
    const form = useForm<AddressFields>({
        defaultValues: {
            resetCode: '',
        },
        resolver: zodResolver(AddressSchema(t)),
        mode: 'onSubmit',
    });

    //Functions
    const onSubmit: SubmitHandler<AddressFields> = async (values) => {
        console.log("object")
        console.log("🚀 ~ onSubmit ~ values:", values)
        addAddress(values);
    };

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
            >
                {steps[step].header}
                {steps[step].component}
            </form>
        </FormProvider>

    )
}
