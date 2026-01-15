"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cacheTag, updateTag } from "next/cache";
import { processApiResponse } from "@/lib/apiErrorHandler";
import { PaginationType } from "@/types/pagination";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

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
  description: string;
  button_text_one: string;
  button_link_one: string;
  button_text_two: string;
  button_link_two: string;
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in getHeroSectionsCached:", error.message);
      throw new Error("Error fetching hero sections");
    } else {
      throw new Error("Error fetching hero sections");
    }
  }
}

export async function getHeroSections(
  params: Record<string, unknown> = {}
): Promise<HeroSectionsResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    return await getHeroSectionsCached(token, params);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in getHeroSections:", error.message);
      throw new Error("Error fetching hero sections");
    } else {
      throw new Error("Error fetching hero sections");
    }
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in getHeroSectionById:", error.message);
      throw new Error("Error fetching hero section");
    } else {
      throw new Error("Error fetching hero section");
    }
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
    if (!token) throw new Error("No valid session or access token found.");

    const url = `${API_BASE}/hero-sections`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();
    updateTag("hero-sections-list");

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in createHeroSection:", error.message);
      throw new Error("Error creating hero section");
    } else {
      throw new Error("Error creating hero section");
    }
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
    if (!token) throw new Error("No valid session or access token found.");

    formData.append("_method", "PUT");

    const res = await fetch(`${API_BASE}/hero-sections/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();

    updateTag("hero-sections-list");

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in updateHeroSection:", error.message);
      throw new Error("Error updating hero section");
    } else {
      throw new Error("Error updating hero section");
    }
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
    if (!token) throw new Error("No valid session or access token found.");

    const res = await fetch(`${API_BASE}/hero-sections/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    updateTag("hero-sections-list");

    return result;
  } catch (error: unknown) {
    console.error("Error in deleteHeroSection:", error);
    if (error instanceof Error) {
      throw new Error("Error deleting hero section");
    } else {
      throw new Error("Error deleting hero section");
    }
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
  token: string,
  params: Record<string, unknown> = {}
): Promise<VideoGalleriesResponse> {
  "use cache";
  cacheTag("public-reviews");

  try {
    const urlParams = new URLSearchParams();

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
  } catch (error: unknown) {
    console.error("Error in getVideoGalleriesCached:", error);
    if (error instanceof Error) {
      throw new Error("Error fetching video galleries");
    } else {
      throw new Error("Error fetching video galleries");
    }
  }
}

export async function getVideoGalleries(
  params: Record<string, unknown> = {}
): Promise<VideoGalleriesResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    return await getVideoGalleriesCached(token, params);
  } catch (error: unknown) {
    console.error("Error in getVideoGalleries:", error);
    if (error instanceof Error) {
      throw new Error("Error fetching video galleries");
    } else {
      throw new Error("Error fetching video galleries");
    }
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
  } catch (error: unknown) {
    console.error("Error in getVideoGalleryById:", error);
    if (error instanceof Error) {
      throw new Error("Error fetching video gallery");
    } else {
      throw new Error("Error fetching video gallery");
    }
  }
}
// ============================================================
//create video gallery
// ============================================================
export async function createVideoGallery(formData: FormData): Promise<SingleVideoGalleryResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    const url = `${API_BASE}/video-galleries`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();
  
    updateTag("public-reviews");
    return result;
  } catch (error: unknown) {
    console.error("Error in createVideoGallery:", error);
    if (error instanceof Error) {
      throw new Error("Error creating video gallery");
    } else {
      throw new Error("Error creating video gallery");
    }
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
    if (!token) throw new Error("No valid session or access token found.");

    formData.append("_method", "PUT");
    const res = await fetch(`${API_BASE}/video-galleries/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();
    
    updateTag("public-reviews");

    return result;
  } catch (error: unknown) {
    console.error("Error in updateVideoGallery:", error);
    if (error instanceof Error) {
      throw new Error("Error updating video gallery");
    } else {
      throw new Error("Error updating video gallery");
    }
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
    if (!token) throw new Error("No valid session or access token found.");

    const res = await fetch(`${API_BASE}/video-galleries/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();

    updateTag("public-reviews");
    return result;
  } catch (error: unknown) {
    console.error("Error in deleteVideoGallery:", error);
    if (error instanceof Error) {
      throw new Error("Error deleting video gallery");
    } else {
      throw new Error("Error deleting video gallery");
    }
  }
}

