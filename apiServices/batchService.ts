"use server"

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

// ==========================
// Interfaces
// ==========================

export interface Batch {
  id: number;
  uuid: string;
  lm_course_id: number;
  branch_id: number;
  name: string;
  price: string;
  discount: string;
  discount_type: string | null;
  discount_price: number | null;
  duration: string | null;
  start_date: string | null;
  end_date: string | null;
  course_type: number | null;
  is_online: number | null;
  is_offline: number | null;
  total_enrolled: string;
  branch: {
    id: number;
    name: string;
  };
  course: {
    id: number;
    title: string;
  };
  course_project: any;
}

export interface PaginationType {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface BatchResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    batches: Batch[];
    pagination: PaginationType;
  };
}

export interface BatchSingleResponse {
  success: boolean;
  message: string;
  data: Batch;
}

export interface BatchResponseType {
  success: boolean;
  message?: string;
  errors?: { [key: string]: string[] | string };
  data?: any;
}

// ==========================
// Add Batch
// ==========================

export async function addBatch(formData: any): Promise<BatchResponseType> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    return {
      success: false,
      message: "No valid session or access token found.",
    };
  }

  const res = await fetch(`${API_BASE}/batches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: data.message || "Failed to add batch.",
      errors: data.errors,
    };
  }

  // ❗ Next.js 16 requires 2 arguments
  revalidateTag("batches-list", "max");

  return { success: true, message: data.message, data };
}

// ==========================
// Get Batches
// ==========================

export async function getBatches(
  params: Record<string, any> = {}
): Promise<BatchResponse> {
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

  const res = await fetch(`${API_BASE}/batches?${urlParams.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["batches-list"], // cache tag
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(`Message: ${errorData.message || "Unknown error"}`);
  }

  return res.json();
}

// ==========================
// Get Batch by ID
// ==========================

export async function getBatchById(
  id: string
): Promise<BatchSingleResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) throw new Error("No valid session or access token found.");

  const res = await fetch(`${API_BASE}/batches/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: [`batch-${id}`],
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch batch: ${res.statusText}`);
  }

  return res.json();
}

// ==========================
// Update Batch
// ==========================

export async function updateBatch(
  id: string,
  formData: any
): Promise<BatchResponseType> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    return {
      success: false,
      message: "No valid session or access token found.",
    };
  }

  const res = await fetch(`${API_BASE}/batches/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: data.message || "Failed to update batch.",
      errors: data.errors,
    };
  }

  // ❗ Next.js 16 requires profile argument
  revalidateTag("batches-list", "max");
  revalidateTag(`batch-${id}`, "max");

  return { success: true, message: data.message, data };
}

// ==========================
// Delete Batch
// ==========================

export async function deleteBatch(id: number) {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_BASE}/batches/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to delete batch: ${errorText}`);
  }

  revalidateTag("batches-list", "max");
  revalidateTag(`batch-${id}`, "max");

  return res.json();
}
