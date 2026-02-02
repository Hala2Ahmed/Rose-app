"use client";

import React from "react";
type SubmissionProps = {
  errorMessage: string;
  className?: string;
};

export default function SubmissionError({
  errorMessage,
  className = "",
}: SubmissionProps) {
  return (
    <div className={className}>
      <div className="relative my-8 w-full">
        {/* Error message container */}
        <div className="bg-gradient-to-br from-softPink-50 to-softPink-100 border-2 border-maroon-400 rounded-lg p-2 shadow-sm">
          <p className="text-maroon-800 text-center font-medium leading-relaxed">
            {errorMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
