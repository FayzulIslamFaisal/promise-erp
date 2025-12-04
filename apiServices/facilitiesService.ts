"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cacheTag, updateTag } from "next/cache";

// Base API URL
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

// ==============================
// Interfaces
// ==============================

export interface Facility {
  id: number;
  uuid: string;
  title: string;
  status: number;
  image: string | null;
}

export interface FacilityPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  has_more_pages: boolean;
}

export interface FacilityListResponse {
  data: {
    total_facilities: number;
    facilities: Facility[];
    pagination: FacilityPagination;
  };
}

export interface SingleFacilityResponse {
  facility?: Facility;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface FacilityFormData {
  title: string;
  image?: File | null;
  status: number;
}

// ==============================
// VALIDATE USER SESSION
// ==============================

async function requireSessionToken() {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("No valid access token found");
  }

  return token;
}

// ==============================
// GET Facilities (cached)
// ==============================

export async function getFacilitiesCached(
  token: string,
  params: Record<string, unknown> = {}
): Promise<FacilityListResponse> {
  "use cache";
  cacheTag("facilities-list");

  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      urlParams.append(key, String(value));
    }
  });

  const res = await fetch(
    `${API_BASE}/course-facilities?${urlParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );


  if (!res.ok) {
    throw new Error("Failed to fetch facilities");
  }

  return await res.json();
}

export async function getFacilities(
  params: Record<string, unknown> = {}
) {
  const token = await requireSessionToken();
  return await getFacilitiesCached(token, params);
}

// ==============================
// GET Facility by ID
// ==============================

export async function getFacilityById(
  id: number
): Promise<SingleFacilityResponse> {
  const token = await requireSessionToken();

  const res = await fetch(`${API_BASE}/course-facilities/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch facility");
  }

  return await res.json();
}

// ==============================
// CREATE Facility
// ==============================

export async function createFacility(
  data: FacilityFormData
): Promise<SingleFacilityResponse> {
  const token = await requireSessionToken();

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("status", String(data.status));

  if (data.image instanceof File) {
    formData.append("image", data.image);
  }

  const res = await fetch(`${API_BASE}/course-facilities`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const responseData = await res.json();

  if (!res.ok) {
    return {
      message: responseData.message || "Failed to create facility",
      errors: responseData.errors,
    };
  }

  updateTag("facilities-list");

  return responseData;
}

// ==============================
// UPDATE Facility
// ==============================

export async function updateFacility(
  id: number,
  data: FacilityFormData
): Promise<SingleFacilityResponse> {
  const token = await requireSessionToken();

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("status", String(data.status));

  if (data.image instanceof File) {
    formData.append("image", data.image);
  }

  formData.append("_method", "PUT");

  const res = await fetch(`${API_BASE}/course-facilities/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const responseData = await res.json();

  if (!res.ok) {
    return {
      message: responseData.message || "Failed to update facility",
      errors: responseData.errors,
    };
  }

  updateTag("facilities-list");

  return responseData;
}

// ==============================
// DELETE Facility
// ==============================

export async function deleteFacility(
  id: number
): Promise<SingleFacilityResponse> {
  const token = await requireSessionToken();

  const res = await fetch(`${API_BASE}/course-facilities/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = await res.json();

  if (!res.ok) {
    return {
      message: responseData.message || "Failed to delete facility",
    };
  }

  updateTag("facilities-list");

  return responseData;
}
