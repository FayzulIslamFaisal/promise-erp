"use client";

import CourseAddForm from "@/components/lms/courses/CourseAddForm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createCourse } from "@/apiServices/courseService";

export default function AddCoursePage() {
  const router = useRouter();

  const handleAddCourse = async (
    formData: FormData,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    try {
      const result = await createCourse(formData);

      if (result.success) {
        toast.success("Course added successfully!");
        resetForm();
        router.push("/lms/courses"); // Redirect to courses list
      } else {
        toast.error(result.message || "Failed to add course.");
        if (result.errors) {
          for (const key in result.errors) {
            setFormError(key, result.errors[key][0]);
          }
        }
        console.log(result);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error("Error adding course:", error);
    }
  };

  return (
    <div>
      <CourseAddForm title="Add New Course" onSubmit={handleAddCourse} />
    </div>
  );
}
