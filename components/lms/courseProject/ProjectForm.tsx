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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CourseProject, createCourseProject, SingleCourseProjectResponse, updateCourseProject } from "@/apiServices/courseProjectsService";

export interface Batch {
  id: number;
  name: string;
  lm_course_id: number;
}

export interface Course {
  id: number;
  title: string;
}

interface ProjectFormProps {
  title: string;
  batches?: Batch[];
  courses?: Course[];
  project?: CourseProject | undefined;
}

interface FormValues {
  title: string;
  batch_id: string;
  course_id: string;
  image?: FileList;
}

export default function ProjectForm({
  title,
  batches = [],
  courses = [],
  project = undefined,
}: ProjectFormProps) {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string | null>(project?.image || null);

  const {
    register,
    setError,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      title: project?.title || "",
      batch_id: project?.batch_id?.toString() || "",
      course_id: project?.course_id?.toString() || "",
      image: undefined,
    },
  });

  const imageFile = watch("image");

  const setFormError = (field: string, message: string) => {
    setError(field as keyof FormValues, { type: "server", message });
  };

  

  // Reset form when editing project
  useEffect(() => {
    if (project && batches.length > 0 && courses.length > 0) {
      reset({
        title: project.title,
        batch_id: project?.batch_id?.toString(),
        course_id: project?.course_id?.toString(),
        image: undefined,
      });
      setPreviewImage(project.image ?? null);
    }
  }, [project, batches.length, courses.length, reset]);

  // image preview
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

  // final form submit handler
const submitHandler = async (values: FormValues) => {
  const formData = new FormData();
  formData.append("title", values.title.trim());
  formData.append("batch_id", values.batch_id);
  formData.append("course_id", values.course_id);

  // only append image if user selected a new one
  if (values.image && values.image.length > 0) {
    formData.append("image", values.image[0]);
  }

  let res: SingleCourseProjectResponse;

  try {
    if (project) {
      // 🟢 Update
      res = await updateCourseProject(project.id, formData);
    } else {
      res = await createCourseProject(formData);
    }

    if (res.success && res.data) {
      toast.success(res.message || (project ? "Project updated!" : "Project added!"));
      router.push("/lms/projects");
    } else if (res.errors) {
      Object.entries(res.errors).forEach(([field, messages]) => {
        if (Array.isArray(messages) && messages.length > 0) {
          setFormError(field, messages[0]);
        }
      });
      toast.error("Please fix the errors below.");
    } else {
      toast.error(res.message || "Operation failed.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong. Try again later.");
  }
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
        {/* Project Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Project Title</label>
          <Input
            placeholder="Enter project title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Batch Dropdown */}
        <Controller
          name="batch_id"
          control={control}
          rules={{ required: "Batch is required" }}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium mb-1">Select Batch</label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Batch" />
                </SelectTrigger>
                <SelectContent>
                  {batches.map((batch) => (
                    <SelectItem key={batch.id} value={batch.id.toString()}>
                      {batch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.batch_id && (
                <p className="text-sm text-red-500 mt-1">{errors.batch_id.message}</p>
              )}
            </div>
          )}
        />

        {/* Course Dropdown */}
        <Controller
          name="course_id"
          control={control}
          rules={{ required: "Course is required" }}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium mb-1">Select Course</label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id.toString()}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.course_id && (
                <p className="text-sm text-red-500 mt-1">{errors.course_id.message}</p>
              )}
            </div>
          )}
        />

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Project Image</label>
          <div className="space-y-3">
            {previewImage ? (
              <div className="relative">
                <div className="rounded-lg border-2 border-dashed">
                  <Image
                    src={previewImage}
                    alt="Project preview"
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
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("image")}
                />
                <label htmlFor="image" className="cursor-pointer block">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Camera className="w-6 h-6 text-gray-500" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      Click to upload image
                    </p>
                  </div>
                </label>
              </div>
            )}
            {errors.image && (
              <p className="text-sm text-red-500 mt-1">{errors.image.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} className="w-full cursor-pointer">
          {isSubmitting ? "Submitting..." : project ? "Update Project" : "Add Project"}
        </Button>
      </form>
    </div>
  );
}
