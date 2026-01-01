"use server";

import { deleteJoin, SingleJoinResponse } from "@/apiServices/joinService";

const DeleteJoinAction = async (id: number): Promise<SingleJoinResponse> => {
  try {
    const result: SingleJoinResponse = await deleteJoin(id);

    return {
      success: !!result?.success,
      message:
        result?.message ||
        (result?.success ? "Join deleted successfully" : "Delete failed"),
      code: result?.code,
      errors: result?.errors,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong!";
    return { success: false, message, code: 500 } as SingleJoinResponse;
  }
};

export default DeleteJoinAction;
