import React from "react";
import { cn } from "@/lib/utils/tailwind-merge";

interface StepperProps {
  steps: string[];
  currentStep: number; 
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="relative w-full mb-6">
      {/* Full gray line */}
      <div className="absolute inset-x-0 top-1/2 h-[5px] -translate-y-1/2 bg-zinc-200 rounded-full" />

      {/* Red progress line */}
      <div
        className="absolute top-1/2 h-[5px] -translate-y-1/2 bg-maroon-600 transition-all rounded-full"
        style={{
          width: isLastStep ? "100%" : "25%",
        }}
      />

      {/* Steps */}
      <div className="relative z-10 px-8 flex justify-center gap-x-[50%]">
        {steps.map((_, index) => {
          const active = index <= currentStep;

          return (
            <div
              key={index}
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold",
                active
                  ? "bg-maroon-600 text-white"
                  : "bg-zinc-200 text-zinc-500"
              )}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;