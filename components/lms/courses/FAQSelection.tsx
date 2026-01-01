"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { getFaqs, Faq } from "@/apiServices/faqsService";
import {
  assignFaqsToCourse,
  getCourseFaqs,
  AssignedFaqsResponse,
} from "@/apiServices/courseService";
import { handleFormSuccess } from "@/lib/formErrorHandler";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import NotFoundComponent from "@/components/common/NotFoundComponent";

/* =======================
   Types & Interfaces
======================= */

interface FAQSelectionProps {
  courseId: number;
  onSuccess: () => void;
  isEdit?: boolean;
}

interface FormValues {
  faqs: number[];
}

/* =======================
   Component
======================= */

export default function FAQSelection({
  courseId,
  onSuccess,
  isEdit = false,
}: FAQSelectionProps) {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);

  const { watch, setValue, handleSubmit } = useForm<FormValues>({
    defaultValues: { faqs: [] },
  });

  const selectedFaqIds = watch("faqs");

  /* =======================
     Load all FAQs
  ======================= */
  const loadFaqs = () => {
    setLoadError(null);
    setIsLoading(true);

    startTransition(async () => {
      try {
        const queryParams = {
          per_page: "1000",
          page: "1",
          status: "1",
        };

        const response = await getFaqs(queryParams);

        if (response?.data?.faq_sections) {
          setFaqs(response.data.faq_sections);
        } else {
          throw new Error("Failed to load FAQs");
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to load FAQs";

        setLoadError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  /* =======================
     Load assigned FAQs (Edit mode)
  ======================= */
  useEffect(() => {
    if (!isEdit || !courseId) return;

    const fetchAssignedFaqs = async () => {
      try {
        const response: AssignedFaqsResponse = await getCourseFaqs(courseId);
        console.log("getCourseFaqs response:", response);

        if (response.success && response.data) {
          let faqsList: Faq[] = [];

          if (Array.isArray(response.data)) {
            faqsList = response.data;
          } else if ('faqs' in response.data && Array.isArray(response.data.faqs)) {
            faqsList = response.data.faqs;
          }

          if (faqsList.length > 0) {
            const assignedFaqIds = faqsList.map((faq) => faq.id);
            setValue("faqs", assignedFaqIds);
          }
        }
      } catch (error: unknown) {
        console.error("Failed to load assigned FAQs", error);
      }
    };

    fetchAssignedFaqs();
  }, [isEdit, courseId, setValue]);

  /* =======================
     Toggle FAQ selection
  ======================= */
  const toggleFaq = (
    faqId: number,
    isChecked: boolean
  ) => {
    const updatedFaqIds = isChecked
      ? [...selectedFaqIds, faqId]
      : selectedFaqIds.filter(
        (selectedId) => selectedId !== faqId
      );

    setValue("faqs", updatedFaqIds, {
      shouldValidate: true,
    });
    setSaveError(null);
  };

  /* =======================
     Submit selected FAQs
  ======================= */
  const onSubmit = (formData: FormValues) => {
    if (formData.faqs.length === 0) {
      const errorMessage = "Please select at least 1 FAQ";
      setSaveError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setSaveError(null);

    startTransition(async () => {
      try {
        const response = await assignFaqsToCourse(
          courseId,
          formData.faqs
        );

        if (response.success) {
          handleFormSuccess(
            response.message ||
            "FAQs assigned successfully!"
          );
          onSuccess();
        } else {
          throw new Error(
            response.message || "Failed to save FAQs"
          );
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to save FAQs";

        setSaveError(errorMessage);
        toast.error(errorMessage);
      }
    });
  };

  /* =======================
     UI
  ======================= */
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">
          Select FAQs
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6"
        >
          {/* Loading */}
          {isLoading && !loadError && (
            <p className="text-center">Loading FAQs…</p>
          )}

          {/* Error */}
          {loadError && (
            <NotFoundComponent
              message={loadError}
              onActionClick={loadFaqs}
              actionLabel="Try Again"
            />
          )}

          {/* Empty */}
          {!loadError &&
            !isLoading &&
            faqs.length === 0 && (
              <NotFoundComponent
                message="No active FAQs found. Please create FAQs first."
                onActionClick={loadFaqs}
                actionLabel="Refresh"
              />
            )}

          {/* Validation Error */}
          {saveError && (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md">
              {saveError}
            </div>
          )}

          {/* FAQs List */}
          {!isLoading &&
            !loadError &&
            faqs.length > 0 && (
              <div className="grid gap-4">
                <Label>Select FAQs for this course:</Label>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {faqs.map((faq) => {
                    const isSelected = selectedFaqIds.includes(faq.id);
                    return (
                      <div
                        key={faq.id}
                        className={`flex items-start gap-3 p-4 rounded-lg border transition-all select-none relative group ${isSelected ? "bg-accent border-primary" : "hover:bg-accent/50"
                          }`}
                      >
                        <Checkbox
                          id={`faq-${faq.id}`}
                          checked={isSelected}
                          onCheckedChange={(checked) =>
                            toggleFaq(faq.id, Boolean(checked))
                          }
                          className="mt-1 z-10"
                        />

                        <div className="grid gap-1 flex-1">
                          <Label
                            htmlFor={`faq-${faq.id}`}
                            className="cursor-pointer font-medium text-base leading-none stretched-link after:absolute after:inset-0"
                          >
                            {faq.question}
                          </Label>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          {/* Save Button */}
          {!isLoading &&
            !loadError &&
            faqs.length > 0 && (
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="w-32"
                  disabled={
                    isPending ||
                    selectedFaqIds.length === 0
                  }
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
