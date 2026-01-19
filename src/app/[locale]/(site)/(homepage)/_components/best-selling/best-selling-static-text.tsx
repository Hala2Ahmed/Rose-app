import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import React from "react";

export default function BestSellingStaticText() {
  //translations
  const t = useTranslations("best-seller");

  return (
    <section className="max-w-72">
      <h4 className="uppercase text-softPink-500 font-medium mb-3 tracking-extra-wide">
        {t("title")}
      </h4>

      <h2 className="font-bold text-3xl text-maroon-700 capitalize">
        {t.rich("heading", {
          span: (chunks: React.ReactNode) => (
            <span className="text-softPink-500">{chunks}</span>
          ),
        })}
      </h2>

      <p className="mt-2 text-zinc-500">{t("paragraph")}</p>

      <Link
        className="bg-maroon-600 mt-16 text-white py-2 px-6 pr-10 rounded-xl relative inline-flex items-center gap-2 w-fit hover:bg-maroon-700 transition-colors"
        href={"/products"}>
        {t("explore-gifts")} <ArrowRight className="w-5 h-5" />
      </Link>
    </section>
  );
}
