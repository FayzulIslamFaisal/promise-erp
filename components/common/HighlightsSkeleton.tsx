import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
const HighlightsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, index) => (
        <Card
          key={index}
          className="bg-primary rounded-xl p-6 flex flex-col items-center justify-center space-y-4 shadow-md"
        >
          <div className="px-4 py-6 w-full flex flex-col items-center justify-center space-y-4">
            {/* Icon skeleton */}
            <Skeleton className="w-[70px] h-[70px] rounded-full mb-4" />

            {/* Number skeleton */}
            <Skeleton className="h-6 w-full rounded-md mb-2" />

            {/* Label skeleton */}
            <Skeleton className="h-6 w-full rounded-md" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default HighlightsSkeleton;
