"use client";

import { useFieldArray, Control, UseFormRegister, FieldErrors, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormValues } from "@/apiServices/courseService";
import { Plus, Trash2, Video, FileText, HelpCircle } from "lucide-react";
import { toast } from "sonner";

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h5 className="font-semibold text-md text-gray-700 flex items-center gap-2">
          <Video className="w-4 h-4" /> Lessons List
        </h5>
        <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-full text-gray-500">
          {fields.length} {fields.length === 1 ? 'Lesson' : 'Lessons'}
        </span>
      </div>

      <div className="space-y-4">
        {fields.map((f, idx) => (
          <div key={f.id} className="border border-gray-100 rounded-xl p-5 bg-white space-y-5 transition-all hover:border-primary/20 group shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 group-hover:bg-primary/10 group-hover:text-primary transition-colors w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-gray-200 text-gray-500">
                  {idx + 1}
                </div>
                <div className="font-bold text-gray-800">Lesson Setup</div>
              </div>
              {fields.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  onClick={() => {
                    remove(idx);
                    toast.success("Lesson removed successfully");
                  }}
                >
                  Remove
                </Button>

              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Lesson ID (hidden) */}
              <input type="hidden" {...register(`chapters.${chapterIndex}.lessons.${idx}.id` as const)} />
              {/* Order (hidden - updated during submit) */}
              <input type="hidden" {...register(`chapters.${chapterIndex}.lessons.${idx}.order` as const)} />

              {/* Lesson Title */}
              <div className="md:col-span-2 grid gap-2">
                <Label htmlFor={`lesson-title-${chapterIndex}-${idx}`} className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                  Lesson Title<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id={`lesson-title-${chapterIndex}-${idx}`}
                  placeholder="e.g. Setting up the Project"
                  className="h-10 rounded-lg bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                  {...register(`chapters.${chapterIndex}.lessons.${idx}.title` as const, {
                    required: "Lesson title is required"
                  })}
                />
                {errors?.chapters?.[chapterIndex]?.lessons?.[idx]?.title && (
                  <span className="text-xs text-red-500 font-medium italic ml-1">
                    {errors.chapters[chapterIndex]?.lessons?.[idx]?.title?.message}
                  </span>
                )}
              </div>

              {/* Lesson Description */}
              <div className="md:col-span-2 grid gap-2">
                <Label htmlFor={`lesson-description-${chapterIndex}-${idx}`} className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                  Lesson Description
                </Label>
                <Textarea
                  id={`lesson-description-${chapterIndex}-${idx}`}
                  placeholder="What will students learn in this lesson?..."
                  className="rounded-lg bg-gray-50/50 border-gray-200 focus:bg-white transition-all resize-none py-2"
                  {...register(`chapters.${chapterIndex}.lessons.${idx}.description` as const)}
                />
              </div>

              {/* Duration */}
              <div className="grid gap-2">
                <Label htmlFor={`lesson-duration-${chapterIndex}-${idx}`} className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                  Duration (mins)
                </Label>
                <Input
                  id={`lesson-duration-${chapterIndex}-${idx}`}
                  type="number"
                  placeholder="30"
                  className="h-10 rounded-lg bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                  {...register(`chapters.${chapterIndex}.lessons.${idx}.duration` as const, {
                    valueAsNumber: true
                  })}
                />
                {errors?.chapters?.[chapterIndex]?.lessons?.[idx]?.duration && (
                  <span className="text-xs text-red-500 font-medium italic ml-1">
                    {errors.chapters[chapterIndex]?.lessons?.[idx]?.duration?.message}
                  </span>
                )}
              </div>

              {/* Type */}
              <div className="grid gap-2">
                <Label htmlFor={`lesson-type-${chapterIndex}-${idx}`} className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Content Type</Label>
                <Controller
                  name={`chapters.${chapterIndex}.lessons.${idx}.type` as const}
                  control={control}
                  render={({ field }) => (
                    <Select value={String(field.value)} onValueChange={field.onChange}>
                      <SelectTrigger className="h-10 rounded-lg bg-gray-50/50 border-gray-200 focus:ring-primary/20 w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl overflow-hidden shadow-xl border-gray-100">
                        <SelectItem value="1">
                          <div className="flex items-center gap-2"><Video className="w-4 h-4 text-blue-500" /> Video Lesson</div>
                        </SelectItem>
                        <SelectItem value="2">
                          <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-green-500" /> Article / Doc</div>
                        </SelectItem>
                        <SelectItem value="3">
                          <div className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-orange-500" /> Quiz / Test</div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors?.chapters?.[chapterIndex]?.lessons?.[idx]?.type && (
                  <span className="text-xs text-red-500 font-medium italic ml-1">
                    {errors.chapters[chapterIndex]?.lessons?.[idx]?.type?.message}
                  </span>
                )}
              </div>

              {/* Video URL */}
              <div className="grid gap-2">
                <Label htmlFor={`lesson-video-url-${chapterIndex}-${idx}`} className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Video / Resource URL</Label>
                <Input
                  id={`lesson-video-url-${chapterIndex}-${idx}`}
                  placeholder="Enter your video URL here"
                  className="h-10 rounded-lg bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                  {...register(`chapters.${chapterIndex}.lessons.${idx}.video_url` as const)}
                />
                {errors?.chapters?.[chapterIndex]?.lessons?.[idx]?.video_url && (
                  <span className="text-xs text-red-500 font-medium italic ml-1">
                    {errors.chapters[chapterIndex]?.lessons?.[idx]?.video_url?.message}
                  </span>
                )}
              </div>

              {/* Schedule At */}
              <div className="grid gap-2">
                <Label htmlFor={`lesson-schedule-${chapterIndex}-${idx}`} className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Available From (Optional)</Label>
                <Input
                  id={`lesson-schedule-${chapterIndex}-${idx}`}
                  type="datetime-local"
                  className="h-10 rounded-lg bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                  {...register(`chapters.${chapterIndex}.lessons.${idx}.schedule_at` as const)}
                />
                {errors?.chapters?.[chapterIndex]?.lessons?.[idx]?.schedule_at && (
                  <span className="text-xs text-red-500 font-medium italic ml-1">
                    {errors.chapters[chapterIndex]?.lessons?.[idx]?.schedule_at?.message}
                  </span>
                )}
              </div>

              {/* Preview */}
              <div className="grid gap-2">
                <Label htmlFor={`lesson-preview-${chapterIndex}-${idx}`} className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Access Level</Label>
                <Controller
                  name={`chapters.${chapterIndex}.lessons.${idx}.is_preview` as const}
                  control={control}
                  render={({ field }) => (
                    <Select value={String(field.value)} onValueChange={field.onChange}>
                      <SelectTrigger className="h-10 rounded-lg bg-gray-50/50 border-gray-200 w-full" >
                        <SelectValue placeholder="Select access" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="1" className="text-green-600 font-medium">Free Preview</SelectItem>
                        <SelectItem value="0">Premium Only</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors?.chapters?.[chapterIndex]?.lessons?.[idx]?.is_preview && (
                  <span className="text-xs text-red-500 font-medium italic ml-1">
                    {errors.chapters[chapterIndex]?.lessons?.[idx]?.is_preview?.message}
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="grid gap-2">
                <Label htmlFor={`lesson-status-${chapterIndex}-${idx}`} className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Status</Label>
                <Controller
                  name={`chapters.${chapterIndex}.lessons.${idx}.status` as const}
                  control={control}
                  render={({ field }) => (
                    <Select value={String(field.value)} onValueChange={field.onChange}>
                      <SelectTrigger className="h-10 rounded-lg bg-gray-50/50 border-gray-200 w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="1">Active</SelectItem>
                        <SelectItem value="0">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors?.chapters?.[chapterIndex]?.lessons?.[idx]?.status && (
                  <span className="text-xs text-red-500 font-medium italic ml-1">
                    {errors.chapters[chapterIndex]?.lessons?.[idx]?.status?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Lesson Button */}
      <div className="py-2">
        <Button
          type="button"
          size="sm"
          onClick={() => append({
            title: "",
            duration: 0,
            type: "1",
            video_url: "",
            is_preview: "0",
            status: "1"
          })}
        >
          <Plus /> Add Lesson
        </Button>
      </div>
    </div>
  );
}

