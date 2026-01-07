import { Skeleton } from "@/components/ui/skeleton";

const FreeClassBySlugSkeleton = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-3 px-4">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* FreeClasseSession Skeleton */}
        <div className="bg-card rounded-2xl p-6 space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>

        {/* FreeClasseInstructors Skeleton */}
        <div className="bg-card rounded-2xl p-6 space-y-4">
          <Skeleton className="h-6 w-1/3" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 p-4 border rounded-xl"
              >
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="bg-card rounded-2xl p-6 space-y-4 h-fit">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default FreeClassBySlugSkeleton;
