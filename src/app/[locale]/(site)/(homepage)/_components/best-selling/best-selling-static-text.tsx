import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import React from "react";

export default function BestSellingStaticText() {
  //translations
  const t = useTranslations("best-seller");

  return (
    <section className="max-w-72">
      <h4 className="uppercase text-softPink-500 font-medium mb-3 tracking-extra-wide dark:text-maroon-400">
        {t("title")}
      </h4>

      <h2 className="font-bold text-3xl text-maroon-700 capitalize dark:text-softPink-200">
        {t.rich("heading", {
          span: (chunks: React.ReactNode) => (
            <span className="text-softPink-500 dark:text-maroon-400">{chunks}</span>
          ),
        })}
      </h2>

      <p className="my-2 text-zinc-500">{t("paragraph")}</p>

      <Link
        href={"/products"}>
          <Button variant="primary">
        {t("explore-gifts")} <ArrowRight className="w-5 h-5" />
        </Button>
      </Link>
    </section>
  );
}
