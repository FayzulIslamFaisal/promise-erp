"use server"

import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { cacheTag, updateTag } from "next/cache"
import { District } from "@/apiServices/districtService"

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1"

/* ===============================
   Interfaces
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
  student_count: number;
  teacher_count: number;
  employee_count: number;

  district?: {
    id: number;
    name: string;
  };
}

export interface BranchCreate {
  name: string
  district_id: number
  address?: string | null
  phone?: string[] | null
  email?: string[] | null
  google_map?: string | null
  social_links?: SocialLink[] | null
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
  errors?: Record<string, string[] | string>
  data?: any
}

/* ===============================
   Helper – Get Auth Token
================================== */
async function getAuthToken(): Promise<string> {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    throw new Error("No valid session or access token found.")
  }

  return session.accessToken
}

/* ===============================
   Add Branch
================================== */
export async function addBranch(
  branch: BranchCreate
): Promise<BranchResponseType> {
  const token = await getAuthToken()

  const res = await fetch(`${API_BASE}/branches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(branch),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    return {
      success: false,
      message: data.message || "Failed to add branch.",
      errors: data.errors,
    }
  }

  updateTag("branches-list")

  return {
    success: true,
    message: data.message,
    data,
  }
}

/* ===============================
    Get Branches (Paginated)
================================== */

export async function getBranchesCached(
  page = 1,
  token: string,
  params: Record<string, unknown> = {}
): Promise<BranchResponse> {
  "use cache";
  cacheTag("branches-list");

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

    const res = await fetch(`${API_BASE}/branches?${urlParams.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    return await res.json();
  } catch (error) {
    console.error("Error in getBranchesCached:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error occurred while fetching branches"
    );
  }
}

export async function getBranches(
  page = 1,
  params: Record<string, unknown> = {}
): Promise<BranchResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      throw new Error("No valid session or access token found.");
    }

    return await getBranchesCached(page, token, params);
  } catch (error) {
    console.error("Error in get branches:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to get branches"
    );
  }
}

/* ===============================
  Get Single Branch by ID
================================== */
export async function getBranchById(
  id: string
): Promise<BranchSingleResponse> {
  const token = await getAuthToken()

  const res = await fetch(`${API_BASE}/branches/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch branch: ${res.statusText}`)
  }
 


  return res.json()
}

/* ===============================
 Update Branch
================================== */

export async function updateBranch(
  id: string,
  data: Record<string, any>
): Promise<BranchResponseType> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    return {
      success: false,
      message: "No valid session or access token found.",
    };
  }

  const res = await fetch(`${API_BASE}/branches/${id}`, {
    method: "PATCH", // ✅ সরাসরি PATCH করা হচ্ছে
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // ✅ এখন JSON পাঠানো হবে
    },
    body: JSON.stringify(data),
  });

  const result = await res.json().catch(() => ({}));

  if (!res.ok) {
    return {
      success: false,
      message: result.message || "Failed to update branch.",
      errors: result.errors,
    };
  }

  updateTag("branches-list");

  return {
    success: true,
    message: result.message,
    data: result.data,
  };
}


/* ===============================
  Delete Branch
================================== */

export async function deleteBranch(id: number): Promise<{ success: boolean; message: string; code?: number }> {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken

  if (!token) {
    return { success: false, message: "No valid session or access token found.", code: 401 }
  }

  const res = await fetch(`${API_BASE}/branches/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await res.json().catch(async () => ({ message: await res.text() }))
  if (!res.ok) {
    return { success: false, message: data.message || "Failed to delete branch", code: res.status }
  }

  updateTag("branches-list")
  return { success: true, message: data.message || "Branch deleted successfully" }
}
