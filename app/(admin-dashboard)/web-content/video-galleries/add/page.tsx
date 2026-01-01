"use client";

import VideoGalleryForm from "@/components/web-content/video-galleries/VideoGalleryForm";
import { useRouter } from "next/navigation";
import { createVideoGallery } from "@/apiServices/homePageAdminService";
import { handleFormErrors, handleFormSuccess } from "@/lib/formErrorHandler";
import { UseFormSetError } from "react-hook-form";
import { ApiErrorResponse } from "@/lib/apiErrorHandler";

const VideoGalleryAddPage = () => {
    const router = useRouter();

    const handleSubmit = async (
        formData: FormData,
        setFormError: (field: string, message: string) => void,
        resetForm: () => void
    ) => {
        const res = await createVideoGallery(formData);

        if (res.success) {
            handleFormSuccess(res.message || "Video gallery created successfully");
            resetForm();
            router.push("/web-content/video-galleries");
        } else {
            handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<any>);
        }
    };

    return (
        <VideoGalleryForm title="Add Video Gallery" onSubmit={handleSubmit} />
    );
};

export default VideoGalleryAddPage;
