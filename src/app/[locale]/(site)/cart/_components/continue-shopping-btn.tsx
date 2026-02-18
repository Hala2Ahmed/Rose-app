import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { MoveLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function ContinueShopping() {
  //Translation
  const t = useTranslations("cart");

  return (
    <Link href="/products">
      <Button className="mt-6">
        <MoveLeft /> {t("continue-shopping-btn")}
      </Button>
    </Link>
  );
}
