"use client";

import { SidebarHeader } from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Flower } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Header() {
    //router 
    const router = useRouter();

    //translation 
    const t = useTranslations("dashboard-layout");

    return (
        <SidebarHeader className="pt-6 px-8">
            <div
                className="pt-15 pb-6 px-15"
            >
                <Image
                    className="w-full h-full object-cover"
                    src="/assets/images/dashboard.png"
                    alt="dashboard logo"
                    width={302}
                    height={344}
                />
            </div>

            <Button
                variant="primary"
                className="py-3.5 px-9 leading-100 rounded-base cursor-pointer"
                onClick={() => router.push("/dashboard")}
            >
                <Flower width={25} height={25} />
                <span className="font-semibold text-base ms-2">{t("preview")}</span>
            </Button>
        </SidebarHeader>
    )
}
