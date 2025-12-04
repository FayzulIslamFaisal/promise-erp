"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cacheTag, updateTag } from "next/cache";
import { CourseProject } from "./courseProjectsService";
import { handleApiError, processApiResponse } from "@/lib/apiErrorHandler";
import { FormValues } from "@/components/lms/courses/ChapterLessonAddForm";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export interface Batch {
  id: number;
  name: string;
  price: string;
  discount_price: string;
  duration: string;
  lecture: string;
  is_online: boolean;
  is_offline: boolean;
}

export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface Course {
  id: number;
  category_id: number;
  title: string;
  sub_title?: string;
  slug?: string;
  short_description?: string;
  description?: string;
  featured_image?: string;
  video_link?: string;
  level: string;
  end_date?: string;
  status: string;
  is_default: boolean;
  total_enrolled: number;
  status_text: string;
  category: { id: number; name: string };
  branches: { id: number; name: string }[];
  organization: { name: string };
  batches: Batch[];
  course_projects?: CourseProject[];
  branch_count: number;
  language: string;
  price: number;
  discount: number;
  ratings: number;
  total_live_class: number | null
  
}

export interface CourseResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    courses: Course[];
    pagination: Pagination;
  };
  errors?: Record<string, string[]>;
}

export interface CourseSingleResponse {
  success: boolean;
  message?: string;
  code?: number;
  data?: Course;
  errors?: Record<string, string[] | string>;
}

// =======================
// 🔹 Get Courses (Cached)
// =======================
async function getCoursesCached(
  page: number,
  token: string,
  params: Record<string, unknown> = {}
): Promise<CourseResponse> {
  "use cache";
  cacheTag("courses-list");
  try {
    const url = new URL(`${API_BASE}/courses`);
    const urlParams = new URLSearchParams();
    urlParams.append("page", String(page));
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlParams.append(key, String(value));
      }
    });

    const res = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch courses: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error in getCoursesCached:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error occurred while fetching courses"
    );}
}

// =======================
// 🔹 Get Courses (Paginated)
// =======================
export async function getCourses(page = 1, params:Record<string, unknown> = {}): Promise<CourseResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  if (!token) throw new Error("No valid session or access token found.");

  return getCoursesCached(page, token, params);
}

// =======================
// 🔹 Create Course
// =======================
export async function createCourse(formData: FormData): Promise<CourseSingleResponse> {
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

    const res = await fetch(`${API_BASE}/courses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await processApiResponse(res, "Failed to create course.");

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to create course",
        errors: result.errors,
        code: result.code || 400,
      };
    }

    updateTag("courses-list");
    return {
      success: true,
      message: result.message || "Course created successfully",
      data: result.data,
      code: result.code || 200,
    };
  } catch (error) {
    const errorResult = await handleApiError(error, "Failed to create course.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// =======================
// 🔹 Get Course by ID
// =======================
export async function getCourseById(id: string): Promise<CourseSingleResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  if (!token) throw new Error("No valid session or access token found.");

  const res = await fetch(`${API_BASE}/courses/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch course: ${res.statusText}`);
  }

  return res.json();
}

// =======================
// 🔹 Update Course
// =======================
export async function updateCourse(id: string, formData: FormData): Promise<CourseSingleResponse> {
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

    const res = await fetch(`${API_BASE}/courses/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await processApiResponse(res, "Failed to update course.");

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to update course",
        errors: result.errors,
        code: result.code || 400,
      };
    }

    updateTag("courses-list");
    return {
      success: true,
      message: result.message || "Course updated successfully",
      data: result.data,
      code: result.code || 200,
    };
  } catch (error) {
    const errorResult = await handleApiError(error, "Failed to update course.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// =======================
// 🔹 Delete Course
// =======================
export async function DeleteCourse(id: number): Promise<CourseSingleResponse> {
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

    const res = await fetch(`${API_BASE}/courses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await processApiResponse(res, "Failed to delete course.");

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        code: result.code,
      };
    }

    updateTag("courses-list");
    return {
      success: true,
      message: result.message || "Course deleted successfully",
      data: result.data,
      code: result.code || 200,
    };
  } catch (error) {
    const errorResult = await handleApiError(error, "Failed to delete course.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// =======================
// 🔹 Assign Branches to Course
// =======================
export async function assignBranchesToCourse(
  courseId: string,
  branchIds: number[]
): Promise<CourseSingleResponse> {
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

    const res = await fetch(`${API_BASE}/courses/${courseId}/branches`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ branch_ids: branchIds }),
    });

    const result = await processApiResponse(res, "Failed to assign branches.");

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to assign branches",
        errors: result.errors,
        code: result.code || 400,
      };
    }

    return {
      success: true,
      message: result.message || "Branches assigned successfully",
      data: result.data,
      code: result.code || 200,
    };
  } catch (error) {
    const errorResult = await handleApiError(error, "Failed to assign branches.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// =======================
// 🔹 Create Chapters with Lessons
// =======================
export async function createChaptersWithLessons(
  chaptersData: FormValues
): Promise<CourseSingleResponse> {
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

    const res = await fetch(`${API_BASE}/chapter-lessons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(chaptersData),
    });

    const result = await processApiResponse(res, "Failed to create chapters.");

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to create chapters",
        errors: result.errors,
        code: result.code || 400,
      };
    }

    return {
      success: true,
      message: result.message || "Chapters created successfully",
      data: result.data,
      code: result.code || 200,
    };
  } catch (error) {
    const errorResult = await handleApiError(error, "Failed to create chapters.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}


// =======================
// 🔹 Assign FAQs to Course
// =======================
export async function assignFaqsToCourse(
  courseId: string | number,
  faqIds: number[]
): Promise<CourseSingleResponse> {
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

    const response = await fetch(`${API_BASE}/courses/${courseId}/faqs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ faq_ids: faqIds }),
    });

    const result = await processApiResponse(response, "Failed to assign FAQs.");

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to assign FAQs",
        errors: result.errors,
        code: result.code || 400,
      };
    }

    return {
      success: true,
      message: result.message || "FAQs assigned successfully",
      data: result.data,
      code: result.code || 200,
    };
  } catch (error) {
    const errorResult = await handleApiError(error, "Failed to assign FAQs.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}


// =======================
// 🔹 Assign Facilities to Course
// =======================
export async function assignFacilitiesToCourse(
  courseId: string | number,
  facilityIds: number[]
): Promise<CourseSingleResponse> {
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

    const response = await fetch(
      `${API_BASE}/courses/${courseId}/facilities`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ facility_ids: facilityIds }),
      }
    );

    const result = await processApiResponse(response, "Failed to assign facilities.");

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to assign facilities",
        errors: result.errors,
        code: result.code || 400,
      };
    }

    return {
      success: true,
      message: result.message || "Facilities assigned successfully",
      data: result.data,
      code: result.code || 200,
    };
  } catch (error) {
    const errorResult = await handleApiError(error, "Failed to assign facilities.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}
