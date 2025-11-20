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
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  createChapter,
  updateChapter,
  Chapter,
  SingleChapterResponse,
} from "@/apiServices/chaptersService";

export interface Batch {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  title: string;
}

export interface Branch {
  id: number;
  name: string;
}

interface ChapterFormProps {
  title: string;
  batches: Batch[];
  courses: Course[];
  branches: Branch[];
  chapter?: Chapter | undefined;
}

interface FormValues {
  title: string;
  description: string;
  lm_batch_id: string;
  lm_course_id: string;
  branch_id: string;
  status: string;
}

export default function ChapterForm({
  title,
  batches = [],
  courses = [],
  branches = [],
  chapter = undefined,
}: ChapterFormProps) {
  const router = useRouter();

  const {
    register,
    control,
    setError,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      title: chapter?.title || "",
      description: chapter?.description || "",
      lm_batch_id: chapter?.lm_batch_id?.toString() || "",
      lm_course_id: chapter?.lm_course_id?.toString() || "",
      branch_id: chapter?.branch_id?.toString() || "",
      status: chapter?.status?.toString() || "1",
    },
  });

  const setFormError = (field: string, message: string) => {
    setError(field as keyof FormValues, { type: "server", message });
  };

  // Reset form on edit (final fixed version)
  useEffect(() => {
    if (!chapter) return;

    reset({
      title: chapter.title,
      description: chapter.description,
      lm_batch_id: chapter.lm_batch_id.toString(),
      lm_course_id: chapter.lm_course_id.toString(),
      branch_id: chapter.branch_id.toString(),
      status: chapter.status.toString(),
    });
  }, [chapter, reset]);

  const submitHandler = async (values: FormValues) => {
    let res: SingleChapterResponse;

    const payload = {
      title: values.title,
      description: values.description,
      lm_batch_id: Number(values.lm_batch_id),
      lm_course_id: Number(values.lm_course_id),
      branch_id: Number(values.branch_id),
      status: Number(values.status),
    };

    try {
      if (chapter) {
        res = await updateChapter(chapter.id, payload);
      } else {
        res = await createChapter(payload);
      }

      if (res.success && res.data) {
        toast.success(
          res.message || (chapter ? "Chapter updated!" : "Chapter added!")
        );
        router.push("/lms/chapters");
      } else if (res.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setFormError(field, messages[0]);
          }
        });
        toast.error("Please fix highlighted errors.");
      } else {
        toast.error(res.message || "Operation failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-card border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Chapter Title</label>
          <Input
            placeholder="Enter chapter title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            placeholder="Enter chapter description"
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Batch */}
        <Controller
          name="lm_batch_id"
          control={control}
          rules={{ required: "Batch is required" }}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium mb-1">Select Batch</label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent>
                  {batches.map((batch) => (
                    <SelectItem key={batch.id} value={batch.id.toString()}>
                      {batch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.lm_batch_id && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.lm_batch_id.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Course */}
        <Controller
          name="lm_course_id"
          control={control}
          rules={{ required: "Course is required" }}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium mb-1">Select Course</label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id.toString()}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.lm_course_id && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.lm_course_id.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Branch */}
        <Controller
          name="branch_id"
          control={control}
          rules={{ required: "Branch is required" }}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium mb-1">Select Branch</label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id.toString()}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.branch_id && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.branch_id.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Status */}
        <Controller
          name="status"
          control={control}
          rules={{ required: "Status is required" }}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Active</SelectItem>
                  <SelectItem value="0">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : chapter ? "Update Chapter" : "Add Chapter"}
        </Button>
      </form>
    </div>
  );
}
