import { Suspense } from "react";
import UpcomingCourseWrapper from "@/components/student-dashboard/UpcomingCourseWrapper";
import DashboardLoadingSkeleton from "@/components/common/DashboardLoadingSkeleton";
export interface UpcomingCoursesParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
const UpcomingCoursesPage =  ({searchParams}: UpcomingCoursesParams) => {

  return (
    <section className="py-4 px-4">
      <h2 className="text-3xl font-bold text-center text-secondary mb-6">
        Upcoming Courses
      </h2>
      <Suspense fallback={<DashboardLoadingSkeleton />}>
        <UpcomingCourseWrapper searchParams={searchParams} />
      </Suspense>
    </section>
  );
};

export default UpcomingCoursesPage;
