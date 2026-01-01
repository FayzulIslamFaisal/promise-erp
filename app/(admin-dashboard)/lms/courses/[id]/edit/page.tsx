import CourseEditWizard from '@/components/lms/courses/CourseEditWizard';

interface EditCoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { id } = await params;

  return <CourseEditWizard courseId={id} />;
}
