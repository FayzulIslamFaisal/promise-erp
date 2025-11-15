"use server";

import { deleteGroup } from "@/apiServices/groupService";

interface ActionResponse {
  success: boolean;
  message: string;
  code?: number;
  data?: unknown;
}

const DeleteGroupAction = async (id: number): Promise<ActionResponse> => {
  try {
    const result = await deleteGroup(id);
    return {
      success: true,
      message: result?.message || "Group deleted successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong!";
    return { success: false, message };
  }
};

export default DeleteGroupAction;
