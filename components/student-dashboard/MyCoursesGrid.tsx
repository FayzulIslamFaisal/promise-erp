import { getStudentMyCourses } from "@/apiServices/studentDashboardService";
import EmptyCoursesState from "./EmptyCoursesState";
import MyCourseCard from "./MyCourseCard";

const MyCoursesGrid = async () => {
  const params = {
    per_page: 15,
    page: 1,
  };

  const response = await getStudentMyCourses({ params });
  const mockCourses = response?.data?.courses || [];

  return (
    <section className="py-4 px-4">
      {mockCourses.length === 0 ? (
        <EmptyCoursesState
          title="You haven’t enrolled in any course yet."
          description="Discover courses that match your skills and interests."
          buttonText="Explore Courses"
          buttonHref="/courses"
        />
      ) : (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
          {mockCourses.map((course) => (
            <MyCourseCard key={course?.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyCoursesGrid;
