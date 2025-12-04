"use server"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache"
import { handleApiError, processApiResponse } from "@/lib/apiErrorHandler"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1"

export interface Lesson {
  id: number;
  chapter_id: string;
  course_id?: number;
  course_name?: string;
  title: string;
  bn_title: string;
  description: string;
  bn_description: string;
  duration: number;
  type: number;
  type_text: string;
  video_url: string;
  order: number;
  is_preview: boolean;
  status: number;
  status_text: string;
  chapter: {
    id: number;
    title: string;
    bn_title: string;
  };
  created_at: string;
  updated_at: string;
}

export interface PaginationType {
  current_page: number
  last_page: number
  per_page: number
  total: number
  from?: number
  to?: number
  has_more_pages?: boolean
}

export interface LessonResponse {
  success: boolean
  message: string
  data: {
    total_lessons?: number
    lessons: Lesson[]
    pagination: PaginationType
  }
}
export interface LessonResponseType {
  success: boolean;
  message?: string;
  errors?: {
    [key: string]: string[] | string;
  };
  data?: Lesson;
  code?: number;
}

// add lesson
export async function addLesson(
  formData: FormData
): Promise<LessonResponseType> {
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

    const res = await fetch(`${API_BASE}/lessons`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await processApiResponse(res, "Failed to add lesson.");

    if (!result.success) {
      return result;
    }

    revalidateTag("lessons-list", "max");
    return {
      success: true,
      message: result.message || "Lesson added successfully.",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    return await handleApiError(error, "Failed to add lesson.");
  }
}

// Get lessons
export async function getLessons(
  page = 1,
  params: Record<string, unknown> = {}
): Promise<LessonResponse> {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken

  if (!token) {
    throw new Error("No valid session or access token found.")
  }

  const urlParams = new URLSearchParams()
  urlParams.append("page", page.toString())

  for (const key in params) {
    if (params.hasOwnProperty(key) && params[key] !== undefined && params[key] !== null) {
      urlParams.append(key, params[key].toString())
    }
  }

  const res = await fetch(`${API_BASE}/lessons?${urlParams.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["lessons-list"] },
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(`Message: ${errorData.message || "Unknown error"}`)
  }

  return res.json()
}

export interface LessonSingleResponse {
  success: boolean
  message: string
  data: Lesson
}

// =======================
// 🔹 Update Lesson
// =======================

export async function updateLesson(
  id: string,
  formData: FormData
): Promise<LessonResponseType> {
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

    const res = await fetch(`${API_BASE}/lessons/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await processApiResponse(res, "Failed to update lesson.");

    if (!result.success) {
      return result;
    }

    revalidateTag("lessons-list", "max");
    revalidateTag(`lesson-${id}`, "max");
    return {
      success: true,
      message: result.message || "Lesson updated successfully.",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    return await handleApiError(error, "Failed to update lesson.");
  }
}

// =======================
// 🔹 Get Lesson By ID
// =======================

export async function getLessonById(id: string): Promise<LessonSingleResponse> {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken
  if (!token) throw new Error("No valid session or access token found.")

  const res = await fetch(`${API_BASE}/lessons/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch lesson: ${res.statusText}`)
  }

  return res.json()
}

// =======================
// 🔹 Delete Lesson
// =======================
export async function deleteLesson(id: number): Promise<{ success: boolean; message: string; code?: number }> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      return { success: false, message: "Unauthorized", code: 401 };
    }

    const res = await fetch(`${API_BASE}/lessons/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await processApiResponse(res, "Failed to delete lesson.");
    
    if (!result.success) {
      return { success: false, message: result.message, code: result.code };
    }

    revalidateTag("lessons-list", "max");
    return { success: true, message: result.message || "Lesson deleted successfully", code: result.code };
  } catch (error) {
    const errorResult = await handleApiError(error, "Failed to delete lesson.");
    return { success: false, message: errorResult.message, code: errorResult.code };
  }
}
