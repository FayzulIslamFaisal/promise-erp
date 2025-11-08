"use server";

import { DeleteCourse } from "@/apiServices/courseService";

interface ActionResponse {
  success: boolean;
  message: string;
}

const DeleteCourseAction = async (id: number): Promise<ActionResponse> => {
  try {
    const result = await DeleteCourse(id);
    return {
      success: true,
      message: result?.message || "Course deleted successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong!";
    return { success: false, message };
  }
};

export default DeleteCourseAction;
