"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

import {
  createFacility,
  updateFacility,
  Facility,
  SingleFacilityResponse,
} from "@/apiServices/facilitiesService";

type FormValues = {
  title: string;
  status: string;
  image?: any; // Can be FileList or File or null
};

export default function FacilitiesForm({
  title,
  facility,
}: {
  title: string;
  facility?: Facility;
}) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(facility?.image || null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: facility?.title || "",
      status: facility?.status?.toString() || "1",
      image: null,
    },
  });

  // ========= Reset if editing =========
  useEffect(() => {
    if (!facility) return;

    reset({
      title: facility.title,
      status: facility.status?.toString(),
      image: null,
    });

    setPreview(facility.image || null);
  }, [facility, reset]);

  const setFormError = (field: string, msg: string) => {
    setError(field as keyof FormValues, {
      type: "server",
      message: msg,
    });
  };

  // ========= Submit Handler =========
  const submitHandler = async (values: FormValues) => {
    let res: SingleFacilityResponse;

    // Extract file from FileList if present
    const imageFile = values.image?.[0] instanceof File ? values.image[0] : null;

    try {
      if (facility) {
        res = await updateFacility(facility.id, {
          title: values.title,
          status: Number(values.status),
          image: imageFile,
        });
      } else {
        res = await createFacility({
          title: values.title,
          status: Number(values.status),
          image: imageFile,
        });
      }

      // Check for validation errors
      if (res.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          setFormError(field, messages[0]);
        });
        return;
      }

      // Check for success (either facility object exists or just a success message without errors)
      if (res.facility || res.message) {
        toast.success(res.message || "Saved successfully");
        router.refresh();
        router.push("/lms/facilities");
        return;
      }

      toast.error(res.message || "Something went wrong");
    } catch (err) {
      toast.error("Server error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-card border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input placeholder="Enter facility title" {...register("title")} />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>

          <div className="space-y-3">
            {preview ? (
              <div className="relative">
                <Image
                  src={preview}
                  alt="Preview"
                  width={120}
                  height={120}
                  className="rounded-lg border object-cover"
                />

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setPreview(null);
                    reset((prev) => ({ ...prev, image: null }));
                  }}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Input
                  id="image"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  {...register("image", {
                    onChange: (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      }
                    },
                  })}
                />

                <label htmlFor="image" className="cursor-pointer block">
                  <div className="flex flex-col items-center gap-2">
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
              <p className="text-sm text-red-500">{(errors.image as any).message}</p>
            )}
          </div>
        </div>

        {/* Status */}
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="1">Active</SelectItem>
                  <SelectItem value="0">Inactive</SelectItem>
                </SelectContent>
              </Select>

              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting
            ? "Submitting..."
            : facility
              ? "Update Facility"
              : "Add Facility"}
        </Button>
      </form>
    </div>
  );
}
