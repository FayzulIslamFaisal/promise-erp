"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  createFaq,
  updateFaq,
  Faq,
  SingleFaqResponse,
} from "@/apiServices/faqsService";

type FormValues = {
  question: string;
  answer: string;
  status: string;
};

export default function FaqForm({
  title,
  faq,
}: {
  title: string;
  faq?: Faq;
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      question: faq?.question || "",
      answer: faq?.answer || "",
      status: faq?.status?.toString() || "1",
    },
  });

  // Reset when editing
  useEffect(() => {
    if (!faq) return;

    reset({
      question: faq.question,
      answer: faq.answer,
      status: faq.status?.toString() || "1",
    });
  }, [faq, reset]);

  const setFormError = (field: string, message: string) => {
    setError(field as keyof FormValues, {
      type: "server",
      message,
    });
  };

  const submitHandler = async (values: FormValues) => {
    const payload = {
      question: values.question,
      answer: values.answer,
      status: Number(values.status),
    };

    let res: SingleFaqResponse;

    try {
      if (faq) {
        res = await updateFaq(faq.id, payload);
      } else {
        res = await createFaq(payload);
      }

      if (res.success) {
        toast.success(res.message);
        router.push("/lms/faqs");
        return;
      }

      // Validation errors
      if (res.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (messages.length > 0) {
            setFormError(field, messages[0]);
          }
        });
        return;
      }

      toast.error(res.message || "Something went wrong");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-card border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        
        {/* Question */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Question
          </label>
          <Input
            placeholder="Enter FAQ question"
            {...register("question")}
          />
          {errors.question && (
            <p className="text-red-500 text-sm">{errors.question.message}</p>
          )}
        </div>

        {/* Answer */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Answer
          </label>
          <Textarea
            placeholder="Enter FAQ answer"
            {...register("answer")}
          />
          {errors.answer && (
            <p className="text-red-500 text-sm">{errors.answer.message}</p>
          )}
        </div>

        {/* Status */}
        <Controller
          name="status"
          control={control}
          rules={{ required: "Status is required" }}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium mb-1">
                Status
              </label>

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
        <Button disabled={isSubmitting} className="w-full" type="submit">
          {isSubmitting ? "Submitting..." : faq ? "Update FAQ" : "Add FAQ"}
        </Button>
      </form>
    </div>
  );
}
