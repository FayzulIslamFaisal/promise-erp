"use client";

import { useForm, useFieldArray, Controller, Path } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Wrench, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createCourseTools, updateCourseTools, getCourseTools, CourseTool } from "@/apiServices/courseService";
import Image from "next/image";

interface ToolFormInput {
  id?: number;
  title: string;
  sub_title: string;
  image: File | string | null;
}

interface FormValues {
  course_id: number;
  course_tools: ToolFormInput[];
}

interface CourseToolsAddFormProps {
  courseId: number;
  onSuccess: () => void;
  isEdit?: boolean;
}

export default function CourseToolsAddForm({ courseId, onSuccess, isEdit = false }: CourseToolsAddFormProps) {
  const [loading, setLoading] = useState(isEdit);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      course_id: courseId,
      course_tools: [
        {
          title: "",
          sub_title: "",
          image: null,
        },
      ],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "course_tools",
  });

  // Fetch existing tools in edit mode
  useEffect(() => {
    if (isEdit && courseId) {
      const fetchTools = async () => {
        try {
          const res = await getCourseTools(courseId);
          console.log("Fetched tools:", res);
          if (res.success && res.data) {
            const fetchedTools = Array.isArray(res.data) ? res.data : (res.data.course_tools || []);

            if (fetchedTools.length > 0) {
              replace(fetchedTools.map((tool: CourseTool) => ({
                id: tool.id,
                title: tool.title || "",
                sub_title: tool.sub_title || "",
                image: tool.image || null,
              })));
            }
          }
        } catch (err: unknown) {
          toast.error("Error loading course tools");
          console.error("Error fetching course tools:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchTools();
    }
  }, [isEdit, courseId, replace]);

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("course_id", String(data.course_id));

      data.course_tools.forEach((tool, index) => {
        if (tool.id) formData.append(`course_tools[${index}][id]`, String(tool.id));
        formData.append(`course_tools[${index}][title]`, tool.title);
        formData.append(`course_tools[${index}][sub_title]`, tool.sub_title || "");
        formData.append(`course_tools[${index}][status]`, "1");

        if (tool.image instanceof File) {
          formData.append(`course_tools[${index}][image]`, tool.image);
        }
      });

      const apiCall = isEdit ? updateCourseTools : createCourseTools;
      const res = await apiCall(formData);
      if (res.success) {
        toast.success(res.message || (isEdit ? "Course tools updated successfully!" : "Course tools created successfully!"));
        onSuccess();
      } else {
        toast.error(res.message || "Failed to save course tools");
        if (res.errors) {
          Object.entries(res.errors).forEach(([key, error]) => {
            const errorMessage = Array.isArray(error) ? error[0] : error;
            setError(key as Path<FormValues>, { type: "server", message: errorMessage as string });
          });
        }
      }
    } catch (error: unknown) {
      console.error("Error:", error);
      toast.error("Error while saving course tools");
    }
  };

  if (loading) {
    return (
      <Card className="w-full mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center h-48 space-y-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-muted-foreground animate-pulse">Loading course tools...</p>
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
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Wrench className="w-6 h-6 text-primary" />
              {isEdit ? "Edit Course Tools" : "Add Course Tools"}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">Specify the software or physical tools needed for this course.</p>
          </div>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-semibold">
            {fields.length} {fields.length === 1 ? 'Tool' : 'Tools'}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" encType="multipart/form-data">
          <input type="hidden" {...register("course_id")} />

          <div className="space-y-10">
            {fields.map((field, index) => (

              <div
                key={field.id}
                className="border border-gray-100 rounded-2xl p-6 bg-white space-y-6 shadow-sm transition-all duration-300 hover:shadow-md border-l-4 border-l-primary/40 relative group"
              >
                <input type="hidden" {...register(`course_tools.${index}.id`)} />

                <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm">
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-lg text-gray-800">Tool Information</h3>
                  </div>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 w-11"
                      onClick={() => {
                        remove(index);

                        toast.success("Tool removed successfully");
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Remove
                    </Button>


                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Tool Title */}
                  <div className="grid gap-2">
                    <Label className="text-sm font-semibold text-gray-700 ml-1">
                      Tool Title <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      {...register(`course_tools.${index}.title`)}
                      placeholder="e.g. Adobe Photoshop, Figma, VS Code"
                      className="h-11 rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 transition-all"
                    />
                    {errors.course_tools?.[index]?.title && (
                      <p className="text-red-500 text-xs font-medium italic ml-1">
                        {errors.course_tools[index]?.title?.message}
                      </p>
                    )}
                  </div>

                  {/* Sub Title / Short Description */}
                  <div className="grid gap-2">
                    <Label className="text-sm font-semibold text-gray-700 ml-1">Short Description</Label>
                    <Input
                      {...register(`course_tools.${index}.sub_title`)}
                      placeholder="e.g. For vector design and prototyping"
                      className="h-11 rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 transition-all"
                    />
                    {errors.course_tools?.[index]?.sub_title && (
                      <p className="text-red-500 text-xs font-medium italic ml-1">
                        {errors.course_tools[index]?.sub_title?.message}
                      </p>
                    )}
                  </div>


                  {/* Image Upload */}
                  <div className="grid gap-2">
                    <Label className="text-sm font-medium">
                      Tool Icon / Image {isEdit && <span className="text-[10px] text-primary italic ml-1">(optional)</span>}
                    </Label>
                    <Controller
                      control={control}
                      name={`course_tools.${index}.image`}
                      render={({ field: { value, onChange } }) => (
                        <label className="flex flex-col items-center justify-center w-full h-40 cursor-pointer border-2 border-dashed rounded-xl bg-muted/30  text-muted-foreground">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => onChange(e.target.files?.[0] || null)}
                          />
                          <UploadCloud className="w-7 h-7 mb-2" />
                          <p className="text-sm font-medium">Drag an image</p>
                          <p className="text-xs text-muted-foreground">Select an image or drag here to upload</p>
                          {value instanceof File && (
                            <Image
                              src={URL.createObjectURL(value)}
                              width={64}
                              height={64}
                              alt="Selected Tool Image"
                              className="mt-2 max-h-16 object-contain rounded-md"
                            />
                          )}
                          {typeof value === "string" && value && (
                            <Image
                              src={value}
                              width={64}
                              height={64}
                              alt="Selected Tool Image"
                              className="mt-2 max-h-16 object-contain rounded-md"
                            />
                          )}
                        </label>
                      )}
                    />
                    {errors.course_tools?.[index]?.image && (
                      <p className="text-red-500 text-xs font-medium italic ml-1">
                        {errors.course_tools[index]?.image?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 p-4">
            <Button
              type="button"
              size="sm"
              onClick={() => append({ title: "", sub_title: "", image: null })}
            >
              <Plus /> Add Another Tool
            </Button>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </div>
              ) : isEdit ? "Update Course Tools" : "Save Tools & Continue"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
