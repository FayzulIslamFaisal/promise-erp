import {
  fetchPublicVideoGalleries,
  SuccessStoryItem,
} from "@/apiServices/homePageService";
import SectionTitle from "@/components/common/SectionTitle";
import dynamic from "next/dynamic";
const VideoStoriesCard = dynamic(() => import("./VideoStoriesCard"));

const VideoStories = async () => {

  const storyData = await fetchPublicVideoGalleries();
  const stories: SuccessStoryItem[] = storyData?.data?.video_galleries || [];

  return (
    <section className="bg-white py-8 md:py-14">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={storyData?.data?.section_title}
          subtitle={storyData?.data?.section_subtitle}
          iswhite={false}
        />
        <VideoStoriesCard stories={stories} />
      </div>
    </section>
  );
};

export default VideoStories;
