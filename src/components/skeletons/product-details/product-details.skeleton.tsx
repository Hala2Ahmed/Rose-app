export default function ProductDetailsSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-16 my-12 animate-pulse">
      {/* Left side (Gallery skeleton) */}
      <div className="flex flex-col gap-2.5 max-h-[523px]">
        {/* Main Image */}
        <div className="w-[605px] h-[402px] bg-zinc-200 rounded-xl" />

        {/* Thumbnails */}
        <div className="grid grid-cols-6 gap-x-2.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-[91px] h-[111px] bg-zinc-200 rounded-md"
            />
          ))}
        </div>
      </div>

      {/* Right side (Product info skeleton) */}
      <div className="flex flex-col flex-1 max-h-[523px]">
        {/* Title */}
        <div className="h-8 w-2/3 bg-zinc-200 rounded mb-4" />

        {/* Price + Stock */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-8 w-24 bg-zinc-200 rounded" />
          <div className="h-8 w-24 bg-zinc-200 rounded" />
          <div className="h-6 w-32 bg-zinc-200 rounded-full" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-5 w-5 bg-zinc-200 rounded-full" />
          <div className="h-4 w-32 bg-zinc-200 rounded" />
        </div>

        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-zinc-200 rounded" />
          <div className="h-4 w-5/6 bg-zinc-200 rounded" />
          <div className="h-4 w-4/6 bg-zinc-200 rounded" />
        </div>

        {/* Buttons */}
        <div className="flex gap-2.5 mt-auto">
          <div className="h-10 w-12 bg-zinc-200 rounded-md" />
          <div className="h-10 flex-1 bg-zinc-200 rounded-md" />
        </div>
      </div>
    </div>
  );
}
