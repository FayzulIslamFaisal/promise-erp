"use server";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
import { Pagination } from "./courseService";
import { toast } from "sonner";

// ---Start Interfaces home page hero section ---
export interface HeroSection {
  id: number;
  branch?: Branch;
  title: string;
  subtitle: string;
  description?: string;
  button_text_one?: string | null;
  button_link_one?: string | null;
  button_text_two?: string | null;
  button_link_two?: string | null;
  background_image?: string | null;
  video_url?: string | null;
  status?: number;
}

export interface HeroSectionResponse {
  success: boolean;
  message: string;
  code: number;
  data: HeroSection;
  errors?: Record<string, string[]>;
}
// ---End Interfaces home page hero section ---

// ---Start Interfaces home page CountDown ---
export interface SingleCountDown {
  id: number;
  title: string;
  count: number;
  image: string | null;
  status: number;
}

export interface StatsData {
  branch?: Branch;
  stats: SingleCountDown[];
}

export interface CountDownResponse {
  success: boolean;
  message: string;
  code: number;
  data: StatsData;
  errors?: Record<string, string[]>;
}
// End Interfaces home page CountDown ---

//Start Interfaces home page branch section ---
export interface Branch {
  id: number;
  name: string;
  address?: string | null;
  phone?: string[] | null;
  email?: string[] | null;
}

export interface BranchList {
  total_branches: number;
  branches: Branch[];
  pagination: Pagination;
}

export interface BranchApiResponse {
  success: boolean;
  message: string;
  code: number;
  data: BranchList;
  errors?: Record<string, string[]>;
}
//End Interfaces home page branch section ---

// Start Interfaces home page Teachers section ---
export interface Teacher {
  id: number;
  name: string;
  designation: string;
  experience: string;
  profile_image?: string | null;
  courses: string;
  branch_id: number;
}

export interface TeacherList {
  total_teachers: number;
  teachers: Teacher[] | null;
  pagination: Pagination;
}

export interface TeacherApiResponse {
  success: boolean;
  message: string;
  code: number;
  data: TeacherList;
  errors?: Record<string, string[]>;
}
// End Interfaces home page Teachers section ---

// start Interfaces home page Reviews section ---
export interface Review {
  id: number;
  profile_image?: string | null;
  name: string;
  course_title: string;
  rating: number;
  feedback: string;
}

export interface ReviewList {
  total_reviews: number;
  reviews: Review[] | null;
  pagination: Pagination;
}

export interface ReviewApiResponse {
  success: boolean;
  message: string;
  code: number;
  data: ReviewList;
  errors?: Record<string, string[]>;
}
// End Interfaces home page Reviews section ---

//Start Home Newsletter Subscription --
export interface NewsletterData {
  id: number;
  email: string;
  subscribed_at: string;
}
export interface NewsletterApiResponse {
  success: boolean;
  message: string;
  code: number;
  data?: NewsletterData;
  errors?: Record<string, string[]>;
}
//End Home Newsletter Subscription --

//Start Home page affiliate Partner section get API --
export interface PartnerItem {
  id: number;
  title: string;
  image: string;
  status: number;
  partner_type: number;
}

export interface PartnersResponseData {
  affiliate: PartnerItem[];
  concern: PartnerItem[];
  client: PartnerItem[];
}

export interface PartnersApiResponse {
  success: boolean;
  message: string;
  code: number;
  data?: PartnersResponseData;
  errors?: Record<string, string[]>;
}

//End Home page affiliate Partner section get API --

//End Home page CompanyServiceItem section get API --
export interface ServiceItem {
  id: number;
  title: string;
  sub_title: string;
  logo_image: string;
}
export interface ServicesResponseData {
  total_services: number;
  services: ServiceItem[];
  pagination: Pagination;
}

export interface ServicesApiResponse {
  success: boolean;
  message: string;
  code: number;
  data?: ServicesResponseData;
  errors?: Record<string, string[]>;
}
//End Home page CompanyServiceItem section get API --

//End Home page CompanyServiceItem section get API --
export interface SuccessStoryItem {
  id: number;
  youtube_link: string;
  thumbnail_image: string;
  type: number;
  status: number;
}
export interface SuccessStoryData {
  total_video_galleries: number;
  video_galleries: SuccessStoryItem[];
  pagination: Pagination;
}

export interface SuccessStoryApiResponse {
  success: boolean;
  message: string;
  code: number;
  data: SuccessStoryData;
  errors?: Record<string, string[]>;
}
//End Home page CompanyServiceItem section get API --

// Home Hero section get API
export async function getLatestHeroSection(): Promise<HeroSectionResponse> {
  try {
    const res = await fetch(`${API_BASE}/public/hero-section/latest`);

    if (!res.ok) {
      throw new Error(
        `Home Hero section API failed — HTTP ${res.status} (${res.statusText})`
      );
    }

    const data: HeroSectionResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Hero Section API Error:", error);
    throw new Error("Error fetching hero section");
  }
}

// Home page CountDown get API

