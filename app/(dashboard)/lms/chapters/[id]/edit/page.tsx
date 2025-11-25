
import { Batch, getBatches } from "@/apiServices/batchService";
import { Course, getCourses } from "@/apiServices/courseService";
import { Branch, getBranches } from "@/apiServices/branchService";
import { getChapterById, Chapter } from "@/apiServices/chaptersService";
import ChapterForm from "@/components/lms/chapters/ChapterForm";


export default async function EditChapterPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const chapterId = Number(id);

  try {
    const [branchRes, courseRes, batchRes, chapterRes] = await Promise.all([
      getBranches(),
      getCourses(),
      getBatches(),
      getChapterById(chapterId),
    ]);

    const branches: Branch[] = branchRes?.data?.branches || [];
    const courses: Course[] = courseRes?.data?.courses || [];
    const batches: Batch[] = batchRes?.data?.batches || [];

    //  Correct chapter extraction
    const chapter = (chapterRes?.data ?? null) as Chapter | null;

    if (!chapter) return <div>No chapter found.</div>;

    return (
      <ChapterForm
        title="Edit Chapter"
        branches={branches}
        courses={courses}
        batches={batches}
        chapter={chapter}
      />
    );
  } catch (error: any) {
    return <div>Error: {error?.message || "Something went wrong."}</div>;
  }
}
