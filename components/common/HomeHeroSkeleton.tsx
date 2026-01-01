
import { Skeleton } from "@/components/ui/skeleton";

const HomeHeroSkeleton = () => {
  return (
    <section className=" bg-cover bg-no-repeat bg-center py-10 lg:py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        <div className="flex flex-col gap-6">
          <Skeleton className="h-60 w-full rounded-md bg-secondary/15" /> 
          <Skeleton className="h-8 w-full rounded-md bg-secondary/15" /> 

          <div className="flex gap-4 mt-4">
            <Skeleton className="h-10 w-32 rounded-md bg-secondary/15" />
            <Skeleton className="h-10 w-32 rounded-md bg-secondary/15" />
          </div>
        </div>

        {/* RIGHT VIDEO / IMAGE */}
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
          <Skeleton className="absolute inset-0 w-full h-full rounded-xl bg-secondary/15" />
          {/* Optional play button circle */}
          <Skeleton className="absolute w-16 h-16 bg-secondary/30 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

      </div>
    </section>
  );
};

export default HomeHeroSkeleton;
