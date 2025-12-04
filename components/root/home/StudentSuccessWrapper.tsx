import { HomesearchParamsProps } from "@/app/(root)/page";
import SectionTitle from "@/components/common/SectionTitle";
import StudentSuccessStories from "./StudentSuccessStories";
import { fetchPublicFeaturedReviews } from "@/apiServices/homePageService";

const StudentSuccessWrapper = async ({
  searchParams,
}: HomesearchParamsProps) => {
  const queryParams = await searchParams;
  const page = queryParams.page ? Number(queryParams.page) : 1;
  const params = {
    per_page: queryParams.per_page ? queryParams.per_page : "20",
  };

  const reviewsData = await fetchPublicFeaturedReviews({ page, params });
  return (
    <section
      className="py-8 md:py-14  bg-cover bg-no-repeat bg-center min-h-[600px] relative"
      style={{ backgroundImage: "url('/images/home/success-story-bg.png')" }}
    >
      <div className="container mx-auto px-4">
        <SectionTitle
          title="আমাদের শিক্ষার্থীদের সাফল্যের গল্প শুনুন"
          subtitle="দেখুন কীভাবে আমাদের কোর্সগুলো তাদের জীবন ও ক্যারিয়ারে নতুন সুযোগ তৈরি করেছে!"
          iswhite={false}
        />

        <StudentSuccessStories reviewsData={reviewsData} />
      </div>
    </section>
  );
};

export default StudentSuccessWrapper;
