"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Division, DivisionFormData } from "@/apiServices/divisionService";
import { useEffect } from "react";

interface DivisionFormProps {
  title: string;
  buttonTitle: string;
  defaultValues?: Division;
  onSubmit: (
    formData: DivisionFormData,
    setFormError: (field: string, message: string) => void
  ) => void | Promise<void>;
}

interface FormValues {
  name: string;
}

export default function DivisionForm({ title, buttonTitle, defaultValues, onSubmit }: DivisionFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: defaultValues?.name || "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({ name: defaultValues.name });
    }
  }, [defaultValues, reset]);

  const setFormError = (field: string, message: string) => {
    setError(field as keyof FormValues, { type: "server", message });
  };

  const submitHandler = (values: FormValues) => {
    const formData: DivisionFormData = {
      name: values.name.trim(),
    };
    onSubmit(formData, setFormError);
  };

  return (
    <div className="max-w-md mx-auto bg-card border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Division Name</label>
          <Input
            placeholder="Enter division name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : buttonTitle}
        </Button>
      </form>
    </div>
  );
}
