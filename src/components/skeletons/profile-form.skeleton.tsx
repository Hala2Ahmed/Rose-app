import { Skeleton } from "@/components/ui/skeleton";

export function ProfileFormSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-6">
      {/* Profile photo */}
      <Skeleton className="h-32 w-32 rounded-full col-span-2" />

      {/* First name */}
      <div>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Last name */}
      <div>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Email */}
      <div className="col-span-2">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Phone */}
      <div className="col-span-2">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Gender */}
      <div className="col-span-2">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Buttons */}
      <div className="col-span-2 flex justify-between mt-20">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-56" />
      </div>
    </div>
  );
}
