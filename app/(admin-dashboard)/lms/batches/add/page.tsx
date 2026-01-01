"use client";
import BatchForm from "@/components/lms/batches/BatchForm";
import { useRouter } from "next/navigation";
import { addBatch, Batch, CreateBatchRequest } from "@/apiServices/batchService";
import { handleFormErrors, handleFormSuccess } from "@/lib/formErrorHandler";
import { UseFormSetError } from "react-hook-form";
import { ApiErrorResponse } from "@/lib/apiErrorHandler";

const BatchAddPage = () => {
  const router = useRouter();

  const handleSubmit = async (
    formData: CreateBatchRequest,
    setFormError: (field: any, message: string) => void,
    resetForm: () => void
  ) => {
    const res = await addBatch(formData);

    if (res.success) {
      handleFormSuccess(res.message || "Batch added successfully!");
      resetForm();
      router.push("/lms/batches");
    } else {
      handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<Batch>);
    }
  };

  return (
    <BatchForm title="Add Batch" onSubmit={handleSubmit} />
  );
};

export default BatchAddPage;
