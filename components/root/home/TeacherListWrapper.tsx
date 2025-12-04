import SectionTitle from "@/components/common/SectionTitle";
import TeacherListSection from "./TeacherListSection";
import { fetchAllPublicTeachers } from "@/apiServices/homePageService";
import { HomesearchParamsProps } from "@/app/(root)/page";

const TeacherListWrapper = async ({ searchParams }: HomesearchParamsProps) => {
  const queryParams = await searchParams;
  const page =
    typeof queryParams.page === "string" ? Number(queryParams.page) : 1;

  const params = {
    per_page: 20,
  };

  const teacherData = await fetchAllPublicTeachers({ page, params });

  return (
    <section className="py-8 md:py-14 bg-secondary/5">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Our Expert Teachers"
          subtitle="Learn real-world skills from experienced trainers."
          iswhite={false}
        />
        
          <TeacherListSection teacherData={teacherData} />
      </div>
    </section>
  );
};

export default TeacherListWrapper;
