"use client";

import {
  getCourseById,
  Course,
  updateCourse,
} from "@/apiServices/courseService";
import CourseAddForm from "@/components/lms/courses/CourseAddForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState, use } from "react";

export default function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseById(resolvedParams.id);
        setCourse(response.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };

    fetchCourse();
  }, [resolvedParams.id]);

  const handleSubmit = async (
    formData: FormData,
    setFormError: (field: string, message: string) => void
  ) => {
    const result = await updateCourse(resolvedParams.id, formData);

    if (result.success) {
      toast.success("Course updated successfully!");
      router.push("/lms/courses");
    } else {
      toast.error(result.message || "Failed to update course.");
      if (result.errors) {
        for (const key in result.errors) {
          setFormError(key, result.errors[key][0]);
        }
      }
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CourseAddForm
        title="Edit Course"
        onSubmit={handleSubmit}
        initialData={course}
      />
    </div>
  );
}
