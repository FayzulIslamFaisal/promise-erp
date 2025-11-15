"use client";
import CategoryForm from "@/components/lms/categories/CategoryForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCategory, SingleCategoryResponse } from "@/apiServices/categoryService";

const CategoryAddPage = () => {
  const router = useRouter();
  
  const handleSubmit = async (
    categoryData: FormData,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    try {
      const res: SingleCategoryResponse = await createCategory(categoryData); 

      console.log(res, "res");
      
      
      if (res?.success) {
        toast.success(res.message || "Category added successfully!");
        resetForm();
        router.push("/lms/categories");
      }else if (res?.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setFormError(field, messages[0]);
          }
        });
        toast.error("Please fix the errors below.");
      }

      else {
        toast.error(res?.message || "Failed to add category.");
      }
    } catch(error: unknown) {
      console.error("Something went wrong. Try again later.", error);
      toast.error("Something went wrong. Try again later.");
    }
  };

  return (
    <CategoryForm title="Add Category" onSubmit={handleSubmit} />
  );
};

export default CategoryAddPage;