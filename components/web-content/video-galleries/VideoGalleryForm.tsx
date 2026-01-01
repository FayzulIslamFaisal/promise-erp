"use client";

import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";
import { VideoGallery } from "@/apiServices/homePageAdminService";

interface VideoGalleryFormProps {
    title: string;
    onSubmit: (
        formData: FormData,
        setFormError: (field: string, message: string) => void,
        resetForm: () => void
    ) => void | Promise<void>;
    videoGallery?: VideoGallery;
}

interface FormValues {
    youtube_link: string;
    type: string;
    status: string;
    thumbnail_image?: FileList;
}

export default function VideoGalleryForm({ title, onSubmit, videoGallery }: VideoGalleryFormProps) {
    const [previewImage, setPreviewImage] = useState<string | null>(videoGallery?.thumbnail_image || null);

    const {
        register,
        handleSubmit,
        setError,
        control,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        defaultValues: {
            youtube_link: videoGallery?.youtube_link || "",
            type: videoGallery?.type.toString() || "0",
            status: videoGallery?.status.toString() || "1",
            thumbnail_image: undefined,
        },
    });

    const imageFile = watch("thumbnail_image");

    const setFormError = (field: string, message: string) => {
        setError(field as keyof FormValues, { type: "server", message });
    };

    useEffect(() => {
        if (videoGallery) {
            reset({
                youtube_link: videoGallery.youtube_link,
                type: videoGallery.type.toString(),
                status: videoGallery.status.toString(),
            });
            if (videoGallery.thumbnail_image) setPreviewImage(videoGallery.thumbnail_image);
        }
    }, [videoGallery, reset]);

    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            const file = imageFile[0];
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => setPreviewImage(e.target?.result as string);
                reader.readAsDataURL(file);
            }
        }
    }, [imageFile]);

    const submitHandler = async (values: FormValues) => {
        const formData = new FormData();
        formData.append("youtube_link", values.youtube_link.trim());
        formData.append("type", values.type);
        formData.append("status", values.status);

        if (values.thumbnail_image && values.thumbnail_image.length > 0) {
            formData.append("thumbnail_image", values.thumbnail_image[0]);
        }

        await onSubmit(formData, setFormError, () => {
            reset();
            setPreviewImage(null);
        });
    };

    const handleImageRemove = () => {
        setPreviewImage(null);
        const fileInput = document.getElementById("thumbnail_image") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    return (
        <div className="w-full min-h-screen bg-background p-4 md:p-8 flex justify-center">
            <div className="w-full max-w-2xl bg-card border rounded-2xl p-6 md:p-8 shadow-sm h-fit">
                <h2 className="text-2xl font-semibold mb-8 text-center">{title}</h2>
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
                    <div className="space-y-4">
                        {/* YouTube Link */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">YouTube Link</label>
                            <Input
                                placeholder="https://www.youtube.com/watch?v=..."
                                {...register("youtube_link", { required: "YouTube link is required" })}
                            />
                            {errors.youtube_link && <p className="text-xs text-red-500">{String(errors.youtube_link.message)}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Type */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Type</label>
                                <Controller
                                    name="type"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0">Video</SelectItem>
                                                <SelectItem value="1">Success</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.type && <p className="text-xs text-red-500">{String(errors.type.message)}</p>}
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Status</label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Active</SelectItem>
                                                <SelectItem value="0">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.status && <p className="text-xs text-red-500">{String(errors.status.message)}</p>}
                            </div>
                        </div>

                        {/* Thumbnail */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Thumbnail Image (Optional)</label>
                            <div className="space-y-3">
                                {previewImage ? (
                                    <div className="relative group w-full aspect-video rounded-lg border-2 border-dashed overflow-hidden">
                                        <Image
                                            src={previewImage}
                                            alt="Thumbnail preview"
                                            fill
                                            className="object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                            onClick={handleImageRemove}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="rounded-lg border-2 border-dashed p-10 flex flex-col items-center justify-center bg-muted/50">
                                        <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                                        <p className="text-sm text-muted-foreground text-center">
                                            No image selected.<br />If left empty, YouTube thumbnail will be used.
                                        </p>
                                    </div>
                                )}
                            </div>
                            <Input
                                id="thumbnail_image"
                                type="file"
                                accept="image/*"
                                className="mt-2"
                                {...register("thumbnail_image")}
                            />
                            {errors.thumbnail_image && <p className="text-xs text-red-500">{String(errors.thumbnail_image.message)}</p>}
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button type="submit" disabled={isSubmitting} className="h-11 px-8 text-lg font-semibold cursor-pointer">
                            {isSubmitting ? "Submitting..." : videoGallery ? "Update Video Gallery" : "Create Video Gallery"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
