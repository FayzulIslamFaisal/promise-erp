// apiServices/reviewService.ts
"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import { cacheTag, updateTag } from "next/cache";
import { handleApiError, processApiResponse } from "@/lib/apiErrorHandler";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

// =======================
// Interfaces
// =======================

export interface Review {
  id: number;
  user: {
    id: number | null;
    name: string | null;
  };
  course: {
    id: number | null;
    title: string | null;
  };
  batch: {
    id: number | null;
    name: string | null;
  };
  rating: number;
  feedback: string;
  status: number;
  is_featured: number;
}

export interface ReviewPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  has_more_pages: boolean;
}

export interface ReviewsResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    total_reviews: number;
    reviews: Review[];
    pagination: ReviewPagination;
  };
  errors?: Record<string, string[]>;
}

export interface SingleReviewResponse {
  success: boolean;
  message: string;
  code?: number;
  data?: Review | null;
  errors?: Record<string, string[] | string>;
}

export interface CreateReviewRequest {
  user_id?: number;
  course_id?: number;
  batch_id?: number | null;
  rating?: number;
  feedback?: string;
  status?: number;
  is_featured?: number;
}

export interface UpdateReviewRequest extends CreateReviewRequest {}

// =======================
//  Get Reviews (Cached)
// =======================

export async function getReviewsCached(
  page = 1,
  token: string,
  params: Record<string, unknown> = {}
): Promise<ReviewsResponse> {
  "use cache";
  cacheTag("reviews-list");

  try {
    const urlParams = new URLSearchParams();
    urlParams.append("page", page.toString());

    for (const key in params) {
      if (
        params[key] !== undefined &&
        params[key] !== null &&
        params.hasOwnProperty(key)
      ) {
        urlParams.append(key, params[key]!.toString());
      }
    }

    const res = await fetch(`${API_BASE}/reviews?${urlParams.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data: ReviewsResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getReviewsCached:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error occurred while fetching reviews"
    );
  }
}

// =======================
//  Get Reviews (Main)
// =======================

export async function getReviews(
  page = 1,
  params: Record<string, unknown> = {}
): Promise<ReviewsResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) throw new Error("No valid session or access token found.");

    return await getReviewsCached(page, token, params);
  } catch (error) {
    console.error("Error in getReviews:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to get Reviews"
    );
  }
}

// =======================
//  Get Review By ID
// =======================

export async function getReviewById(
  id: number
): Promise<SingleReviewResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token)
      throw new Error("No valid session or access token found.");

    const res = await fetch(`${API_BASE}/reviews/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data: SingleReviewResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getReviewById:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error occurred while fetching Review by ID"
    );
  }
}

// =======================
//  CREATE REVIEW
// =======================

export async function createReview(
  formData: FormData
): Promise<SingleReviewResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      return {
        success: false,
        message: "No valid session or access token found.",
        code: 401,
      };
    }

    const res = await fetch(`${API_BASE}/reviews`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await processApiResponse(res, "Failed to create review");

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        errors: result.errors,
        code: result.code,
      };
    }

    updateTag("reviews-list");

    return {
      success: true,
      message: result.message || "Review created successfully",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    const errorResult = await handleApiError(error, "Failed to create review");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// =======================
//  UPDATE REVIEW
// =======================

export async function updateReview(
  id: number,
  formData: FormData
): Promise<SingleReviewResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token)
      return { success: false, message: "No valid session or access token found.", code: 401 };

    formData.append("_method", "PATCH");

    const res = await fetch(`${API_BASE}/reviews/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await processApiResponse(res, "Failed to update review");

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        errors: result.errors,
        code: result.code,
      };
    }

    updateTag("reviews-list");

    return {
      success: true,
      message: result.message || "Review updated successfully",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    const errorResult = await handleApiError(
      error,
      "Failed to update review"
    );
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// =======================
//  DELETE REVIEW
// =======================

export async function deleteReview(
  id: number
): Promise<SingleReviewResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token)
      return { success: false, message: "No valid session or access token found.", code: 401 };

    const res = await fetch(`${API_BASE}/reviews/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await processApiResponse(res, "Failed to delete review");

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        code: result.code,
      };
    }

    updateTag("reviews-list");

    return {
      success: true,
      message: result.message || "Review deleted successfully",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    const errorResult = await handleApiError(
      error,
      "Failed to delete review"
    );
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}
