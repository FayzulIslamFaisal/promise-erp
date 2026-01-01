"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cacheTag, updateTag } from "next/cache";
import { CourseProject } from "./courseProjectsService";
import { handleApiError, processApiResponse } from "@/lib/apiErrorHandler";
import { Facility } from "./facilitiesService";
import { JoinType } from "./joinService";
import { Faq } from "./faqsService";
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
  // level: string;
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
  total_live_class: number | null;
  latest_batch?: { name: string } | null;
  facilities?: Facility[];
  joins?: JoinType[];
  faqs?: Faq[];
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

export interface CourseLearning {
  id: number;
  course_id: number;
  title: string;
  status: number;
}

export interface CourseLearningResponseData {
  id: number;
  title: string;
  status: number;
  course_id?: number;
  course_learnings?: CourseLearning[];
}

export interface CourseLearningResponse {
  success: boolean;
  message: string;
  code: number;
  data?: {
    course_learnings: CourseLearningResponseData[];
    pagination: Pagination;
  };
  errors?: Record<string, string[] | string>;
}

export interface CourseTool {
  id?: number;
  course_id: number;
  title: string;
  sub_title: string;
  image: string | File | null;
  status: number;
}

export interface CourseToolResponse {
  success: boolean;
  message: string;
  code: number;
  data?: {
    total_tools?: number;
    course_tools: CourseTool[];
    pagination?: Pagination;
  };
  errors?: Record<string, string[] | string>;
}

export interface AssignedFaqsResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    faqs: Faq[];
  } | Faq[];
  errors?: Record<string, string[] | string>;
}

export interface AssignedFacilitiesResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    facilities: Facility[];
  } | Facility[];
  errors?: Record<string, string[] | string>;
}
export interface AssignedJoinsResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    joins: JoinType[];
  } | JoinType[];
  errors?: Record<string, string[] | string>;
}

export interface Lesson {
  id?: number;
  title: string;
  description?: string | null;
  duration: number;
  type: string | number;
  type_name?: string;
  video_url?: string;
  order?: number;
  is_preview: string | number;
  status: string | number;
  schedule_at?: string | null;
}

export interface Chapter {
  id?: number;
  title: string;
  description?: string;
  status: string | number;
  lessons: Lesson[];
  lessons_count?: number;
}

export interface FormValues {
  course_id: number;
  chapters: Chapter[];
}

export interface ChapterLessonResponse {
  success: boolean;
  message: string;
  code: number;
  data?: Chapter[];
  errors?: Record<string, string[] | string>;
}

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
  } catch (error: unknown) {
    console.error("Error in getCoursesCached:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error occurred while fetching courses"
    );
  }
}

// =======================
// Get Courses (Paginated)
// =======================
export async function getCourses(page = 1, params: Record<string, unknown> = {}): Promise<CourseResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  if (!token) throw new Error("No valid session or access token found.");

  return getCoursesCached(page, token, params);
}

