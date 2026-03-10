import React from "react";
import MainTitle from "./main-title";
import { useTranslations } from "next-intl";

export default function ProductMayLikeHeader() {
  // Translations
  const t = useTranslations("product-may-like");

  return <MainTitle title={t("title")} />;
}