//video gallery service ts file ended here

//common sections service ts file started here

// ============================================================
// Interfaces 
// ============================================================

export interface CommonSection {
  id: number;
  title: string;
  sub_title: string;
  type: string;
  description: string | null;
  image?: string | null;
  video_link?: string | null;
  button_text_one?: string | null;
  button_link_one?: string | null;
  button_text_two?: string | null;
  button_link_two?: string | null;
  status: number;
}

export interface CommonSectionsResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    total_sections: number;
    sections: CommonSection[];
    pagination: PaginationType;
  };
  errors?: Record<string, string[]>;
}

export interface SingleCommonSectionResponse {
  success: boolean;
  message: string;
  code: number;
  data?: CommonSection | null;
  errors?: Record<string, string[] | string>;
}

// ============================================================
// GET Common Sections (Paginated)
// ============================================================

export async function getCommonSectionsCached(
  token: string,
  params: Record<string, unknown> = {}
): Promise<CommonSectionsResponse> {
  "use cache";
  cacheTag("common-sections-list");

  try {
    const urlParams = new URLSearchParams();

    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        urlParams.append(key, params[key]!.toString());
      }
    }

    const res = await fetch(
      `${API_BASE}/sections?${urlParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch common sections: ${res.status} ${res.statusText}`);
    }

    const data: CommonSectionsResponse = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in getCommonSectionsCached:", error.message);
      throw new Error("Error fetching common sections");
    } else {
      throw new Error("Error fetching common sections");
    }
  }
}

export async function getCommonSections(
  params: Record<string, unknown> = {}
): Promise<CommonSectionsResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    return await getCommonSectionsCached(token, params);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in getCommonSections:", error.message);
      throw new Error("Error fetching common sections");
    } else {
      throw new Error("Error fetching common sections");
    }
  }
}

// ============================================================
// GET Common Section by ID
// ============================================================

export async function getCommonSectionById(
  id: number
): Promise<SingleCommonSectionResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    const res = await fetch(`${API_BASE}/sections/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch common section: ${res.status} ${res.statusText}`);
    }

    const data: SingleCommonSectionResponse = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in getCommonSectionById:", error.message);
      throw new Error("Error fetching common section");
    } else {
      throw new Error("Error fetching common section");
    }
  }
}

// ============================================================
// CREATE Common Section
// ============================================================

export async function createCommonSection(
  formData: FormData
): Promise<SingleCommonSectionResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    const url = `${API_BASE}/sections`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    updateTag("common-sections-list");
    updateTag("categories-list");
    updateTag("public-services");
    updateTag("public-govt-course");
    updateTag("public-opportunity");
    updateTag("public-teachers");
    updateTag("public-video-galleries");
    updateTag("public-blog");
    updateTag("public-reviews");
    updateTag("public-news-feeds");
    updateTag("affiliates-clients");
    updateTag("public-branches");

    return result
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in createCommonSection:", error.message);
      throw new Error(error.message);
    } else {
      throw new Error("Error creating common section");
    }
  }
}

// ============================================================
// UPDATE Common Section
// ============================================================

export async function updateCommonSection(
  id: number,
  formData: FormData
): Promise<SingleCommonSectionResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    formData.append("_method", "PUT");

    const res = await fetch(`${API_BASE}/sections/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();

    updateTag("common-sections-list");
    updateTag("categories-list");
    updateTag("public-services");
    updateTag("public-govt-course");
    updateTag("public-opportunity");
    updateTag("public-teachers");
    updateTag("public-video-galleries");
    updateTag("public-blog");
    updateTag("public-reviews");
    updateTag("public-news-feeds");
    updateTag("affiliates-clients");
    updateTag("public-branches");

    return result
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in updateCommonSection:", error.message);
      throw new Error(error.message);
    } else {
      throw new Error("Error updating common section");
    }
  }
}

// ============================================================
// DELETE Common Section
// ============================================================

export async function deleteCommonSection(
  id: number
): Promise<SingleCommonSectionResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    const res = await fetch(`${API_BASE}/sections/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();


    updateTag("categories-list");
    updateTag("public-services");
    updateTag("public-govt-course");
    updateTag("public-opportunity");
    updateTag("public-teachers");
    updateTag("public-video-galleries");
    updateTag("public-blog");
    updateTag("public-reviews");
    updateTag("public-news-feeds");
    updateTag("affiliates-clients");
    updateTag("public-branches");

    return result
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in deleteCommonSection:", error.message);
      throw new Error(error.message);
    } else {
      throw new Error("Error deleting common section");
    }
  }
}

