'use client';

import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Chapter } from '@/apiServices/chapterService';
import { Course } from '@/apiServices/courseService';
import { Batch } from '@/apiServices/batchService';
import {
  addLesson,
  updateLesson,
  LessonResponseType,
  Lesson,
} from '@/apiServices/lessonService';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LessonFormValues {
  title: string;
  description: string;
  duration: number;
  type: number;
  video_url: string;
  order: number;
  is_preview: number;
  status: number;
  chapter_id: string;
  course_id?: number;
}

interface LessonFormProps {
  title: string;
  chapters: Chapter[];
  courses: Course[];
  batches: Batch[];
  lesson?: Lesson;
}

export default function LessonForm({
  title,
  chapters,
  courses,
  batches,
  lesson,
}: LessonFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
    reset,
  } = useForm<LessonFormValues>();

  useEffect(() => {
    if (lesson) {
      reset({
        title: lesson.title,
        description: lesson.description,
        duration: lesson.duration,
        type: lesson.type,
        video_url: lesson.video_url,
        order: lesson.order,
        is_preview: lesson.is_preview ? 1 : 0,
        status: lesson.status,
        chapter_id: String(lesson.lm_chapter_id),
        course_id: lesson.course_id ?? undefined,
      });
    }
  }, [lesson, reset]);

  const handleFormSubmit = async (data: LessonFormValues) => {
    const formData = new FormData();

    // sanitize video_url to remove stray backticks and spaces
    const sanitizedVideoUrl = typeof data.video_url === 'string'
      ? data.video_url.replace(/[`\s]/g, '').trim()
      : '';

    // Map fields to API payload
    formData.append('title', String(data.title));
    formData.append('description', String(data.description ?? ''));
    formData.append('duration', String(data.duration ?? 0));
    formData.append('type', String(data.type));
    formData.append('video_url', sanitizedVideoUrl);
    formData.append('order', String(data.order ?? 0));
    formData.append('is_preview', String(data.is_preview));
    formData.append('status', String(data.status));
    // API sample shows `lm_chapter_id`, keep compatibility by sending both keys
    formData.append('chapter_id', String(data.chapter_id));
    formData.append('lm_chapter_id', String(data.chapter_id));
    // Include course_id per API payload
    if (data.course_id !== undefined && data.course_id !== null) {
      formData.append('course_id', String(data.course_id));
    }

    try {
      const res: LessonResponseType = lesson
        ? await updateLesson(String(lesson.id), formData)
        : await addLesson(formData);

      if (res?.success) {
        toast.success(
          res.message || `Lesson ${lesson ? 'updated' : 'added'} successfully!`
        );
        reset();
        router.push('/lms/lessons');
      } else if (res?.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            const message = messages[0];
            const mappedField = field === 'lm_chapter_id' ? 'chapter_id' : (field as keyof LessonFormValues);
            setError(mappedField as keyof LessonFormValues, { type: 'manual', message});
          }
        });
        toast.error('Please fix the errors below.');
      } else {
        toast.error(res?.message || `Failed to ${lesson ? 'update' : 'add'} lesson.`);
      }
    } catch (error: unknown) {
      console.error('Something went wrong. Try again later.', error);
      toast.error('Something went wrong. Try again later.');
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <div className='col-span-2 space-y-2'>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className='col-span-2 space-y-2'>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register('description')} />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                {...register('duration', { valueAsNumber: true })}
              />
              {errors.duration && (
                <p className="text-red-500 text-sm">{errors.duration.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor="order">Order</Label>
              <Input
                id="order"
                type="number"
                {...register('order', { valueAsNumber: true })}
              />
              {errors.order && (
                <p className="text-red-500 text-sm">{errors.order.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor="video_url">Video URL</Label>
              <Input id="video_url" {...register('video_url')} />
              {errors.video_url && (
                <p className="text-red-500 text-sm">{errors.video_url.message}</p>
              )}
            </div>

            <div className='space-y-2 w-full'>
              <Label htmlFor="course_id">Course</Label>
              <Controller
                name="course_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={(value) => field.onChange(Number(value))}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={String(course.id)}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.course_id && (
                <p className="text-red-500 text-sm">{errors.course_id.message}</p>
              )}
            </div>

            <div className='space-y-2 w-full'>
              <Label htmlFor="chapter_id">Chapter</Label>
              <Controller
                name="chapter_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Select chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      {chapters.map((chapter) => (
                        <SelectItem key={chapter.id} value={String(chapter.id)}>
                          {chapter.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.chapter_id && (
                <p className="text-red-500 text-sm">{errors.chapter_id.message}</p>
              )}
            </div>

            <div className='w-full flex justify-between align-items-center'>
              <div className='space-y-2'>
                <Label htmlFor="type">Type</Label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Live Class</SelectItem>
                        <SelectItem value="1">Recording Video</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && (
                  <p className="text-red-500 text-sm">{errors.type.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor="status">Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Active</SelectItem>
                        <SelectItem value="0">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <p className="text-red-500 text-sm">{errors.status.message}</p>
                )}
              </div>

              <div className='space-y-2'>
              <Label htmlFor="is_preview">Preview</Label>
              <Controller
                name="is_preview"
                control={control}
                render={({ field }) => (
                  <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select preview" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Yes</SelectItem>
                      <SelectItem value="1">No</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
                {errors.is_preview && (
                  <p className="text-red-500 text-sm">
                    {errors.is_preview.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className='flex justify-center'>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
