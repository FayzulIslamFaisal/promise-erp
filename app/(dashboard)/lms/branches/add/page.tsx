"use client";

import { addBranch, BranchResponseType } from "@/apiServices/branchService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BranchForm from "@/components/lms/branches/BranchAddForm";

export default function AddBranchPage() {
  const router = useRouter();

  const handleSubmit = async (
  formData: FormData,
  setFormError: (field: string, message: string) => void,
  resetForm: () => void
) => {
  try {
    const plainData = Object.fromEntries(formData.entries());

    const branch = {
      name: plainData.name as string,
      division_id: Number(plainData.division_id),
      address: plainData.address ? String(plainData.address) : null,
      phone: plainData.phone ? [String(plainData.phone)] : [],
      email: plainData.email ? [String(plainData.email)] : [],
      google_map: plainData.google_map ? String(plainData.google_map) : null,
      social_links: [],
    };

    const res = await addBranch(branch);

    if (res?.success) {
      toast.success(res.message || "Branch added successfully!");
      resetForm();
      router.push("/lms/branches");
    } else if (res?.errors) {
      Object.entries(res.errors).forEach(([field, messages]) => {
        if (Array.isArray(messages) && messages.length > 0) {
          setFormError(field, messages[0]);
        }
      });
      toast.error("Please fix the errors below.");
    } else {
      toast.error(res?.message || "Failed to add branch.");
    }
  } catch(error: unknown) {
      console.error("Something went wrong. Try again later.", error);
      toast.error("Something went wrong. Try again later.");
    }
};


  return <BranchForm title="Add New Branch" onSubmit={handleSubmit} />;
}
