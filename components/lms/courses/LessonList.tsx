"use client";

import { useFieldArray, Control, UseFormRegister, FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller } from "react-hook-form";

interface Lesson {
  title: string;
  duration: number;
  type: string;
  video_url?: string;
  is_preview: string;
  status: string;
}

interface Chapter {
  title: string;
  description?: string;
  status: string;
  lessons: Lesson[];
}

interface FormValues {
  course_id: number;
  chapters: Chapter[];
}

interface LessonListProps {
  chapterIndex: number;
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}

export default function LessonList({ chapterIndex, control, register, errors }: LessonListProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `chapters.${chapterIndex}.lessons` as const
  });

  return (
    <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4">
      <div className="flex justify-between items-center">
        <h5 className="font-medium text-md">Lessons</h5>
      </div>

      {fields.map((f, idx) => (
        <div key={f.id} className="border border-gray-300 rounded-lg p-4 bg-white space-y-4">
          <div className="flex justify-between items-center">
            <div className="font-medium">Lesson {idx + 1}</div>
            {fields.length > 1 && (
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => remove(idx)} 
                type="button"
              >
                Remove Lesson
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lesson Title */}
            <div className="md:col-span-2 grid gap-2">
              <Label htmlFor={`lesson-title-${chapterIndex}-${idx}`}>
                Lesson Title<span className="text-red-500">*</span>
              </Label>
              <Input
                id={`lesson-title-${chapterIndex}-${idx}`}
                placeholder="Lesson Title"
                {...register(`chapters.${chapterIndex}.lessons.${idx}.title` as const, { 
                  required: "Lesson title is required" 
                })}
              />
              {errors?.chapters?.[chapterIndex]?.lessons?.[idx]?.title && (
                <span className="text-sm text-red-600">
                  {errors.chapters[chapterIndex]?.lessons?.[idx]?.title?.message || "This field is required"}
                </span>
              )}
            </div>

            {/* Duration */}
            <div className="grid gap-2">
              <Label htmlFor={`lesson-duration-${chapterIndex}-${idx}`}>
                Duration (minutes)
              </Label>
              <Input
                id={`lesson-duration-${chapterIndex}-${idx}`}
                type="number"
                placeholder="Duration in minutes"
                {...register(`chapters.${chapterIndex}.lessons.${idx}.duration` as const, { 
                  valueAsNumber: true
                })}
              />
              {errors?.chapters?.[chapterIndex]?.lessons?.[idx]?.duration && (
                <span className="text-sm text-red-600">
                  {errors.chapters[chapterIndex]?.lessons?.[idx]?.duration?.message || "Invalid duration"}
                </span>
              )}
            </div>

            {/* Type */}
            <div className="grid gap-2">
              <Label htmlFor={`lesson-type-${chapterIndex}-${idx}`}>Type</Label>
              <Controller
                name={`chapters.${chapterIndex}.lessons.${idx}.type` as const}
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Prerecorded Video</SelectItem>
                      <SelectItem value="2">Article</SelectItem>
                      <SelectItem value="3">Quiz</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors?.chapters?.[chapterIndex]?.lessons?.[idx]?.type && (
                <span className="text-sm text-red-600">
                  {errors.chapters[chapterIndex]?.lessons?.[idx]?.type?.message || "Invalid type"}
                </span>
              )}
            </div>

            {/* Video URL */}
            <div className="md:col-span-2 grid gap-2">
              <Label htmlFor={`lesson-video-url-${chapterIndex}-${idx}`}>Video URL</Label>
              <Input
                id={`lesson-video-url-${chapterIndex}-${idx}`}
                placeholder="https://example.com/video"
                {...register(`chapters.${chapterIndex}.lessons.${idx}.video_url` as const)}
              />
              {errors?.chapters?.[chapterIndex]?.lessons?.[idx]?.video_url && (
                <span className="text-sm text-red-600">
                  {errors.chapters?.[chapterIndex]?.lessons?.[idx]?.video_url?.message || 
                   (typeof errors.chapters?.[chapterIndex]?.lessons?.[idx]?.video_url === 'string' 
                     ? errors.chapters[chapterIndex]?.lessons?.[idx]?.video_url 
                     : "Invalid video URL")}
                </span>
              )}
            </div>

            {/* Preview */}
            <div className="grid gap-2">
              <Label htmlFor={`lesson-preview-${chapterIndex}-${idx}`}>Preview</Label>
              <Controller
                name={`chapters.${chapterIndex}.lessons.${idx}.is_preview` as const}
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select preview" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors?.chapters?.[chapterIndex]?.lessons?.[idx]?.is_preview && (
                <span className="text-sm text-red-600">
                  {errors.chapters[chapterIndex]?.lessons?.[idx]?.is_preview?.message || "Invalid preview option"}
                </span>
              )}
            </div>

            {/* Status */}
            <div className="grid gap-2">
              <Label htmlFor={`lesson-status-${chapterIndex}-${idx}`}>Status</Label>
              <Controller
                name={`chapters.${chapterIndex}.lessons.${idx}.status` as const}
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
              {errors?.chapters?.[chapterIndex]?.lessons?.[idx]?.status && (
                <span className="text-sm text-red-600">
                  {errors.chapters[chapterIndex]?.lessons?.[idx]?.status?.message || "Invalid status"}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Add Lesson Button */}
      <div>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => append({ 
            title: "", 
            duration: 0, 
            type: "1", 
            video_url: "", 
            is_preview: "0", 
            status: "1" 
          })}
        >
          + Add Lesson
        </Button>
      </div>
    </div>
  );
}

