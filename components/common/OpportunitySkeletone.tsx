import { Skeleton } from "@/components/ui/skeleton";
const OpportunitySkeletone = () => {
  return (
    <section className=" bg-cover bg-no-repeat bg-center py-10 lg:py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
          <Skeleton className="absolute inset-0 w-full h-full rounded-xl bg-secondary/15" />
          {/* Optional play button circle */}
        </div>
        {/* RIGHT VIDEO / IMAGE */}
        <div className="flex flex-col gap-6">
          <Skeleton className="h-15 w-full rounded-md bg-secondary/15" />
          <Skeleton className="h-7 w-full rounded-md bg-secondary/15" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-22 rounded-md bg-secondary/15" />
            <Skeleton className="h-22 rounded-md bg-secondary/15" />
            <Skeleton className="h-22 rounded-md bg-secondary/15" />
            <Skeleton className="h-22 rounded-md bg-secondary/15" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpportunitySkeletone;
