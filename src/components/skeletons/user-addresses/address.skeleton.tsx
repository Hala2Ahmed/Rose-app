export default function AddressSkeleton() {
    return (
        <div className="flex flex-col gap-4 rounded-md border border-zinc-300 ps-4 pe-7 pb-5 relative animate-pulse">

            {/* Street */}
            <div className="absolute top-0 -translate-y-1/2 bg-white p-2.5">
                <div className="h-7 w-48 bg-zinc-300 rounded-md" />
            </div>

            {/* Info */}
            <div className="flex justify-between mt-6">

                {/* City */}
                <div className="flex gap-2.5 items-center">
                    <div className="w-8 h-8 rounded-full bg-zinc-300" />
                    <div className="h-6 w-32 bg-zinc-300 rounded-md" />
                </div>

                {/* Phone */}
                <div className="flex gap-2.5 items-center">
                    <div className="w-6 h-6 bg-zinc-300 rounded-md" />
                    <div className="h-5 w-28 bg-zinc-300 rounded-md" />
                </div>
            </div>

            {/* Full address */}
            <div className="h-6 w-72 bg-zinc-200 rounded-full mt-2" />

            {/* Mutation operations */}
            <div className="flex flex-col gap-1.5 mt-6 absolute end-0 translate-x-1/2">
                <div className="w-9 h-9 rounded-full border border-zinc-300 bg-zinc-200" />
                <div className="w-9 h-9 rounded-full bg-zinc-300" />
            </div>
        </div>
    );
}
