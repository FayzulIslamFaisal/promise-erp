import { Skeleton } from "@/components/ui/skeleton";

export default function NewsletterSkeleton() {
  return (
    <section className="relative py-8 md:py-14 w-full h-[400px] flex items-center justify-center overflow-hidden bg-secondary/5">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-10 bg-secondary/60" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center space-y-6">
        {/* Title Section Skeleton */}
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="h-10 w-64 bg-white/45" />
          <Skeleton className="h-5 w-40 bg-white/45" />
        </div>

        {/* Form Skeleton */}
        <div className="w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            {/* Email Input Skeleton */}
            <Skeleton className="h-12 w-full sm:flex-1 bg-white/45 rounded-md" />

            {/* Subscribe Button Skeleton */}
            <Skeleton className="h-12 w-full sm:w-auto px-8 bg-white/45 rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
