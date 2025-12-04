"use client";

import {
  getBranchById,
  updateBranch,
  Branch,
} from "@/apiServices/branchService";
import BranchForm from "@/components/lms/branches/BranchAddForm";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { handleFormErrors, handleFormSuccess } from "@/lib/formErrorHandler";
import { UseFormSetError } from "react-hook-form";
import { ApiErrorResponse } from "@/lib/apiErrorHandler";

export default function EditBranchPage({params}: {params: Promise<{ id: string }>}) {
  //  unwrap the async params
  const resolvedParams = use(params);
  const router = useRouter();
  const [branch, setBranch] = useState<Branch | null>(null);
  const [error, setError] = useState<string | null>(null);

  //  Fetch branch by ID once params are resolved
  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const response = await getBranchById(resolvedParams.id);
        setBranch(response?.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };

    fetchBranch();
  }, [resolvedParams.id]);

  // Handle JSON form submit
  const handleSubmit = async (
    formData: { [key: string]: string | string[] | undefined },
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    const res = await updateBranch(resolvedParams.id, formData);

    if (res.success) {
      handleFormSuccess(res.message || "Branch updated successfully!");
      router.push("/lms/branches");
    } else {
      handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<Branch>);
    }
  };

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!branch) {
    return <div>Loading branch details...</div>;
  }

  return (
    <BranchForm
      title="Edit Branch"
      onSubmit={handleSubmit}
      initialData={branch}
    />
  );
}
