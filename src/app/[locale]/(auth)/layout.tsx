import React from "react";
import { Providers } from "@/components/providers";
import Image from "next/image";
import GreetingTitle from "./_components/greeting-title";
import FormFooter from "./_components/form-footer";

type LayoutProps = { children: React.ReactNode };

export default function layout({ children }: LayoutProps) {
  return (
    <Providers>
      <div className="grid grid-cols-5">
        <div className="col-span-2">
          <Image
            src={"/assets/images/separator-2.png"}
            alt="seprator decoration"
            width={280}
            height={45}
          />
          <GreetingTitle title="welcome back !" />

          {children}

          <FormFooter
            link="login"
            text="don't have an account ? create one"
            linkHref="/login"
          />
          <Image
            src={"/assets/images/separator-2.png"}
            className="rotate-180"
            alt="seprator decoration"
            width={280}
            height={45}
          />
        </div>
        <div className="col-span-3 relative min-h-screen">
          <Image src={"/assets/images/image4.png"} alt="chocolate box" fill />
        </div>
      </div>
    </Providers>
  );
}
