"use client";
import DistrictForm from "@/components/districts/DistrictForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addDistrict, AddDistrictApiResponse, DistrictFormData } from "@/apiServices/districtService";

const DistrictAddPage = () => {
  const router = useRouter();
  
  const handleSubmit = async (
    districtData: DistrictFormData,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    try {
      const res: AddDistrictApiResponse = await addDistrict(districtData); 
      
      if (res?.success) {
        toast.success(res.message || "District added successfully!");
        resetForm();
        router.push("/districts");
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
        toast.error(res?.message || "Failed to add district.");
      }
    } catch {
      toast.error("Something went wrong. Try again later.");
    }
  };

  return (
    <DistrictForm title="Add District" onSubmit={handleSubmit} />
  );
};

export default DistrictAddPage;