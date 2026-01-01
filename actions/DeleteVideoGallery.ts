"use server";
import { deleteVideoGallery, SingleVideoGalleryResponse } from "@/apiServices/homePageAdminService";

const DeleteVideoGalleryAction = async (id: number): Promise<SingleVideoGalleryResponse> => {
    try {
        const result: SingleVideoGalleryResponse = await deleteVideoGallery(id);
        return {
            success: !!result?.success,
            message: result?.message || (result?.success ? "Video gallery deleted successfully" : "Delete failed"),
            code: result?.code,
            errors: result?.errors,
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Something went wrong!";
        return { success: false, message, code: 500 };
    }
};

export default DeleteVideoGalleryAction;


