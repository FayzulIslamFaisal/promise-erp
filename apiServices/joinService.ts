// apiServices/joinService.ts
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

export interface JoinType {
  id: number;
  title: string;
  status: number;
}

export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  has_more_pages: boolean;
}

export interface JoinsResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    total_joins: number;
    joins: JoinType[];
    pagination: Pagination;
  };
  errors?: Record<string, string[]>;
}

export interface SingleJoinResponse {
  success: boolean;
  message: string;
  code?: number;
  data?: JoinType | null;
  errors?: Record<string, string[] | string>;
}

// =======================
// GET joins (Cached)
// =======================

export async function getJoinsCached(
  page = 1,
  token: string,
  params: Record<string, unknown> = {}
): Promise<JoinsResponse> {
  "use cache";
  cacheTag("joins-list");

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

    const res = await fetch(`${API_BASE}/joins?${urlParams.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  } catch (error) {
    console.error("Error in getJoinsCached:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error occurred while fetching joins"
    );
  }
}

// =======================
// GET joins wrapper
// =======================

export async function getJoins(
  page = 1,
  params: Record<string, unknown> = {}
): Promise<JoinsResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) throw new Error("No valid session or access token found.");

    return await getJoinsCached(page, token, params);
  } catch (error) {
    console.error("Error in getJoins:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to get joins"
    );
  }
}

// =======================
// GET Join By ID
// =======================

export async function getJoinById(id: number): Promise<SingleJoinResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    const res = await fetch(`${API_BASE}/joins/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  } catch (error) {
    console.error("Error in getJoinById:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error occurred while fetching join by ID"
    );
  }
}

// =======================
// CREATE Join
// =======================

export async function createJoin(
  formData: FormData
): Promise<SingleJoinResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token)
      return {
        success: false,
        message: "No valid session or access token found.",
        code: 401,
      };

    const response = await fetch(`${API_BASE}/joins`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await processApiResponse(response, "Failed to create join");

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        errors: result.errors,
        code: result.code,
      };
    }

    updateTag("joins-list");

    return {
      success: true,
      message: result.message || "Join created successfully",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    const err = await handleApiError(error, "Failed to create join");
    return { success: false, message: err.message, code: err.code };
  }
}

// =======================
// UPDATE join
// =======================

export async function updateJoin(
  id: number,
  formData: FormData
): Promise<SingleJoinResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token)
      return {
        success: false,
        message: "No valid session or access token found.",
        code: 401,
      };

    formData.append("_method", "PATCH");

    const response = await fetch(`${API_BASE}/joins/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const result = await processApiResponse(response, "Failed to update join");

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        errors: result.errors,
        code: result.code,
      };
    }

    updateTag("joins-list");

    return {
      success: true,
      message: result.message || "Join updated successfully",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    const err = await handleApiError(error, "Failed to update join");
    return { success: false, message: err.message, code: err.code };
  }
}

// =======================
// DELETE join
// =======================

export async function deleteJoin(id: number): Promise<SingleJoinResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token)
      return {
        success: false,
        message: "No valid session or access token found.",
        code: 401,
      };

    const response = await fetch(`${API_BASE}/joins/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await processApiResponse(response, "Failed to delete join");

    if (!result.success) {
      return { success: false, message: result.message, code: result.code };
    }

    updateTag("joins-list");

    return {
      success: true,
      message: result.message || "Join deleted successfully",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    const err = await handleApiError(error, "Failed to delete join");
    return { success: false, message: err.message, code: err.code };
  }
}

// =======================
// PUBLIC: Home Page Joins
// =======================

export async function getHomeJoins({
  params = {},
}: {
  params?: Record<string, unknown>;
}): Promise<JoinsResponse> {
  "use cache";
  cacheTag("public-joins");

  try {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlParams.append(key, String(value));
      }
    });

    const res = await fetch(`${API_BASE}/public/joins?${urlParams.toString()}`);

    if (!res.ok) {
      throw new Error(`Home Joins API failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Home Joins API Error:", error);
    throw new Error("Error fetching home joins");
  }
}
