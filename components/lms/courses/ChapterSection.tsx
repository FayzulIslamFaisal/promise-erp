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
    <div className="border border-gray-200 rounded-2xl p-6 bg-white space-y-6 shadow-sm transition-all duration-300 hover:shadow-md border-l-4 border-l-primary/40">
      {/* Chapter Database ID (Hidden) */}
      <input type="hidden" {...register(`chapters.${chIndex}.id` as const)} />

      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-sm">
            {chIndex + 1}
          </div>
          <h4 className="font-bold text-xl text-gray-800">Chapter Details</h4>
        </div>
        {chapters.length > 1 && (
          <Button
            variant="ghost"
            type="button"
            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors px-3 py-1 h-auto"
            onClick={() => {
              removeChapter(chIndex);

              toast.success("Chapter removed successfully");
            }}
          >
            Remove
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chapter Title */}
        <div className="grid gap-2">
          <Label htmlFor={`chapter-title-${chIndex}`} className="text-sm font-semibold text-gray-700 ml-1">
            Chapter Title<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id={`chapter-title-${chIndex}`}
            placeholder="e.g. Master the Fundamentals"
            className="h-11 rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 transition-all text-base"
            {...register(`chapters.${chIndex}.title` as const, {
              required: "Chapter title is required"
            })}
          />
          {errors.chapters?.[chIndex]?.title && (
            <span className="text-xs text-red-500 font-medium italic ml-1">
              {errors.chapters[chIndex]?.title?.message}
            </span>
          )}
        </div>

        {/* Chapter Status */}
        <div className="grid gap-2">
          <Label htmlFor={`chapter-status-${chIndex}`} className="text-sm font-semibold text-gray-700 ml-1">Visibility Status</Label>
          <Controller
            name={`chapters.${chIndex}.status` as const}
            control={control}
            render={({ field }) => (
              <Select value={String(field.value)} onValueChange={field.onChange}>
                <SelectTrigger className="h-11 rounded-xl border-gray-200 focus:ring-primary/20 w-full">
                  <SelectValue placeholder="Set visibility" />
                </SelectTrigger>
                <SelectContent className="rounded-xl overflow-hidden shadow-xl border-gray-100">
                  <SelectItem value="1" className="focus:bg-primary/5">Published (Visible to all)</SelectItem>
                  <SelectItem value="0" className="focus:bg-primary/5">Hidden (Draft mode)</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.chapters?.[chIndex]?.status && (
            <span className="text-xs text-red-500 font-medium italic ml-1">
              {errors.chapters[chIndex]?.status?.message}
            </span>
          )}
        </div>

        {/* Chapter Description */}
        <div className="md:col-span-2 grid gap-2">
          <Label htmlFor={`chapter-description-${chIndex}`} className="text-sm font-semibold text-gray-700 ml-1">Brief Overview</Label>
          <Textarea
            id={`chapter-description-${chIndex}`}
            placeholder="What will students accomplish in this chapter?"
            className="min-h-[120px] rounded-2xl border-gray-200 focus:border-primary focus:ring-primary/20 transition-all text-base resize-none py-3"
            {...register(`chapters.${chIndex}.description` as const)}
          />
        </div>
      </div>

      {/* Lessons Section */}
      <div className="mt-8 pt-6 border-t border-gray-50 bg-gray-50/30 -mx-6 px-6 -mb-6 rounded-b-2xl">
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
