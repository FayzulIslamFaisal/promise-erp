"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EnrollmentWrapperSkeleton() {
  return (
    <div className="grid md:grid-cols-[1.8fr_1fr] gap-6 mb-8 relative w-full">
      
      {/* ===== Left: Payment Summary Skeleton ===== */}
      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Title */}
          <Skeleton className="h-6 w-48" />

          {/* Course info */}
          <div className="flex gap-4 items-center">
            <Skeleton className="h-20 w-20 rounded-md" />
            <Skeleton className="h-5 w-64" />
          </div>

          {/* Coupon input */}
          <div className="flex gap-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-20" />
          </div>

          {/* Payment details */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div className="flex justify-between pt-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===== Right: Payment Method Skeleton ===== */}
      <Card>
        <CardContent className="p-6 space-y-5">
          {/* Title */}
          <Skeleton className="h-6 w-40" />

          {/* Payment methods */}
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />

          {/* Pay now button */}
          <Skeleton className="h-12 w-full rounded-md mt-4" />
        </CardContent>
      </Card>

    </div>
  );
}
