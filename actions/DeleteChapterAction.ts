"use server";

import { deleteChapter, SingleChapterResponse } from "@/apiServices/chaptersService";

const DeleteChapterAction = async (id: number): Promise<SingleChapterResponse> => {
  try {
    const result: SingleChapterResponse = await deleteChapter(id);

    return {
      success: true,
      message: result?.message || "Chapter deleted successfully",
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

export default DeleteChapterAction;
