import MyCourseBySlugWrapper from "@/components/student-dashboard/MyCourseBySlugWrapper";
import { Suspense } from "react";
interface MyCoursesBySlugPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}
const MyCourseBySlugPage =  ({
  params,
  searchParams,
}: MyCoursesBySlugPageProps) => {

  return (
    <Suspense fallback={<div className="text-center font-bold py-6">Loading...</div>}>
      <MyCourseBySlugWrapper params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default MyCourseBySlugPage;
