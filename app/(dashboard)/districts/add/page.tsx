"use client";
import DistrictForm from "@/components/districts/DistrictForm";
import { useRouter } from "next/navigation";
import { addDistrict, DistrictFormData } from "@/apiServices/districtService";
import { handleFormErrors, handleFormSuccess } from "@/lib/formErrorHandler";
import { UseFormSetError } from "react-hook-form";
import { ApiErrorResponse } from "@/lib/apiErrorHandler";

const DistrictAddPage = () => {
  const router = useRouter();
  
  const handleSubmit = async (
    districtData: DistrictFormData,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    const res = await addDistrict(districtData);

    if (res.success) {
      handleFormSuccess(res.message || "District added successfully!");
      resetForm();
      router.push("/districts");
    } else {
      handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<any>);
    }
  };

  return (
    <DistrictForm title="Add District" onSubmit={handleSubmit} />
  );
};

export default DistrictAddPage;