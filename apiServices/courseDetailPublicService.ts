"use server";
import { cacheTag } from "next/cache";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

// --- Interfaces matching actual API response ---
export interface Category {
    id: number;
    name: string;
}

export interface Branch {
    id: number;
    name: string;
}

export interface Batch {
    price: number;
    discount: number;
    discount_type: "percentage" | "fixed" | null;
    after_discount: number;
    is_online: boolean;
    is_offline: boolean;
    start_date: string;
    end_date: string;
    duration: string;
}

export interface CourseFacility {
    id: number;
    title: string;
    image: string | null;
}

export interface CourseTool {
    id: number;
    title: string;
    sub_title: string;
    image: string | null;
}

export interface CourseLearning {
    id: number;
    title: string;
}

export interface Chapter {
    id: number;
    title: string;
    lessons: Lesson[];
}

export interface Lesson {
    id: number;
    title: string;
}

export interface CourseInstructor {
    id: number;
    name: string;
    email: string;
    profile_image: string | null;
    designation: string;
    experience: string;
    instructors_tools: CourseTool[];
}

export interface FAQ {
    id: number;
    question: string;
    answer: string;
}

export interface ReviewUser {
    id: number;
    name: string;
    profile_image: string | null;
}

export interface Review {
    id: number;
    rating: number;
    feedback: string;
    user: ReviewUser;
}
export interface CourseJoin {
    id: number;
    title: string;
}

export interface CourseDetail {
    id: number;
    category_id: number;
    title: string;
    slug: string;
    total_certified: number;
    description: string;
    featured_image: string;
    video_link: string;
    status: string;
    is_default: boolean;
    total_enrolled: number;
    ratings: number;
    total_seats: number | null;
    total_live_class: number | null;
    course_type: "free" | "govt" | "paid" | null;
    is_collaboration: boolean;
    category: Category;
    branch_count: number;
    branches: Branch[];
    batch: Batch;
    course_facilities: CourseFacility[];
    course_tools: CourseTool[];
    course_learnings: CourseLearning[];
    faqs: FAQ[];
    chapters: Chapter[];
    course_instructors: CourseInstructor[];
    reviews: Review[];
    course_joins: CourseJoin[];
    certificate_image: string | null;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    code: number;
    data: CourseDetail;
}

export async function getCourseDetailBySlug(slug: string): Promise<ApiResponse> {
    "use cache";
    cacheTag("course-detail");

    try {
        const res = await fetch(`${API_BASE}/public/courses/${slug}`, {
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 3600, // Revalidate every hour
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: ApiResponse = await res.json();
        return data;
    } catch (error) {
        console.error("Error in getCourseDetailBySlug:", error);
        toast.error("Error in getCourseDetailBySlug:");
        return {
            success: false,
            message: "Failed to fetch course details",
            code: 500,
            data: null as any,
        };
    }
}
