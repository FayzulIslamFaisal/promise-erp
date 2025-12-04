"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { assignFaqsToCourse } from "@/apiServices/courseService";
import { getFaqs } from "@/apiServices/faqsService";
import { handleFormSuccess } from "@/lib/formErrorHandler";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import NotFoundComponent from "@/components/common/NotFoundComponent";

interface FAQSelectionProps {
  courseId: number;
  onSuccess: () => void;
}

interface FormValues {
  faqs: number[];
}

export default function FAQSelection({ courseId, onSuccess }: FAQSelectionProps) {
  const [faqs, setFaqs] = useState<Array<{ id: number; question: string; answer: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const { control, watch, setValue, handleSubmit} = useForm<FormValues>({
    defaultValues: { faqs: [] },
  });

  const selectedFaqs = watch("faqs");

  // ===============================
  // Fetch FAQs with query params
  // ===============================
  const loadFaqs = async () => {
    setError(null);
    try {
      const res = await getFaqs({ searchParams: { status: 1  }, per_page: 1000 , page: 1 });
      if (res?.success && res.data?.faq_sections) {
        setFaqs(res.data.faq_sections);
      } else {
        const errorMsg = res?.message || "Failed to load FAQs";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      const errorMsg = "Failed to load FAQs";
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  // ===============================
  // Checkbox toggle
  // ===============================
  const toggleFaq = (id: number, checked: boolean) => {
    const current = watch("faqs");
    setValue("faqs", checked ? [...current, id] : current.filter(f => f !== id));
    setSaveError(null);
  };

  // ===============================
  // Save assigned FAQs
  // ===============================
  const onSubmit = (data: FormValues) => {
    if (data.faqs.length === 0) {
      const errorMsg = "Please select at least 1 FAQ";
      setSaveError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setSaveError(null);

    startTransition(async () => {
      try {
        const res = await assignFaqsToCourse(courseId, data.faqs);
        if (res.success) {
          handleFormSuccess(res.message || "FAQs assigned successfully!");
          onSuccess();
        } else {
          const errorMsg = res.message || "Failed to save FAQs";
          setSaveError(errorMsg);
          toast.error(errorMsg);
        }
      } catch (err: any) {
        const errorMsg = err?.message || "Failed to save FAQs";
        setSaveError(errorMsg);
        toast.error(errorMsg);
      }
    });
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Select FAQs</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">

          {/* Loading / Error / Empty states */}
          {faqs.length === 0 && !error && <p className="text-center">Loading FAQs…</p>}

          {error && (
            <NotFoundComponent
              message={error}
              onActionClick={loadFaqs}
              actionLabel="Try Again"
            />
          )}

          {!error && faqs.length === 0 && (
            <NotFoundComponent
              message="No active FAQs found. Please create some FAQs first."
              onActionClick={loadFaqs}
              actionLabel="Refresh"
            />
          )}

          {saveError && (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md">
              {saveError}
            </div>
          )}

          {/* FAQ List */}
          {faqs.length > 0 && !error && (
            <div className="grid gap-4">
              <Label>Select FAQs for this course:</Label>
              <div className="space-y-3">
                {faqs.map(faq => (
                  <div key={faq.id} className="flex items-start space-x-3 p-4 rounded-lg border">
                    <Controller
                      control={control}
                      name="faqs"
                      render={({ field }) => (
                        <Checkbox
                          id={`faq-${faq.id}`}
                          checked={field.value.includes(faq.id)}
                          onCheckedChange={(checked) => toggleFaq(faq.id, checked as boolean)}
                        />
                      )}
                    />
                    <div className="grid gap-1.5">
                      <Label
                        htmlFor={`faq-${faq.id}`}
                        className="font-semibold text-base leading-none cursor-pointer"
                      >
                        {faq.question}
                      </Label>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          {faqs.length > 0 && !error && (
            <div className="flex justify-center mt-4">
              <Button
                type="submit"
                disabled={isPending || selectedFaqs.length === 0}
                className="w-32"
              >
                {isPending ? "Saving..." : "Save FAQs"}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
