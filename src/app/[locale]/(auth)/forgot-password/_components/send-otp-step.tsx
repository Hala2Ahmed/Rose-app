//TODO: use Hala's component
'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import SubmissionFeedback from '../../../../../components/shared/submission-feedback';
import { useTranslations } from 'next-intl';
import { Input } from '../../../../../components/ui/input';
import useSendOtp from '../_hooks/use-send-otp';
import { ForgotPasswordStep } from '../../../../../lib/types/auth';
import { useLocalStorage } from '../../../../../hooks/shared/use-local-storage';
import { FORGOT_PASSWORD_STEPS, OTP_COUNTDOWN_KEY, OTP_COUNTDOWN_TIME } from '../../../../../lib/constants/auth.constant';

type SendOtpStep = {
    setStep: React.Dispatch<React.SetStateAction<ForgotPasswordStep>>,
}

export default function SendOtpStep({ setStep }: SendOtpStep) {
    //Translation
    const t = useTranslations("auth.forgot-password.otp-step");

    // Mutation
    const { sendOtp: OTP, isPending, error } = useSendOtp();

    // Hooks 
    const {
        storedValue: otpCountdown,
        setValue,
    } = useLocalStorage(OTP_COUNTDOWN_KEY, null);

    // Form
    const form = useForm<{ email: string }>({
        defaultValues: {
            email: '',
        },
        mode: 'onSubmit',
    });

    const onSubmit: SubmitHandler<{ email: string }> = async (values) => {
        if (otpCountdown) {
            setStep(FORGOT_PASSWORD_STEPS.OTP);
            return;
        }

        OTP(values, {
            onSuccess: () => {
                const nextAllowedTime = new Date(Date.now() + OTP_COUNTDOWN_TIME);
                setValue(nextAllowedTime.toISOString());

                {/* //TODO: SET STEP */ }
                setStep("otp");
            }
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="text-zinc-800 border-y border-zinc-200 pt-6 pb-9 dark:text-zinc-50"
            >
                {/* OTP Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className='w-fit m-auto'>
                            <FormLabel className='sr-only'>{t("label")}</FormLabel>
                            <FormControl className=''>
                                <Input type='email'  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
                    send otp
                </Button>
            </form>
        </Form>
    )
}