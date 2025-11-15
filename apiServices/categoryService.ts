// apiServices/categoryService.ts
"use server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cacheTag, updateTag } from "next/cache";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export interface Category {
  id: number;
  name: string;
  slug: string;
  status: number;
  image?: string | null;
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
    categories: Category[];
    pagination: Pagination;
  };
}

export interface SingleCategoryResponse {
  success: boolean;
  message: string;
  code?: number;
  data?: Category | null;
  errors?: Record<string, string[]>;
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
  } catch (error) {
    console.error("Error in get Categories:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to get Categories"
    );
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
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) throw new Error("No valid session or access token found.");

    const url = `${API_BASE}/course-categories`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: categoryData
      });
      
      const data: SingleCategoryResponse = await response.json();
      updateTag("categories-list");
      return data;
    } catch (error) {
        console.error("Error in createCategory:", error);
        throw new Error(`Failed to create category: ${error}`);
    }
  }


// =======================
//  PUT update category
// =======================
  export async function updateCategory(id: number, formData: FormData): Promise<SingleCategoryResponse> {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) throw new Error("No valid session or access token found.");

    const url = `${API_BASE}/course-categories/${id}`;
    try {
      formData.append("_method", "PATCH");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: formData
      });
      
      const data: SingleCategoryResponse = await response.json();
      updateTag("categories-list");
      return data;
    } catch (error) {
      console.error("Error in updateCategory:", error);
      throw new Error(`Failed to update category: ${error}`);
    }
  }

// =======================
//  DELETE category
// =======================
  export async function deleteCategory(id: number): Promise<SingleCategoryResponse> {
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
      updateTag("categories-list");
      return data;
    } catch (error) {
        console.error("Error in deleteCategory:", error);
        throw new Error(`Failed to delete category: ${error}`);
    }
  }