import { Skeleton } from "@/components/ui/skeleton";
import { Avatar } from "@/components/ui/avatar";

const WelcomeBannerSkeleton = () => {
  return (
    <section className="py-4 lg:py-6 px-4 bg-secondary/5 rounded-lg">
      <div className="relative overflow-hidden border rounded-xl bg-primary/5 p-4 shadow-lg">
        <div className="relative z-10 flex items-center gap-4">
          {/* Avatar Skeleton */}
          <Avatar className="h-12 w-12">
            <Skeleton className="h-12 w-12 rounded-full" />
          </Avatar>

          {/* Text Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-52 rounded" />
            <Skeleton className="h-4 w-72 rounded" />
          </div>
        </div>

        {/* Background Wave Placeholder */}
        <Skeleton className="absolute inset-x-0 bottom-0 h-12 opacity-40" />
      </div>
    </section>
  );
};

export default WelcomeBannerSkeleton;
