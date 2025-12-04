"use client";

import { addBranch } from "@/apiServices/branchService";
import { useRouter } from "next/navigation";
import BranchForm from "@/components/lms/branches/BranchAddForm";
import { handleFormErrors, handleFormSuccess } from "@/lib/formErrorHandler";
import { UseFormSetError } from "react-hook-form";
import { ApiErrorResponse } from "@/lib/apiErrorHandler";

export default function AddBranchPage() {
  const router = useRouter();

  const handleSubmit = async (
    formData: any | FormData,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    const res = await addBranch(formData);

    if (res.success) {
      handleFormSuccess(res.message || "Branch added successfully!");
      resetForm();
      router.push("/lms/branches");
    } else {
      handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<any>);
    }
  };

  return <BranchForm title="Add New Branch" onSubmit={handleSubmit} />;
}
