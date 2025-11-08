// src/actions/DeleteBranchAction.ts
"use server";

import { deleteBranch } from "@/apiServices/branchService";

interface ActionResponse {
  success: boolean;
  message: string;
}

const DeleteBranchAction = async (id: number): Promise<ActionResponse> => {
  try {
    const result = await deleteBranch(id);
    return {
      success: true,
      message: result?.message || "Branch deleted successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong!";
    return { success: false, message };
  }
};

export default DeleteBranchAction;
