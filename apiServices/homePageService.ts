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
}
// End Interfaces home page Reviews section ---





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
    const res = await fetch(`${API_BASE}/public/reviews-featured?${queryString}`);
    
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
