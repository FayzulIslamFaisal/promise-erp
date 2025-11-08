"use server"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { cacheTag, updateTag } from 'next/cache'


const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1"

// =======================
// 🔹 Interfaces
// =======================

export interface Teacher {
  id: number
  name: string
  bn_name: string
  email: string
  phone: string
  is_paid: number
  profile_image?: string | null
  subscription_details?: {
    id: number
    name: string
    price: string
    duration?: string
  } | null
  organization?: {
    id: number
    name: string
    logo?: string
  }
  user_detail?: {
    blood_group?: string
    education?: string
    date_of_birth?: string
  }
}

export interface Pagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface TeacherResponse {
  success: boolean
  message: string
  data: {
    teachers: Teacher[]
    pagination: Pagination
  }
}
export interface TeacherResponseType {
  success: boolean;
  message?: string;
  errors?: {
    [key: string]: string[] | string;
  };
  data?: any;
}

// add teacher
export async function addTeacher(
  formData: FormData
): Promise<TeacherResponseType> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    return {
      success: false,
      message: "No valid session or access token found.",
    };
  }

  const res = await fetch(`${API_BASE}/teachers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: data.message || "Failed to add teacher.",
      errors: data.errors,
    };
  }

  updateTag("teachers-list");
  return { success: true, message: data.message, data };
}

// =======================
// 🔹 Get Teachers
// =======================

async function getTeachersCached(
  page: number,
  token: string,
  params: any
): Promise<TeacherResponse> {
  "use cache"
  cacheTag("teachers-list")

  const url = new URL(`${API_BASE}/teachers`)
  url.searchParams.append("page", String(page))

  if (params) {
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        url.searchParams.append(key, params[key])
      }
    })
  }

  const res = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch teachers: ${res.statusText}`)
  }

  return res.json()
}

export async function getTeachers(
  page = 1,
  params: any = {}
): Promise<TeacherResponse> {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken
  if (!token) throw new Error("No valid session or access token found.")

  return getTeachersCached(page, token, params)
}

export interface TeacherSingleResponse {
  success: boolean
  message: string
  data: Teacher
}

// =======================
// 🔹 Get Teacher By ID
// =======================

export async function getTeacherById(id: string): Promise<TeacherSingleResponse> {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken
  if (!token) throw new Error("No valid session or access token found.")

  const res = await fetch(`${API_BASE}/teachers/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch teacher: ${res.statusText}`)
  }

  return res.json()
}

// =======================
// 🔹 Update Teacher
// =======================

export async function updateTeacher(
  id: string,
  formData: FormData
): Promise<TeacherResponseType> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    return {
      success: false,
      message: "No valid session or access token found.",
    };
  }

  formData.append("_method", "PATCH");

  const res = await fetch(`${API_BASE}/teachers/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: data.message || "Failed to update teacher.",
      errors: data.errors,
    };
  }

  updateTag("teachers-list");
  return { success: true, message: data.message, data };
}

// =======================
// 🔹 Delete Teacher
// =======================
export async function deleteTeacher(id: number) {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_BASE}/teachers/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to delete student: ${errorText}`);
  }
  updateTag("teachers-list");
  return await res.json();
}

