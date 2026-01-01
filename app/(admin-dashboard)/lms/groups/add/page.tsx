"use client";
import GroupForm from "@/components/lms/groups/GroupForm";
import { useRouter } from "next/navigation";
import { addGroup, GroupFormData } from "@/apiServices/groupService";
import { handleFormErrors, handleFormSuccess } from "@/lib/formErrorHandler";
import { UseFormSetError } from "react-hook-form";
import { ApiErrorResponse } from "@/lib/apiErrorHandler";

const GroupAddPage = () => {
  const router = useRouter();
  
  const handleSubmit = async (
    groupData: GroupFormData,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    const res = await addGroup(groupData);

    if (res.success) {
      handleFormSuccess(res.message || "Group added successfully!");
      resetForm();
      router.push("/lms/groups");
    } else {
      handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<any>);
    }
  };

  return (
    <GroupForm title="Add Group" onSubmit={handleSubmit} />
  );
};

export default GroupAddPage;
