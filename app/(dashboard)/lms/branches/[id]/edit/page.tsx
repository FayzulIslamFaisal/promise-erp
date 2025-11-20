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
    jsonData: any,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    try {
      const res: BranchResponseType = await updateBranch(
        resolvedParams.id,
        jsonData
      );

      if (res?.success) {
        toast.success(res.message || "Branch updated successfully!");
        router.push("/lms/branches");
      } else if (res?.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setFormError(field, messages[0]);
          } else if (typeof messages === "string") {
            setFormError(field, messages);
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
