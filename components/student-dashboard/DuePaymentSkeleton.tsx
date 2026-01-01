import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DuePaymentSkeleton = () => {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="h-full flex flex-col">
          {/* Header */}
          <CardHeader className="flex flex-row items-center gap-4">
            {/* Image Skeleton */}
            <Skeleton className="w-14 h-14 rounded-md shrink-0" />

            {/* Title Skeleton */}
            <Skeleton className="h-4 w-40" />
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>

            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>

            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>

            <div className="flex justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="mx-auto mt-auto">
            <Skeleton className="h-10 w-24 rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DuePaymentSkeleton
