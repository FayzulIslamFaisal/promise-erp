"use server";

import { deleteReview, SingleReviewResponse } from "@/apiServices/reviewService";

const DeleteReviewAction = async (id: number): Promise<SingleReviewResponse> => {
  try {
    const result: SingleReviewResponse = await deleteReview(id);

    return {
      success: !!result?.success,
      message:
        result?.message ||
        (result?.success ? "Review deleted successfully" : "Delete failed"),
      code: result?.code,
      errors: result?.errors,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong!";
    return { success: false, message, code: 500 };
  }
};

export default DeleteReviewAction;
