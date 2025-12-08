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
        <div className="rounded-lg animate-in fade-in duration-500 overflow-hidden">
          <iframe
            className="aspect-video max-h-[500px] w-full"
            src={course.video_link}
            title={`${course.title} - Course Preview Video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
};
