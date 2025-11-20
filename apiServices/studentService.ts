"use server"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { cacheTag, updateTag } from "next/cache"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1"

export interface Student {
  id: number
  profile_image?: string | null
  name: string
  bn_name: string
  email: string
  phone: string
  is_paid: number
  branches: string
  divisions: string
  status: string
  is_govt: boolean
  is_blocked: boolean
  courses: {
    id: number
    title: string
    batch: string
  }[]
  subscription_details?: {
    id: number
    name: string
    price: string
  } | null
  organization?: {
    id: number
    name: string
  }
}

export interface PaginationType {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface StudentResponse {
  success: boolean
  message: string
  data: {
    students: Student[]
    pagination: PaginationType
  }
}
export interface StudentResponseType {
  success: boolean;
  message?: string;
  errors?: {
    [key: string]: string[] | string;
  };
  data?: any;
}

// add student
export async function addStudent(
  formData: FormData
): Promise<StudentResponseType> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    return {
      success: false,
      message: "No valid session or access token found.",
    };
  }

  const res = await fetch(`${API_BASE}/students`, {
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
      message: data.message || "Failed to add student.",
      errors: data.errors,
    };
  }

  updateTag("students-list");
  return { success: true, message: data.message, data };
}

// Get students
export async function getStudentsCached(
  page = 1,
  token: string,
  params: Record<string, any> = {}
): Promise<StudentResponse> {
  "use cache"
  cacheTag("students-list")

  const urlParams = new URLSearchParams()
  urlParams.append("page", page.toString())

  for (const key in params) {
    if (params.hasOwnProperty(key) && params[key] !== undefined && params[key] !== null) {
      urlParams.append(key, params[key].toString())
    }
  }

  const res = await fetch(`${API_BASE}/students?${urlParams.toString()}`, {
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

export async function getStudents(
  page = 1,
  params: Record<string, any> = {}
): Promise<StudentResponse> {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken

  if (!token) {
    throw new Error("No valid session or access token found.")
  }
  return getStudentsCached(page, token, params)
}

export interface StudentSingleResponse {
  success: boolean
  message: string
  data: Student
}

// =======================
// 🔹 Get Student By ID
// =======================

export async function getStudentById(id: string): Promise<StudentSingleResponse> {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken
  if (!token) throw new Error("No valid session or access token found.")

  const res = await fetch(`${API_BASE}/students/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch student: ${res.statusText}`)
  }

  return res.json()
}

// =======================
// 🔹 Update Student
// =======================

export async function updateStudent(
  id: string,
  formData: FormData
): Promise<StudentResponseType> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    return {
      success: false,
      message: "No valid session or access token found.",
    };
  }

  formData.append("_method", "PATCH");

  const res = await fetch(`${API_BASE}/students/${id}`, {
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
      message: data.message || "Failed to update student.",
      errors: data.errors,
    };
  }

  updateTag("students-list");
  return { success: true, message: data.message, data };
}

// =======================
// 🔹 Delete Student
// =======================
export interface MutationResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | string>;
  code?: number;
}

export async function deleteStudent(id: number): Promise<MutationResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    return { success: false, message: "Unauthorized", code: 401 };
  }

  const res = await fetch(`${API_BASE}/students/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json().catch(async () => ({ message: await res.text() }));
  if (!res.ok) {
    return { success: false, message: data.message || "Failed to delete student", code: res.status };
  }
  updateTag("students-list");
  return { success: true, message: data.message || "Student deleted successfully" };
}