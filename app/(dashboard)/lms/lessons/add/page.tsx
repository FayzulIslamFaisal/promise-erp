import LessonForm from "@/components/lms/lessons/LessonForm";
import { getChapters } from "@/apiServices/chapterService";
import { getCourses } from "@/apiServices/courseService";
import { getBatches } from "@/apiServices/batchService";

export default async function AddLessonPage() {
  const [chaptersRes, coursesRes, batchesRes] = await Promise.all([
    getChapters(),
    getCourses(),
    getBatches(),
  ]);

  return (
    <LessonForm
      title="Add New Lesson"
      chapters={chaptersRes.data.chapters}
      courses={coursesRes?.data?.courses}
      batches={batchesRes.data.batches}
    />
  );
}
