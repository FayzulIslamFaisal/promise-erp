"use server"

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { PaginationType } from "./studentService";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

// ==========================
// Interfaces
// ==========================

export interface EnrollmentUser {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface EnrollmentBatch {
  id: number;
  name: string;
  course: {
    id: number;
    title: string;
    slug: string;
    featured_image: string;
  };
}

export interface EnrollmentApprovedBy {
  id: number;
  name: string;
}

export interface EnrollmentCoupon {
  id: number;
  coupon_code: string;
  discount_percentage: number;
}

export interface Enrollment {
  id: number;
  uuid: string;
  user_id: number;
  batch_id: number;
  coupon_id: number | null;
  original_price: number;
  discount_amount: number;
  final_price: number;
  enrollment_date: string;
  expired_at: string;
  approved_by: number | null;
  certificate_link: string | null;
  is_certificate_avail: boolean;
  total_completed_lessons: number;
  status: number;
  status_label: string;
  payment_method: number;
  payment_method_label: string;
  payment_status: number;
  payment_status_label: string;
  payment_type: number;
  payment_type_label: string;
  partial_payment_amount: number;
  due_amount: number;
  payment_reference: string | null;
  created_at: string;
  updated_at: string;
  user: EnrollmentUser;
  batch: EnrollmentBatch;
  approved_by_user: EnrollmentApprovedBy | null;
  coupon: EnrollmentCoupon | null;
}

export interface EnrollmentResponse {
  success: boolean;
  message: string;
  data: {
    enrollments: Enrollment[];
    pagination: PaginationType;
  };
}

// ==========================
// Get Enrollments
// ==========================

export async function getEnrollments(
  params: Record<string, unknown> = {}
): Promise<EnrollmentResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      throw new Error("No valid session or access token found.");
    }

    const urlParams = new URLSearchParams();
    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        urlParams.append(key, params[key].toString());
      }
    }

    const res = await fetch(`${API_BASE}/enrollments?${urlParams.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["enrollments-list"], // cache tag
      },
    });
    const result = await res.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to fetch enrollments.");
    }
    return result;
  } catch (error) {
    console.error("Error in getEnrollments:", error);
    throw error;
  }
}
