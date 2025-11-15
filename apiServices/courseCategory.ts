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
    const data: CourseCategoriesResponse = await res.json();
     return data;
  } catch (error) {
    console.error("Error in getCourseCategoriesCached:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error occurred while fetching Course Categories"
    );
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
      throw new Error("No valid session or access token found.");
    }

    return await getCourseCategoriesCached(page, token, params);
  } catch (error) {
    console.error("Error in get Course Categories:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to get Course Categories"
    );
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
    if (!token) throw new Error("No valid session or access token found.");

    const res = await fetch(`${API_BASE}/course-categories/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data: SingleCategoryResponse = await res.json();
    return data;

  } catch (error) {
    console.error("Error in getCourseCategoryById:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error occurred while fetching CourseCategory by ID"
    );
  }
}

// =======================
//  Create CourseCategory
// =======================
export async function createCourseCategory(categoryData: CreateCategoryRequest): Promise<SingleCategoryResponse> {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) throw new Error("No valid session or access token found.");

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
      
      const data: SingleCategoryResponse = await response.json();
      return data;
    } catch (error) {
        console.error("Error in createCourseCategory:", error);
        throw new Error(`Failed to create course category: ${error}`);
    }
  }


// =======================
//  PUT update category
// =======================
  export async function updateCourseCategory(id: number, categoryData: UpdateCategoryRequest): Promise<SingleCategoryResponse> {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) throw new Error("No valid session or access token found.");

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
      
      const data: SingleCategoryResponse = await response.json();
      updateTag("course-categories-list");
      return data;
    } catch (error) {
      console.error("Error in updateCourseCategory:", error);
      throw new Error(`Failed to update course category: ${error}`);
    }
  }

// =======================
//  DELETE category
// =======================
  export async function deleteCourseCategory(id: number): Promise<SingleCategoryResponse> {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) throw new Error("No valid session or access token found.");

    const url = `${API_BASE}/course-categories/${id}`;
    
    try {
      const response = await fetch(url, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
      });
      
      const data: SingleCategoryResponse = await response.json();
      updateTag("course-categories-list");
      return data;
    } catch (error) {
        console.error("Error in deleteCourseCategory:", error);
        throw new Error(`Failed to delete course category: ${error}`);
    }
  }
