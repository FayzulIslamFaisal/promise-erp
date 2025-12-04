"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cacheTag, updateTag } from "next/cache";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

// =======================
// Interfaces
// =======================

export interface Faq {
  id: number;
  question: string;
  answer: string;
  status: number;
}

export interface FaqPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  has_more_pages: boolean;
}

export interface FaqsResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    total_faq_sections: number;
    faq_sections: Faq[];
    pagination: FaqPagination;
  };
  errors?: Record<string, string[]>;
}

export interface SingleFaqResponse {
  success: boolean;
  message: string;
  code: number;
  data?: Faq | null;
  errors?: Record<string, string[]>;
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
        urlParams.append(key, params[key]!.toString());
      }
    }

    const res = await fetch(`${API_BASE}/faq-sections?${urlParams.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data: FaqsResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    throw new Error("Failed to fetch FAQs");
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

  return await getFaqsCached(token, params);
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
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  } catch (error) {
    console.error("Error fetching FAQ by ID:", error);
    throw new Error("Failed to fetch FAQ");
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
    if (!token) return { success: false, message: "No token found", code: 401 };

    const res = await fetch(`${API_BASE}/faq-sections`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data: SingleFaqResponse = await res.json().catch(async () => ({ message: await res.text() }));
    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to create FAQ",
        errors: data.errors,
        code: res.status,
      };
    }

    updateTag("faqs-list");
    return data;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Failed to create FAQ", code: 500 };
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
    if (!token) return { success: false, message: "No token found", code: 401 };

    const res = await fetch(`${API_BASE}/faq-sections/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const data: SingleFaqResponse = await res.json().catch(async () => ({ message: await res.text() }));
    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to update FAQ",
        errors: data.errors,
        code: res.status,
      }
    }

    updateTag("faqs-list");
    return data;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Failed to update FAQ", code: 500 };
  }
}

// =======================
// DELETE FAQ
// =======================

export async function deleteFaq(id: number): Promise<SingleFaqResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) return { success: false, message: "No token found", code: 401 };

    const res = await fetch(`${API_BASE}/faq-sections/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data: SingleFaqResponse = await res.json().catch(async () => ({ message: await res.text() }));

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to delete FAQ",
        code: res.status,
      };
    }

    updateTag("faqs-list");
    return data;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Failed to delete FAQ", code: 500 };
  }
}
