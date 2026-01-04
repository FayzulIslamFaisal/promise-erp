import { Card, CardContent } from "@/components/ui/card";
import { CourseDetail } from "@/apiServices/courseDetailPublicService";

interface VideoSectionProps {
  course: CourseDetail;
}

export const VideoSection = ({ course }: VideoSectionProps) => {
  if (!course.video_link) return null;

  // Convert YouTube watch URL to embed URL for iframe compatibility
  const getEmbedUrl = (url: string) => {
    if (!url) return "";

    // Handle YouTube watch URLs - convert to embed format
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // Handle YouTube short URLs (youtu.be)
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // Handle Vimeo URLs
    if (url.includes("vimeo.com/")) {
      const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }

    // Return original URL if not YouTube or Vimeo
    return url;
  };

  const embedUrl = getEmbedUrl(course.video_link);

  return (
    <Card className="bg-muted/30 p-0">
      <CardContent className="p-0">
        <div className="rounded-lg animate-in fade-in duration-500 overflow-hidden">
          <iframe
            className="aspect-video max-h-[500px] w-full"
            src={embedUrl}
            title={`${course.title} - Course Preview Video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </CardContent>
    </Card>
  );
};
