import LoadingSkeleton from "@/components/common/DashboardLoadingSkeleton";
import FreeClasseGrid from "@/components/student-dashboard/FreeClasseGrid";
import { Suspense } from "react";

export interface FreeClassesParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const FreeClassesPage = ({ searchParams }: FreeClassesParams) => {
  return (
    <section className="py-4 px-4">
      <h2 className="text-3xl font-bold text-center text-secondary mb-6">
        Free Classes
      </h2>
      <Suspense
        fallback={
          <LoadingSkeleton />
        }
      >
        <FreeClasseGrid searchParams={searchParams} />
      </Suspense>
    </section>
  );
};

export default FreeClassesPage;
