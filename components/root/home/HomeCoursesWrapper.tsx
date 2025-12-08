import SectionTitle from "@/components/common/SectionTitle";
import HomeCourses from "./HomeCourses";
import { getPublicCoursesList } from "@/apiServices/courseListPublicService";
interface HomeCoursesWrapperProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
const HomeCoursesWrapper = async ({ searchParams }: HomeCoursesWrapperProps) => {
  const queryParams = await searchParams;

  const params = {
    per_page: 16,
    branch_id: queryParams.branch_id ?? "1",
    sort_ratings: queryParams.sort_ratings ?? "ratings",
    page: queryParams.page ? Number(queryParams.page) : 1,
  };

  const coursesData = await getPublicCoursesList({ params });

  return (
    <section className="bg-white py-8 md:py-14">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={coursesData?.data?.section_title}
          subtitle={coursesData?.data?.section_subtitle}
          iswhite={false}
        />
          <HomeCourses coursesData={coursesData} />
      </div>
    </section>
  );
};

export default HomeCoursesWrapper;
