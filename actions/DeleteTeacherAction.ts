"use server";

import { deleteTeacher } from "@/apiServices/teacherService";
interface ActionResponse {
  success: boolean;
  message: string;
}

const DeleteTeacherAction = async (id: number): Promise<ActionResponse> => {
  try {
    const result = await deleteTeacher(id);
    return {
      success: true,
      message: result?.message || "Student deleted successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong!";
    return { success: false, message };
  }
};

export default DeleteTeacherAction;
