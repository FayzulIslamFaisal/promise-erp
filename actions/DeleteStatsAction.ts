// src/actions/statsActions.ts
"use server";

import { deleteStats } from "@/apiServices/statsService";

interface ActionResponse {
  success: boolean;
  message: string;
}

const DeleteStatsAction = async (id: number): Promise<ActionResponse> => {
  try {
    const result = await deleteStats(id);
    return {
      success: true,
      message: result?.message || "Statistics deleted successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong!";
    return { success: false, message };
  }
};

export default DeleteStatsAction;
