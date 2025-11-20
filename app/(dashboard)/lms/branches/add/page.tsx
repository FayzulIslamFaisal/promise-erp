"use client";

import { addBranch } from "@/apiServices/branchService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BranchForm from "@/components/lms/branches/BranchAddForm";

export default function AddBranchPage() {
  const router = useRouter();

  const handleSubmit = async (
    jsonData: any,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    try {
      const res = await addBranch(jsonData);

      if (res?.success) {
        toast.success(res.message || "Branch added successfully!");
        resetForm();
        router.push("/lms/branches");
      } else if (res?.errors) {
        // Display server validation errors in the form
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setFormError(field, messages[0]);
          } else if (typeof messages === "string") {
            setFormError(field, messages);
          }
        });
        toast.error("Please fix the errors below.");
      } else {
        toast.error(res?.message || "Failed to add branch.");
      }
    } catch (error) {
      console.error("Something went wrong. Try again later.", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred."
      );
    }
  };

  return <BranchForm title="Add New Branch" onSubmit={handleSubmit} />;
}
