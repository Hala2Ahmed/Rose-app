'use client';

import Image from "next/image";

type GlobalErrorProps = {
    params: { locale: string };
};

export default function Error({ params }: GlobalErrorProps) {
    return (
        <html
            lang={params.locale}
            dir={params.locale === "ar" ? "rtl" : "ltr"}
            suppressHydrationWarning>
            <body>
                <section className="h-screen flex flex-col items-center justify-center gap-12">
                    <Image
                        src="/assets/images/server-down.png"
                        alt="Unauthorize Photo"
                        width={250}
                        height={250}
                        className="object-cover"
                        priority
                    />
                    <div className="flex flex-col items-center justify-center gap-7">
                        <h2 className="font-semibold text-2xl leading-60">Oops, something went wrong!</h2>
                        <p className="font-normal text-sm  leading-150 text-zinc-400">Something unexpected happened, please refresh the page or try again shortly.</p>
                    </div>
                </section>
            </body>
        </html>
    )
}