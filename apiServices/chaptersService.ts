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

// Single Chapter Response
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

    const res = await fetch(`${API_BASE}/chapters?${urlParams.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data: ChaptersResponse = await res.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch chapters");
  }
}

export async function getChapters(
  page = 1,
  params: Record<string, unknown> = {}
): Promise<ChaptersResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) throw new Error("No valid session/token");

  return await getChaptersCached(page, token, params);
}

// =======================
// GET SINGLE CHAPTER
// =======================

export async function getChapterById(id: number): Promise<SingleChapterResponse> {
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

    return await res.json();
  } catch (error) {
    throw new Error("Failed to fetch chapter");
  }
}

// =======================
// CREATE CHAPTER (POST)
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

    const data = await res.json();
    updateTag("chapters-list");
    return data;
  } catch (error) {
    throw new Error("Failed to create chapter");
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
  updateData: ChapterUpdateFormData
): Promise<SingleChapterResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No token found");

    const res = await fetch(`${API_BASE}/chapters/${id}`, {
      method: "PATCH", // <-- ✔ Correct method
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const data = await res.json();
    updateTag("chapters-list");
    return data;
  } catch (error) {
    throw new Error("Failed to update chapter");
  }
}

// =======================
// DELETE CHAPTER
// =======================

export async function deleteChapter(id: number): Promise<SingleChapterResponse> {
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

    const data = await res.json();
    updateTag("chapters-list");

    return data;
  } catch (error) {
    throw new Error("Failed to delete chapter");
  }
}
