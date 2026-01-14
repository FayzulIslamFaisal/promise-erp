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
import { createVideoGallery, VideoGallery, updateVideoGallery } from "@/apiServices/homePageAdminService";
import { Camera } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface VideoGalleryFormProps {
  title: string;
  videoGallery?: VideoGallery;
}

interface FormValues {
  youtube_link: string;
  type: string;
  status: string;
  thumbnail_image?: FileList;
}

export default function VideoGalleryForm({ title, videoGallery }: VideoGalleryFormProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(videoGallery?.thumbnail_image || null);
  const router = useRouter();
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

    try {
      let res;
      if (videoGallery) {
        res = await updateVideoGallery(Number(videoGallery.id), formData);
      } else {
        res = await createVideoGallery(formData);
      }

      if (res.success) {
        toast.success(res.message || "Video gallery added successfully!");
        setPreviewImage(null);
        reset();
        router.push("/web-content/video-galleries");
        return;
      } else {
        if (res.errors) {
          toast.error(res.message || "Failed to add video gallery");
          Object.entries(res.errors).forEach(([field, messages]) => {
            const errorMessage = Array.isArray(messages) ? messages[0] : messages;
            setError(field as keyof FormValues, { type: "server", message: errorMessage as string });
          });
        } else {
          toast.error(res.message || "Failed to add video gallery");
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.error(error);
    }
  };

  const handleImageRemove = () => {
    setPreviewImage(null);
    const fileInput = document.getElementById("thumbnail_image") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="max-w-md mx-auto bg-card border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        {/* YouTube Link */}
        <div>
          <label className="block text-sm font-medium mb-1">YouTube Link</label>
          <Input
            placeholder="https://www.youtube.com/watch?v=..."
            {...register("youtube_link")}
          />
          {errors.youtube_link && <p className="text-sm text-red-500 mt-1">{errors.youtube_link.message}</p>}
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
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
          {errors.type && <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Active</SelectItem>
                  <SelectItem value="0">Inactive</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>}
        </div>

        {/* Thumbnail Image */}
        <div>
          <label className="block text-sm font-medium mb-1">Thumbnail Image (Optional)</label>
          <div className="space-y-3">
            {previewImage ? (
              <div className="relative">
                <div className="rounded-lg border-2 border-dashed">
                  <Image
                    src={previewImage}
                    alt="Thumbnail preview"
                    width={100}
                    height={100}
                    className="object-cover rounded-2xl"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={handleImageRemove}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Input id="thumbnail_image" type="file" accept="image/*" className="hidden" {...register("thumbnail_image")} />
                <label htmlFor="thumbnail_image" className="cursor-pointer block">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Camera className="w-6 h-6 text-gray-500" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">Click to upload image</p>
                  </div>
                </label>
              </div>
            )}
            {errors.thumbnail_image && <p className="text-sm text-red-500 mt-1">{errors.thumbnail_image.message}</p>}
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full cursor-pointer">
          {isSubmitting ? "Submitting..." : videoGallery ? "Update Video Gallery" : "Add Video Gallery"}
        </Button>
      </form>
    </div>
  );
}
