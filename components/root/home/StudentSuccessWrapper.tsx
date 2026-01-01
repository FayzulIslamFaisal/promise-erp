import SectionTitle from "@/components/common/SectionTitle";
import StudentSuccessStories from "./StudentSuccessStories";
import { fetchPublicFeaturedReviews } from "@/apiServices/homePageService";

const StudentSuccessWrapper = async () => {

  const params = {
    per_page: 4,
    page: 1,
  };

  const reviewsData = await fetchPublicFeaturedReviews({ params });
  return (
    <section
      className="py-8 md:py-14  bg-cover bg-no-repeat bg-center min-h-[600px] relative"
      style={{ backgroundImage: "url('/images/home/success-story-bg.png')" }}
    >
      <div className="container mx-auto px-4">
        <SectionTitle
          title={reviewsData?.data?.section_title}
          subtitle={reviewsData?.data?.section_subtitle}
          iswhite={false}
        />

        <StudentSuccessStories reviewsData={reviewsData} />
      </div>
    </section>
  );
};

export default StudentSuccessWrapper;
