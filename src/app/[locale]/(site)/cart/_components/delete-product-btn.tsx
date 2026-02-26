"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";
import { useDeleteProductFromCart } from "../hooks/use-delete-product";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function DeleteProduct({ productId }: { productId: string }) {
  //Translation
  const t = useTranslations("cart");

  // Hooks
  const { data: session } = useSession();
  const deleteItem = useDeleteProductFromCart(!!session?.user);

  return (
    <Button
      value={"destructive"}
      className="bg-red-600 max-w-[100px] w-full"
      disabled={deleteItem.isPending}
      onClick={() => deleteItem.mutate(productId)}
    >
      <Trash2 className="size-5" /> {t("remove-btn")}
    </Button>
  );
}
