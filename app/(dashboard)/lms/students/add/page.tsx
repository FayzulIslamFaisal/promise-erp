"use client";

import { addStudent } from "@/apiServices/studentService";
import { useRouter } from "next/navigation";
import UserForm from "@/components/common/UserForm";
import { handleFormErrors, handleFormSuccess } from "@/lib/formErrorHandler";
import { UseFormSetError } from "react-hook-form";
import { ApiErrorResponse } from "@/lib/apiErrorHandler";

export default function AddStudentPage() {
  const router = useRouter();

  const handleSubmit = async (
    formData: FormData,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    const res = await addStudent(formData);

    if (res.success) {
      handleFormSuccess(res.message || "Student added successfully!");
      resetForm();
      router.push("/lms/students");
    } else {
      handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<any>);
    }
  };

  return <UserForm title="Add New Student" onSubmit={handleSubmit} />;
}
