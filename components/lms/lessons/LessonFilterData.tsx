import { getBatches } from "@/apiServices/batchService";
import { getCourses } from "@/apiServices/courseService";
import { getSimpleChapters } from "@/apiServices/chaptersService";
import LessonFilter from "./LessonFilter"; // This will be created later

export default async function LessonFilterData() {
  const [chaptersRes, coursesRes, batchesRes] = await Promise.all([
    getSimpleChapters(),
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
