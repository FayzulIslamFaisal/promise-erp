// src/actions/lessonActions.ts
"use server";

import { deleteLesson } from "@/apiServices/lessonService";

interface ActionResponse {
  success: boolean;
  message: string;
}

const DeleteLessonAction = async (id: number): Promise<ActionResponse> => {
  try {
    const result = await deleteLesson(id);
    return {
      success: true,
      message: result?.message || "Lesson deleted successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong!";
    return { success: false, message };
  }
};

export default DeleteLessonAction;
