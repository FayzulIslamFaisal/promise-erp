"use client";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { createCommonSection, CommonSection, updateCommonSection } from "@/apiServices/homePageAdminService";
import { Camera } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/lms/courses/RichTextEditor";
import { Label } from "@/components/ui/label";

interface CommonSectionFormProps {
  title: string;
  commonSection?: CommonSection;
}

interface FormValues {
  title: string;
  sub_title: string;
  type: string;
  description: string;
  status: string;
  video_link: string;
  button_text_one: string;
  button_link_one: string;
  button_text_two: string;
  button_link_two: string;
  image?: FileList;
}

const SECTION_TYPES = [
  { value: "none", label: "None" },
  { value: "course_category", label: "Course Category" },
  { value: "service", label: "Service" },
  { value: "popular_course", label: "Popular Course" },
  { value: "govt_course", label: "Government Course" },
  { value: "opportunity", label: "Opportunity" },
  { value: "trainer", label: "Trainer" },
  { value: "video_gallery", label: "Video Gallery" },
  { value: "blog", label: "Blog" },
  { value: "success_story", label: "Success Story" },
  { value: "news_feed", label: "News Feed" },
  { value: "partner", label: "Partner" },
  { value: "news_letter", label: "News Letter" },
  { value: "branch", label: "Branch" },
];