//common sections service ts file ended here

//Opportunities service ts file started here

// ============================================================
// Interfaces 
// ============================================================

export interface Opportunity {
  id: number;
  title: string;
  sub_title: string;
  image?: string | null;
  status: number;
}

export interface OpportunitiesResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    total_opportunities: number;
    opportunities: Opportunity[];
    pagination: PaginationType;
  };
  errors?: Record<string, string[]>;
}

export interface SingleOpportunityResponse {
  success: boolean;
  message: string;
  code: number;
  data?: Opportunity | null;
  errors?: Record<string, string[] | string>;
}

// ============================================================
// GET Opportunities (Paginated)
// ============================================================

export async function getOpportunitiesCached(
  token: string,
  params: Record<string, unknown> = {}
): Promise<OpportunitiesResponse> {
  "use cache";
  cacheTag("opportunities-list");

  try {
    const urlParams = new URLSearchParams();

    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        urlParams.append(key, params[key]!.toString());
      }
    }

    const res = await fetch(
      `${API_BASE}/opportunities?${urlParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch opportunities: ${res.status} ${res.statusText}`);
    }

    const data: OpportunitiesResponse = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in getOpportunitiesCached:", error.message);
      throw new Error("Error fetching opportunities");
    } else {
      throw new Error("Error fetching opportunities");
    }
  }
}

export async function getOpportunities(
  params: Record<string, unknown> = {}
): Promise<OpportunitiesResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    return await getOpportunitiesCached(token, params);
  } catch (error: unknown) {
    console.error("Error in getOpportunities:", error);
    if (error instanceof Error) {
      throw new Error("Error fetching opportunities");
    } else {
      throw new Error("Error fetching opportunities");
    }
  }
}

// ============================================================
// GET Opportunity by ID
// ============================================================

export async function getOpportunityById(
  id: number
): Promise<SingleOpportunityResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    const res = await fetch(`${API_BASE}/opportunities/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch opportunity: ${res.status} ${res.statusText}`);
    }

    const data: SingleOpportunityResponse = await res.json();
    
    return data;
  } catch (error: unknown) {
    console.error("Error in getOpportunityById:", error);
    if (error instanceof Error) {
      throw new Error("Error fetching opportunity");
    } else {
      throw new Error("Error fetching opportunity");
    }
  }
}

// ============================================================
// CREATE Opportunity
// ============================================================

export async function createOpportunity(
  formData: FormData
): Promise<SingleOpportunityResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    const url = `${API_BASE}/opportunities`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    updateTag("opportunities-list");
    updateTag("public-opportunity");

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in createOpportunity:", error.message);
      throw new Error(error.message);
    } else {
      throw new Error("Error creating opportunity");
    }
  }
}

// ============================================================
// UPDATE Opportunity
// ============================================================

export async function updateOpportunity(
  id: number,
  formData: FormData
): Promise<SingleOpportunityResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    formData.append("_method", "PUT");

    const res = await fetch(`${API_BASE}/opportunities/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();

    updateTag("opportunities-list");
    updateTag("public-opportunity");

    return result;
  } catch (error: unknown) {
    console.error("Error in updateOpportunity:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error updating opportunity");
    }
  }
}

// ============================================================
// DELETE Opportunity
// ============================================================

export async function deleteOpportunity(
  id: number
): Promise<SingleOpportunityResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    if (!token) throw new Error("No valid session or access token found.");

    const res = await fetch(`${API_BASE}/opportunities/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    updateTag("opportunities-list");
    updateTag("public-opportunity");

    return result;
  } catch (error: unknown) {
    console.error("Error in deleteOpportunity:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error deleting opportunity");
    }
  }
}

//Opportunities service ts file ended here