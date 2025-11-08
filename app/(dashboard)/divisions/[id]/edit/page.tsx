"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import DivisionForm from "@/components/division/DivisionForm";
import {
  getDivision,
  updateDivision,
  Division,
  DivisionFormData,
  DivisionResponseType,
} from "@/apiServices/divisionService";
import TableSkeleton from "@/components/TableSkeleton";
import ErrorComponent from "@/components/common/ErrorComponent";

export default function EditDivisionPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [division, setDivision] = useState<Division | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchDivision = async () => {
        try {
          setIsLoading(true);
          const res = await getDivision(id);
          if (res.success && res.data) {
            setDivision(res.data.division);
          } else {
            setError(res.message || "Failed to fetch division data.");
            toast.error(res.message || "Failed to fetch division data.");
          }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
          setError(errorMessage);
          toast.error(errorMessage);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDivision();
    }
  }, [id]);

  const handleSubmit = async (
    formData: DivisionFormData,
    setFormError: (field: string, message: string) => void
  ) => {
    try {
      const res: DivisionResponseType = await updateDivision(id, formData);

      if (res.success) {
        toast.success(res.message || "Division updated successfully!");
        router.push("/divisions");
      } else if (res.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setFormError(field, messages[0]);
          }
        });
        toast.error("Please fix the errors below.");
      } else {
        toast.error(res.message || "Failed to update division.");
      }
    } catch {
      toast.error("Something went wrong. Try again later.");
    }
  };

  if (isLoading) {
    return <TableSkeleton columns={1} rows={4} />;
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <DivisionForm
      title="Edit Division"
      buttonTitle="Update Division"
      defaultValues={division || undefined}
      onSubmit={handleSubmit}
    />
  );
}