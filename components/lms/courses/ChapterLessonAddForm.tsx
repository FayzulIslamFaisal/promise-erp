"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  createChaptersWithLessons,
  updateChaptersWithLessons,
  getChaptersByCourseId,
  FormValues,
  Chapter,
  Lesson
} from "@/apiServices/courseService";
import { toast } from "sonner";
import ChapterSection from "./ChapterSection";
import { useEffect, useState } from "react";

interface ChapterLessonAddFormProps {
  courseId: number;
  onSuccess: () => void;
  isEdit?: boolean;
}

export default function ChapterLessonAddForm({
  courseId,
  onSuccess,
  isEdit = false
}: ChapterLessonAddFormProps) {
  const [loading, setLoading] = useState(isEdit);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
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
    remove: removeChapter,
    replace: replaceChapters
  } = useFieldArray({
    control,
    name: "chapters"
  });

  // Fetch existing chapters in edit mode
  useEffect(() => {
    if (isEdit && courseId) {
      const fetchChapters = async () => {
        try {
          const res = await getChaptersByCourseId(courseId);

          if (res.success && res.data) {
            const existingChapters: Chapter[] = res.data;

            const sanitizedChapters = existingChapters.map((ch: Chapter) => ({
              id: ch.id,
              title: ch.title || "",
              description: ch.description || "",
              status: String(ch.status ?? "1"),
              lessons: (ch.lessons || []).map((l: Lesson) => ({
                id: l.id,
                title: l.title || "",
                description: l.description || "",
                duration: l.duration || 0,
                video_url: l.video_url || "",
                status: String(l.status ?? "1"),
                type: String(l.type ?? "1"),
                is_preview: String(l.is_preview ?? "0"),
                schedule_at: l.schedule_at ? l.schedule_at.replace(" ", "T").substring(0, 16) : "", 
                order: l.order || 0
              }))
            }));

            if (sanitizedChapters.length > 0) {
              replaceChapters(sanitizedChapters);
            }
          } else {
            toast.error(res.message || "Failed to load existing chapters");
          }
        } catch (err) {
          toast.error("Error loading chapters");
        } finally {
          setLoading(false);
        }
      };
      fetchChapters();
    }
  }, [isEdit, courseId, replaceChapters]);

  const onSubmit = async (data: FormValues) => {
    try {
      const transformedData: FormValues = {
        course_id: Number(data.course_id),
        chapters: data.chapters.map((ch) => ({
          id: ch.id ? Number(ch.id) : undefined,
          title: ch.title || "",
          description: ch.description || "",
          status: Number(ch.status),
          lessons: ch.lessons.map((l, lIndex) => ({
            id: l.id ? Number(l.id) : undefined,
            title: l.title || "",
            description: l.description || null,
            duration: Number(l.duration),
            type: Number(l.type),
            status: Number(l.status),
            is_preview: String(l.is_preview),
            video_url: l.video_url || "",
            schedule_at: l.schedule_at && l.schedule_at !== "" ? l.schedule_at.replace("T", " ") : null,
            order: lIndex + 1,
          }))
        }))
      };

      const apiCall = isEdit ? updateChaptersWithLessons : createChaptersWithLessons;
      console.log("Submitting chapters data:", transformedData);
      const res = await apiCall(transformedData);

      if (res.success) {
        toast.success(res.message || (isEdit ? "Chapters updated successfully!" : "Chapters created successfully!"));
        onSuccess();
      } else {
        // Handle validation errors from backend
        if (res.errors) {
          Object.entries(res.errors).forEach(([key, error]) => {
            const errorMessage = Array.isArray(error) ? error[0] : error;
            
            setError(key as any, {
              type: "server",
              message: errorMessage as string
            });
          });
          toast.error("Please fix the validation errors.");
        } else {
          toast.error(res.message || "Failed to save chapters");
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save chapters and lessons");
      
    }
  };

  if (loading) {
    return (
      <Card className="w-full mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col justify-center items-center h-48 space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent animate-spin"></div>
            <p className="text-gray-500 font-medium">Loading course chapters...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full mx-auto shadow-lg border-gray-100 overflow-hidden">
      <CardHeader className="bg-gray-50/50 pb-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {isEdit ? "Edit Chapters & Lessons" : "Add Chapters & Lessons"}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">Organize your course content into structured chapters and lessons.</p>
          </div>
          <div className="bg-primary/10 text-primary px-4 py-2 text-sm font-semibold">
            {chapters.length} {chapters.length === 1 ? 'Chapter' : 'Chapters'}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Register course_id with valueAsNumber to ensure it's sent correctly */}
          <input
            type="hidden"
            {...register("course_id", { valueAsNumber: true })}
          />

          <div className="space-y-10">
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
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <Button
              type="button"
              size="sm"
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
              + Add Another Chapter
            </Button>

            <div className="flex gap-4 w-full sm:w-auto">
              <Button
                variant="default"
                size="lg"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Saving..."
                ) : (
                  isEdit ? "Update Curriculum" : "Save & Continue"
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

