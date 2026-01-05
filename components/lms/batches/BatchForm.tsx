
"use client";

import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Branch, getBranches } from "@/apiServices/branchService";
import { Course, getCourses } from "@/apiServices/courseService";
import { getTeachers } from "@/apiServices/teacherService";
import { Batch, BatchResponseType, CreateBatchRequest } from "@/apiServices/batchService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";


import { Teacher } from "@/apiServices/teacherService";

interface BatchFormProps {
  title: string;
  onSubmit: (
    formData: CreateBatchRequest,
    setFormError: (field: keyof FormValues, message: string) => void,
    resetForm: () => void
  ) => void | Promise<void>;
  batch?: Batch;
}

interface FormValues {
  course_id: string;
  branch_id: string;
  name: string;
  price: number;
  discount: number;
  discount_type: string;
  duration: string;
  start_date: string;
  end_date: string;
  is_online: string;
  is_offline: string;
  teacher_ids?: string[];
}

export default function BatchForm({ title, onSubmit, batch }: BatchFormProps) {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: batch?.name || "",
      course_id: batch?.course_id?.toString() || "",
      branch_id: batch?.branch_id?.toString() || "",
      price: batch ? parseFloat(batch.price.toString()) : 0,
      discount: batch ? parseFloat(batch.discount?.toString() || "0") : 0,
      discount_type: batch?.discount_type || "percentage",
      duration: batch?.duration || "",
      start_date: batch?.start_date_raw || "",
      end_date: batch?.end_date_raw || "",
      is_online: batch?.is_online?.toString() || "0",
      is_offline: batch?.is_offline?.toString() || "0",
      teacher_ids: batch?.instructors?.map((t) => t.id.toString()) ||
        batch?.teacher_ids?.map((id) => id.toString()) || [],
    },
  });

  const selectedBranchId = watch("branch_id");

  console.log('batch', batch);

  const setFormError = (field: keyof FormValues, message: string) => {
    setError(field, { type: "server", message });
  };

  useEffect(() => {
    if (batch) {
      reset({
        name: batch.name,
        course_id: batch.course_id?.toString(),
        branch_id: batch.branch_id?.toString(),
        price: parseFloat(batch.price.toString()),
        discount: parseFloat(batch.discount?.toString() || "0"),
        discount_type: batch.discount_type || "percentage",
        duration: batch.duration || "",
        start_date: batch.start_date_raw || "",
        end_date: batch.end_date_raw || "",
        is_online: batch.is_online?.toString() || "0",
        is_offline: batch.is_offline?.toString() || "0",
        teacher_ids: batch.instructors?.map((t) => t.id.toString()) ||
          batch.teacher_ids?.map((id) => id.toString()) || [],
      });
    }
  }, [batch, reset]);

  useEffect(() => {
    async function fetchTeachers() {
      if (!selectedBranchId) {
        setTeachers([]);
        return;
      }
      try {
        const response = await getTeachers({ branch_id: selectedBranchId, per_page: 100, });
        if (response.success) {
          setTeachers(response.data?.teachers || []);
        }
        console.log('Fetched teachers:', response.data?.teachers);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    }
    fetchTeachers();
  }, [selectedBranchId]);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setIsLoading(true);
        const [branchesRes, coursesRes] = await Promise.all([
          getBranches({ per_page: 999 }),
          getCourses({ per_page: 999 }),
        ]);
        if (branchesRes.success) {
          setBranches(branchesRes.data?.branches || []);
        }
        if (coursesRes.success) {
          setCourses(coursesRes.data?.courses || []);
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialData();
  }, []);

  const submitHandler = (values: FormValues) => {
    const formData: CreateBatchRequest = {
      ...values,
      course_id: Number(values.course_id),
      branch_id: Number(values.branch_id),
      price: Number(values.price),
      discount: Number(values.discount),
      is_online: Number(values.is_online),
      is_offline: Number(values.is_offline),
      teacher_ids: values.teacher_ids ? values.teacher_ids.map(id => Number(id)) : [],
    };
    onSubmit(formData, setFormError, () => reset());
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(submitHandler)} className="grid gap-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="course_id">Course</Label>
              <Controller
                name="course_id"
                control={control}
                rules={{ required: "Course is required" }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={isLoading ? "Loading courses..." : "Select Course"} />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id.toString()}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.course_id && (
                <p className="text-sm text-red-500 mt-1">{errors.course_id.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="branch_id">Branch</Label>
              <Controller
                name="branch_id"
                control={control}
                rules={{ required: "Branch is required" }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={isLoading ? "Loading branches..." : "Select Branch"} />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch.id} value={branch.id.toString()}>
                          {branch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.branch_id && (
                <p className="text-sm text-red-500 mt-1">{errors.branch_id.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Batch Name</Label>
              <Input
                id="name"
                placeholder="Enter Batch name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g. 3 months"
                {...register("duration")}
              />
              {errors.duration && (
                <p className="text-sm text-red-500 mt-1">{errors.duration.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="discount_type">Discount Type</Label>
              <Controller
                name="discount_type"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.discount_type && (
                <p className="text-sm text-red-500 mt-1">{errors.discount_type.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="discount">Discount Value</Label>
              <Input
                id="discount"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("discount", { valueAsNumber: true })}
              />
              {errors.discount && (
                <p className="text-sm text-red-500 mt-1">{errors.discount.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                {...register("start_date")}
              />
              {errors.start_date && (
                <p className="text-sm text-red-500 mt-1">{errors.start_date.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="date"
                {...register("end_date")}
              />
              {errors.end_date && (
                <p className="text-sm text-red-500 mt-1">{errors.end_date.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* added teacher_ids field multiselect */}
            <div className="grid gap-2 col-span-1 md:col-span-2">
              <Label htmlFor="teacher_ids">Teachers</Label>
              <Controller
                name="teacher_ids"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 border rounded-md p-4 max-h-60 overflow-y-auto bg-muted/20">
                    {teachers.length > 0 ? (
                      teachers.map((teacher) => (
                        <div key={teacher.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent/50 transition-colors border border-transparent hover:border-accent">
                          <input
                            type="checkbox"
                            id={`teacher-${teacher.id}`}
                            checked={field.value?.includes(teacher.id.toString())}
                            onChange={(e) => {
                              const currentValues = field.value || [];
                              const teacherIdStr = teacher.id.toString();
                              if (e.target.checked) {
                                field.onChange([...currentValues, teacherIdStr]);
                              } else {
                                field.onChange(currentValues.filter((id) => id !== teacherIdStr));
                              }
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                          />
                          <Label
                            htmlFor={`teacher-${teacher.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                          >
                            {teacher.name}
                          </Label>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground col-span-full text-center py-4">
                        {selectedBranchId ? "No teachers found for this branch." : "Please select a branch first."}
                      </p>
                    )}
                  </div>
                )}
              />
              {errors.teacher_ids && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.teacher_ids.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-1 md:col-span-2">
              <div className="grid gap-2">
                <Label htmlFor="is_online">Is Online?</Label>
                <Controller
                  name="is_online"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Yes</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.is_online && (
                  <p className="text-sm text-red-500 mt-1">{errors.is_online.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="is_offline">Is Offline?</Label>
                <Controller
                  name="is_offline"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Yes</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.is_offline && (
                  <p className="text-sm text-red-500 mt-1">{errors.is_offline.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="cursor-pointer"
            >
              {isSubmitting ? "Submitting..." : batch ? "Update Batch" : "Add Batch"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
