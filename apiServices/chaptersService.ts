"use server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cacheTag, updateTag } from "next/cache";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
// Batch
export interface ChapterBatch {
  id: number;
  name: string;
}

// Course
export interface ChapterCourse {
  id: number;
  title: string;
}

// Branch
export interface ChapterBranch {
  id: number;
  name: string;
}

// Chapter main interface
export interface Chapter {
  id: number;
  lm_batch_id: number;
  lm_course_id: number;
  branch_id: number;
  title: string;
  description: string;
  status: number;
  batch: ChapterBatch;
  course: ChapterCourse;
  branch: ChapterBranch;
  lessons_count: number;
}

// Pagination
export interface ChapterPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  has_more_pages: boolean;
}

// GET Chapters Response
export interface ChaptersResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    total_chapters: number;
    chapters: Chapter[];
    pagination: ChapterPagination;
  };
  errors?: Record<string, string[]>;
}

//Single Chapter Response
export interface SingleChapterResponse {
  success: boolean;
  message: string;
  code: number;
  data?: Chapter | null;
  errors?: Record<string, string[]>;
}


// =======================
//  GET CHAPTERS (Paginated)
// =======================

export async function getChaptersCached(
  page = 1,
  token: string,
  params: Record<string, unknown> = {}
): Promise<ChaptersResponse> {
  "use cache";
  cacheTag("chapters-list");

  try {
    const urlParams = new URLSearchParams();
    urlParams.append("page", page.toString());

    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        urlParams.append(key, params[key]!.toString());
      }
    }

    const res = await fetch(
      `${API_BASE}/chapters?${urlParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data: ChaptersResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getChaptersCached:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch chapters"
    );
  }
}

export async function getChapters(
  page = 1,
  params: Record<string, unknown> = {}
): Promise<ChaptersResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) throw new Error("No valid session/token");

    return await getChaptersCached(page, token, params);
  } catch (error) {
    console.error("Error in getChapters:", error);
    throw error;
  }
}

// =======================
// GET SINGLE CHAPTER
// =======================

export async function getChapterById(
  id: number
): Promise<SingleChapterResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session/token");

    const res = await fetch(`${API_BASE}/chapters/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data: SingleChapterResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getChapterById:", error);
    throw error;
  }
}

// =======================
// CREATE CHAPTER
// =======================
export interface ChapterFormData {
  lm_batch_id: number;
  lm_course_id: number;
  branch_id: number;
  title: string;
  description: string;
  status: number;
}
export async function createChapter(
  chapterFormData: ChapterFormData
): Promise<SingleChapterResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No token found");

    const res = await fetch(`${API_BASE}/chapters`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chapterFormData),
    });

    const data: SingleChapterResponse = await res.json();
    updateTag("chapters-list");

    return data;
  } catch (error) {
    console.error("Error in createChapter:", error);
    throw error;
  }
}

// =======================
// UPDATE CHAPTER (PATCH)
// =======================

export interface ChapterUpdateFormData {
  lm_batch_id: number;
  lm_course_id: number;
  branch_id: number;
  title: string;
  description: string;
  status: number;
}
export async function updateChapter(
  id: number,
  chapterUpdateFormData: ChapterUpdateFormData
): Promise<SingleChapterResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No token found");

    // chapterUpdateFormData.append("_method", "PATCH");

    const res = await fetch(`${API_BASE}/chapters/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chapterUpdateFormData),
    });

    const data: SingleChapterResponse = await res.json();
    updateTag("chapters-list");

    return data;
  } catch (error) {
    console.error("Error in updateChapter:", error);
    throw error;
  }
}

// =======================
// DELETE CHAPTER
// =======================

export async function deleteChapter(
  id: number
): Promise<SingleChapterResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No token found");

    const res = await fetch(`${API_BASE}/chapters/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data: SingleChapterResponse = await res.json();
    updateTag("chapters-list");

    return data;
  } catch (error) {
    console.error("Error in deleteChapter:", error);
    throw error;
  }
}