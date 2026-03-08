"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShippingAddressSkeleton() {
  return (
    <div className="space-y-3 mb-3">
      {[1, 2, 3].map((item) => (
        <Card key={item} className="border-zinc-300">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <Skeleton className="h-6 w-32" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>

            <Skeleton className="h-6 w-64 rounded-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}