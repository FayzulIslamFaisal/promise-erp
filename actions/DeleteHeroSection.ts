"use server";

import { deleteHeroSection, SingleHeroSectionResponse } from "@/apiServices/homePageAdminService";

const DeleteHeroSectionAction = async (id: number): Promise<SingleHeroSectionResponse> => {
  try {
    const result: SingleHeroSectionResponse = await deleteHeroSection(id);
    return {
      success: !!result?.success,
      message: result?.message || (result?.success ? "Hero section deleted successfully" : "Delete failed"),
      code: result?.code,
      errors: result?.errors,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong!";
    return { success: false, message, code: 500 };
  }
};

export default DeleteHeroSectionAction;
