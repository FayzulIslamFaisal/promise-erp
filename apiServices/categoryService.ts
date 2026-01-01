// apiServices/categoryService.ts
"use server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cacheTag, updateTag } from "next/cache";
import { handleApiError, processApiResponse } from "@/lib/apiErrorHandler";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export interface Category {
  id: number;
  name: string;
  slug: string;
  status: number;
  image?: string | null;
  total_course?: number | string;
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

export interface CategoriesResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    total_categories: number;
    section_subtitle?: string;
    section_title?: string;
    categories?: Category[];
    pagination?: Pagination;
  };
  errors?: Record<string, string[]>;
}

export interface SingleCategoryResponse {
  success: boolean;
  message: string;
  code?: number;
  data?: Category | null;
  errors?: Record<string, string[] | string>;
}

export interface CreateCategoryRequest {
  name?: string;
  status?: number;
  image?: string | null;
}

export interface UpdateCategoryRequest {
  name?: string;
  status?: number;
  image?: string | null;
}


// =======================
//  Get Categories (Paginated)
// =======================

export async function getCategoriesCached(
  page = 1,
  token: string,
  params: Record<string, unknown> = {}
): Promise<CategoriesResponse> {
  "use cache";
  cacheTag("categories-list");

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
    const data: CategoriesResponse = await res.json();
     return data;
  } catch (error) {
    console.error("Error in getCategoriesCached:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error occurred while fetching Categories"
    );
  }
}

export async function getCategories(
  page = 1,
  params: Record<string, unknown> = {}
): Promise<CategoriesResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      throw new Error("No valid session or access token found.");
    }

    return await getCategoriesCached(page, token, params);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Categories API Error:", error.message);
      throw new Error("Error fetching categories");
    }else {
      throw new Error("Error fetching categories");
    }
  }
}

// =======================
//  Get Category By ID
// =======================
export async function getCategoryById(
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
    console.error("Error in getCategoryById:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error occurred while fetching Category by ID"
    );
  }
}

// =======================
//  Create Category
// =======================
export async function createCategory(categoryData:FormData): Promise<SingleCategoryResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) {
      return { success: false, message: "No valid session or access token found.", code: 401 };
    }

    const url = `${API_BASE}/course-categories`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: categoryData
    });

    const result = await processApiResponse(response, "Failed to create category");

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        errors: result.errors,
        code: result.code,
      };
    }

    updateTag("categories-list");
    return {
      success: true,
      message: result.message || "Category created successfully",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    const errorResult = await handleApiError(error, "Failed to create category");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}


// =======================
//  PUT update category
// =======================
export async function updateCategory(id: number, formData: FormData): Promise<SingleCategoryResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) {
      return { success: false, message: "No valid session or access token found.", code: 401 };
    }

    const url = `${API_BASE}/course-categories/${id}`;
    formData.append("_method", "PATCH");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData
    });

    const result = await processApiResponse(response, "Failed to update category");

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        errors: result.errors,
        code: result.code,
      };
    }

    updateTag("categories-list");
    return {
      success: true,
      message: result.message || "Category updated successfully",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    const errorResult = await handleApiError(error, "Failed to update category");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// =======================
//  DELETE category
// =======================
export async function deleteCategory(id: number): Promise<SingleCategoryResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) {
      return { success: false, message: "No valid session or access token found.", code: 401 };
    }

    const url = `${API_BASE}/course-categories/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await processApiResponse(response, "Failed to delete category");

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        code: result.code,
      };
    }

    updateTag("categories-list");
    return {
      success: true,
      message: result.message || "Category deleted successfully",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    const errorResult = await handleApiError(error, "Failed to delete category");
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}


// functions for home page getHomeCourseCategories ---

export async function getHomeCourseCategories(): Promise<CategoriesResponse> {
  // "use cache";
  // cacheTag("course-categories");

  try {

    const res = await fetch(
      `${API_BASE}/public/course-categories/with-count`
    );

    if (!res.ok) {
      throw new Error(
        `Home Course Categories API failed: ${res.status} ${res.statusText}`
      );
    }
    const data: CategoriesResponse = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Home Course Categories API Error:", error.message);
      throw new Error("Error fetching home course categories");
    }else {
      throw new Error("Error fetching home course categories");
    }
    
  }
}