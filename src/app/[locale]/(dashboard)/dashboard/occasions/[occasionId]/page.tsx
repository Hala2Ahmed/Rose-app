"use client";

import { useParams } from "next/navigation";
import useGetSingleOccasion from "../_hooks/use-get-occasion-by-id";
import { useTranslations } from "next-intl";
import OccasionForm from "../_components/all-occasions-form";
import { Skeleton } from "@/components/ui/skeleton";

export default function Editpage() {
  const t = useTranslations("dashboard.occasions");
  const { occasionId } = useParams();
  const { occasion, isLoading } = useGetSingleOccasion(occasionId);
  return (
    <div className="ms-6">
      <h1 className="font-semibold text-2xl text-zinc-800 mb-6 flex gap-2 mt-7 dark:text-zinc-200">
        {t("update-occasion")}
        {isLoading ? (
          <Skeleton className="w-[10rem] mt-2" />
        ) : (
          <span>{occasion?.occasion.name}</span>
        )}
      </h1>
      <OccasionForm occasionId={occasionId} />
    </div>
  );
}
