import React from "react";
import AddOccasionForm from "./_components/add-occasion-form";
import { getTranslations } from "next-intl/server";

export default async function AddNewpage() {
  const t = await getTranslations("dashboard.occasions");
  return (
    <div className="ms-6">
      <h1 className="font-semibold text-2xl text-zinc-800 mb-6 mt-7">
        {t("add-new")}
      </h1>
      <AddOccasionForm />
    </div>
  );
}
