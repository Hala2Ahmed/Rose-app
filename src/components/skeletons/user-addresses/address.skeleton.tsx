import { Skeleton } from "@/components/ui/skeleton";

export default function AddressSkeleton() {
    return (
        <div className="flex flex-col gap-4 rounded-md border border-zinc-300 p-5 relative">

            {/* Street */}
            <div className="absolute top-0 -translate-y-1/2 bg-white p-2.5">
                <Skeleton className="h-7 w-48" />
            </div>

            {/* Info */}
            <div className="flex justify-between mt-6">

                {/* City */}
                <div className="flex gap-2.5 items-center">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="h-6 w-32 rounded-md" />
                </div>

                {/* Phone */}
                <div className="flex gap-2.5 items-center">
                    <Skeleton className="w-6 h-6 rounded-md" />
                    <Skeleton className="h-5 w-28 rounded-md" />
                </div>
            </div>

            {/* Full address */}
            <Skeleton className="h-6 w-72 rounded-full mt-2" />

            {/* Mutation operations */}
            <div className="flex flex-col gap-1.5 mt-6 absolute ltr:right-0 ltr:translate-x-1/2 rtl:left-0 rtl:-translate-x-1/2">
                <Skeleton className="w-9 h-9 rounded-full border border-zinc-300" />
                <Skeleton className="w-9 h-9 rounded-full" />
            </div>
        </div>
    );
}
