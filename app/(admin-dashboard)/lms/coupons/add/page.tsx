"use client";

import CouponForm from "@/components/lms/coupons/CouponForm";
import { useRouter } from "next/navigation";
import { createCoupon, CreateCouponRequest } from "@/apiServices/couponsService";
import { handleFormErrors, handleFormSuccess } from "@/lib/formErrorHandler";
import { UseFormSetError } from "react-hook-form";
import { ApiErrorResponse } from "@/lib/apiErrorHandler";
import { useEffect, useState } from "react";
import { getCourses } from "@/apiServices/courseService";

const CouponAddPage = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses({per_page: 999});
        if (res?.data?.courses) {
          setCourses(res.data.courses);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (
    data: CreateCouponRequest,
    setFormError: (field: string, message: string) => void,
    resetForm: () => void
  ) => {
    const res = await createCoupon(data);

    if (res.success) {
      handleFormSuccess(res.message || "Coupon added successfully!");
      resetForm();
      router.push("/lms/coupons");
    } else {
      handleFormErrors(res as ApiErrorResponse, setFormError as UseFormSetError<CreateCouponRequest>);
    }
  };

  return (
    <CouponForm title="Add Coupon" courses={courses} onSubmit={handleSubmit} />
  );
};

export default CouponAddPage;
