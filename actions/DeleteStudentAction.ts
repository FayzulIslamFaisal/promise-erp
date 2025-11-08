// src/actions/studentActions.ts
"use server";

import { deleteStudent } from "@/apiServices/studentService";

interface ActionResponse {
  success: boolean;
  message: string;
}

const DeleteStudentAction = async (id: number): Promise<ActionResponse> => {
  try {
    const result = await deleteStudent(id);
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

export default DeleteStudentAction;