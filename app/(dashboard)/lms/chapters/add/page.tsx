// frontend/app/(dashboard)/lms/chapters/add/page.tsx

import { Batch, getBatches } from "@/apiServices/batchService";
import { Course, getCourses } from "@/apiServices/courseService";
import { getBranches } from "@/apiServices/branchService";
import { Branch } from "@/apiServices/districtService";
import ChapterForm from "@/components/lms/chapters/ChapterForm";

export default async function ChapterAddPage() {
  const [batchRes, courseRes, branchRes] = await Promise.all([
    getBatches(),
    getCourses(),
    getBranches(),
  ]);

  const batches: Batch[] = batchRes?.data?.batches || [];
  const courses: Course[] = courseRes?.data?.courses || [];
  const branches: Branch[] = branchRes?.data?.branches || [];

  return (
    <ChapterForm
      title="Add Chapter"
      batches={batches}
      courses={courses}
      branches={branches}
    />
  );
}
