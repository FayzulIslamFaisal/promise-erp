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
import {
  addStats,
  updateStats,
  SingleStatsResponse,
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
  count: number;
  image?: FileList;
  status: number;
}

interface StatsFormProps {
  title: string;
  stats?: Stats;
}

export default function StatsForm({
  title,
  stats,
}: StatsFormProps) {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string | null>(
    stats?.image || null
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    reset,
    watch,
  } = useForm<StatsFormValues>({
    defaultValues: {
      title: stats?.title || "",
      count: stats?.count || 0,
      status: stats?.status || 1,
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
    formData.append("count", String(data.count ?? 0));

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    formData.append("status", String(data.status));

    try {
      const res: SingleStatsResponse = stats
        ? await updateStats(stats.id, formData)
        : await addStats(formData);

      if (res?.success) {
        toast.success(res.message || `Stats ${stats ? "updated" : "added"} successfully!`);
        reset();
        setPreviewImage(null);
        router.push("/web-content/stats");
      } else if (res?.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (messages.length > 0) {
            const message = messages[0];
            
            setError(field as keyof StatsFormValues, {
              type: "server",
              message,
            });
          }
        });
      } else {
        toast.error(res?.message || `Failed to ${stats ? "update" : "add"} stats.`);
      }
    } catch (error: unknown) {
      console.error("Error in handleFormSubmit:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      }else {
        toast.error("An unexpected error occurred.");
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
            <div className="col-span-1 space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="col-span-1 space-y-2">
              <Label htmlFor="count">Count</Label>
              <Input id="count" type="number" {...register("count")} />
              {errors.count && (
                <p className="text-red-500 text-sm">{errors.count.message}</p>
              )}
            </div>

            <div className="space-y-2 w-full">
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
            <Button 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : stats
                  ? "Update Stats" 
                  : "Add Stats"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
