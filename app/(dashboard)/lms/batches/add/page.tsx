
"use client";
import BatchForm from "@/components/lms/batches/BatchForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addBatch } from "@/apiServices/batchService";

const BatchAddPage = () => {
  const router = useRouter();
  
  const handleSubmit = async (
    batchData: any,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    try {
      const res: any = await addBatch(batchData); 
      
      if (res?.success) {
        toast.success(res.message || "Batch added successfully!");
        resetForm();
        router.push("/lms/batches");
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
        toast.error(res?.message || "Failed to add batch.");
      }
    } catch {
      toast.error("Something went wrong. Try again later.");
    }
  };

  return (
    <BatchForm title="Add Batch" onSubmit={handleSubmit} />
  );
};

export default BatchAddPage;
