import { getLessonById } from "@/apiServices/lessonService";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LessonDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const lessonRes = await getLessonById(id);
  const lesson = lessonRes.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lesson.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          <strong>BN Title:</strong> {lesson.bn_title}
        </p>
        <p>
          <strong>Description:</strong> {lesson.description}
        </p>
        <p>
          <strong>BN Description:</strong> {lesson.bn_description}
        </p>
        <p>
          <strong>Duration:</strong> {lesson.duration} minutes
        </p>
        <p>
          <strong>Type:</strong> {lesson.type_text}
        </p>
        <p>
          <strong>Video URL:</strong>{" "}
          <a href={lesson.video_url} target="_blank" rel="noopener noreferrer">
            {lesson.video_url}
          </a>
        </p>
        <p>
          <strong>Order:</strong> {lesson.order}
        </p>
        <p>
          <strong>Preview:</strong>{" "}
          <Badge variant={lesson.is_preview ? "default" : "secondary"}>
            {lesson.is_preview ? "Yes" : "No"}
          </Badge>
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <Badge className={lesson.status === 1 ? "bg-green-600" : "bg-red-600"}>
            {lesson.status_text}
          </Badge>
        </p>
        <p>
          <strong>Chapter:</strong> {lesson.chapter.title}
        </p>
      </CardContent>
    </Card>
  );
}
