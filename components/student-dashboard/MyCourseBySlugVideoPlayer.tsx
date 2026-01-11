import { Play } from "lucide-react";
interface VideoPlayerProps {
  classNumber: string;
  lessonTitle: string;
  currentTopic: string;
  duration?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  description?: string;
}

const MyCourseBySlugVideoPlayer = ({
  classNumber,
  lessonTitle,
  currentTopic,
  duration,
  videoUrl,
  thumbnailUrl,
  description
}: VideoPlayerProps) => {

  return (
    <div className="course-card p-6">
      <div className="mb-4">
        <span className="text-primary font-medium text-sm">{classNumber}</span>
        <h2 className="text-xl font-semibold text-foreground mt-1">
          {lessonTitle}
        </h2>
      </div>

      <div className="mb-4">
        <p className="text-foreground font-medium text-lg mb-2">{currentTopic}</p>
        {duration && (
          <p className="text-sm text-muted-foreground mb-2">Duration: {duration}</p>
        )}
        {description && (
          <p className="text-sm text-foreground/80">{description}</p>
        )}
      </div>

      <div className="video-container relative">
        {videoUrl ? (
          // You can use a video player library here like react-player
          <div className="relative w-full h-[400px] bg-linear-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="play-button-circle mb-4 mx-auto">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                </div>
                <p className="text-white/60">Click to play video</p>
              </div>
            </div>
          </div>
        ) : thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt="Video thumbnail"
            className="w-full h-auto object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-[400px] bg-linear-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-center text-white/60">
              <p>Video content will be available soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourseBySlugVideoPlayer
