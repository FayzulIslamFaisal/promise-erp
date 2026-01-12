"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cacheTag, updateTag } from "next/cache";
import { handleApiError, processApiResponse } from "@/lib/apiErrorHandler";
import { PaginationType } from "@/types/pagination";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

// ============================================================
// Interfaces 
// ============================================================

export interface Branch {
  id: number;
  name: string;
}

export interface HeroSection {
  id: number;
  branch: Branch;
  title: string;
  subtitle: string;
  description?: string;
  button_text_one?: string;
  button_link_one?: string;
  button_text_two?: string;
  button_link_two?: string;
  background_image?: string | null;
  video_url?: string | null;
  status: number;
}

export interface HeroSectionsResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    total_hero_sections: number;
    hero_sections: HeroSection[];
    pagination: PaginationType;
  };
  errors?: Record<string, string[]>;
}

export interface SingleHeroSectionResponse {
  success: boolean;
  message: string;
  code?: number;
  data?: HeroSection | null;
  errors?: Record<string, string[] | string>;
}

export interface CreateHeroSectionRequest {
  branch_id: number;
  title: string;
  subtitle: string;
  description?: string;
  button_text_one?: string;
  button_link_one?: string;
  button_text_two?: string;
  button_link_two?: string;
  background_image?: File | null;
  video_url?: string | null;
  status: number;
}

export interface UpdateHeroSectionRequest extends Partial<CreateHeroSectionRequest> {
  _method?: string;
}

// ============================================================
// GET Hero Sections (Paginated)
// ============================================================

export async function getHeroSectionsCached(
  token: string,
  params: Record<string, unknown> = {}
): Promise<HeroSectionsResponse> {
  "use cache";
  cacheTag("hero-sections-list");

  try {
    const urlParams = new URLSearchParams();

    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        urlParams.append(key, params[key]!.toString());
      }
    }

    const res = await fetch(
      `${API_BASE}/hero-sections?${urlParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data: HeroSectionsResponse = await res.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error occurred while fetching Hero Sections"
    );
  }
}

export async function getHeroSections(
  params: Record<string, unknown> = {}
): Promise<HeroSectionsResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    return await getHeroSectionsCached( token, params);
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to get Hero Sections"
    );
  }
}

// ============================================================
// GET Hero Section by ID
// ============================================================

export async function getHeroSectionById(
  id: number
): Promise<SingleHeroSectionResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    const res = await fetch(`${API_BASE}/hero-sections/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data: SingleHeroSectionResponse = await res.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error occurred while fetching Hero Section by ID"
    );
  }
}

// ============================================================
// CREATE Hero Section
// ============================================================

export async function createHeroSection(
  formData: FormData
): Promise<SingleHeroSectionResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token)
      return {
        success: false,
        message: "No valid session or access token found.",
        code: 401,
      };

    const url = `${API_BASE}/hero-sections`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await processApiResponse(
      response,
      "Failed to create hero section"
    );

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        errors: result.errors,
        code: result.code,
      };
    }

    updateTag("hero-sections-list");

    return {
      success: true,
      message: result.message || "Hero section created successfully",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    const errorResult = await handleApiError(
      error,
      "Failed to create hero section"
    );
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// ============================================================
// UPDATE Hero Section
// ============================================================

export async function updateHeroSection(
  id: number,
  formData: FormData
): Promise<SingleHeroSectionResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token)
      return {
        success: false,
        message: "No valid session or access token found.",
        code: 401,
      };

    formData.append("_method", "PATCH");

    const res = await fetch(`${API_BASE}/hero-sections/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await processApiResponse(
      res,
      "Failed to update hero section"
    );

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        errors: result.errors,
        code: result.code,
      };
    }

    updateTag("hero-sections-list");

    return {
      success: true,
      message: result.message || "Hero section updated successfully",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    const errorResult = await handleApiError(
      error,
      "Failed to update hero section"
    );
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// ============================================================
// DELETE Hero Section
// ============================================================

export async function deleteHeroSection(
  id: number
): Promise<SingleHeroSectionResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token)
      return {
        success: false,
        message: "No valid session or access token found.",
        code: 401,
      };

    const res = await fetch(`${API_BASE}/hero-sections/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await processApiResponse(
      res,
      "Failed to delete hero section"
    );

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        code: result.code,
      };
    }

    updateTag("hero-sections-list");

    return {
      success: true,
      message: result.message || "Hero section deleted successfully",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    const errorResult = await handleApiError(
      error,
      "Failed to delete hero section"
    );
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// ============================================================
// PUBLIC API for Home Page (Hero Section)
// ============================================================

export async function getHomeHeroSections(): Promise<HeroSectionsResponse> {
  "use cache";
  cacheTag("public-hero-sections");

  try {
    const res = await fetch(`${API_BASE}/public/hero-sections`);

    if (!res.ok) {
      throw new Error(
        `Home Hero Sections API failed: ${res.status} ${res.statusText}`
      );
    }

    return await res.json();
  } catch (error) {
    throw new Error("Error fetching home hero sections");
  }
}
//video gallery service ts file started here

// ============================================================
// Interfaces 
// ============================================================ 
export interface VideoGallery {
  id: number;
  youtube_link: string;
  thumbnail_image?: string | null;
  type: number;
  status: number;
}
export interface VideoGalleriesResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    total_video_galleries: number;
    video_galleries: VideoGallery[];
    pagination: PaginationType;
  };
  errors?: Record<string, string[]>;
}
export interface SingleVideoGalleryResponse {
  success: boolean;
  message: string;
  code?: number;
  data?: VideoGallery | null;
  errors?: Record<string, string[] | string>;
}
// ============================================================
// GET Video Galleries (Paginated)
// ============================================================

