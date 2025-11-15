"use client";

import {
  getBranchById,
  updateBranch,
  Branch,
  BranchResponseType,
} from "@/apiServices/branchService";
import BranchForm from "@/components/lms/branches/BranchAddForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState, use } from "react";

export default function EditBranchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params); // ✅ unwrap the params promise
  const [branch, setBranch] = useState<Branch | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (
    formData: FormData,
    setFormError: (field: string, message: string) => void
  ) => {
    try {
      const res: BranchResponseType = await updateBranch(
        resolvedParams.id,
        formData
      );

      if (res?.success) {
        toast.success(res.message || "Branch updated successfully!");
        router.push("/lms/branches");
      } else if (res?.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setFormError(field, messages[0]);
          }
        });
        toast.error("Please fix the errors below.");
      } else {
        toast.error(res?.message || "Failed to update branch.");
      }
    } catch(error: unknown) {
      console.error("Something went wrong. Try again later.", error);
      toast.error("Something went wrong. Try again later.");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
console.log(branch,"edit branch");

  return (
    <BranchForm
      title="Edit Branch"
      onSubmit={handleSubmit}
      initialData={branch}
    />
  );
}
