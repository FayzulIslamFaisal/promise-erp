"use client";

import { getCouponById, updateCoupon, CouponItem, CreateCouponRequest } from "@/apiServices/couponsService";
import { getCourses } from "@/apiServices/courseService";
import CouponForm from "@/components/lms/coupons/CouponForm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { handleFormErrors, handleFormSuccess } from "@/lib/formErrorHandler";
import { UseFormSetError } from "react-hook-form";
import { ApiErrorResponse } from "@/lib/apiErrorHandler";
import { toast } from "sonner";

export default function EditCouponPage() {
  const router = useRouter();
  const { id } = useParams();
  const [coupon, setCoupon] = useState<CouponItem | null>(null);
  const [courses, setCourses] = useState<{ id: number; title: string }[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      const fetchData = async () => {
        try {
          const [couponRes, coursesRes] = await Promise.all([
            getCouponById(Number(id)),
            getCourses({per_page: 999}),
          ]);

          if (couponRes?.success && couponRes?.data) {
            setCoupon(couponRes?.data);
          } else {
            toast.error(couponRes?.message || "Failed to load coupon data.");
          }

          if (coursesRes?.success && coursesRes?.data?.courses) {
            setCourses(coursesRes?.data?.courses);
          } else {
            toast.error(coursesRes?.message || "Failed to load courses data.");
          }

        } catch (error: unknown) {
          if (error instanceof Error) {
            handleFormErrors({ message: error.message, errors: {} } as ApiErrorResponse, () => { });
          } else {
            handleFormErrors({ message: "An unexpected error occurred.", errors: {} } as ApiErrorResponse, () => { });
          }
        }
      };

      fetchData();
    });
  }, [id]);

  const handleSubmit = async (
    data: CreateCouponRequest,
    setFormError: (field: string, message: string) => void
  ) => {
    startTransition(async () => {
      try {
        const res = await updateCoupon(Number(id), data);

        if (res.success) {
          handleFormSuccess(res.message || "Coupon updated successfully!");
          router.refresh();
          router.push("/lms/coupons");
        } else {
          handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<CreateCouponRequest>);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          handleFormErrors({ message: error.message, errors: {} } as ApiErrorResponse, setFormError as UseFormSetError<CreateCouponRequest>);
        } else {
          handleFormErrors({ message: "An unexpected error occurred.", errors: {} } as ApiErrorResponse, setFormError as UseFormSetError<CreateCouponRequest>);
        }
      }
    });
  };

  if (!coupon) return null;

  return <CouponForm title="Edit Coupon" onSubmit={handleSubmit} coupon={coupon} courses={courses} />;
}
