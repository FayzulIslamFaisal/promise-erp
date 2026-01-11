"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Branch } from "@/apiServices/branchService";
import {
  addStats,
  updateStats,
  StatsResponseType,
  Stats,
} from "@/apiServices/statsService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera } from "lucide-react";
import Image from "next/image";

interface StatsFormValues {
  title: string;
  count: string;
  image?: FileList;
  status: number;
  branch_id: number;
}

interface StatsFormProps {
  title: string;
  branches: Branch[];
  stats?: Stats;
  loading?: boolean;
}

export default function StatsForm({
  title,
  branches,
  stats,
  loading,
}: StatsFormProps) {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string | null>(
    stats?.image || null
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
    reset,
    watch,
  } = useForm<StatsFormValues>({
    defaultValues: {
      title: stats?.title || "",
      count: stats?.count || "",
      status: stats?.status || 1,
      branch_id: stats?.branch.id || 0,
      image: undefined,
    },
  });

  const imageFile = watch("image");

  useEffect(() => {
    if (stats) {
      reset({
        title: stats.title,
        count: stats.count,
        status: stats.status,
        branch_id: stats.branch.id,
      });
      if (stats.image) setPreviewImage(stats.image);
    }
  }, [stats, reset]);

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setPreviewImage(e.target?.result as string);
        reader.readAsDataURL(file);
      }
    }
  }, [imageFile]);

  const handleFormSubmit = async (data: StatsFormValues) => {
    const formData = new FormData();

    // Map fields to API payload
    formData.append("title", String(data.title));
    formData.append("count", String(data.count ?? ""));

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    formData.append("status", String(data.status));
    formData.append("branch_id", String(data.branch_id));

    try {
      const res: StatsResponseType = stats
        ? await updateStats(String(stats.id), formData)
        : await addStats(formData);

      if (res?.success) {
        toast.success(
          res.message || `Stats ${stats ? "updated" : "added"} successfully!`
        );
        reset();
        setPreviewImage(null);
        router.push("/lms/stats");
      } else if (res?.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            const message = messages[0];
            const mappedField =
              field === "branch_id"
                ? "branch_id"
                : (field as keyof StatsFormValues);
            setError(mappedField as keyof StatsFormValues, {
              type: "manual",
              message,
            });
          }
        });
        toast.error("Please fix the errors below.");
      } else {
        toast.error(
          res?.message || `Failed to ${stats ? "update" : "add"} stats.`
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Something went wrong. Try again later.", error);
        toast.error("Something went wrong. Try again later.");
      }else {
        console.error("Something went wrong. Try again later.", error);
        toast.error("Something went wrong. Try again later.");
      }
    }
  };

  const handleImageRemove = () => {
    setPreviewImage(null);
    const fileInput = document.getElementById("image") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="count">Count</Label>
              <Input id="count" {...register("count")} />
              {errors.count && (
                <p className="text-red-500 text-sm">{errors.count.message}</p>
              )}
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="image">Image</Label>
              <div className="space-y-3">
                {previewImage ? (
                  <div className="relative">
                    <div className="rounded-lg border-2 border-dashed">
                      <Image
                        src={previewImage || "/images/placeholder.png"}
                        alt="Stats preview"
                        width={200}
                        height={200}
                        className="object-cover rounded-2xl"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 cursor-pointer"
                      onClick={handleImageRemove}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...register("image")}
                    />
                    <label htmlFor="image" className="cursor-pointer block">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <Camera className="w-6 h-6 text-gray-500" />
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          Click to upload image
                        </p>
                      </div>
                    </label>
                  </div>
                )}
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
              </div>
            </div>
            {loading ? (
              <p className="text-sm text-gray-500">Loading branches...</p>
            ) : (
              <div className="space-y-2 w-full">
                <Label htmlFor="branch_id">Branch</Label>
                <Controller
                  name="branch_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select branch" />
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
                {errors.branch_id && (
                  <p className="text-red-500 text-sm">
                    {errors.branch_id.message}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2 w-full">
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={String(field.value)}
                  >
                    <SelectTrigger className="w-full">
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
          </div>
          <div className="flex justify-center">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
