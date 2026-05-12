"use client";

import { SidebarHeader } from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Flower } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Header() {
  //translation
  const t = useTranslations("dashboard.dashboard-layout");

  return (
    <SidebarHeader className="pt-6 px-8 dark:bg-zinc-800">
      {/* Image header */}
      <div className="pt-15 pb-6 px-15">
        <Image
          className="w-full h-full object-cover"
          src="/assets/images/dashboard.png"
          alt="dashboard logo"
          width={302}
          height={344}
        />
      </div>

      {/*Preview button */}
      <Link href="/">
        <Button
          variant="primary"
          className="py-3.5 px-9 leading-100 rounded-base cursor-pointer"
        >
          <Flower width={25} height={25} />
          <span className="font-semibold text-base ms-2">{t("preview")}</span>
        </Button>
      </Link>
    </SidebarHeader>
  );
}
