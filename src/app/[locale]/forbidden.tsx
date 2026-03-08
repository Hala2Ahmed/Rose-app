import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function Forbidden() {
    //Translation
    const t = await getTranslations("common");

    return (
        <section className="flex flex-col justify-center items-center gap-12 h-screen w-full">
            {/* Image */}
            <Image
                src="/assets/images/lock-shield.png"
                alt="Unauthorize Photo"
                width={360}
                height={360}
                className="object-cover"
                priority
            />
            {/* Content */}
            <div className="flex flex-col items-center gap-1.5 text-center">
                <h2 className="font-semibold text-4xl leading-150">{t("forbidden-heading")}</h2>
                <p className="text-zinc-400 leading-150 font-normal text-xl">{t("forbidden-paragraph")}</p>
                <div className="py-6 px-36 border-t border-zinc-300">
                    <Link href="/" className="py-2.5 px-[34.5px] rounded-xs border border-zinc-300 text-zinc-800 dark:text-zinc-50">{t("forbidden-link")}</Link>
                </div>
            </div>
        </section>
    )
}