import SectionTitle from "@/components/common/SectionTitle";
import VideoStoriesCard from "./VideoStoriesCard";

const VideoStories = () => {
  return (
    <section className="bg-white py-8 md:py-14">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Stories of Progress"
          subtitle="Watch how our students are transforming their lives through learning."
          iswhite={false}
        />
        <VideoStoriesCard />

      </div>
    </section>
  );
};

export default VideoStories;
