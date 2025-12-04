"use client";

import { useRouter } from "next/navigation";
import DivisionAddForm from "@/components/division/DivisionAddForm";
import { addDivision } from "@/apiServices/divisionService";
import { handleFormErrors, handleFormSuccess } from "@/lib/formErrorHandler";
import { UseFormSetError } from "react-hook-form";
import { ApiErrorResponse } from "@/lib/apiErrorHandler";

interface DivisionFormData {
  name: string;
}

export default function AddPage() {
  const router = useRouter();

  const handleSubmit = async (
    formData: DivisionFormData,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    const res = await addDivision(formData);

    if (res.success) {
      handleFormSuccess(res.message || "Division added successfully!");
      resetForm();
      router.push("/divisions");
    } else {
      handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<any>);
    }
  };

  return <DivisionAddForm title="Add New Division" onSubmit={handleSubmit} />;
}
