"use server";

import { deleteFacility } from "@/apiServices/facilitiesService";

type ActionResponse = {
  success: boolean;
  message: string;
};

const DeleteFacilityAction = async (id: number): Promise<ActionResponse> => {
  try {
    const result = await deleteFacility(id);

    if (result.errors) {
      return {
        success: false,
        message: result.message || "Failed to delete facility",
      };
    }

    return {
      success: true,
      message: result.message || "Facility deleted successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong!";

    return {
      success: false,
      message,
    };
  }
};

export default DeleteFacilityAction;
