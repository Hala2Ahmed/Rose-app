"use client"

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog"
import Image from "next/image"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils/tailwind-merge"
import { X } from "lucide-react"
import { useLocale } from "next-intl"

type GalleryDialogProps = {
    trigger: React.ReactNode;
    content: string[] | string;
}

export default function GalleryDialog({ content, trigger }: GalleryDialogProps) {
    //States
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const images = typeof content === "string" ? [content] : content

    //Translation 
    const locale = useLocale();

    //Effects
    useEffect(() => {
        if (!api) return

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent className="max-w-248 w-full h-690 pb-14 pt-6 dark:bg-zinc-900">
                {/* Dialog title */}
                <DialogTitle className="sr-only">Gallery</DialogTitle>
                {/* Dialog close button */}
                <DialogClose className="flex justify-end">
                    <X size={25} className="text-black/8 dark:text-zinc-500" />
                </DialogClose>
                {/* Content */}
                {images.length === 1 ? (
                    // Single image
                    <div className="w-full h-480 relative border border-black/5 dark:border-zinc-50/5 rounded-xs">
                        <Image
                            src={images[0]}
                            alt="image"
                            fill
                            className="object-contain"
                        />
                    </div>
                ) :
                    (
                        // Carousel
                        <Carousel
                            setApi={setApi}
                            className="w-full flex flex-col items-center px-18"
                            opts={{
                                align: "start",
                                direction: locale === "ar" ? "rtl" : "ltr",
                            }}
                        >
                            <div className="w-789">
                                <CarouselContent className="w-full h-480 mb-6">
                                    {/* Images */}
                                    {images.map((img, i) => (
                                        <CarouselItem key={i} className="flex-shrink-0 w-full h-full relative border
                                border-black/5 dark:border-zinc-50/5 rounded-xs">
                                            <Image
                                                src={img}
                                                alt={`image-${i}`}
                                                fill
                                                className="object-contain"
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>

                                {/* Carousel navigation  */}
                                <div className="flex w-full justify-between items-center">
                                    {/* Dots */}
                                    <div className="flex gap-2">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                className={cn(`h-3.5 w-3.5 rounded-full transition-all 
                                        ${index === current ? "bg-maroon-600 dark:bg-softPink-400" :
                                                        "bg-black/15 dark:bg-zinc-500"}`)}
                                                onClick={() => api?.scrollTo(index)}
                                                aria-label={`Go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>

                                    {/*Arrows */}
                                    <div className="flex gap-1.5">
                                        <CarouselPrevious className="relative start-0 top-0 translate-x-0 translate-y-0" />
                                        <CarouselNext className="relative end-0 top-0 translate-x-0 translate-y-0" />
                                    </div>
                                </div>
                            </div>
                        </Carousel>
                    )}
            </DialogContent>
        </Dialog>
    )
}