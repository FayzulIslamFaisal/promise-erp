// src/actions/DeleteCourseProjectAction.ts
"use server";

import { deleteCourseProject } from "@/apiServices/courseProjectsService";

interface ActionResponse {
  success: boolean;
  message: string;
}

const DeleteCourseProjectAction = async (id: number): Promise<ActionResponse> => {
  try {
    const result = await deleteCourseProject(id);
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

export default DeleteCourseProjectAction;
