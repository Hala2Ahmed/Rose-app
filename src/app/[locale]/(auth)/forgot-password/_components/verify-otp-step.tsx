'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ForgotPasswordStep, OtpStepFields } from '../../../../../lib/types/auth';
import useVerifyOtp from '../_hooks/use-verify-otp';
import SubmissionFeedback from '../../../../../components/shared/submission-feedback';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpStepSchema } from '../../../../../lib/schemes/auth.schema';
import { useTranslations } from 'next-intl';
import { useLocalStorage } from '../../../../../hooks/shared/use-local-storage';
import { FORGOT_PASSWORD_STEPS, OTP_COUNTDOWN_KEY, OTP_COUNTDOWN_TIME } from '../../../../../lib/constants/auth.constant';
import { toast } from 'sonner';
import useSendOtp from '../_hooks/use-send-otp';

type VerifyOtpStep = {
    setStep: React.Dispatch<React.SetStateAction<ForgotPasswordStep>>,
    email: string,
}

export default function VerifyOtpStep({setStep, email}: VerifyOtpStep) {
    //Translation
    const t = useTranslations("auth.forgot-password.otp-step");

    // Mutation
    const { VerifyOTP: OTP, isPending, error } = useVerifyOtp();

    // Form
    const form = useForm<OtpStepFields>({
        defaultValues: {
            resetCode: '',
        },
        resolver: zodResolver(otpStepSchema(t)),
        mode: 'onSubmit',
    });

    //Functions
    const onSubmit: SubmitHandler<OtpStepFields> = async (values) => {
        OTP(values, {
            onSuccess: () => {
                setStep(FORGOT_PASSWORD_STEPS.NEW_PASSWORD);
            }
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="text-zinc-800 border-y border-zinc-200 pt-6 pb-9 bg-zinc-800 dark:text-zinc-50"
            >
                {/* OTP Field */}
                <FormField
                    control={form.control}
                    name="resetCode"
                    render={({ field }) => (
                        <FormItem className='w-fit m-auto'>
                            <FormLabel className='sr-only'>{t("label")}</FormLabel>
                            <FormControl className=''>
                                <InputOTP maxLength={6} {...field}>
                                    {Array.from({ length: 6 }, (_, i) => i).map((i) => (
                                        <InputOTPSlot key={i} index={i} />
                                    ))}
                                </InputOTP>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <ResendOTP email={email} />

                {/* API Error */}
                {error && <SubmissionFeedback>{error.message}</SubmissionFeedback>}

                {/* Submit */}
                <Button
                    type="submit"
                    loading={isPending}
                    variant={"destructive"}
                    className="w-full mt-10 dark:text-zinc-800 dark:bg-softPink-300 dark:hover:bg-softPink-400"
                    disabled={!form.formState.isValid && form.formState.isSubmitted}
                >
                    {t('verify-otp')}
                </Button>
            </form>
        </Form>
    )
}

function ResendOTP({ email }: { email: string | null }) {
    //Translation
    const t = useTranslations("auth.forgot-password.otp-step");

    // Hooks 
    const {
        storedValue: otpCountdown,
        setValue,
        removeValue,
    } = useLocalStorage(OTP_COUNTDOWN_KEY, new Date(Date.now() + OTP_COUNTDOWN_TIME).toISOString());

    // State
    const [countdown, setCountdown] = useState<number>(() => {
        if (!otpCountdown) return 0;

        const countdownState = new Date(otpCountdown);
        const remainingTime = Math.floor((countdownState.getTime() - new Date().getTime()) / 1000);

        return remainingTime;
    });

    // Mutation
    {/* //TODO: Use Hala's hook */ }
    const { sendOtp, isPending } = useSendOtp();

    //Functions 
    const setCountdownFunction = (countdown: Date) => {
        const nextAllowedTime = new Date(countdown.getTime() + OTP_COUNTDOWN_TIME);

        setValue(nextAllowedTime.toISOString());
        setCountdown(OTP_COUNTDOWN_TIME / 1000);
    };

    const handleResendOtp = () => {
        if (!email) return;

        sendOtp(
            { email },
            {
                onSuccess: () => {
                    // Set the countdown function
                    setCountdownFunction(new Date());

                    // Show success toast
                    toast.success(t('otp-toast'));
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            }
        );
    };

    // Effects
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (otpCountdown) {
            interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 0) {
                        clearInterval(interval);
                        removeValue();

                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [otpCountdown, removeValue]);

    if (countdown > 0) {
        return (
            <p className='text-base font-medium text-end py-3.5 px-5 mt-4'>
                {t('otp-resend-countdown', {
                    seconds: countdown
                })}
            </p>
        )
    }

    return (
        <Button
            type='button'
            variant={"link"}
            className='text-base font-medium py-3.5 px-5 mt-4 w-full justify-end'
            onClick={handleResendOtp}
            loading={isPending}
        >
            {t("new-code")}
        </Button>
    );
}