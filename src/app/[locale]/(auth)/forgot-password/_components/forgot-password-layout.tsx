//TODO: use Sarah's component
'use client';

import React, { useState } from 'react'
import { FORGOT_PASSWORD_STEPS } from '../../../../../lib/constants/auth.constant';
import { ForgotPasswordStep } from '../../../../../lib/types/auth';
import SendOtpStep from './send-otp-step';
import VerifyOtpStep from './verify-otp-step';

export default function ForgotPasswordLayout() {
const [step, setStep] = useState<ForgotPasswordStep>(FORGOT_PASSWORD_STEPS.EMAIL)


    return (
        <>
            {step == FORGOT_PASSWORD_STEPS.EMAIL? <SendOtpStep setStep = {setStep}/> 
            : <VerifyOtpStep setStep = {setStep} email={"larasamara2002@gmail.com"}/>}
        </>
    )
}
