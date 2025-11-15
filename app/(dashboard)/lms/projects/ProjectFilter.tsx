
"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, FilterX } from "lucide-react";
import { Branch } from "@/apiServices/branchService"
import { Division } from "@/apiServices/divisionService"
import { Course } from "@/apiServices/courseService"
interface FilterFormValues {
  search?: string
  sort_order?: string   
  division_id?: string
  branch_id?: string
  course_id?: string
}
interface StudentFilterProps {
  divisions: Division[]
  branches: Branch[]
  courses: Course[]
}

export default function ProjectFilter({
  divisions,
  branches,
  courses,
}: StudentFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { register, control, reset, watch, setValue } = useForm<FilterFormValues>({
    defaultValues: {
      search: searchParams.get("search") || "",
      sort_order: searchParams.get("sort_order") || "",
      division_id: searchParams.get("division_id") || "",
      branch_id: searchParams.get("branch_id") || "",
      course_id: searchParams.get("course_id") || "",
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");

      Object.entries(watchedValues).forEach(([key, value]) => {
        if (value && value !== "") {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      const newUrl = `${pathname}?${params.toString()}`;
      router.replace(newUrl, { scroll: false });
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [JSON.stringify(watchedValues), router, pathname]);

  const handleSelectChange = (name: keyof FilterFormValues) => (value: string) => {
    setValue(name, value);
  };

  const handleReset = () => {
    reset({
      search: "",
      sort_order: "",
      division_id: "",
      branch_id: "",
      course_id: "",
    });
    router.replace(pathname);
  };

  const currentSearch = searchParams.get("search") || "";
  const currentSortOrder = searchParams.get("sort_order") || "";
  const currentDivision = searchParams.get("division_id") || "";
  const currentBranch = searchParams.get("branch_id") || "";
  const currentCourse = searchParams.get("course_id") || "";

  const hasActiveFilters =
    currentSearch !== "" ||
    currentSortOrder !== "" ||
    currentDivision !== "" ||
    currentBranch !== "" ||
    currentCourse !== "";

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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search Input */}
        <div className="relative col-span-1 lg:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search categories..." 
            className="pl-10"
            {...register("search")}
          />
        </div>

        <Controller
          name="sort_order"
          control={control}
          render={({ field }) => (
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                handleSelectChange("sort_order")(value);
              }} 
              value={field.value}
            >
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
        {/* Division */}
        <Controller
          name="division_id"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Division" />
              </SelectTrigger>
              <SelectContent>
                {divisions.map((division) => (
                  <SelectItem key={division.id} value={String(division.id)}>
                    {division.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {/* Branch */}
        <Controller
          name="branch_id"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={String(branch.id)}>
                    {branch.name}
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
      </div>
    </div>
  );
}

