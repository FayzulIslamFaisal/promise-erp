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
import { Category } from "@/apiServices/categoryService";
import { Camera } from "lucide-react";
import Image from "next/image";

interface CategoryFormProps {
  title: string;
  onSubmit: (
    formData: FormData,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => void | Promise<void>;
  category?: Category;
}

interface FormValues {
  name: string;
  status: string;
  image?: FileList;
}

export default function CategoryForm({ title, onSubmit, category }: CategoryFormProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(category?.image || null);

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
      name: category?.name || "",
      status: category?.status.toString() || "1",
      image: undefined,
    },
  });

  const imageFile = watch("image");

  const setFormError = (field: string, message: string) => {
    setError(field as keyof FormValues, { type: "server", message });
  };

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        status: category.status.toString(),
      });
      if (category.image) setPreviewImage(category.image);
    }
  }, [category, reset]);

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
    formData.append("name", values.name.trim());
    formData.append("status", values.status);

    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0]);
    }

    await onSubmit(formData, setFormError, () => {
      reset();
      setPreviewImage(null);
    });
  };

  const handleImageRemove = () => {
    setPreviewImage(null);
    const fileInput = document.getElementById("image") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="max-w-md mx-auto bg-card border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Category Name</label>
          <Input placeholder="Enter category name" {...register("name")} />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
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

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-1">Category Image</label>
          <div className="space-y-3">
            {previewImage ? (
              <div className="relative">
                <div className="rounded-lg border-2 border-dashed">
                  <Image
                    src={previewImage}
                    alt="Category preview"
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

        <Button type="submit" disabled={isSubmitting} className="w-full cursor-pointer">
          {isSubmitting ? "Submitting..." : category ? "Update Category" : "Add Category"}
        </Button>
      </form>
    </div>
  );
}
