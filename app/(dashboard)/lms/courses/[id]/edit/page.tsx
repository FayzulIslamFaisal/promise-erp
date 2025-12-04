"use client";

import {
  getCourseById,
  Course,
  updateCourse,
} from "@/apiServices/courseService";
import CourseAddForm from "@/components/lms/courses/CourseAddForm";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { handleFormErrors, handleFormSuccess } from "@/lib/formErrorHandler";
import { UseFormSetError } from "react-hook-form";
import { ApiErrorResponse } from "@/lib/apiErrorHandler";

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
        if (response.success && response.data) {
          setCourse(response.data);
        } else {
          setError(response.message || "Course not found");
        }
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
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    const res = await updateCourse(resolvedParams.id, formData);

    if (res.success) {
      handleFormSuccess(res.message || "Course updated successfully!");
      router.push("/lms/courses");
    } else {
      handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<any>);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  if (!course) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <CourseAddForm title="Edit Course" onSubmit={handleSubmit} initialData={course} />
  );
}
