"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { deleteOccasionAction } from "../_actions/delete-occasion.action";
import { toast } from "sonner";
import { useTransition } from "react";
import { isRedirectError } from "next/dist/client/components/redirect";

export default function ActionButtons({
  occasionId,
  currentPage,
  totalItemsOnPage,
}: {
  occasionId: string;
  currentPage: number;
  totalItemsOnPage: number;
}) {
  //translations
  const t = useTranslations("common");

  //hook
  const [isPending, startTransition] = useTransition();

  //function
  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteOccasionAction(occasionId, currentPage, totalItemsOnPage);
        toast.success(t("occasion-success-delete"));
      } catch (error) {
        if (isRedirectError(error)) throw error;
        toast.error(
          error instanceof Error ? error.message : t("something-went-wrong"),
        );
      }
    });
  }
  return (
    <div className="flex justify-end gap-2 mx-5">
      {/* Edit Button */}
      <Button
        className="
      bg-[#0063D01A] text-blue-600 hover:bg-[#004c9e1a]
      dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40
    "
      >
        <Link
          className="flex gap-1 items-center"
          href={`/dashboard/occasions/${occasionId}`}
        >
          <Pencil />
          {t("edit")}
        </Link>
      </Button>

      {/* Delete Button */}
      <Button
        disabled={isPending}
        onClick={handleDelete}
        className="
      bg-[#FF00001A] text-red-600 hover:bg-[#b400001a]
      dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40
    "
      >
        <Trash2 />
        {isPending ? t("deleteing") : t("delete")}
      </Button>
    </div>
  );
}
