import { fetchPublicVideoGalleries, SuccessStoryItem } from "@/apiServices/homePageService";
import { HomesearchParamsProps } from "@/app/(root)/page";
import SectionTitle from "@/components/common/SectionTitle";
import dynamic from "next/dynamic";
const VideoStoriesCard = dynamic(
  () => import("./VideoStoriesCard")
);

const VideoStories = async({ searchParams }: HomesearchParamsProps) => {

  const queryParams = await searchParams;
  const page = queryParams.page ? Number(queryParams.page) : 1;
  const params = {
    type: queryParams.type ? queryParams.type : "1",
    per_page: queryParams.per_page ? queryParams.per_page : "4",
    page: page,
     
  };

  const storyData = await fetchPublicVideoGalleries({ params });
  const stories: SuccessStoryItem[] = storyData?.data?.video_galleries || [];
  console.log(stories, "stories");
  
  return (
    <section className="bg-white py-8 md:py-14">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Stories of Progress"
          subtitle="Watch how our students are transforming their lives through learning."
          iswhite={false}
        />
        <VideoStoriesCard stories={stories} />

      </div>
    </section>
  );
};

export default VideoStories;
