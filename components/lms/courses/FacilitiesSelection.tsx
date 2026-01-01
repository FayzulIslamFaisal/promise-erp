"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { getFacilities, Facility } from "@/apiServices/facilitiesService";
import {
  assignFacilitiesToCourse,
  getCourseFacilities,
  AssignedFacilitiesResponse,
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
import Image from "next/image";

/* =======================
   Types & Interfaces
======================= */

interface FacilitiesSelectionProps {
  courseId: number;
  onSuccess: () => void;
  isEdit?: boolean;
}

interface FormValues {
  facilities: number[];
}

// Local Facility interface removed, using imported one

/* =======================
   Component
======================= */

export default function FacilitiesSelection({
  courseId,
  onSuccess,
  isEdit = false,
}: FacilitiesSelectionProps) {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);

  const { watch, setValue, handleSubmit } = useForm<FormValues>({
    defaultValues: { facilities: [] },
  });

  const selectedFacilityIds = watch("facilities");

  /* =======================
     Load all facilities
  ======================= */
  const loadFacilities = () => {
    setLoadError(null);
    setIsLoading(true);

    startTransition(async () => {
      try {
        const queryParams = {
          per_page: "1000",
          page: "1",
          status: "1",
        };

        const response = await getFacilities(queryParams);

        if (response?.data?.facilities) {
          setFacilities(response.data.facilities);
        } else {
          throw new Error("Failed to load facilities");
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to load facilities";

        setLoadError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    loadFacilities();
  }, []);

  /* =======================
     Load assigned facilities (Edit mode)
  ======================= */
  useEffect(() => {
    if (!isEdit || !courseId) return;

    const fetchAssignedFacilities = async () => {
      try {
        const response: AssignedFacilitiesResponse = await getCourseFacilities(courseId);
        console.log("getCourseFacilities response:", response);

        if (response.success && response.data) {
          let facilitiesList: Facility[] = [];

          if (Array.isArray(response.data)) {
            facilitiesList = response.data;
          } else if ('facilities' in response.data && Array.isArray(response.data.facilities)) {
            facilitiesList = response.data.facilities;
          }

          if (facilitiesList.length > 0) {
            const assignedFacilityIds = facilitiesList.map((facility) => facility.id);
            setValue("facilities", assignedFacilityIds);
          }
        }
      } catch (error: unknown) {
        console.error("Failed to load assigned facilities", error);
      }
    };

    fetchAssignedFacilities();
  }, [isEdit, courseId, setValue]);

  /* =======================
     Toggle facility selection
  ======================= */
  const toggleFacility = (
    facilityId: number,
    isChecked: boolean
  ) => {
    const updatedFacilityIds = isChecked
      ? [...selectedFacilityIds, facilityId]
      : selectedFacilityIds.filter(
        (selectedId) => selectedId !== facilityId
      );

    setValue("facilities", updatedFacilityIds, {
      shouldValidate: true,
    });
    setSaveError(null);
  };

  /* =======================
     Submit selected facilities
  ======================= */
  const onSubmit = (formData: FormValues) => {
    if (formData.facilities.length === 0) {
      const errorMessage =
        "Please select at least 1 facility";
      setSaveError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setSaveError(null);

    startTransition(async () => {
      try {
        const response = await assignFacilitiesToCourse(
          courseId,
          formData.facilities
        );

        if (response.success) {
          handleFormSuccess(
            response.message ||
            "Facilities assigned successfully!"
          );
          onSuccess();
        } else {
          throw new Error(
            response.message || "Failed to save facilities"
          );
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to save facilities";

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
          Select Facilities
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6"
        >
          {/* Loading */}
          {isLoading && !loadError && (
            <p className="text-center">
              Loading facilities…
            </p>
          )}

          {/* Error */}
          {loadError && (
            <NotFoundComponent
              message={loadError}
              onActionClick={loadFacilities}
              actionLabel="Try Again"
            />
          )}

          {/* Empty */}
          {!loadError &&
            !isLoading &&
            facilities.length === 0 && (
              <NotFoundComponent
                message="No active facilities found. Please create facilities first."
                onActionClick={loadFacilities}
                actionLabel="Refresh"
              />
            )}

          {/* Validation Error */}
          {saveError && (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md">
              {saveError}
            </div>
          )}

          {/* Facilities List */}
          {!isLoading &&
            !loadError &&
            facilities.length > 0 && (
              <div className="grid gap-4">
                <Label>
                  Select facilities for this course:
                </Label>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {facilities.map((facility) => {
                    const isSelected = selectedFacilityIds.includes(facility.id);
                    return (
                      <div
                        key={facility.id}
                        className={`flex items-center gap-3 p-4 rounded-lg border transition-all select-none relative group ${isSelected ? "bg-accent border-primary" : "hover:bg-accent/50"
                          }`}
                      >
                        <Checkbox
                          id={`facility-${facility.id}`}
                          checked={isSelected}
                          onCheckedChange={(checked) =>
                            toggleFacility(facility.id, Boolean(checked))
                          }
                          className="z-10"
                        />

                        <Image
                          src={facility.image || "/images/placeholder.png"}
                          width={45}
                          height={45}
                          alt={facility.title}
                          className="rounded object-cover"
                        />

                        <Label
                          htmlFor={`facility-${facility.id}`}
                          className="cursor-pointer font-medium stretched-link after:absolute after:inset-0"
                        >
                          {facility.title}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          {/* Save Button */}
          {!isLoading &&
            !loadError &&
            facilities.length > 0 && (
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="w-32"
                  disabled={
                    isPending ||
                    selectedFacilityIds.length === 0
                  }
                >
                  {isPending
                    ? "Saving..."
                    : "Save Facilities"}
                </Button>
              </div>
            )}
        </form>
      </CardContent>
    </Card>
  );
}
