import SectionTitle from "@/components/common/SectionTitle";
import TeacherListSection from "./TeacherListSection";
import { fetchAllPublicTeachers } from "@/apiServices/homePageService";
import { cacheTag } from "next/cache";

const TeacherListWrapper = async () => {
  "use cache";
  cacheTag("public-teachers");
  const teacherData = await fetchAllPublicTeachers();

  return (
    <section className="py-8 md:py-14 bg-secondary/5">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={teacherData?.data?.section_title}
          subtitle={teacherData?.data?.section_subtitle}
          iswhite={false}
        />
        
          <TeacherListSection teacherData={teacherData} />
      </div>
    </section>
  );
};

export default TeacherListWrapper;
