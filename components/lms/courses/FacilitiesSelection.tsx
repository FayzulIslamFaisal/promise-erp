"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { getFacilities } from "@/apiServices/facilitiesService";
import { assignFacilitiesToCourse } from "@/apiServices/courseService";
import { handleFormSuccess } from "@/lib/formErrorHandler";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import NotFoundComponent from "@/components/common/NotFoundComponent";
import Image from "next/image";

interface FacilitiesSelectionProps {
  courseId: number;
  onSuccess: () => void;
}

interface FormValues {
  facilities: number[];
}

export default function FacilitiesSelection({
  courseId,
  onSuccess,
}: FacilitiesSelectionProps) {
  const [facilities, setFacilities] = useState<
    Array<{ id: number; title: string; image: string | null }>
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);

  const { watch, setValue, handleSubmit } = useForm<FormValues>({
    defaultValues: { facilities: [] },
  });

  const selectedFacilities = watch("facilities");

  // ============================================
  // 🔹 Load Facilities Using Transition + Search Params
  // ============================================
  const loadFacilities = () => {
    setError(null);
    setIsLoading(true);

    startTransition(async () => {
      try {
        const params = {
          per_page: "1000",
          page: "1",
          status: "1",
        };

        const res = await getFacilities(params);

        if (res?.data?.facilities) {
          setFacilities(res.data.facilities);
        } else {
          const errorMsg = "Failed to load facilities";
          setError(errorMsg);
          toast.error(errorMsg);
        }
      } catch (err) {
        const errorMsg = "Failed to load facilities";
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    loadFacilities();
  }, []);

  // ============================================
  // 🔹 Toggle facility selection
  // ============================================
  const toggleFacility = (id: number, checked: boolean) => {
    const updated = checked
      ? [...selectedFacilities, id]
      : selectedFacilities.filter((f) => f !== id);

    setValue("facilities", updated, { shouldValidate: true });
    setSaveError(null);
  };

  // ============================================
  // 🔹 Submit selected facilities
  // ============================================
  const onSubmit = (data: FormValues) => {
    if (data.facilities.length === 0) {
      const errorMsg = "Please select at least 1 facility";
      setSaveError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setSaveError(null);

    startTransition(async () => {
      try {
        const res = await assignFacilitiesToCourse(courseId, data.facilities);

        if (res.success) {
          handleFormSuccess(res.message || "Facilities assigned successfully!");
          onSuccess();
        } else {
          const errorMsg = res.message || "Failed to save facilities";
          setSaveError(errorMsg);
          toast.error(errorMsg);
        }
      } catch (err: any) {
        const errorMsg = err?.message || "Failed to save facilities";
        setSaveError(errorMsg);
        toast.error(errorMsg);
      }
    });
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Select Facilities</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">

          {/* 🔹 Loading State */}
          {isLoading && !error && (
            <p className="text-center">Loading facilities…</p>
          )}

          {/* 🔹 Error State */}
          {error && (
            <NotFoundComponent
              message={error}
              onActionClick={loadFacilities}
              actionLabel="Try Again"
            />
          )}

          {/* 🔹 Empty State */}
          {!error && !isLoading && facilities.length === 0 && (
            <NotFoundComponent
              message="No active facilities found. Please create facilities first."
              onActionClick={loadFacilities}
              actionLabel="Refresh"
            />
          )}

          {/* 🔹 Validation Error */}
          {saveError && (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md">
              {saveError}
            </div>
          )}

          {/* 🔹 Facilities List */}
          {!isLoading && facilities.length > 0 && !error && (
            <div className="grid gap-4">
              <Label>Select facilities for this course:</Label>

              <div className="space-y-3">
                {facilities.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-4 rounded-lg border"
                  >
                    <Checkbox
                      id={`fac-${item.id}`}
                      checked={selectedFacilities.includes(item.id)}
                      onCheckedChange={(checked) =>
                        toggleFacility(item.id, !!checked)
                      }
                    />

                    <Image
                      src={item.image || "/images/placeholder.png"}
                      width={45}
                      height={45}
                      alt={item.title}
                      className="rounded object-cover"
                    />

                    <Label
                      htmlFor={`fac-${item.id}`}
                      className="cursor-pointer font-medium"
                    >
                      {item.title}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 🔹 Save Button */}
          {!isLoading && facilities.length > 0 && !error && (
            <div className="flex justify-center mt-4">
              <Button
                type="submit"
                className="w-32"
                disabled={isPending || selectedFacilities.length === 0}
              >
                {isPending ? "Saving..." : "Save Facilities"}
              </Button>
            </div>
          )}

        </form>
      </CardContent>
    </Card>
  );
}
