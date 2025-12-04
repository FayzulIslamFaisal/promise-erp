"use server";
import { cacheTag } from "next/cache";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

// --- Interfaces ---
export interface Category { id: number; name: string; }
export interface Branch { id: number; name: string; }
export interface Batch {
  price: number;
  discount: number;
  discount_type?: "percentage" | "fixed" | null;
  after_discount?: number;
  is_online?: boolean | null;
  is_offline?: boolean | null;
  start_date?: string | null;
  end_date?: string | null;
  duration?: string | null;
}
export interface Course {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  featured_image: string;
  status?: string;
  is_default: boolean;
  total_enrolled?: number;
  ratings: number;
  total_seats?: number | null;
  total_live_class?: number | null;
  course_type?: "free" | "govt" | "paid" | null;
  is_collaboration?: boolean;
  category?: Category;
  branch_count?: number;
  branches?: Branch[];
  batch?: Batch;
}
export interface CourseTypeFilter { id: number; name: string; }
export interface LevelFilter { id: string; name: string; }
export interface BudgetScaleFilter { id: string; label: string; }
export interface PriceRange { min: number; max: number; }
export interface CourseTracks { id: number; name: string; }
export interface Filters {
  search?: string;
  course_types?: CourseTypeFilter[];
  categories?: Category[];
  price_range?: PriceRange;
  levels?: LevelFilter[];
  budget_scale?: BudgetScaleFilter[];
  course_track?: CourseTracks[];
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
export interface ApiResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    courses: Course[];
    filters: Filters;
    pagination: Pagination;
  };
}
export interface GetPublicCoursesParams {
  page?: number;
  params?: Record<string, unknown>;
}

export async function getPublicCoursesList({
  params = {},
}: GetPublicCoursesParams): Promise<ApiResponse> {
  "use cache";
    cacheTag("courses-list");
  try {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlParams.append(key, String(value));
      }
    });

    const queryString = urlParams.toString();
    const res = await fetch(`${API_BASE}/public/courses?${queryString}`, {
      headers: {"Content-Type": "application/json",},
    });

    const data: ApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getPublicCoursesList:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error occurred while fetching public courses list"
    );
  }
}