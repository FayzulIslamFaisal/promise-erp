"use client";
import GroupForm from "@/components/lms/groups/GroupForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addGroup, AddGroupApiResponse, GroupFormData } from "@/apiServices/groupService";

const GroupAddPage = () => {
  const router = useRouter();
  
  const handleSubmit = async (
    groupData: GroupFormData,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    try {
      const res: AddGroupApiResponse = await addGroup(groupData); 
      
      if (res?.success) {
        toast.success(res.message || "Group added successfully!");
        resetForm();
        router.push("/lms/groups");
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
        toast.error(res?.message || "Failed to add group.");
      }
    } catch {
      toast.error("Something went wrong. Try again later.");
    }
  };

  return (
    <GroupForm title="Add Group" onSubmit={handleSubmit} />
  );
};

export default GroupAddPage;
