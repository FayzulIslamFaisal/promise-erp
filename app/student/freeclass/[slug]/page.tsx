import FreeClassBySlugSkeleton from "@/components/student-dashboard/FreeClassBySlugSkeleton";
import FreeClassBySlugWrapper from "@/components/student-dashboard/FreeClassBySlugWrapper";
import { Suspense } from "react";

interface FreeClassBySlug {
  params: Promise<{ slug: string }>;
}
const FreeClassDetailsPage = ({ params }: FreeClassBySlug) => {
  const slug = params;
  return (
    <section className="py-6 px-4">
      <Suspense fallback={<FreeClassBySlugSkeleton />}>
        <FreeClassBySlugWrapper paramsData={slug} />
      </Suspense>
    </section>
  );
};

export default FreeClassDetailsPage;
