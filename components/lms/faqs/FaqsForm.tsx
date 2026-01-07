"use client";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { createFaq, updateFaq, Faq } from "@/apiServices/faqsService";

interface FaqFormProps {
  title: string;
  faq?: Faq;
}

interface FormValues {
  question: string;
  answer: string;
  status: string;
}

export default function FaqForm({ title, faq }: FaqFormProps) {
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
  const submitHandler = async (values: FormValues) => {
    const payload = {
      question: values.question.trim(),
      answer: values.answer.trim(),
      status: Number(values.status),
    };

    try {
      let res;
      if (faq) {
        res = await updateFaq(faq.id, payload);
      } else {
        res = await createFaq(payload);
      }
      console.log(res);
      if (res.success) {
        toast.success(res.message || "FAQ saved successfully!");
        reset();
        router.push("/lms/faqs");
        return;
      }

      if (res.errors) {
        toast.error(res.message || "Validation failed");

        Object.entries(res.errors).forEach(([field, messages]) => {
          const errorMessage = Array.isArray(messages)
            ? messages[0]
            : messages;

          setError(field as keyof FormValues, {
            type: "server",
            message: errorMessage as string,
          });
        });
      } else {
        toast.error(res.message || "Failed to save FAQ");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.error(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full bg-background flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-6xl bg-card border rounded-2xl p-10 shadow-md">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          {title}
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
          {/* Question */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Question
            </label>
            <Input
              placeholder="Enter FAQ question"
              {...register("question")}
              className="h-11"
            />
            {errors.question && (
              <p className="text-sm text-red-500 mt-1">
                {errors.question.message}
              </p>
            )}
          </div>

          {/* Answer */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Answer
            </label>
            <Textarea
              rows={6}
              placeholder="Enter FAQ answer"
              {...register("answer")}
            />
            {errors.answer && (
              <p className="text-sm text-red-500 mt-1">
                {errors.answer.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Status
            </label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full h-11">
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
              <p className="text-sm text-red-500 mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : faq
                  ? "Update FAQ"
                  : "Add FAQ"}
            </Button>
          </div>
        </form>
      
      </div>
    </div>

  );
}
