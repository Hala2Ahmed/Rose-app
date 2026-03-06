import React from "react";
import { getTranslations } from "next-intl/server";
import OccasionForm from "../_components/all-occasions-form";

export default async function AddNewpage() {
  const t = await getTranslations("dashboard.occasions");
  return (
    <div className="ms-6">
      <h1 className="font-semibold text-2xl text-zinc-800 mb-6 mt-7">
        {t("add-new")}
      </h1>
      <OccasionForm />
    </div>
  );
}
