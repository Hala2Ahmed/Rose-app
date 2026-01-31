'use client'

import Image from "next/image";
import { cn } from "@/lib/utils/tailwind-merge";
import { IOccasionCardProps } from "@/lib/types";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

export default function OccasionCard ({ occasion, height, children }: IOccasionCardProps) {
    const t = useTranslations("home");
     const locale = useLocale();
     
    return (
        <div
            className={cn("rounded-lg overflow-hidden relative w-full",height === 440 ? "h-[440px]" : "h-[270px]" )}
        >
            {/* image */}
            <Image src={occasion.image} alt={t(occasion.title)} fill
                className="object-cover" />
            {/* text overlay */}
            <div className='bg-black/20 absolute bottom-0 left-0 right-0 h-full'>
                <div className={cn('absolute  bottom-0 p-6', locale === "ar"? "right-0" : "left-0" )}>
                    {/* badge */}
                    
                    {occasion.badge && <Badge>{t(occasion.badge)}</Badge>}
                    {/* title */}
                    <p className='text-white font-semibold text-2xl leading-6'>{t(occasion.title)}</p>
                    {/* description */}
                    {occasion.description && <p className='text-white'>{t(occasion.description)}</p>}
                    {/* children */}
                    {children && <div className="mt-4">{children}</div>}
                </div>
            </div>
        </div>
    );
};

