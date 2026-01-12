"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cacheTag, updateTag } from "next/cache";
import { PaginationType } from "@/types/pagination";
import { processApiResponse, handleApiError } from "@/lib/apiErrorHandler";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

// =======================
// Interfaces
// =======================

export interface Faq {
  id: number;
  question: string;
  answer: string;
  status: number;
}

export interface FaqsResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    total_faq_sections: number;
    faq_sections: Faq[];
    pagination: PaginationType;
  };
  errors?: Record<string, string[]>;
}

export interface SingleFaqResponse {
  success: boolean;
  message?: string;
  code?: number;
  data?: Faq | null;
  errors?: Record<string, string[] | string>;
}

// =======================
// GET FAQS (CACHED)
// =======================

export async function getFaqsCached(
  token: string,
  params: Record<string, unknown> = {}
): Promise<FaqsResponse> {
  "use cache";
  cacheTag("faqs-list");

  try {
    const urlParams = new URLSearchParams();
    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        urlParams.append(key, String(params[key]));
      }
    }

    const res = await fetch(
      `${API_BASE}/faq-sections?${urlParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Status: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error fetching faqs");
    }
  }
}

// =======================
// GET FAQS WRAPPER
// =======================

export async function getFaqs(
  params: Record<string, unknown> = {}
): Promise<FaqsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) throw new Error("No valid session/token");

  return getFaqsCached(token, params);
}

// =======================
// GET SINGLE FAQ
// =======================

export async function getFaqById(id: number): Promise<SingleFaqResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) throw new Error("No valid session/token");

    const res = await fetch(`${API_BASE}/faq-sections/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Status: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error: unknown) {
    console.error("Error in getFaqById:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch FAQ");
    } else {
      throw new Error("Failed to fetch FAQ");
    }
  }
}

// =======================
// CREATE FAQ
// =======================

export interface FaqFormData {
  question: string;
  answer: string;
  status: number;
}

export async function createFaq(
  formData: FaqFormData
): Promise<SingleFaqResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      return { success: false, message: "No token found", code: 401 };
    }

    const res = await fetch(`${API_BASE}/faq-sections`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await processApiResponse<Faq>(res, "Failed to create FAQ");

    updateTag("faqs-list");
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message, code: 500 };
    } else {
      return { success: false, message: "Failed to create FAQ", code: 500 };
    }
  }
}

// =======================
// UPDATE FAQ
// =======================

export interface FaqUpdateFormData {
  question: string;
  answer: string;
  status: number;
}

export async function updateFaq(
  id: number,
  updateData: FaqUpdateFormData
): Promise<SingleFaqResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      return { success: false, message: "No token found", code: 401 };
    }

    const res = await fetch(`${API_BASE}/faq-sections/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const result = await processApiResponse<Faq>(res, "Failed to update FAQ");

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        errors: result.errors,
        code: result.code,
      };
    }

    updateTag("faqs-list");
    return {
      success: true,
      message: result.message || "FAQ updated successfully",
      data: result.data,
      code: result.code,
    };
  } catch (error: unknown) {
    return await handleApiError(error, "Failed to update FAQ");
  }
}

// =======================
// DELETE FAQ
// =======================

export async function deleteFaq(id: number): Promise<SingleFaqResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      return { success: false, message: "No token found", code: 401 };
    }

    const res = await fetch(`${API_BASE}/faq-sections/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await processApiResponse(res, "Failed to delete FAQ");

    updateTag("faqs-list");
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message, code: 500 };
    } else {
      return { success: false, message: "Failed to delete FAQ", code: 500 };
    }
  }
}
