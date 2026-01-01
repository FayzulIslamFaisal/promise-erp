"use server";

import { deleteStudentEarning, DeleteStudentEarningResponse } from "@/apiServices/studentDashboardService";

const DeleteStudentEarningAction = async (id: number): Promise<DeleteStudentEarningResponse> => {
  try {
    const result: DeleteStudentEarningResponse = await deleteStudentEarning(id);
    return {
      success: !!result?.success,
      message: result?.message || (result?.success ? "Earning deleted successfully" : "Delete failed"),
      code: result?.code,
    };
  } catch (error: unknown) {
    console.error("DeleteStudentEarningAction Error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message, code: 500 };
    } else {
      return { success: false, message: "An unknown error occurred while deleting student earning", code: 500 };
    }
  }
};

export default DeleteStudentEarningAction;