export default function CommonSectionForm({ title, commonSection }: CommonSectionFormProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(commonSection?.image || null);
  const [imageRemoved, setImageRemoved] = useState(false);
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
      title: commonSection?.title || "",
      sub_title: commonSection?.sub_title || "",
      type: commonSection?.type || "none",
      description: commonSection?.description || "",
      status: commonSection?.status.toString() || "1",
      video_link: commonSection?.video_link || "",
      button_text_one: commonSection?.button_text_one || "",
      button_link_one: commonSection?.button_link_one || "",
      button_text_two: commonSection?.button_text_two || "",
      button_link_two: commonSection?.button_link_two || "",
      image: undefined,
    },
  });

  const imageFile = watch("image");

  // Update preview image when commonSection prop changes (for edit mode)
  useEffect(() => {
    if (commonSection?.image && commonSection.image.trim() !== "") {
      setPreviewImage(commonSection.image);
      setImageRemoved(false);
    } else {
      setPreviewImage(null);
    }
  }, [commonSection?.image]);

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewImage(e.target?.result as string);
          setImageRemoved(false); // Reset removal flag when new image is selected
        };
        reader.readAsDataURL(file);
      }
    }
  }, [imageFile]);

  const submitHandler = async (values: FormValues) => {
    const formData = new FormData();
    formData.append("title", values.title.trim());
    formData.append("sub_title", values.sub_title.trim());
    formData.append("type", values.type);
    formData.append("status", values.status);

    if (values.description) {
      formData.append("description", values.description);
    }
    if (values.video_link) {
      formData.append("video_link", values.video_link.trim());
    }
    if (values.button_text_one) {
      formData.append("button_text_one", values.button_text_one.trim());
    }
    if (values.button_link_one) {
      formData.append("button_link_one", values.button_link_one.trim());
    }
    if (values.button_text_two) {
      formData.append("button_text_two", values.button_text_two.trim());
    }
    if (values.button_link_two) {
      formData.append("button_link_two", values.button_link_two.trim());
    }

    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0]);
    } else if (commonSection && imageRemoved) {
      // If editing and image was removed, send empty string to delete it
      formData.append("image", "");
    }

    try {
      let res;
      if (commonSection) {
        res = await updateCommonSection(Number(commonSection?.id), formData);
      } else {
        res = await createCommonSection(formData);
      }

      if (res.success) {
        toast.success(res.message || "Common section saved successfully!");
        setPreviewImage(null);
        reset();
        router.push("/web-content/common-sections");
        return;
      } else {
        if (res.errors) {
          toast.error(res.message || "Failed to save common section");
          Object.entries(res.errors).forEach(([field, messages]) => {
            const errorMessage = Array.isArray(messages) ? messages[0] : messages;
            setError(field as keyof FormValues, { type: "server", message: errorMessage as string });
          });
        } else {
          toast.error(res.message || "Failed to save common section");
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
    setImageRemoved(true);
    const fileInput = document.getElementById("image") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    toast.success("Image removed successfully");
  };

  return (
    <div className="w-full bg-card border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Type */}
          <div>
            <Label className="block text-sm font-medium mb-1">Type <span className="text-red-500">*</span></Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTION_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>}
          </div>
          {/* Title */}
          <div>
            <Label className="block text-sm font-medium mb-1">Title <span className="text-red-500">*</span></Label>
            <Input
              placeholder="Enter title"
              {...register("title")}
            />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
          </div>
        </div>
       
        <div>
           {/* Sub Title */}
          <Label className="block text-sm font-medium mb-1">Sub Title <span className="text-red-500">*</span></Label>
          <Textarea
            placeholder="Enter sub title"
            {...register("sub_title")}
            rows={2}
          />
          {errors.sub_title && <p className="text-sm text-red-500 mt-1">{errors.sub_title.message}</p>}
        </div>

        {/* Description (Rich Text) */}
        <div className="grid gap-2 pb-10">
          <Label className="block text-sm font-medium mb-1">Description (Optional)</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <RichTextEditor value={field.value || ""} onChange={field.onChange} />
            )}
          />
          <div className="min-h-5">
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
        </div>


        {/* Button One */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium mb-1">Button Text One (Optional)</Label>
            <Input
              placeholder="Button text"
              {...register("button_text_one")}
            />
            {errors.button_text_one && <p className="text-sm text-red-500 mt-1">{errors.button_text_one.message}</p>}
          </div>
          <div>
            <Label className="block text-sm font-medium mb-1">Button Link One (Optional)</Label>
            <Input
              placeholder="https://example.com"
              {...register("button_link_one")}
            />
            {errors.button_link_one && <p className="text-sm text-red-500 mt-1">{errors.button_link_one.message}</p>}
          </div>
        </div>

        {/* Button Two */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium mb-1">Button Text Two (Optional)</Label>
            <Input
              placeholder="Button text"
              {...register("button_text_two")}
            />
            {errors.button_text_two && <p className="text-sm text-red-500 mt-1">{errors.button_text_two.message}</p>}
          </div>
          <div>
            <Label className="block text-sm font-medium mb-1">Button Link Two (Optional)</Label>
            <Input
              placeholder="https://example.com"
              {...register("button_link_two")}
            />
            {errors.button_link_two && <p className="text-sm text-red-500 mt-1">{errors.button_link_two.message}</p>}
          </div>
        </div>

        {/* Image */}
        <div>
          <Label className="block text-sm font-medium mb-1">Image (Optional)</Label>
          <div className="space-y-3">
            {previewImage ? (
              <div className="relative">
                <div className="rounded-lg border-2 border-dashed">
                  <Image
                    src={previewImage}
                    alt="Image preview"
                    width={200}
                    height={200}
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
                <Input id="image" type="file" accept="image/*" className="hidden" {...register("image")} />
                <label htmlFor="image" className="cursor-pointer block">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Camera className="w-6 h-6 text-gray-500" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">Click to upload image</p>
                  </div>
                </label>
              </div>
            )}
            {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image.message}</p>}
          </div>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Video Link */}
          <div>
            <Label className="block text-sm font-medium mb-1">Video Link (Optional)</Label>
            <Input
              placeholder="https://www.youtube.com/watch?v=..."
              {...register("video_link")}
            />
            {errors.video_link && <p className="text-sm text-red-500 mt-1">{errors.video_link.message}</p>}
          </div>
          {/* Status */}
          <div>
            <Label className="block text-sm font-medium mb-1">Status <span className="text-red-500">*</span></Label>
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
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className=" cursor-pointer">
            {isSubmitting ? "Submitting..." : commonSection ? "Update Common Section" : "Add Common Section"}
          </Button>
        </div>

      </form>
    </div>
  );
}
