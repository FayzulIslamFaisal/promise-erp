import CourseCreationWizard from "@/components/lms/courses/CourseCreationWizard";

export default function AddCoursePage() {
  // This stays server-side. The wizard is client-side.
  return (
    <div className="py-10">
      <CourseCreationWizard />
    </div>
  );
}
