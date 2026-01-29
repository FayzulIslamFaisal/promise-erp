"use client";

import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  createCategory,
  updateCategory,
  Category,
} from "@/apiServices/categoryService";

interface CategoryFormProps {
  title: string;
  category?: Category;
}

interface FormValues {
  name: string;
  status: string;
  image?: FileList;
}

export default function CategoryForm({ title, category }: CategoryFormProps) {
  const router = useRouter();
  const isEdit = !!category;

  const [previewImage, setPreviewImage] = useState<string | null>(
    category?.image || null,
  );
  const [imageRemoved, setImageRemoved] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: category?.name || "",
      status: category?.status?.toString() || "1",
    },
  });

  const imageFile = watch("image");

  /* =========================
     Load edit data
  ========================== */
  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        status: category.status.toString(),
      });
      setPreviewImage(category.image || null);
    }
  }, [category, reset]);

  /* =========================
     Image preview
  ========================== */
  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setPreviewImage(e.target?.result as string);
        reader.readAsDataURL(file);
        setImageRemoved(false);
      }
    }
  }, [imageFile]);

  /* =========================
     Server error → field
  ========================== */
  const setFormError = (field: string, message: string) => {
    setError(field as keyof FormValues, {
      type: "server",
      message,
    });
  };

  /* =========================
     Submit Handler
  ========================== */
  const submitHandler = async (values: FormValues) => {
    // Manual check to prevent Server Action crash on oversized files
    if (values.image && values.image.length > 0) {
      const file = values.image[0];
      if (file.size > 5 * 1000 * 1000) { // Safety buffer for 5MB limit
        setError("image", { type: "manual", message: "The image may not be greater than 5MB" });
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", values.name.trim());
    formData.append("status", values.status);

    if (values.image?.length) {
      formData.append("image", values.image[0]);
    } else if (imageRemoved && isEdit) {
      formData.append("image", "");
    }

    const res = isEdit
      ? await updateCategory(category!.id, formData)
      : await createCategory(formData);

    /* ===== SUCCESS ===== */
    if (res.success) {
      toast.success(
        res.message ||
          (isEdit
            ? "Category updated successfully!"
            : "Category created successfully!"),
      );
      router.push("/lms/categories");
      return;
    }

    /* ===== FIELD ERRORS (from API) ===== */
    if (res.errors) {
      Object.entries(res.errors).forEach(([field, messages]) => {
        const message = Array.isArray(messages) ? messages[0] : messages;
        setFormError(field, message as string);
      });
    }
  };

  const handleImageRemove = () => {
    setPreviewImage(null);
    setImageRemoved(true);
    setValue("image", undefined);
  };

  return (
    <div className="max-w-md mx-auto bg-card border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="text-sm font-medium">Category Name</label>
          <Input {...register("name")} placeholder="Enter a category name" />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Status */}
        <div>
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
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="text-sm font-medium">Image</label>

          <Input
            type="file"
            accept="image/*"
            className="hidden"
            id="image"
            {...register("image")}
          />

          {previewImage ? (
            <div className="relative w-fit">
              <Image
                src={previewImage}
                alt="Preview"
                width={410}
                height={150}
                className="rounded-xl"
              />
              <Button
                type="button"
                size="sm"
                variant="destructive"
                className="absolute top-1 right-1"
                onClick={handleImageRemove}
              >
                Remove
              </Button>
            </div>
          ) : (
            <label
              htmlFor="image"
              className="border-2 border-dashed rounded-lg p-6 block cursor-pointer text-center"
            >
              <Camera className="mx-auto mb-2 text-gray-400" />
              Click to upload image
            </label>
          )}

          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <Button disabled={isSubmitting} className="w-full">
          {isSubmitting
            ? "Submitting..."
            : isEdit
              ? "Update Category"
              : "Add Category"}
        </Button>
      </form>
    </div>
  );
}
