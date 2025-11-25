"use server";

import { deleteFaq, SingleFaqResponse } from "@/apiServices/faqsService";

const DeleteFaqAction = async (id: number): Promise<SingleFaqResponse> => {
  try {
    const result: SingleFaqResponse = await deleteFaq(id);

    return {
      success: true,
      message: result?.message || "FAQ deleted successfully",
      data: null,
      code: result.code ?? 200,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong!";

    return {
      success: false,
      message,
      data: null,
      code: 500,
    };
  }
};

export default DeleteFaqAction;
