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

import { useEffect } from "react";
import { JoinType, createJoin, updateJoin, SingleJoinResponse } from "@/apiServices/joinService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface JoinFormProps {
  title: string;
  join?: JoinType;
}

interface FormValues {
  title: string;
  status: number;
}

export default function JoinForm({ title, join }: JoinFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: join?.title || "",
      status: join?.status ?? 1,
    },
  });

  useEffect(() => {
    if (join) {
      reset({
        title: join.title,
        status: join.status,
      });
    }
  }, [join, reset]);

  const submitHandler = async (values: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title.trim());
      formData.append("status", String(values.status));

      const res: SingleJoinResponse = join
        ? await updateJoin(join.id, formData)
        : await createJoin(formData);

      if (res.success) {
        toast.success(res.message || `Join ${join ? 'updated' : 'created'} successfully!`);
        reset();
        router.push('/lms/who-can-join');
      } else if (res.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setError(field as keyof FormValues, { type: 'manual', message: messages[0] });
          } else if (typeof messages === 'string') {
            setError(field as keyof FormValues, { type: 'manual', message: messages });
          }
        });
        toast.error('Please fix the errors below.');
      } else {
        toast.error(res.message || `Failed to ${join ? 'update' : 'create'} join.`);
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error('Something went wrong. Try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-card border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Join Title</label>
          <Input
            placeholder="Enter join title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>

          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <Select
                value={String(field.value)}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="1">Active</SelectItem>
                  <SelectItem value="0">Inactive</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {errors.status && (
            <p className="text-sm text-red-500 mt-1">
              {errors.status.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : join ? "Update Join" : "Add Join"}
        </Button>
      </form>
    </div>
  );
}
