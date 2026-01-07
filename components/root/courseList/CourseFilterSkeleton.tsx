import { Skeleton } from "@/components/ui/skeleton";

const CourseFilterSkeleton = () => {
  return (
    <div className="w-full h-full rounded-2xl border bg-card p-4 space-y-6">
      {/* Search */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Reusable section */}
      {Array.from({ length: 6 }).map((_, sectionIndex) => (
        <div key={sectionIndex} className="space-y-3">
          {/* Section title */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>

          {/* Checkbox items */}
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, itemIndex) => (
              <div key={itemIndex} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-sm" />
                <Skeleton className="h-4 w-28" />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Price range */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />

        {/* Slider */}
        <Skeleton className="h-2 w-full rounded-full" />

        {/* Price values */}
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
};

export default CourseFilterSkeleton;
