"use client"

import { useState } from "react";
import Stepper from '@/components/shared/progress-stepper';
import ShippingAddressStep from './shipping-address';
import PaymentMethodStep from './payment-method';

export default function Checkout() {

  //Hooks
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAddress, setSelectedAddress] = useState<string>('');

  //State
  const steps: string[] = ['Shipping Address', 'Payment Method'];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    alert('Order completed successfully!');
  };

  return (
    <div className="w-[49rem]">
      <div className="max-w-3xl mx-auto">
        <Stepper steps={steps} currentStep={currentStep} />

        {currentStep === 0 && (
          <ShippingAddressStep
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            onNext={handleNextStep}
          />
        )}

        {currentStep === 1 && (
          <PaymentMethodStep
            onBack={handleBackStep}
            onNext={handleComplete}
          />
        )}
      </div>
    </div>
  );
}