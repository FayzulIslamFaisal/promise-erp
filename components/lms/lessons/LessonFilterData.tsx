import { getBatches } from "@/apiServices/batchService";
import { getCourses } from "@/apiServices/courseService";
import { getChapters } from "@/apiServices/chapterService"; // This will be created later
import LessonFilter from "./LessonFilter"; // This will be created later

export default async function LessonFilterData() {
  const [chaptersRes, coursesRes, batchesRes] = await Promise.all([
    getChapters(),
    getCourses(),
    getBatches(),
  ]);

  return (
    <LessonFilter
      chapters={chaptersRes.data.chapters}
      courses={coursesRes?.data?.courses}
      batches={batchesRes.data.batches}
    />
  );
}
