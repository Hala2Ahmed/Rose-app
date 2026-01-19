import { COMPANIES_FEATURES } from "@/lib/constants/homepage.constant";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function Companies() {
  // Translation
  const t = useTranslations("companies");

  return (
    <section className="bg-maroon-50 rounded-2xl py-10 text-center mb-72 dark:bg-zinc-700">
      {/* Section Title */}
      <h2 className="text-4xl text-maroon-700 font-bold dark:text-softPink-200">
        {t.rich("header", {
          span: (chunk) => (
            <span className="text-softPink-500 dark:text-maroon-400">
              {chunk}
            </span>
          ),
        })}
      </h2>

      {/* Company Logos */}
      <div className="flex gap-11 justify-center items-center mt-10">
        {COMPANIES_FEATURES.map((company) => (
          <Image
            key={company.id}
            src={company.logo}
            alt={company.name}
            width={146}
            height={51}
          />
        ))}
      </div>
    </section>
  );
}
