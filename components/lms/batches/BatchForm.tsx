
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
import { Batch } from "@/apiServices/batchService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface BatchFormProps {
  title: string;
  onSubmit: (
    formData: any,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => void | Promise<void>;
  batch?: Batch;
}

interface FormValues {
  course_id: string;
  branch_id: string;
  name: string;
  price: number;
  discount_price: number;
  duration: string;
  start_date: string;
  end_date: string;
  is_online: string;
  is_offline: string;
}

export default function BatchForm({ title, onSubmit, batch }: BatchFormProps) {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: batch?.name || "",
      course_id: batch?.course_id?.toString() || "",
      branch_id: batch?.branch_id?.toString() || "",
      price: batch ? parseFloat(batch.price) : 0,
      discount_price: batch ? parseFloat(batch.discount) : 0,
      duration: batch?.duration || "",
      start_date: batch?.start_date || "",
      end_date: batch?.end_date || "",
      is_online: batch?.is_online?.toString() || "0",
      is_offline: batch?.is_offline?.toString() || "0",
    },
  });

  const setFormError = (field: string, message: string) => {
    setError(field as keyof FormValues, { type: "server", message });
  };

  useEffect(() => {
    if (batch) {
      reset({
        name: batch.name,
        course_id: batch.course_id?.toString(),
        branch_id: batch.branch_id?.toString(),
        price: parseFloat(batch.price),
        discount_price: parseFloat(batch.discount),
        duration: batch.duration || "",
        start_date: batch.start_date || "",
        end_date: batch.end_date || "",
        is_online: batch.is_online?.toString() || "0",
        is_offline: batch.is_offline?.toString() || "0",
      });
    }
  }, [batch, reset]);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setIsLoading(true);
        const [branchesRes, coursesRes] = await Promise.all([
          getBranches(),
          getCourses(),
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
    const formData = {
      ...values,
      course_id: Number(values.course_id),
      branch_id: Number(values.branch_id),
      is_online: Number(values.is_online),
      is_offline: Number(values.is_offline),
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
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="discount_price">Discount Price</Label>
              <Input
                id="discount_price"
                type="number"
                placeholder="Enter discount price"
                {...register("discount_price", { valueAsNumber: true })}
              />
              {errors.discount_price && (
                <p className="text-sm text-red-500 mt-1">{errors.discount_price.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="Enter duration"
                {...register("duration")}
              />
              {errors.duration && (
                <p className="text-sm text-red-500 mt-1">{errors.duration.message}</p>
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
            {/* <div className="grid gap-2">
              <Label htmlFor="course_type">Course Type</Label>
              <Controller
                name="course_type"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Course Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Beginner</SelectItem>
                      <SelectItem value="1">Intermediate</SelectItem>
                      <SelectItem value="2">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.course_type && (
                <p className="text-sm text-red-500 mt-1">{errors.course_type.message}</p>
              )}
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
