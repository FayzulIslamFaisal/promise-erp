import EmptyCoursesState from "@/components/student-dashboard/EmptyCoursesState";
import dynamic from 'next/dynamic';
const UpcomingCategoryCarousel = dynamic(() => import('@/components/student-dashboard/UpcomingCategoryCarousel'));
import UpcomingCourseCard from "@/components/student-dashboard/UpcomingCourseCard";
import Pagination from "@/components/common/Pagination";
import {
  getUpcomingCourses,
  UpcomingCourse,
} from "@/apiServices/studentDashboardService";
import { UpcomingCoursesParams } from "@/app/student/upcomingcourses/page";
import NotFoundComponent from "@/components/common/NotFoundComponent";

const UpcomingCourseWrapper = async ({
  searchParams,
}: UpcomingCoursesParams) => {
  const queryParams = await searchParams;

  const params = {
    category_slug: queryParams.category_slug ?? "",
    per_page: queryParams.per_page ?? 16,
    page: queryParams.page ? Number(queryParams.page) : 1,
  };
  const upcomingCourses = await getUpcomingCourses({ params });
  const courses = upcomingCourses?.data?.courses || [];
  const categories = upcomingCourses?.data?.categories || [];

  if (courses.length === 0) {
    return <NotFoundComponent message={upcomingCourses?.message} title="Upcoming Course List" />;
  }

  return (
    <>
      {/* Cards */}
      {categories?.length > 0 &&
        <div className="px-4">
          <UpcomingCategoryCarousel categories={categories} />
        </div>
      }
      <div className="py-6 px-4">
        <div className="grid xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
          {courses?.map((course: UpcomingCourse, index: number) => (
            <UpcomingCourseCard key={index} course={course} />
          ))}
        </div>
      </div>
      {upcomingCourses?.data?.pagination?.per_page > 16 && (
        <Pagination pagination={upcomingCourses.data.pagination} />
      )}
    </>
  );
};

export default UpcomingCourseWrapper;
