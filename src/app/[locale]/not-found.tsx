import { useTranslations } from "next-intl";
import Image from "next/image";

export default function NotFound() {
    //Translation
    const t = useTranslations("common");

    return (
        <section className="h-screen flex flex-col items-center justify-center gap-12">
            {/*Image */}
            <Image
                src="/assets/images/not-found.png"
                alt="Unauthorize Photo"
                width={710}
                height={315}
                className="object-cover"
                priority
            />
            {/* Content */}
            <div className="flex flex-col items-center gap-5">
                <h2 className="font-semibold text-4xl leading-150">{t("notFound-heading")}</h2>
                <p className="font-normal text-xl leading-150 text-zinc-400">{t("notFound-paragraph")}</p>
            </div>
        </section>
    )
}