// =======================
//  Create Course
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
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to create course.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// =======================
//  Get Course by ID
// =======================
export async function getCourseById(id: string): Promise<CourseSingleResponse> {
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await processApiResponse(res, "Failed to fetch course.");

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch course",
        errors: result.errors,
        code: result.code || 404,
      };
    }

    return {
      success: true,
      message: result.message || "Course fetched successfully",
      data: result.data,
      code: result.code || 200,
    };
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to fetch course.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// =======================
// Update Course
// =======================
export async function updateCourse(id: number, formData: FormData): Promise<CourseSingleResponse> {
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
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to update course.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// =======================
// Delete Course
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
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to delete course.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// =======================
// Assign Branches to Course
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
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to assign branches.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// =======================
//  Create Chapters with Lessons
// =======================
export async function createChaptersWithLessons(
  chaptersData: FormValues
): Promise<ChapterLessonResponse> {
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
      code: result.code || 201,
    };
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to create chapters.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// =======================
//  Update Chapters with Lessons
// =======================
export async function updateChaptersWithLessons(
  chaptersData: FormValues
): Promise<ChapterLessonResponse> {
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

    const res = await fetch(`${API_BASE}/chapter-lessons/bulk-update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(chaptersData),
    });

    const result = await processApiResponse(res, "Failed to update chapters.");

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to update chapters",
        errors: result.errors,
        code: result.code || 400,
      };
    }

    return {
      success: true,
      message: result.message || "Chapters updated successfully",
      data: result.data,
      code: result.code || 200,
    };
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to update chapters.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}


// =======================
//  Assign FAQs to Course
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
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to assign FAQs.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}


// =======================
// Assign Facilities to Course
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
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to assign facilities.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}
// =======================
// Create Course Tools (Bulk)
// =======================
export async function createCourseTools(
  formData: FormData
): Promise<CourseToolResponse> {
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

    const res = await fetch(`${API_BASE}/course-tools/bulk`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: "multipart/form-data",
      },
      body: formData,
    });

    const result = await processApiResponse(res, "Failed to create course tools.");

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to create course tools",
        errors: result.errors,
        code: result.code ?? 400,
      };
    }

    return {
      success: true,
      message: result.message || "Course tools created successfully",
      data: result.data ?? [],
      code: result.code ?? 201,
    };
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to create course tools.");
    return {
      success: false,
      message: errorResult.message ?? "Unknown error occurred",
      code: errorResult.code ?? 500,
    };
  }
}

// =======================
// Update Course Tools (Bulk)
// =======================
export async function updateCourseTools(
  formData: FormData
): Promise<CourseToolResponse> {

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

    // Attempting bulk update endpoint
    const res = await fetch(`${API_BASE}/course-tools/bulk-update`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await processApiResponse(res, "Failed to update course tools.");

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to update course tools",
        errors: result.errors,
        code: result.code ?? 400,
      };
    }

    return {
      success: true,
      message: result.message || "Course tools updated successfully",
      data: result.data ?? [],
      code: result.code ?? 200,
    };
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to update course tools.");
    return {
      success: false,
      message: errorResult.message ?? "Unknown error occurred",
      code: errorResult.code ?? 500,
    };
  }
}

// =======================
// GET Course Tools 
// =======================
export async function getCourseTools(
  courseId: number
): Promise<CourseToolResponse> {
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

    const res = await fetch(`${API_BASE}/course-tools?course_id=${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await processApiResponse(res, "Failed to fetch course tools.");

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch course tools",
        errors: result.errors,
        code: result.code || 404,
      };
    }

    return {
      success: true,
      message: result.message || "Course tools fetched successfully",
      data: result.data ?? [],
      code: result.code || 200,
    };
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to fetch course tools.");
    return {
      success: false,
      message: errorResult.message ?? "Unknown error",
      code: errorResult.code ?? 500,
    };
  }
}


// =======================
// Create Course Learnings
// =======================

export interface CourseLearningInput {
  id?: number;
  title: string;
  status: number;
}

