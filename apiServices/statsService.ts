"use server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { updateTag, cacheTag } from "next/cache";
import { handleApiError, processApiResponse } from "@/lib/apiErrorHandler";
import { PaginationType } from "@/types/pagination";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export interface Stats {
  id: number;
  title: string;
  count: string;
  image: string;
  status: number;
  branch: {
    id: number;
    name: string;
  };
}


export interface StatsResponse {
  success: boolean;
  message: string;
  data: {
    total_stats?: number;
    stats: Stats[];
    pagination: PaginationType;
  };
}
export interface StatsResponseType {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | string>;
  data?: Stats;
  code?: number;
}
export interface SingleStatsResponse {
  success: boolean;
  message: string;
  code: number;
  data?: Stats;
}

// add lesson
export async function addStats(formData: FormData): Promise<StatsResponseType> {
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

    const res = await fetch(`${API_BASE}/stats`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await processApiResponse(res, "Failed to add statistics.");

    if (!result.success) {
      return result;
    }

    updateTag("stats-list");
    return {
      success: true,
      message: result.message || "Statistics added successfully.",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    return await handleApiError(error, "Failed to add statistics.");
  }
}

async function getStatsCached(
  token: string,
  params: Record<string, unknown> = {}
): Promise<StatsResponse> {
  "use cache";
  cacheTag("stats-list");

  const urlParams = new URLSearchParams();

  for (const key in params) {
    if (
      params.hasOwnProperty(key) &&
      params[key] !== undefined &&
      params[key] !== null
    ) {
      urlParams.append(key, params[key].toString());
    }
  }

  const res = await fetch(`${API_BASE}/stats?${urlParams.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(`Message: ${errorData.message || "Unknown error"}`);
  }

  return res.json();
}

// Get Stats
export async function getStats(
  token: string,
  params: Record<string, unknown> = {}
): Promise<StatsResponse> {
  if (!token) throw new Error("No valid session or access token found.");
  return await getStatsCached(token, params);
}

export interface StatsSingleResponse {
  success: boolean;
  message: string;
  data: Stats;
}

// =======================
// 🔹 Update Stats
// =======================

export async function updateStats(
  id: string,
  formData: FormData
): Promise<StatsResponseType> {
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

    formData.append("_method", "PATCH");

    const res = await fetch(`${API_BASE}/stats/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await processApiResponse(
      res,
      "Failed to update statistics."
    );

    if (!result.success) {
      return result;
    }

    updateTag("stats-list");
    updateTag(`stats-${id}`);
    return {
      success: true,
      message: result.message || "Statistics updated successfully.",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    return await handleApiError(error, "Failed to update statistics.");
  }
}

// =======================
// 🔹 Get Stats By ID
// =======================

export async function getStatsById(id: string): Promise<StatsSingleResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  if (!token) throw new Error("No valid session or access token found.");

  const res = await fetch(`${API_BASE}/stats/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch statistics: ${res.statusText}`);
  }

  return res.json();
}

// =======================
// 🔹 Delete Stats
// =======================
export async function deleteStats(id: number): Promise<SingleStatsResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      return { success: false, message: "Unauthorized", code: 401 };
    }

    const res = await fetch(`${API_BASE}/stats/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await processApiResponse(
      res,
      "Failed to delete statistics."
    );

    if (!result.success) {
      return { success: false, message: result.message, code: result.code };
    }

    updateTag("stats-list");
    return {
      success: true,
      message: result.message || "Statistics deleted successfully",
      code: result.code || 200,
    };
  } catch (error) {
    const errorResult = await handleApiError(
      error,
      "Failed to delete statistics."
    );
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}
