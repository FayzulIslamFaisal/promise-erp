'use client'

import { useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Course } from "@/apiServices/courseService"
import { Batch } from "@/apiServices/batchService"
import { Chapter } from "@/apiServices/chapterService" // This will be created later
import { Search, FilterX } from "lucide-react"

interface FilterFormValues {
  search?: string
  sort_order?: string
  status?: string
  chapter_id?: string
  course_id?: string
  batch_id?: string
  type?: string
}

interface LessonFilterProps {
  chapters: Chapter[]
  courses: Course[]
  batches: Batch[]
}

export default function LessonFilter({
  chapters,
  courses,
  batches,
}: LessonFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { register, control, reset, watch } = useForm<FilterFormValues>({
    defaultValues: {
      search: searchParams.get("search") || "",
      sort_order: searchParams.get("sort_order") || "",
      status: searchParams.get("status") || "",
      chapter_id: searchParams.get("chapter_id") || "",
      course_id: searchParams.get("course_id") || "",
      batch_id: searchParams.get("batch_id") || "",
      type: searchParams.get("type") || "",
    },
  })

  const watchedValues = watch()

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    Object.entries(watchedValues).forEach(([key, value]) => {
      if (value) {
        params.set(key, String(value))
      } else {
        params.delete(key)
      }
    })

    const timer = setTimeout(() => {
      router.replace(`${pathname}?${params.toString()}`)
    }, 500)

    return () => clearTimeout(timer)
  }, [JSON.stringify(watchedValues), router, pathname]);

  const handleReset = () => {
    reset({
      search: "",
      sort_order: "",
      status: "",
      chapter_id: "",
      course_id: "",
      batch_id: "",
      type: "",
    })
    router.replace(pathname)
  }

  const hasActiveFilters = Object.values(watchedValues).some(
    (value) => value && value !== ""
  )

  return (
    <div className="p-6 mb-6 border rounded-xl bg-card shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        {hasActiveFilters && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <FilterX className="h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {/* Search Input */}
        <div className="relative col-span-1 lg:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search lessons..."
            className="pl-10"
            {...register("search")}
          />
        </div>

        {/* Sort By */}
        <Controller
          name="sort_order"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">ASC</SelectItem>
                <SelectItem value="desc">DESC</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        {/* Chapter */}
        <Controller
          name="chapter_id"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chapter" />
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

        {/* Course */}
        <Controller
          name="course_id"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                {courses?.map((course) => (
                  <SelectItem key={course.id} value={String(course.id)}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {/* Batch */}
        <Controller
          name="batch_id"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Batch" />
              </SelectTrigger>
              <SelectContent>
                {batches.map((batch) => (
                  <SelectItem key={batch.id} value={String(batch.id)}>
                    {batch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {/* Type */}
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Live Class</SelectItem>
                <SelectItem value="1">Video</SelectItem>
                <SelectItem value="2">Reading</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        {/* Status */}
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Active</SelectItem>
                <SelectItem value="0">Inactive</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  )
}
