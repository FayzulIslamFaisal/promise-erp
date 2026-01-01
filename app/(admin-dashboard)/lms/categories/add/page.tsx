"use client";
import CategoryForm from "@/components/lms/categories/CategoryForm";
import { useRouter } from "next/navigation";
import { createCategory } from "@/apiServices/categoryService";
import { handleFormErrors, handleFormSuccess } from "@/lib/formErrorHandler";
import { UseFormSetError } from "react-hook-form";
import { ApiErrorResponse } from "@/lib/apiErrorHandler";

const CategoryAddPage = () => {
  const router = useRouter();
  
  const handleSubmit = async (
    categoryData: FormData,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    const res = await createCategory(categoryData);

    if (res.success) {
      handleFormSuccess(res.message || "Category added successfully!");
      resetForm();
      router.push("/lms/categories");
    } else {
      handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<any>);
    }
  };

  return (
    <CategoryForm title="Add Category" onSubmit={handleSubmit} />
  );
};

export default CategoryAddPage;