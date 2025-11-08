"use server"

import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { cacheTag, updateTag } from "next/cache"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1"

/* ===============================
   🔹 Interfaces
================================== */

export interface SocialLink {
  title: string;
  url: string;
}

export interface Branch {
  id: number;
  name: string;
  division_id: number;
  address?: string | null;
  phone?: string[] | null;
  email?: string[] | null;
  google_map?: string | null;
  social_links?: SocialLink[] | null;

  // Add these counts
  student_count: number;
  teacher_count: number;
  employee_count: number;

  district?: {
    id: number;
    name: string;
  };
}

// ✅ Separate type for creating a new branch (no id or counts)
export interface BranchCreate {
  name: string
  division_id: number
  address?: string | null
  phone?: string[] | null
  email?: string[] | null
  google_map?: string | null
  social_links?: string[] | null
}

export interface Pagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
  from?: number
  to?: number
  has_more_pages?: boolean
}

export interface BranchResponse {
  success: boolean
  message: string
  data: {
    branches: Branch[]
    pagination: Pagination
  }
}

export interface BranchSingleResponse {
  success: boolean
  message: string
  data: Branch
}

export interface BranchResponseType {
  success: boolean
  message?: string
  errors?: {
    [key: string]: string[] | string
  }
  data?: any
}

/* ===============================
   🔹 Add Branch
================================== */

export async function addBranch(branch: BranchCreate): Promise<BranchResponseType> {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken

  if (!token) return { success: false, message: "No valid session or access token found." }

  const res = await fetch(`${API_BASE}/branches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
    },
    body: JSON.stringify(branch),
  })

  const data = await res.json()

  if (!res.ok) {
    return {
      success: false,
      message: data.message || "Failed to add branch.",
      errors: data.errors,
    }
  }

  updateTag("branches-list")

  return { success: true, message: data.message, data }
}

/* ===============================
   🔹 Get Branches (Paginated)
================================== */

export async function getBranchesCached(page = 1, token: string): Promise<BranchResponse> {
  "use cache"
  cacheTag("branches-list")

  const res = await fetch(`${API_BASE}/branches?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(`Message: ${errorData.message || "Unknown error"}`)
  }

  return res.json()
}

export async function getBranches(page = 1): Promise<BranchResponse> {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken

  if (!token) {
    throw new Error("No valid session or access token found.")
  }

  return getBranchesCached(page, token)
}

/* ===============================
   🔹 Get Single Branch by ID
================================== */

export async function getBranchById(id: string): Promise<BranchSingleResponse> {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken

  if (!token) throw new Error("No valid session or access token found.")

  const res = await fetch(`${API_BASE}/branches/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) throw new Error(`Failed to fetch branch: ${res.statusText}`)

  return res.json()
}

/* ===============================
   🔹 Update Branch
================================== */

export async function updateBranch(id: string, formData: FormData): Promise<BranchResponseType> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) return { success: false, message: "No valid session or access token found." }

  formData.append("_method", "PATCH"); // For Laravel to recognize PATCH with FormData

  const res = await fetch(`${API_BASE}/branches/${id}`, {
    method: "POST", // Use POST with _method=PATCH for FormData
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  const data = await res.json()

  if (!res.ok) {
    return {
      success: false,
      message: data.message || "Failed to update branch.",
      errors: data.errors,
    }
  }

  updateTag("branches-list")

  return { success: true, message: data.message, data }
}

/* ===============================
   🔹 Delete Branch
================================== */

export async function deleteBranch(id: number): Promise<{ success: boolean; message: string }> {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken

  if (!token) throw new Error("No valid session or access token found.")

  const res = await fetch(`${API_BASE}/branches/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(`Message: ${errorData.message || "Failed to delete branch"}`)
  }

  updateTag("branches-list")

  return res.json()
}
