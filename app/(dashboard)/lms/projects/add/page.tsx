import ProjectForm, { Batch, Course } from "@/components/lms/courseProject/ProjectForm";
import { getBatches } from "@/apiServices/batchService";
import { getCourses } from "@/apiServices/courseService";

export default async function ProjectAddPage() {
  const batchRes = await getBatches();
  const courseRes = await getCourses();

  const batches: Batch[] = batchRes?.data?.batches || [];
  const courses: Course[] = courseRes?.data?.courses || [];

  return (
    <ProjectForm
      title="Add Project"
      batches={batches}
      courses={courses}
    />
  );
}
