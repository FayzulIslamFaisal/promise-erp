"use client";

import { Control, UseFormRegister, FieldErrors, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LessonList from "./LessonList";
import { FormValues } from "@/apiServices/courseService";
import { toast } from "sonner";

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
    <div className="border rounded-lg p-6 space-y-6">
      <input type="hidden" {...register(`chapters.${chIndex}.id` as const)} />

      <div className="flex justify-between items-center pb-4 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
            {chIndex + 1}
          </div>
          <h4 className="font-bold text-xl">Chapter Details</h4>
        </div>
        {chapters.length > 1 && (
          <Button
            variant="ghost"
            type="button"
            size="sm"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => {
              removeChapter(chIndex);
              toast.success("Chapter removed successfully");
            }}
          >
            Remove
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor={`chapter-title-${chIndex}`}>
            Chapter Title<span className="text-red-500">*</span>
          </Label>
          <Input
            id={`chapter-title-${chIndex}`}
            placeholder="e.g. Master the Fundamentals"
            {...register(`chapters.${chIndex}.title` as const, {
              required: "Chapter title is required"
            })}
          />
          <div className="min-h-5">
            {errors.chapters?.[chIndex]?.title && (
              <p className="text-red-500 text-sm">{errors.chapters[chIndex]?.title?.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`chapter-status-${chIndex}`}>Visibility Status</Label>
          <Controller
            name={`chapters.${chIndex}.status` as const}
            control={control}
            render={({ field }) => (
              <Select 
                value={String(field.value)} 
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger id={`chapter-status-${chIndex}`} className="w-full h-10">
                  <SelectValue placeholder="Set visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Published (Visible to all)</SelectItem>
                  <SelectItem value="0">Hidden (Draft mode)</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <div className="min-h-5">
            {errors.chapters?.[chIndex]?.status && (
              <p className="text-red-500 text-sm">{errors.chapters[chIndex]?.status?.message}</p>
            )}
          </div>
        </div>

        <div className="md:col-span-2 grid gap-2">
          <Label htmlFor={`chapter-description-${chIndex}`}>Brief Overview</Label>
          <Textarea
            id={`chapter-description-${chIndex}`}
            placeholder="What will students accomplish in this chapter?"
            {...register(`chapters.${chIndex}.description` as const)}
          />
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <LessonList
          chapterIndex={chIndex}
          control={control}
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
}
