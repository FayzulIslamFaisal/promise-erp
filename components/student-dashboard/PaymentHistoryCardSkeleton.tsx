import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

 const PaymentHistoryCardSkeleton = () => {
  return (
    <Card className="rounded-xl border bg-secondary/15 border-secondary/20 ">
      <CardContent className="p-6">
        {/* Top Section */}
        <div className="flex gap-4 items-center">
          {/* Image Skeleton */}
          <Skeleton className="h-20 w-20 rounded-lg" />

          {/* Title Skeleton */}
          <div className="flex-1">
            <Skeleton className="h-5 w-48 mb-2" />
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t" />

        {/* Bottom Info Section */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {/* Price */}
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-5 w-20" />
          </div>

          {/* Installment Type */}
          <div>
            <Skeleton className="h-4 w-28 mb-2" />
            <Skeleton className="h-5 w-24" />
          </div>

          {/* Paid Amount */}
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-5 w-20" />
          </div>

          {/* Payment Date */}
          <div>
            <Skeleton className="h-4 w-28 mb-2" />
            <Skeleton className="h-5 w-32" />
          </div>

          {/* Due */}
          <div>
            <Skeleton className="h-4 w-12 mb-2" />
            <Skeleton className="h-5 w-24" />
          </div>

          {/* Status */}
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default PaymentHistoryCardSkeleton;
