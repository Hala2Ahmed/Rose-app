import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { deleteProductAction } from "../_actions/delete-product.action";
import { toast } from "sonner";
import { useTransition } from "react";
import { isRedirectError } from "next/dist/client/components/redirect";

export default function ActionButtons({
  productId,
  currentPage,
  totalItemsOnPage,
}: {
  productId: string;
  currentPage: number;
  totalItemsOnPage: number;
}) {
  //Translation
  const t = useTranslations("common");

  //Hooks
  const [isPending, startTransition] = useTransition();

  //Functions
  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteProductAction(productId, currentPage, totalItemsOnPage);
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
    <div className="flex justify-end gap-2.5">
      {/* Edit Button */}
      <Button className="px-2 h-[2.5rem] py-1 rounded-lg bg-[#0063D01A] text-blue-600 hover:bg-[#004c9e1a]">
        <Pencil />
        {t("edit")}
      </Button>

      {/* to do when the modal is ready */}

      {/* Delete button */}
      <Button
        disabled={isPending}
        className="px-2 h-[2.5rem] py-1 rounded-lg bg-[#FF00001A] hover:bg-[#b400001a] text-red-600"
        onClick={handleDelete}
      >
        <Trash2 />
        {isPending ? t("deleteing") : t("delete")}
      </Button>
    </div>
  );
}
