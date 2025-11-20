"use server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cacheTag, updateTag } from "next/cache";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
// Division type
export interface Division {
  id: number;
  name: string;
}

// District type (updated)
export interface District {
  id: number;
  division_id: number;
  name: string;
  division: Division;
  branches: Branch[];
}

// Pagination type
export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  has_more_pages: boolean;
}

// Main data object
export interface DistrictData {
  total_districts: number;
  districts: District[];
  pagination: Pagination;
}

// API Response type
export interface DistrictResponse {
  success: boolean;
  message: string;
  code: number;
  data: DistrictData;
}
// Division type
export interface Branch {
  id: number;
  name: string;
}

// =======================
//  Get District By ID
// =======================

export interface DistrictSingleResponse {
  success: boolean;
  message: string;
  data: District;
}

// =======================
//  Get Districts (Paginated)
// =======================

export async function getDistrictsCached(
  page = 1,
  token: string,
  params: Record<string, unknown> = {}
): Promise<DistrictResponse> {
  "use cache";
  cacheTag("districts-list");

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

    const res = await fetch(`${API_BASE}/districts?${urlParams.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    return await res.json();
  } catch (error) {
    console.error("Error in getDivisionsCached:", error);
    throw new Error( error.message || "Unknown error occurred while fetching districts"
    );
  }
}

export async function getDistricts(
  page = 1,
  params: Record<string, unknown> = {}
): Promise<DistrictResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      throw new Error("No valid session or access token found.");
    }

    return await getDistrictsCached(page, token, params);
  } catch (error) {
    console.error("Error in get districts:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to get districts"
    );
  }
}

// =======================
//  Add Division
// =======================

export interface AddDistrictApiResponse {
  success: boolean;
  message: string;
  code: number;
  data?: District;
  errors?: Record<string, string[]>;
}
export interface DistrictFormData {
  name: string;
  division_id: number;
}

export async function addDistrict(
  districtData: DistrictFormData
): Promise<AddDistrictApiResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      return {
        success: false,
        message: "No valid session or access token found.",
        errors: {},
        code: 401,
      };
    }
    const response = await fetch(`${API_BASE}/districts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(districtData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to add district.",
        errors: data.errors,
        code: response.status,
      };
    }

    updateTag("districts-list");

    return data;
  } catch (error: unknown) {
    console.error("Error adding district:", error);
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message || "An unexpected error occurred.",
        code: 500,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred.",
      code: 500,
    };
  }
}

// =======================
// Delete Division
// =======================

export interface DeleteDistrictResponse {
  success: boolean;
  message: string;
  code?: number;
  data?: unknown;
}

export async function deleteDistrict(
  id: number
): Promise<DeleteDistrictResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      throw new Error("Unauthorized");
    }

    const res = await fetch(`${API_BASE}/districts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    updateTag("districts-list");
    return result;
  } catch (error) {
    console.error("Error in districts:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete districts"
    );
  }
}
// =======================
//  Get District By ID
// =======================
export async function getDistrictById(
  id: string
): Promise<DistrictSingleResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    const res = await fetch(`${API_BASE}/districts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch district: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error in getDistrictById:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error occurred while fetching district"
    );
  }
}

// =======================
//  Update District
// =======================

export async function updateDistrict(
  id: string,
  districtData: DistrictFormData
): Promise<AddDistrictApiResponse> {
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

    const res = await fetch(`${API_BASE}/districts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(districtData),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to update district.",
        errors: data.errors,
        code: res.status,
      };
    }

    updateTag("districts-list");
    return data;
  } catch (error: unknown) {
    console.error("Error updating district:", error);
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message || "An unexpected error occurred.",
        code: 500,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred.",
      code: 500,
    };
  }
}