export async function getVideoGalleriesCached(
  page = 1,
  token: string,
  params: Record<string, unknown> = {}
): Promise<VideoGalleriesResponse> {
  "use cache";
  cacheTag("video-galleries-list");

  try {
    const urlParams = new URLSearchParams();
    urlParams.append("page", page.toString());

    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        urlParams.append(key, params[key]!.toString());
      }
    }

    const res = await fetch(
      `${API_BASE}/video-galleries?${urlParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data: VideoGalleriesResponse = await res.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error occurred while fetching Video Galleries"
    );
  }
}

export async function getVideoGalleries(
  page = 1,
  params: Record<string, unknown> = {}
): Promise<VideoGalleriesResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    return await getVideoGalleriesCached(page, token, params);
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to get Video Galleries"
    );
  }
}

//GET VIDEO GALLERY by ID

export async function getVideoGalleryById(id: number): Promise<SingleVideoGalleryResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    const res = await fetch(`${API_BASE}/video-galleries/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data: SingleVideoGalleryResponse = await res.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to get Video Gallery"
    );
  }
}
// ============================================================
//create video gallery
// ============================================================
export async function createVideoGallery(formData: FormData): Promise<SingleVideoGalleryResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token)
      return {
        success: false,
        message: "No valid session or access token found.",
        code: 401,
      };
    const url = `${API_BASE}/video-galleries`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const result = await processApiResponse(
      response,
      "Failed to create video gallery"
    );
    if (!result.success) {
      return {
        success: false,
        message: result.message,
        errors: result.errors,
        code: result.code,
      };
    }
    updateTag("video-galleries-list");
    return {
      success: true,
      message: result.message || "Video gallery created successfully",
      data: result.data,
      code: result.code,
    };
  }
  catch (error) {
    const errorResult = await handleApiError(
      error,
      "Failed to create video gallery"
    );
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}
// ============================================================
// UPDATE Video Gallery
// ============================================================
export async function updateVideoGallery(
  id: number,
  formData: FormData
): Promise<SingleVideoGalleryResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token)
      return {
        success: false,
        message: "No valid session or access token found.",
        code: 401,
      };
    formData.append("_method", "PATCH");
    const res = await fetch(`${API_BASE}/video-galleries/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const result = await processApiResponse(
      res,
      "Failed to update video gallery"
    );
    if (!result.success) {
      return {
        success: false,
        message: result.message,
        errors: result.errors,
        code: result.code,
      };
    }
    updateTag("video-galleries-list");
    return {
      success: true,
      message: result.message || "Video gallery updated successfully",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    const errorResult = await handleApiError(
      error,
      "Failed to update video gallery"
    );
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}

// ============================================================ 
// DELETE Video Gallery
// ============================================================
export async function deleteVideoGallery(
  id: number
): Promise<SingleVideoGalleryResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token)
      return {
        success: false,
        message: "No valid session or access token found.",
        code: 401,
      };
    const res = await fetch(`${API_BASE}/video-galleries/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await processApiResponse(
      res,
      "Failed to delete video gallery"
    );
    if (!result.success) {
      return {
        success: false,
        message: result.message,
        code: result.code,
      };
    }
    updateTag("video-galleries-list");
    return {
      success: true,
      message: result.message || "Video gallery deleted successfully",
      data: result.data,
      code: result.code,
    };
  } catch (error) {
    const errorResult = await handleApiError(
      error,
      "Failed to delete video gallery"
    );
    return {
      success: false,
      message: errorResult.message,
      code: errorResult.code,
    };
  }
}
// ============================================================
// PUBLIC API for Home Page (Video Galleries)
// ============================================================
export async function getHomeVideoGalleries(): Promise<VideoGalleriesResponse> {
  "use cache";
  cacheTag("public-video-galleries");
  try {
    const res = await fetch(`${API_BASE}/public/video-galleries`);
    if (!res.ok) {
      throw new Error(
        `Home Video Galleries API failed: ${res.status} ${res.statusText}`
      );
    }
    return await res.json();
  } catch (error) {
    throw new Error("Error fetching home video galleries");
  }
}
//video gallery service ts file ended here
