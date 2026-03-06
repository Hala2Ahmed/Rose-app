'use client';

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Error() {
    //Translation
    const t = useTranslations("common");

    return (
        <section className="h-screen flex flex-col items-center justify-center gap-12">
            {/* Image */}
            <Image
                src="/assets/images/server-down.png"
                alt="Unauthorize Photo"
                width={250}
                height={250}
                className="object-cover"
                priority
            />
            {/* Content */}
            <div className="flex flex-col items-center justify-center gap-7">
                <h2 className="font-semibold text-2xl leading-60">{t("error-heading")}</h2>
                <p className="font-normal text-sm  leading-150 text-zinc-400">{t("error-paragraph")}</p>
            </div>
        </section>
    )
}