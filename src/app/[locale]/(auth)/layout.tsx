import React from "react";

import { Providers } from "@/components/providers";


import AuthLanguageSwitcher from "./_components/auth-language-switcher";
import FormDecoration, {
  FormDecorationInverted,
} from "@/components/layout/auth/form-decoration";

import FormHeroImage from "@/components/layout/auth/form-hero-image";

type LayoutProps = {
  children: React.ReactNode;
};


export default function Layout({ children }: LayoutProps) {
  return (
    <Providers>
      <div className="flex justify-between min-h-screen">
        {/* Form Section */}
        <div className="w-full max-w-1.5xl mx-auto px-4 ">
          {/* language switcher */}
          <AuthLanguageSwitcher />

          {/* upstraight image seprator */}
          <FormDecoration />

          {children}

          {/* rotated image seprator */}
          <FormDecorationInverted />
        </div>

        {/* Hero Image Section */}
        <FormHeroImage />
      </div>
    </Providers>
  );
}