export async function getLatestCountDown(): Promise<CountDownResponse> {
  try {
    const res = await fetch(`${API_BASE}/public/stats/latest`);

    if (!res.ok) {
      throw new Error(`Countdown API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Latest Countdown Fetch Error:", error);
    throw new Error("Error fetching countdown");
  }
}
// Home page Branches get API
export async function fetchAllBranches({
  page = 1,
  params = {},
}: {
  page?: number;
  params?: Record<string, unknown>;
}): Promise<BranchApiResponse | null> {
  try {
    const urlParams = new URLSearchParams({
      page: page.toString(),
    });

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlParams.append(key, String(value));
      }
    });

    const queryString = urlParams.toString();
    const res = await fetch(`${API_BASE}/public/our-branches?${queryString}`);

    if (!res.ok) {
      console.error(
        `fetchAllBranches API error: ${res.status} ${res.statusText}`
      );
      toast.error("Error fetching branches");
      return null;
    }

    const data: BranchApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching branches:", error);
    toast.error("Error fetching branches");
    return null;
  }
}
// Home page Teachers get API

export async function fetchAllPublicTeachers({
  page = 1,
  params = {},
}: {
  page?: number;
  params?: Record<string, unknown>;
}): Promise<TeacherApiResponse | null> {
  try {
    const urlParams = new URLSearchParams({
      page: page.toString(),
    });

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlParams.append(key, String(value));
      }
    });

    const queryString = urlParams.toString();
    const res = await fetch(`${API_BASE}/public/teachers-list?${queryString}`);

    if (!res.ok) {
      console.error(
        `fetchAllTeachers API error: ${res.status} ${res.statusText}`
      );
      toast.error("Error fetching teachers");
      return null;
    }

    const data: TeacherApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    toast.error("Error fetching teachers");
    return null;
  }
}

// Home page Reviews get API
export async function fetchPublicFeaturedReviews({
  page = 1,
  params = {},
}: {
  page?: number;
  params?: Record<string, unknown>;
}): Promise<ReviewApiResponse | null> {
  try {
    const urlParams = new URLSearchParams({
      page: page.toString(),
    });

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlParams.append(key, String(value));
      }
    });

    const queryString = urlParams.toString();
    const res = await fetch(
      `${API_BASE}/public/reviews-featured?${queryString}`
    );

    if (!res.ok) {
      console.error(
        `fetchPublicFeaturedReviews API error: ${res.status} ${res.statusText}`
      );
      toast.error("Error fetching featured reviews");
      return null;
    }

    const data: ReviewApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching featured reviews:", error);
    toast.error("Error fetching featured reviews");
    return null;
  }
}

// Home Newsletter Subscription
export async function SubscribeToNewsletter(
  email: string
): Promise<NewsletterApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/public/newsletter-subscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:  JSON.stringify({ email }),
    });

    const data: NewsletterApiResponse = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.errors?.email?.[0] || data.message || "Subscription failed",
        code: data.code || res.status,
      };
    }

    return data;
  } catch (error) {
    console.error("Newsletter error:", error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
      code: 500,
    };
  }
}

// Home page affiliate Partner section get API --
export async function fetchHomeAffiliatePartners(): Promise<PartnersApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/public/partners`);

    if (!res.ok) {
      throw new Error(`Partners API error: ${res.status} ${res.statusText}`);
    }

    const data:PartnersApiResponse = (await res.json());
    return data;

  } catch (error) {
    console.error("Partners Fetch Error:", error);
    throw new Error("Error fetching partners data");
  }
}

// Home page Services section get API
export async function fetchPublicCompanyServices({
  params = {},
}: {
  params?: Record<string, unknown>;
}): Promise<ServicesApiResponse | null> {
  try {
    const urlParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlParams.append(key, String(value));
      }
    });

    const queryString = urlParams.toString();

    const res = await fetch(
      `${API_BASE}/public/company-services?${queryString}`
    );

    if (!res.ok) {
      console.error(
        `fetchPublicCompanyServices API error: ${res.status} ${res.statusText}`
      );
      toast.error("Error fetching company services");
      return null;
    }

    const data: ServicesApiResponse = await res.json();
    return data;

  } catch (error) {
    console.error("Error fetching company services:", error);
    toast.error("Error fetching company services");
    return null;
  }
}


export async function fetchPublicVideoGalleries({
  params = {},
}: {
  params?: Record<string, unknown>;
}): Promise<SuccessStoryApiResponse | null> {
  try {
    const urlParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlParams.append(key, String(value));
      }
    });
    const queryString = urlParams.toString();

    const res = await fetch(
      `${API_BASE}/public/video-galleries?${queryString}`
    );

    if (!res.ok) {
      console.error(
        `fetchPublicVideoGalleries API error: ${res.status} ${res.statusText}`
      );
      toast.error("Error fetching video galleries");
      return null;
    }

    const data: SuccessStoryApiResponse = await res.json();
    return data;

  } catch (error) {
    console.error("Error fetching video galleries:", error);
    toast.error("Error fetching video galleries");
    return null;
  }
}

