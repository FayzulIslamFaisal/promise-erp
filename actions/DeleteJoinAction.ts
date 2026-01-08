"use server";

import { deleteJoin, SingleJoinResponse } from "@/apiServices/joinService";

const DeleteJoinAction = async (id: number): Promise<SingleJoinResponse> => {
  try {
    const result: SingleJoinResponse = await deleteJoin(id);

    if (!result.success) {
      console.error("Failed to delete join:", result.message);
      throw new Error(result.message);
    }

    return result;
  } catch (error : unknown) {
    console.error("DeleteJoinAction Error:", error);
  throw new Error(error instanceof Error ? error.message : "Failed to delete join");
  }
};

export default DeleteJoinAction;
