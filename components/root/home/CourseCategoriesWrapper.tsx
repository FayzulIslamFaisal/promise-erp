import { getHomeCourseCategories } from "@/apiServices/categoryService";
import CourseCategoriesSection from "./CourseCategoriesSection";
import SectionTitle from "@/components/common/SectionTitle";
import { HomesearchParamsProps } from "@/app/(root)/page";

const CourseCategoriesWrapper = async ({
  searchParams,
}: HomesearchParamsProps) => {
  const resolvedSearchParams = await searchParams;

  const params = {
    limit: 8,
    page: resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1,
  };
  const categoriesData = await getHomeCourseCategories({ params });

  return (
    <section className="bg-secondary py-8 md:py-14">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={categoriesData?.data?.section_title}
          subtitle={categoriesData?.data?.section_subtitle}
          iswhite={true}
        />
        
          <CourseCategoriesSection categoriesData={categoriesData} />
      </div>
    </section>
  );
};

export default CourseCategoriesWrapper;
