"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { CategoriesResponse, getCategories } from "@/apiServices/categoryService";
import { Course, createCourse, updateCourse } from "@/apiServices/courseService";
import RichTextEditor from "./RichTextEditor";
import Image from "next/image";
import { toast } from "sonner";
import { Camera } from "lucide-react";

interface CourseAddFormProps {
  title: string;
  initialData?: Course | null;
  setCourseId?: (id: number) => void;
  goNext?: () => void;
}

interface FormValues {
  category_id: string;
  title: string;
  sub_title?: string;
  description?: string;
  featured_image?: FileList;
  video_link?: string;
  // level: string;
  status: string;
  price?: number;
  discount?: number;
}

export default function CourseAddForm({
  title,
  setCourseId,
  goNext,
  initialData,
}: CourseAddFormProps) {
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [preview, setPreview] = useState<string | null>(null);

  const statusMap: Record<string, string> = {
    Draft: "0",
    Published: "1",
    Archived: "2",
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    defaultValues: {
      category_id: "",
      title: "",
      sub_title: "",
      description: "",
      video_link: "",
      // level: "beginner",
      status: "1",
      price: 0,
      discount: 0,
    },
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res:CategoriesResponse = await getCategories();
        if (res.success && res?.data?.categories) {
          setCategories(res?.data?.categories || []);
        } else {
          toast.error(res.message || "Failed to load categories");
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      console.log('Resetting form with initialData:', initialData);


      reset({
        category_id: initialData.category_id?.toString() || "",
        title: initialData.title || "",
        sub_title: initialData.sub_title || "",
        description: initialData.description || "",
        video_link: initialData.video_link || "",
        // level: initialData.level,
        status: statusMap[initialData.status] || initialData.status || "1",
        price: initialData.price ? Number(initialData.price) : 0,
        discount: initialData.discount ? Number(initialData.discount) : 0,
      });

      if (initialData.featured_image) {
        setPreview(initialData.featured_image);
      }
    } else if (categories.length) {

    }
  }, [categories, initialData, reset]);

  const handleCourseSubmit = async (
    formData: FormData
  ) => {
    let res;
    const courseId = Number(initialData?.id) || null;
    try {
      if (courseId) {
        res = await updateCourse(courseId, formData);
      } else {
        res = await createCourse(formData);
      }

      if (res.success) {
        const newCourseId = res.data?.id;
        if (!courseId) {
          toast.success("Course created successfully");

          setCourseId?.(Number(newCourseId));
          goNext?.();
        } else {
          toast.success("Course updated successfully");
        }

      } else {
        if (res.errors) {
          Object.entries(res.errors).forEach(([field, messages]) => {
            const errorMessage = Array.isArray(messages) ? messages[0] : messages;
            setError(field as keyof FormValues, { type: "server", message: errorMessage as string });
          });
        } else {
          toast.error(res.message || "Failed to create course");
        }
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create course"
      );
    }
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
    formData.append("status", data.status);
    formData.append("price", data.price?.toString() || "0");
    formData.append("discount", data.discount?.toString() || "0");

    await handleCourseSubmit(formData);
  };
  console.log('Rendering CourseAddForm with errors:', errors);

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
                {...register("category_id")}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
                ))}
              </select>
              {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title">Title<span className="text-red-500">*</span></Label>
              <Input
                id="title"
                placeholder="e.g. Master React & Next.js"
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
              <Input id="price" type="number" placeholder="e.g. 5000" {...register("price")} />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="discount">Discount</Label>
              <Input id="discount" type="number" placeholder="e.g. 1000" {...register("discount")} />
              {errors.discount && <p className="text-red-500 text-sm">{errors.discount.message}</p>}
            </div>
          </div>

          {/* Level + Video  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <div className="grid gap-2">
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
            </div> */}
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
            {/* Video Link */}
            <div className="grid gap-2">
              <Label htmlFor="video_link">Video Link</Label>
              <Input id="video_link" placeholder="e.g. https://youtube.com/..." {...register("video_link")} />
              {errors.video_link && (
                <p className="text-red-500 text-sm">{errors.video_link.message}</p>
              )}
            </div>
          </div>

          {/* Featured Image + Video Link */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {/* Featured Image */}
            <div className="grid gap-2">
              <Label htmlFor="featured_image">Featured Image</Label>

              <Controller
                name="featured_image"
                control={control}
                render={({ field }) => (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 relative">
                    {/* Hidden input */}
                    <input
                      type="file"
                      accept="image/*"
                      id="featured_image"
                      className="hidden"
                      onChange={(e) => {
                        field.onChange(e.target.files); // update react-hook-form
                        const file = e.target.files?.[0];
                        if (file) setPreview(URL.createObjectURL(file)); // update preview
                      }}
                    />

                    {/* Preview + Remove button */}
                    {preview ? (
                      <div className="flex justify-between items-center">
                        <Image
                          src={preview}
                          alt="Preview"
                          width={150}
                          height={100}
                          className="rounded-md object-cover"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setPreview(null);
                            field.onChange(null); // reset form value
                            const fileInput = document.getElementById(
                              "featured_image"
                            ) as HTMLInputElement;
                            if (fileInput) fileInput.value = "";
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <label
                        htmlFor="featured_image"
                        className="cursor-pointer flex flex-col items-center justify-center gap-2 text-center"
                      >
                        <Camera className="w-6 h-6 text-gray-500" />
                        <p className="text-sm font-medium text-gray-900">
                          Click to upload image
                        </p>
                      </label>
                    )}
                  </div>
                )}
              />
            </div>


          </div>






          {/* Submit */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="w-40">
              {isSubmitting ? "Submitting..." : "Save & Continue"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
