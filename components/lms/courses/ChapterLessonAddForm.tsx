"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createChaptersWithLessons } from "@/apiServices/courseService";
import { toast } from "sonner";
import ChapterSection from "./ChapterSection";

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

export interface FormValues {
  course_id: number;
  chapters: Chapter[];
}

export default function ChapterLessonAddForm({ 
  courseId, 
  onSuccess 
}: { 
  courseId: number; 
  onSuccess: () => void; 
}) {
  const { 
    control, 
    register, 
    handleSubmit, 
    setError,
    trigger,
    formState: { isSubmitting, errors } 
  } = useForm<FormValues>({
    defaultValues: {
      course_id: courseId,
      chapters: [
        {
          title: "",
          description: "",
          status: "1",
          lessons: [
            { 
              title: "", 
              duration: 0, 
              type: "1", 
              video_url: "", 
              is_preview: "0", 
              status: "1" 
            }
          ]
        }
      ]
    }
  });

  const { 
    fields: chapters, 
    append: addChapter, 
    remove: removeChapter 
  } = useFieldArray({
    control, 
    name: "chapters"
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await createChaptersWithLessons(data);
      
      if (res.success) {
        toast.success(res.message || "Chapters and lessons saved successfully!");
        onSuccess();

      } else {
        toast.error(res.message || "Failed to load categories");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save chapters and lessons");
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Add Chapters & Lessons</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <input type="hidden" {...register("course_id")} value={courseId} />
          
          {errors.course_id && (
            <span className="text-sm text-red-600">{errors.course_id.message}</span>
          )}

          {chapters.map((ch, chIndex) => (
            <ChapterSection
              key={ch.id}
              chIndex={chIndex}
              control={control}
              register={register}
              errors={errors}
              chapters={chapters}
              removeChapter={removeChapter}
            />
          ))}

          {/* Add Chapter Button */}
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => addChapter({ 
                title: "", 
                description: "", 
                status: "1", 
                lessons: [{ 
                  title: "", 
                  duration: 0, 
                  type: "1", 
                  video_url: "", 
                  is_preview: "0", 
                  status: "1" 
                }] 
              })}
            >
              + Add Chapter
            </Button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              variant="default"
              size="default"
              type="submit"
              className="w-48"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Chapters & Continue"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

