// apiServices/courseCategory.ts
"use server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cacheTag, updateTag } from "next/cache";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export interface CourseCategory {
  id: number;
  name: string;
  slug: string;
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

export interface CourseCategoriesResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    total_categories: number;
    categories: CourseCategory[];
    pagination: Pagination;
  };
}

export interface SingleCategoryResponse {
  success: boolean;
  message: string;
  code: number;
  data: CourseCategory | null;
}

export interface CreateCategoryRequest {
  name: string;
  status: number;
}

export interface UpdateCategoryRequest {
  name?: string;
  status?: number;
}


// =======================
//  Get Course Categories (Paginated)
// =======================

export async function getCourseCategoriesCached(
  page = 1,
  token: string,
  params: Record<string, unknown> = {}
): Promise<CourseCategoriesResponse> {
  "use cache";
  cacheTag("course-categories-list");

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

    const res = await fetch(`${API_BASE}/course-categories?${urlParams.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data: CourseCategoriesResponse = await res.json().catch(async () => ({ message: await res.text() } as any));
    if (!res.ok) {
      return {
        success: false,
        message: (data as any).message || "Failed to fetch course categories",
        code: res.status,
        data: {
          total_categories: 0,
          categories: [],
          pagination: {
            current_page: page,
            last_page: 0,
            per_page: 0,
            total: 0,
            from: 0,
            to: 0,
            has_more_pages: false,
          },
        },
      };
    }
    return data;
  } catch (error) {
    console.error("Error in getCourseCategoriesCached:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred while fetching Course Categories",
      code: 500,
      data: {
        total_categories: 0,
        categories: [],
        pagination: {
          current_page: page,
          last_page: 0,
          per_page: 0,
          total: 0,
          from: 0,
          to: 0,
          has_more_pages: false,
        },
      },
    };
  }
}

export async function getCourseCategories(
  page = 1,
  params: Record<string, unknown> = {}
): Promise<CourseCategoriesResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      return {
        success: false,
        message: "No valid session or access token found.",
        code: 401,
        data: {
          total_categories: 0,
          categories: [],
          pagination: {
            current_page: page,
            last_page: 0,
            per_page: 0,
            total: 0,
            from: 0,
            to: 0,
            has_more_pages: false,
          },
        },
      };
    }

    return await getCourseCategoriesCached(page, token, params);
  } catch (error) {
    console.error("Error in get Course Categories:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to get Course Categories",
      code: 500,
      data: {
        total_categories: 0,
        categories: [],
        pagination: {
          current_page: page,
          last_page: 0,
          per_page: 0,
          total: 0,
          from: 0,
          to: 0,
          has_more_pages: false,
        },
      },
    };
  }
}

// =======================
//  Get CourseCategory By ID
// =======================
export async function getCourseCategoryById(
  id: number
): Promise<SingleCategoryResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) return { success: false, message: "No valid session or access token found.", code: 401, data: null };

    const res = await fetch(`${API_BASE}/course-categories/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data: SingleCategoryResponse = await res.json().catch(async () => ({ message: await res.text(), data: null } as any));
    if (!res.ok) {
      return { success: false, message: (data as any).message || "Failed to fetch course category", code: res.status, data: null };
    }
    return data;

  } catch (error) {
    console.error("Error in getCourseCategoryById:", error);
    return { success: false, message: error instanceof Error ? error.message : "Unknown error occurred while fetching CourseCategory by ID", code: 500, data: null };
  }
}

// =======================
//  Create CourseCategory
// =======================
export async function createCourseCategory(categoryData: CreateCategoryRequest): Promise<SingleCategoryResponse> {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) return { success: false, message: "No valid session or access token found.", code: 401, data: null };

    const url = `${API_BASE}/course-categories`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData)
      });
      const data: SingleCategoryResponse = await response.json().catch(async () => ({ message: await response.text(), data: null } as any));
      if (!response.ok) {
        return { success: false, message: (data as any).message || "Failed to create course category", code: response.status, data: null };
      }
      updateTag("course-categories-list");
      return data;
    } catch (error) {
      console.error("Error in createCourseCategory:", error);
      return { success: false, message: error instanceof Error ? error.message : "Failed to create course category", code: 500, data: null };
    }
  }


// =======================
//  PUT update category
// =======================
  export async function updateCourseCategory(id: number, categoryData: UpdateCategoryRequest): Promise<SingleCategoryResponse> {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) return { success: false, message: "No valid session or access token found.", code: 401, data: null };

    const url = `${API_BASE}/course-categories/${id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData)
      });
      const data: SingleCategoryResponse = await response.json().catch(async () => ({ message: await response.text(), data: null } as any));
      if (!response.ok) {
        return { success: false, message: (data as any).message || "Failed to update course category", code: response.status, data: null };
      }
      updateTag("course-categories-list");
      return data;
    } catch (error) {
      console.error("Error in updateCourseCategory:", error);
      return { success: false, message: error instanceof Error ? error.message : "Failed to update course category", code: 500, data: null };
    }
  }

// =======================
//  DELETE category
// =======================
  export async function deleteCourseCategory(id: number): Promise<SingleCategoryResponse> {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) return { success: false, message: "No valid session or access token found.", code: 401, data: null };

    const url = `${API_BASE}/course-categories/${id}`;
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data: SingleCategoryResponse = await response.json().catch(async () => ({ message: await response.text(), data: null } as any));
      if (!response.ok) {
        return { success: false, message: (data as any).message || "Failed to delete course category", code: response.status, data: null };
      }
      updateTag("course-categories-list");
      return data;
    } catch (error) {
      console.error("Error in deleteCourseCategory:", error);
      return { success: false, message: error instanceof Error ? error.message : "Failed to delete course category", code: 500, data: null };
    }
  }