export async function createCourseLearningsFormData(
  courseId: number,
  learnings: CourseLearningInput[]
): Promise<CourseLearningResponse> {
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

    const requestBody = {
      course_id: courseId,
      course_learnings: learnings,
    };

    const url = `${API_BASE}/course-learnings/bulk`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const result = await processApiResponse(
      res,
      "Failed to create course learnings."
    );


    if (!result.success) {
      return {
        success: false,
        message: result.message ?? "Failed to create course learnings",
        code: result.code ?? 400,
        errors: result.errors,
      };
    }

    return {
      success: true,
      message: result.message ?? "Course learnings created successfully",
      data: result.data ?? [],
      code: result.code ?? 201,
    };

  } catch (error: unknown) {
    const errorResult = await handleApiError(
      error,
      "Failed to create course learnings."
    );

    return {
      success: false,
      message: errorResult.message ?? "Unknown error",
      code: errorResult.code ?? 500,
    };
  }
}
// =======================
//  GET Course Learnings (for edit mode)
// =======================
export async function getCourseLearnings(
  courseId: number
): Promise<CourseLearningResponse> {
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

    const res = await fetch(`${API_BASE}/course-learnings?course_id=${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await processApiResponse(res, "Failed to fetch course learnings.");

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch course learnings",
        errors: result.errors,
        code: result.code || 404,
      };
    }

    return {
      success: true,
      message: result.message || "Course learnings fetched successfully",
      data: result.data,
      code: result.code || 200,
    };
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to fetch course learnings.");
    return {
      success: false,
      message: errorResult.message ?? "Unknown error",
      code: errorResult.code ?? 500,
    };
  }
}

// =======================
// bulk Update Course Learnings
// =======================
export async function editCourseLearnings(
  courseId: number,
  learnings: CourseLearningInput[]
): Promise<CourseLearningResponse> {
  console.log("Editing course learnings for courseId:", courseId, "with learnings:", learnings);
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
    const res = await fetch(`${API_BASE}/course-learnings/bulk-update`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ course_id: courseId, course_learnings: learnings }),
    });
    console.log("Response from editCourseLearnings:", res);
    const result = await processApiResponse(res, "Failed to edit course learnings.");

    if (!result.success) {
      return {
        success: false,
        message: result.message ?? "Failed to edit course learnings",
        code: result.code ?? 400,
        errors: result.errors,
      };
    }
    return {
      success: true,
      message: result.message ?? "Course learnings edited successfully",
      data: result.data ?? [],
      code: result.code ?? 200,
    };
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to edit course learnings.");
    return {
      success: false,
      message: errorResult.message ?? "Unknown error",
      code: errorResult.code ?? 500,
    };
  }
};





// =======================
//  GET Chapters by Course ID (for edit mode)
// =======================
export async function getChaptersByCourseId(
  courseId: number
): Promise<ChapterLessonResponse> {
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

    const res = await fetch(`${API_BASE}/chapter-lessons/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await processApiResponse(res, "Failed to fetch chapters.");

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch chapters",
        errors: result.errors,
        code: result.code || 404,
      };
    }

    return {
      success: true,
      message: result.message || "Chapters fetched successfully",
      data: result.data,
      code: result.code || 200,
    };
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to fetch chapters.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// =======================
//  GET Course FAQs (for edit mode)
// =======================
export async function getCourseFaqs(
  courseId: number
): Promise<AssignedFaqsResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      return {
        success: false,
        message: "No valid session or access token found.",
        code: 401,
        data: [],
      };
    }

    const res = await fetch(`${API_BASE}/courses/${courseId}/faqs`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await processApiResponse(res, "Failed to fetch FAQs.");

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch FAQs",
        errors: result.errors,
        code: result.code || 404,
        data: [],
      };
    }

    // Ensure data matches the expected union type
    return {
      success: true,
      message: result.message || "FAQs fetched successfully",
      data: result.data as { faqs: Faq[] } | Faq[],
      code: result.code || 200,
    };
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to fetch FAQs.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
      data: [],
    };
  }
}

// =======================
// GET Course Facilities (for edit mode)
// =======================
export async function getCourseFacilities(
  courseId: number
): Promise<AssignedFacilitiesResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      return {
        success: false,
        message: "No valid session or access token found.",
        code: 401,
        data: [],
      };
    }

    const res = await fetch(`${API_BASE}/courses/${courseId}/facilities`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await processApiResponse(res, "Failed to fetch facilities.");

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch facilities",
        errors: result.errors,
        code: result.code || 404,
        data: [],
      };
    }

    return {
      success: true,
      message: result.message || "Facilities fetched successfully",
      data: result.data as { facilities: Facility[] } | Facility[],
      code: result.code || 200,
    };
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to fetch facilities.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
      data: [],
    };
  }
}






// =======================
// Assign Joins to Course
// =======================
export async function assignJoinsToCourse(
  courseId: string | number,
  joinIds: number[]
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
      `${API_BASE}/courses/${courseId}/joins`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ join_ids: joinIds }),
      }
    );

    const result = await processApiResponse(response, "Failed to assign joins.");

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to assign joins",
        errors: result.errors,
        code: result.code || 400,
      };
    }

    return {
      success: true,
      message: result.message || "Joins assigned successfully",
      data: result.data,
      code: result.code || 200,
    };
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to assign joins.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// =======================
// GET Course Joins (for edit mode)
// =======================
export async function getCourseJoins(
  courseId: number
): Promise<AssignedJoinsResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      return {
        success: false,
        message: "No valid session or access token found.",
        code: 401,
        data: [],
      };
    }

    const res = await fetch(`${API_BASE}/courses/${courseId}/joins`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await processApiResponse(res, "Failed to fetch joins.");

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch joins",
        errors: result.errors,
        code: result.code || 404,
        data: [],
      };
    }

    return {
      success: true,
      message: result.message || "Joins fetched successfully",
      data: result.data as { joins: JoinType[] } | JoinType[],
      code: result.code || 200,
    };
  } catch (error: unknown) {
    const errorResult = await handleApiError(error, "Failed to fetch joins.");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
      data: [],
    };
  }
}
