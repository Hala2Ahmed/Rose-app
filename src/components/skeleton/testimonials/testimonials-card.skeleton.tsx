import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";

function TestimonialsCardSkeleton() {
    return (
        <Card className="flex flex-col gap-3 justify-center relative rounded-3xl shadow-lg pt-14 pb-5 px-5 dark:bg-white animate-pulse">

            {/* Image Skeleton */}
            <div className="absolute -top-11 left-1/2 -translate-x-1/2 h-30 w-30 rounded-full overflow-hidden border-4 border-white shadow-md bg-zinc-200" />

            {/* Card Header */}
            <CardHeader>
                <div className="h-4 w-32 mx-auto rounded bg-zinc-200" />
            </CardHeader>

            {/* Card Content */}
            <CardContent className="flex flex-col gap-3">
                
                {/* Rating Skeleton */}
                <div className="flex justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-5 w-5 rounded bg-zinc-200"
                        />
                    ))}
                </div>

                {/* Review Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-zinc-200" />
                    <div className="h-4 w-full rounded bg-zinc-200" />
                    <div className="h-4 w-4/5 rounded bg-zinc-200" />
                </div>
            </CardContent>

            {/* Card Footer */}
            <CardFooter className="justify-center">
                <div className="h-3 w-24 rounded bg-zinc-200" />
            </CardFooter>
        </Card>
    );
}

export default TestimonialsCardSkeleton;
