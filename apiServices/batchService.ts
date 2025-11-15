"use server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cacheTag } from "next/cache";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

// Batch type
export interface Batch {
  id: number;
  name: string;
  lm_course_id: number;
}

// Pagination type
export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  has_more_pages: boolean;
}

// Main data object
export interface BatchData {
  total_batches: number;
  batches: Batch[];
  pagination: Pagination;
}

// API Response type
export interface BatchResponse {
  success: boolean;
  message: string;
  code: number;
  data: BatchData;
}

// =======================
//  Get Batches (Paginated)
// =======================

export async function getBatchesCached(
  page = 1,
  token: string,
  params: Record<string, unknown> = {}
): Promise<BatchResponse> {
  "use cache";
  cacheTag("batches-list");

  try {
    const urlParams = new URLSearchParams();
    urlParams.append("page", page.toString());

    for (const key in params) {
      if (
        params[key] !== undefined &&
        params[key] !== null &&
        params.hasOwnProperty(key)
      ) {
        urlParams.append(key, params[key].toString());
      }
    }

    const res = await fetch(`${API_BASE}/batches?${urlParams.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    return await res.json();
  } catch (error) {
    console.error("Error in getBatchesCached:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error occurred while fetching batches"
    );
  }
}

export async function getBatches(
  page = 1,
  params: Record<string, unknown> = {}
): Promise<BatchResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      throw new Error("No valid session or access token found.");
    }

    return await getBatchesCached(page, token, params);
  } catch (error) {
    console.error("Error in get batches:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to get batches"
    );
  }
}
