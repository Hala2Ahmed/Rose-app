import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import ProductsTableSearch from "./products-table-search";

export default function ProductsTableHeader() {
  //Translation
  const t = useTranslations("dashboard.products-table");

  return (
    <>
      <div className="flex justify-between mb-4">
        {/* Title */}
        <h3 className="font-semibold text-2xl text-zinc-800">{t("title")}</h3>

        {/* add new product button */}
        <Button>
          <Link
            href="/dashboard/occasions/new"
            className="flex items-center gap-2"
          >
            <Plus />
            {t("add-new")}
          </Link>
        </Button>
      </div>
      <ProductsTableSearch />
    </>
  );
}
