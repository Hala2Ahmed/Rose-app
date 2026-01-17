import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { useFormatter } from "next-intl";
import { Testimonial } from "../../../../../lib/types/testimonials";

type TestimonialsCardProps = {
    testimonial: Testimonial
}

export default function TestimonialsCard({ testimonial }: TestimonialsCardProps) {
    //translation
    const format = useFormatter();

    return (
        <Card className="flex flex-col gap-3 justify-center relative rounded-3xl shadow-lg pt-14 pb-5 px-5 dark:bg-white">

            {/* card Image */}
            <div className="absolute -top-11 left-1/2 -translate-x-1/2  h-30 w-30 rounded-full overflow-hidden border-4 border-white  shadow-md">
                <Image
                    src={testimonial.user.photo}
                    alt={`${testimonial.user.firstName} ${testimonial.user.lastName} Photo`}
                    fill
                    className="object-cover"
                    sizes="120px"
                    priority
                />
            </div>

            {/* Card Header */}
            <CardHeader>
                {/* Name */}
                <h3 className="text-base font-semibold text-center text-zinc-800">
                    {testimonial.user.firstName} {testimonial.user.lastName}
                </h3>
            </CardHeader>

            {/* Card Content */}
            <CardContent className="text-zinc-800 flex flex-col gap-2.5">
                {/*//TODO: Using Rating Component*/}
                {/* Rating */}
                <div className="flex justify-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                            key={i}
                            className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                        <Star
                            key={i}
                            className="h-5 w-5 text-yellow-400" />
                    ))}
                </div>

                {/* Review */}
                <p className="text-base font-medium text-start leading-100">
                    {testimonial.content}
                </p>
            </CardContent>

            {/* Card Footer */}
            <CardFooter className="justify-center">
                {/* Date */}
                <span className="text-zinc-400 font-medium text-12">
                    {format.dateTime(new Date(testimonial.createdAt), "long-date")}
                </span>
            </CardFooter>
        </Card>
    )
}
