import React from "react";

export default function ReviewSkeleton() {
    return (
        <div className="flex flex-col gap-2.5 pb-4 animate-pulse">
            {/* User Info */}
            <div className="flex gap-2.5 items-center">
                {/* Avatar */}
                <div className="w-11 h-11 rounded-full bg-zinc-200" />

                {/* Info */}
                <div className="flex flex-col gap-1">
                    <div className="h-4 w-24 bg-zinc-200 rounded" />
                    <div className="h-3 w-16 bg-zinc-200 rounded" />
                </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
                <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-4 h-4 bg-zinc-200 rounded"
                        />
                    ))}
                </div>
                <div className="h-3 w-10 bg-zinc-200 rounded" />
            </div>

            {/* Review */}
            <div className="flex flex-col gap-1.5">
                {/* Title */}
                <div className="h-4 w-40 bg-zinc-200 rounded" />

                {/* Content lines */}
                <div className="space-y-2">
                    <div className="h-4 w-full bg-zinc-200 rounded" />
                    <div className="h-4 w-full bg-zinc-200 rounded" />
                    <div className="h-4 w-11/12 bg-zinc-200 rounded" />
                    <div className="h-4 w-10/12 bg-zinc-200 rounded" />
                </div>
            </div>
        </div>
    );
}
