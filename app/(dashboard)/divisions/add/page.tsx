"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DivisionAddForm from "@/components/division/DivisionAddForm";
import { addDivision,  DivisionResponseType } from "@/apiServices/divisionService";
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
    try {
      const res: DivisionResponseType = await addDivision(formData);

      if (res?.success) {
        toast.success(res.message || "Division added successfully!");
        resetForm();
        router.push("/divisions");
      } 
      else if (res?.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setFormError(field, messages[0]);
          }
        });
        toast.error("Please fix the errors below.");
      } 
      else {
        toast.error(res?.message || "Failed to add division.");
      }
    } catch(error: unknown) {
      console.error("Something went wrong. Try again later.", error);
      toast.error("Something went wrong. Try again later.");
    }
  };

  return <DivisionAddForm title="Add New Division" onSubmit={handleSubmit} />;
}
