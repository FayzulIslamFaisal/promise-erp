"use client";

import { Control, UseFormRegister, FieldErrors, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LessonList from "./LessonList";

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

interface ChapterSectionProps {
  chIndex: number;
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  chapters: { id: string }[];
  removeChapter: (index: number) => void;
}

export default function ChapterSection({ 
  chIndex, 
  control, 
  register, 
  errors, 
  chapters, 
  removeChapter 
}: ChapterSectionProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-lg">Chapter {chIndex + 1}</h4>
        {chapters.length > 1 && (
          <Button 
            variant="destructive" 
            type="button" 
            onClick={() => removeChapter(chIndex)}
          >
            Remove Chapter
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Chapter Title */}
        <div className="grid gap-2">
          <Label htmlFor={`chapter-title-${chIndex}`}>
            Title<span className="text-red-500">*</span>
          </Label>
          <Input
            id={`chapter-title-${chIndex}`}
            placeholder="Chapter Title"
            {...register(`chapters.${chIndex}.title` as const, { 
              required: "Chapter title is required" 
            })}
          />
          {errors.chapters?.[chIndex]?.title && (
            <span className="text-sm text-red-600">
              {errors.chapters[chIndex]?.title?.message}
            </span>
          )}
        </div>

        {/* Chapter Status */}
        <div className="grid gap-2">
          <Label htmlFor={`chapter-status-${chIndex}`}>Status</Label>
          <Controller
            name={`chapters.${chIndex}.status` as const}
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
          {errors.chapters?.[chIndex]?.status && (
            <span className="text-sm text-red-600">
              {errors.chapters[chIndex]?.status?.message}
            </span>
          )}
        </div>

        {/* Chapter Description */}
        <div className="md:col-span-2 grid gap-2">
          <Label htmlFor={`chapter-description-${chIndex}`}>Description</Label>
          <Textarea
            id={`chapter-description-${chIndex}`}
            placeholder="Chapter description"
            {...register(`chapters.${chIndex}.description` as const)}
          />
          {errors.chapters?.[chIndex]?.description && (
            <span className="text-sm text-red-600">
              {errors.chapters[chIndex]?.description?.message}
            </span>
          )}
        </div>
      </div>

      {/* Lessons Section */}
      <LessonList 
        chapterIndex={chIndex} 
        control={control} 
        register={register} 
        errors={errors} 
      />
    </div>
  );
}

