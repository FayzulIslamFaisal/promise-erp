import { Card, CardContent } from "@/components/ui/card";
import { CourseDetail } from "@/apiServices/courseDetailPublicService";

interface VideoSectionProps {
  course: CourseDetail;
}

export const VideoSection = ({ course }: VideoSectionProps) => {
  if (!course.video_link) return null;

  return (
    <Card className="bg-muted/30 p-0">
      <CardContent className="p-0">
        <div className="aspect-video w-full rounded-lg overflow-hidden animate-in fade-in duration-500">
          <iframe
            width="100%"
            height="100%"
            src={course.video_link}
            title={`${course.title} - Course Preview Video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
};
