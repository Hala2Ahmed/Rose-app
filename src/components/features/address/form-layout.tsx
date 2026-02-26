"use client";

import { Dispatch, SetStateAction, useState } from "react";
import type { Addresses, AddressFields, AddressOperations, FormSteps } from "@/lib/types/addresses";
import { ADDRESS_OPERATIONS, FORM_STEPS } from "@/lib/constants/address.constants";
import AddressDetailsForm from "./address-details-step";
import FormHeader from "./form-header";
import AddressLocationStep from "./address-location-step";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import useAddAddress from "@/hooks/addresses/use-add-address";
import { AddressSchema } from "@/lib/schemes/address.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import useUpdateAddress from "@/hooks/addresses/use-update-address";
import { useQueryClient } from "@tanstack/react-query";

type FormLayoutProps = {
    title: string;
    id?: string;
    operation: AddressOperations;
    setOperation: Dispatch<SetStateAction<AddressOperations>>,
}

export default function FormLayout({ title, id, operation, setOperation }: FormLayoutProps) {
    //Translation
    const t = useTranslations("address");

    // Query client
    const queryClient = useQueryClient();

    // States
    const [step, setStep] = useState<FormSteps>(FORM_STEPS.DETAILS);

    // Variables
    const defaultValues: AddressFields =
        queryClient.getQueryData<Addresses>(["addresses"])?.addresses.find(add => add._id == id) ??
        {
            city: "",
            street: "",
            phone: "",
            lat: "",
            long: "",
        };

    // Mutation
    const { isPending: isAdding, addAddress } = useAddAddress();
    const { isPending: isUpdating, updateAddress } = useUpdateAddress(id || "");

    // variables
    const steps = {
        [FORM_STEPS.DETAILS]: {
            header: <FormHeader
                header={title}
                description={t("address-details")}
                step={step}
                setStep={setStep}
            />,
            component: <AddressDetailsForm setStep={setStep} />,
        },
        [FORM_STEPS.LOCATION]: {
            header: <FormHeader
                header={title}
                description={t("address-location")}
                step={step}
                setStep={setStep}
            />,
            component: <AddressLocationStep
                isPending={isAdding == true ? isAdding : isUpdating}
                operation={operation} />,
        },
    }

    // Form
    const form = useForm<AddressFields>({
        defaultValues,
        resolver: zodResolver(AddressSchema(t)),
        mode: 'onSubmit',
    });

    //Functions
    const onSubmit: SubmitHandler<AddressFields> = async (values) => {
        if (operation === ADDRESS_OPERATIONS.ADD) {
            addAddress(values, {
                onSuccess: () => {
                    toast.success(t("success-add"));
                    setOperation(ADDRESS_OPERATIONS.GET);
                }
            });
        } else {
            updateAddress(values, {
                onSuccess: () => {
                    toast.success(t("success-update"));
                    setOperation(ADDRESS_OPERATIONS.GET);
                }
            })
        }
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
