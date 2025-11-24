import { Card, CardContent } from "@/components/ui/card";

export const VideoSection = () => {
  return (
    <Card className="bg-muted/30 p-0">
      <CardContent className="p-0">
        <div className="aspect-video w-full rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Course Preview Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
};
