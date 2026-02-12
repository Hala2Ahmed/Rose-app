"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import type { FormSteps } from "../../../lib/types/addresses";
import { useTranslations } from "next-intl";
import { Textarea } from "../../ui/textarea";
import { PhoneInput } from "../../ui/phone-input";
import { Dispatch, SetStateAction } from "react";
import { FORM_STEPS } from "../../../lib/constants/address.constants";

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
        const valid = await form.trigger(["city", "address", "phone"]);
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
                        <FormLabel >City</FormLabel>
                        { /* Field */}
                        <FormControl>
                            <Input type='text' placeholder='Enter city name' {...field} />
                        </FormControl>
                        {/* Feedback */}
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Address */}
            <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                    <FormItem>
                        {/* Label */}
                        <FormLabel >Address</FormLabel>
                        { /* Field */}
                        <FormControl>
                            <Textarea placeholder='Enter your full address' {...field} />
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
                        <FormLabel >Phone</FormLabel>
                        { /* Field */}
                        <FormControl>
                            <PhoneInput  {...field} />
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