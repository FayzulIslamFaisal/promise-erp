"use client";

import { addStudent, StudentResponseType } from "@/apiServices/studentService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import UserForm from "@/components/common/UserForm";

export default function AddStudentPage() {
  const router = useRouter();

  const handleSubmit = async (
    formData: FormData,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    try {
      const res: StudentResponseType = await addStudent(formData);

      if (res?.success) {
        toast.success(res.message || "Student added successfully!");
        resetForm();
        router.push("/lms/students");
      } else if (res?.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setFormError(field, messages[0]);
          }
        });
        toast.error("Please fix the errors below.");
      } else {
        toast.error(res?.message || "Failed to add student.");
      }
    } catch {
      toast.error("Something went wrong. Try again later.");
    }
  };

  return <UserForm title="Add New Student" onSubmit={handleSubmit} />;
}
