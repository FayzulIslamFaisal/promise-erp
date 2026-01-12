"use server"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { cacheTag, updateTag } from "next/cache"
import { handleApiError, processApiResponse } from "@/lib/apiErrorHandler"
import { PaginationType } from "@/types/pagination"

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
  data?: Student;
  code?: number;
}

// add student
export async function addStudent(
  formData: FormData
): Promise<StudentResponseType> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      return {
        success: false,
        message: "No valid session or access token found.",
        code: 401,
      };
    }

    const res = await fetch(`${API_BASE}/students`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await processApiResponse(res, "Failed to add student.");

    if (!result.success) {
      return result;
    }

    updateTag("students-list");
    return {
      success: true,
      message: result.message || "Student added successfully.",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    return await handleApiError(error, "Failed to add student.");
  }
}

// Get students
export async function getStudentsCached(
token: string,
  params: Record<string, unknown> = {}
): Promise<StudentResponse> {
  "use cache"
  cacheTag("students-list")

  const urlParams = new URLSearchParams()
 

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
  params: Record<string, unknown> = {}
): Promise<StudentResponse> {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken

  if (!token) {
    throw new Error("No valid session or access token found.")
  }
  return getStudentsCached(token, params)
}

export interface StudentSingleResponse {
  success: boolean
  message: string
  data: Student
}

// =======================
// Get Student By ID
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
// Update Student
// =======================

export async function updateStudent(
  id: string,
  formData: FormData
): Promise<StudentResponseType> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      return {
        success: false,
        message: "No valid session or access token found.",
        code: 401,
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

    const result = await processApiResponse(res, "Failed to update student.");

    if (!result.success) {
      return result;
    }

    updateTag("students-list");
    return {
      success: true,
      message: result.message || "Student updated successfully.",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    return await handleApiError(error, "Failed to update student.");
  }
}

// =======================
//  Delete Student
// =======================
export interface MutationResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | string>;
  code?: number;
}

export async function deleteStudent(id: number): Promise<MutationResponse> {
  try {
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

    const result = await processApiResponse(res, "Failed to delete student");
    
    if (!result.success) {
      return { success: false, message: result.message, code: result.code };
    }
    
    updateTag("students-list");
    return { success: true, message: result.message || "Student deleted successfully", code: result.code };
  } catch (error) {
    const errorResult = await handleApiError(error, "Failed to delete student");
    return { success: false, message: errorResult.message, code: errorResult.code };
  }
}