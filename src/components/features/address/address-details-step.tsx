"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FORM_STEPS } from "@/lib/constants/address.constants";
import { PhoneInput } from "@/components/ui/phone-input";
import type { FormSteps } from "@/lib/types/addresses";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

//Props
type AddressDetailsFormProps = {
    setStep: Dispatch<SetStateAction<FormSteps>>
}

export default function AddressDetailsForm({ setStep }: AddressDetailsFormProps) {
    //Transition
    const t = useTranslations("address");

    //Form
    const form = useFormContext();

    // functions
    async function onSubmit() {
        const valid = await form.trigger(["city", "street", "phone"]);
        if (valid) setStep(FORM_STEPS.LOCATION);
    }

    return (
        <>
            {/* City */}
            <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormItem>
                        {/* Label */}
                        <FormLabel >{t("city-label")}</FormLabel>
                        { /* Field */}
                        <FormControl>
                            <Input
                                className="text-black dark:text-zinc-50"
                                type='text'
                                placeholder={t('city-placeholder')}
                                {...field} />
                        </FormControl>
                        {/* Feedback */}
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Address */}
            <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                    <FormItem>
                        {/* Label */}
                        <FormLabel >{t("address-label")}</FormLabel>
                        { /* Field */}
                        <FormControl>
                            <Textarea
                                className="text-black dark:text-zinc-50"
                                placeholder={t('address-placeholder')}
                                {...field} />
                        </FormControl>
                        {/* Feedback */}
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Phone */}
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                        {/* Label */}
                        <FormLabel >{t("phone-label")}</FormLabel>
                        { /* Field */}
                        <FormControl>
                            <PhoneInput
                                className="text-black dark:text-zinc-50"
                                defaultCountry="EG"
                                {...field}
                                placeholder={t("phone-placeholder")} />
                        </FormControl>
                        {/* Feedback */}
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button
                className='w-full mt-11'
                type='button'
                onClick={onSubmit}
            >
                {t("next")}
            </Button>
        </>
    )
}