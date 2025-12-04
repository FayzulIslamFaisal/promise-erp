import { Skeleton } from "@/components/ui/skeleton";

const BranchesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="border rounded-2xl p-6 shadow-sm flex flex-col items-center text-center space-y-4"
        >
          {/* Logo Circle */}
          <div className="flex justify-center">
            <Skeleton className="w-20 h-20 rounded-full" />
          </div>

          {/* Branch Name */}
          <Skeleton className="h-5 w-32 rounded-md" />

          {/* Location Text */}
          <Skeleton className="h-4 w-24 rounded-md" />

          {/* Address (multi-line) */}
          <div className="space-y-2 w-full flex flex-col items-center">
            <Skeleton className="h-4 w-40 rounded-md" />
            <Skeleton className="h-4 w-36 rounded-md" />
            <Skeleton className="h-4 w-32 rounded-md" />
          </div>

          {/* Phone Numbers */}
          <div className="space-y-2 w-full flex flex-col items-center">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-4 w-28 rounded-md" />
          </div>

          {/* Email */}
          <Skeleton className="h-4 w-36 rounded-md" />
        </div>
      ))}
    </div>
  )
}

export default BranchesSkeleton
