"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getCategories } from "@/apiServices/categoryService";
import { Course } from "@/apiServices/courseService";
import RichTextEditor from "./RichTextEditor";
import Image from "next/image";
import { toast } from "sonner";

interface CourseAddFormProps {
  title: string;
  onSubmit: (
    formData: FormData,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => void | Promise<void>;
  initialData?: Course | null;
}

interface FormValues {
  category_id: string;
  title: string;
  sub_title?: string;
  description?: string;
  featured_image?: FileList;
  video_link?: string;
  level: string;
  status: string;
  price?: number;
  discount?: number;
}

export default function CourseAddForm({
  title,
  onSubmit,
  initialData,
}: CourseAddFormProps) {
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      category_id: initialData?.category?.id?.toString() || "",
      title: initialData?.title || "",
      sub_title: initialData?.sub_title || "",
      description: initialData?.description || "",
      video_link: initialData?.video_link || "",
      level: initialData?.level || "beginner",
      status: initialData?.status || "1",
      price: initialData?.price || 0,
      discount: initialData?.discount || 0,
    },
  });

  // Load existing image preview (EDIT mode)
  useEffect(() => {
    if (initialData?.featured_image) {
      setPreview(`http://127.0.0.1:8000/${initialData.featured_image}`);
    }
  }, [initialData]);

  // Image preview handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        if (res.success) {
          setCategories(res.data.categories);
        } else {
          toast.error(res.message || "Failed to load categories");
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const setFormError = (field: string, message: string) => {
    setError(field as keyof FormValues, { type: "server", message });
  };

  const submitForm = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("category_id", data.category_id);
    formData.append("title", data.title);
    if (data.sub_title) formData.append("sub_title", data.sub_title);
    if (data.description) formData.append("description", data.description);
    if (data.featured_image?.length) {
      formData.append("featured_image", data.featured_image[0]);
    }
    if (data.video_link) formData.append("video_link", data.video_link);
    formData.append("level", data.level);
    formData.append("status", data.status);
    formData.append("price", data.price?.toString() || "0");
    formData.append("discount", data.discount?.toString() || "0");

    await onSubmit(formData, setFormError, () => reset());
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(submitForm)} className="grid gap-6">

          {/* Category + Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category_id">Category<span className="text-red-500">*</span></Label>
              <select
                id="category_id"
                {...register("category_id", { required: "Category is required" })}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title">Title<span className="text-red-500">*</span></Label>
              <Input
                id="title"
                placeholder="Course Title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
          </div>

          

          {/* Description (Rich Text) */}
          <div className="grid gap-2 pb-10">
            <Label>Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <RichTextEditor value={field.value || ""} onChange={field.onChange} />
              )}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          {/* Price + Discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" {...register("price")} />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="discount">Discount</Label>
              <Input id="discount" type="number" {...register("discount")} />
              {errors.discount && <p className="text-red-500 text-sm">{errors.discount.message}</p>}
            </div>
          </div>

          {/* Level+ Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="level">Level</Label>
              <select
                id="level"
                {...register("level")}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              {errors.level && <p className="text-red-500 text-sm">{errors.level.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                {...register("status")}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value="0">Draft</option>
                <option value="1">Published</option>
                <option value="2">Archived</option>
              </select>
              {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>
          </div>

          {/* Image + Video Link */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="featured_image">Featured Image</Label>
              <Input
                id="featured_image"
                type="file"
                accept="image/*"
                {...register("featured_image")}
                onChange={handleImageChange}
              />
              {errors.featured_image && <p className="text-red-500 text-sm">{errors.featured_image.message}</p>}
              {preview && (
                <div className="mt-2">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="video_link">Video Link</Label>
              <Input id="video_link" {...register("video_link")} />
              {errors.video_link && <p className="text-red-500 text-sm">{errors.video_link.message}</p>}
            </div>
          </div>

          {/* Status */}


          {/* Submit */}
          <div className="flex justify-center">
            <Button type="submit" disabled={isSubmitting} className="w-40">
              {isSubmitting ? "Submitting..." : "Save & Continue"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
