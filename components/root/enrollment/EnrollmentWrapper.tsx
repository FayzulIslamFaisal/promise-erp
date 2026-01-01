"use client";

import { useState, useTransition, useEffect } from "react";
import {
  EnrollmentResponse,
  getEnrollmentDetails,
  postEnrollmentCoupon,
} from "@/apiServices/EnrollmentService";
import EnrollPaymentSummary from "./EnrollPaymentSummary";
import EnrollPaymentMethod from "./EnrollPaymentMethod";
import { toast } from "sonner";
import EnrollmentWrapperSkeleton from "./EnrollmentWrapperSkeleton";
import { useSession } from "next-auth/react";

interface Props {
  slug: string;
}

const EnrollmentWrapper = ({ slug }: Props) => {
  const [enrollmentDetails, setEnrollmentDetails] =
    useState<EnrollmentResponse | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [savedCouponCode, setSavedCouponCode] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();

  // Fetch enrollment details
  const fetchEnrollment = async () => {
    const token = session?.accessToken;
    if (!token) return;

    startTransition(async () => {
      try {
        const res = await getEnrollmentDetails(
          slug,
          token
        );

        if (res?.success) {
          setEnrollmentDetails(res);
        } else {
          toast.error(res?.message || "Failed to load enrollment details");
        }
      } catch {
        toast.error("Something went wrong");
      }
    });
  };

  useEffect(() => {
    if (session?.accessToken && slug) {
      fetchEnrollment();
    }
  }, [slug]);

  // Handle coupon apply
  const handleApplyCoupon = async () => {

    if (!couponCode.trim()) {
    toast.error("Please enter a coupon code");
    return;
  }

  const token = session?.accessToken;
  if (!token || !enrollmentDetails) {
    toast.error("Authentication required");
    return;
  }

    startTransition(async () => {
      try {
        const res = await postEnrollmentCoupon(
          enrollmentDetails!.data.batch.id,
          couponCode,
          token
        );
        if (res.success && res.data.valid) {
          toast.success(res.message);
          setSavedCouponCode(res.data.coupon.coupon_code);
          setCouponCode("");
          fetchEnrollment();
        } else {
          toast.error(res?.message || "Invalid coupon code");
        }
      } catch (error) {
        console.error("Coupon validation failed:", error);
        toast.error("Coupon validation failed");
      }
    });
  };



  return (
    <div className="grid md:grid-cols-[1.8fr_1fr] gap-6 mb-8 relative">
      {!enrollmentDetails || isPending ? (
        <EnrollmentWrapperSkeleton />
      ) : (
        <>
          <EnrollPaymentSummary
            enrollmentDetails={enrollmentDetails?.data}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            handleApplyCoupon={handleApplyCoupon}
            isApplying={isPending}
          />
          <EnrollPaymentMethod
            enrollmentDetails={enrollmentDetails?.data}
            savedCouponCode={savedCouponCode}
            token={session?.accessToken}
          />
        </>
      )}
    </div>
  );
}

export default EnrollmentWrapper
