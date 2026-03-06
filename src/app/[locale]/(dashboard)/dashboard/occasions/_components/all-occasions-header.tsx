import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import SearchInputControl from "./search-control";

export default function AllOccasionsHeader() {
  //translations
  const t = useTranslations("dashboard.occasions");

  return (
    <>
      <div className="flex justify-between ">
        {/* Title */}

        <h3 className="font-semibold text-2xl">{t("all-occasions")}</h3>
        <Button>
          <Link href="/dashboard/occasions/add-occasion" className="flex">
            <Plus />
            {t("add-new")}
          </Link>
        </Button>
      </div>
      <SearchInputControl />
    </>
  );
}
