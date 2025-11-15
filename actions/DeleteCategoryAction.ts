
"use server";

import { deleteCategory, SingleCategoryResponse } from "@/apiServices/categoryService";


const DeleteCategoryAction = async (id: number): Promise<SingleCategoryResponse> => {
  try {
    const result: SingleCategoryResponse = await deleteCategory(id);
    return {
      success: true,
      message: result?.message || "Category deleted successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong!";
    return { success: false, message };
  }
};

export default DeleteCategoryAction;
