import LessonForm from "@/components/lms/lessons/LessonForm";
import { getSimpleChapters } from "@/apiServices/chaptersService";
import { getCourses } from "@/apiServices/courseService";
import { getBatches } from "@/apiServices/batchService";
import { getLessonById } from "@/apiServices/lessonService";

export default async function EditLessonPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const [lessonRes, chaptersRes, coursesRes, batchesRes] = await Promise.all([
    getLessonById(id),
    getSimpleChapters(),
    getCourses(),
    getBatches(),
  ]);

  return (
    <LessonForm
      title="Edit Lesson"
      lesson={lessonRes.data}
      chapters={chaptersRes.data.chapters}
      courses={coursesRes?.data?.courses}
      batches={batchesRes.data.batches}
    />
  );
}
