// apiServices/studentDashboardService.ts
"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {  PaginationType } from "./studentService";
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export interface StDashboardCards {
  total_enrolled_courses: number;
  running_courses: number;
  completed_courses: number;
  total_due_payment: number;
  due_in_courses: number;
  this_month_earning_bdt: number;
  this_month_earning_usd: number;
  earning_percentage: number;
  earning_change: "increase" | "decrease";
}
export interface StClassAttendance {
  course_title: string;
  classes_attended: number;
  total_classes: number;
  classes_completed: number;
  attendance_percentage: number;
  completion_percentage: number;
}
export interface StUpcomingClass {
  course_title: string;
  lesson_title: string;
  batch_name: string;
  schedule_date: string; // ISO date
  schedule_time: string;
  venue: string;
}
export interface StDuePaymentItem {
  course_title: string;
  amount: number;
  due_date: string;
}

export interface StDuePayments {
  total_due: number;
  payments: StDuePaymentItem[];
}
export interface StudentDashboardData {
  cards: StDashboardCards;
  class_attendance: StClassAttendance[];
  upcoming_classes: StUpcomingClass[];
  due_payments: StDuePayments;
}
export interface StudentDashboardResponse {
  success: boolean;
  message: string;
  code: number;
  data: StudentDashboardData;
  errors?: Record<string, string[]>;
}

// get student dashboard
export async function getStudentDashboard(
  accessToken: string
): Promise<StudentDashboardResponse> {
  try {
    const res = await fetch(`${API_BASE}/student-dashboard`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch student dashboard ${res.status} (${res.statusText}`
      );
    }

    const data: StudentDashboardResponse = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Student Dashboard API Error:", error.message);
      throw new Error("Error fetching student dashboard");
    }
    throw new Error("Unknown error occurred while fetching student dashboard");
  }
}
//End Student Dashboard

// Start Free Seminars
export interface FreeSeminar {
  id: number;
  title: string;
  slug: string;
  seminar_type: number; // 0 | 1
  seminar_date: string; // YYYY-MM-DD
  seminar_time: string; // HH:mm:ss
  seminar_time_formatted: string; // HH:mm
  image?: string | null;
}

export interface FreeSeminarsData {
  total_free_seminars: number;
  free_seminars: FreeSeminar[];
  pagination: PaginationType;
}

export interface FreeSeminarsApiResponse {
  success: boolean;
  message: string;
  code: number;
  data: FreeSeminarsData;
}

// Get Free Seminars
export async function getFreeSeminars({
  params = {},
}: {
  params?: Record<string, unknown>;
}): Promise<FreeSeminarsApiResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("Unauthorized: Access token not found");
  }

  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      urlParams.append(key, String(value));
    }
  });

  const queryString = urlParams.toString();
  try {
    const res = await fetch(
      `${API_BASE}/student-panel/free-seminars?${queryString}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `get FreeSeminars API Error: ${res.status} ${res.statusText}`
      );
    }

    const data: FreeSeminarsApiResponse = await res.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("fetchFreeSeminars Error:", error.message);
      throw error;
    }

    throw new Error("Unknown error occurred while fetching free seminars");
  }
}
// End Free Seminars

// Start get Upcoming Courses
export interface CourseBatch {
  id: number;
  name: string;
  price: number;
  start_date: string; // YYYY-MM-DD
  days_to_go: number;
  available_seats: number;
}
export interface UpcomingCourse {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  ratings: number;
  batch: CourseBatch;
}
export interface CourseCategory {
  id: number;
  name: string;
  slug: string;
  image: string | null;
}
export interface UpcomingCoursesData {
  categories: CourseCategory[];
  courses: UpcomingCourse[];
  pagination: PaginationType;
}
export interface UpcomingCoursesApiResponse {
  success: boolean;
  message: string;
  code: number;
  data: UpcomingCoursesData;
}

export async function getUpcomingCourses({
  params = {},
}: {
  params?: Record<string, unknown>;
}): Promise<UpcomingCoursesApiResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("Unauthorized: Access token not found");
  }
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      urlParams.append(key, String(value));
    }
  });
  const queryString = urlParams.toString();
  try {
    const res = await fetch(
      `${API_BASE}/student-panel/upcoming-courses?${queryString}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `UpcomingCourses API Error: ${res.status} ${res.statusText}`
      );
    }

    const data: UpcomingCoursesApiResponse = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("getUpcomingCourses Error:", error.message);
      throw error;
    }
    throw new Error("Unknown error occurred while fetching upcoming courses");
  }
}

// End get Upcoming Courses

// Start get Earning State
export type EarningChangeType = "increase" | "decrease";
export interface EarningCards {
  total_usd_earning: number;
  usd_earning_change: EarningChangeType;
  usd_earning_percentage: number;

  total_bdt_earning: number;
  bdt_earning_change: EarningChangeType;
  bdt_earning_percentage: number;

  this_month_earning_usd: number;
  this_month_earning_bdt: number;
  earning_percentage: number;
}
export interface StEarningStateResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    earning_cards: EarningCards;
  };
}

export async function getStudentEarningState(): Promise<StEarningStateResponse> {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  if (!accessToken) {
    throw new Error("Unauthorized: No access token found");
  }
  try {
    const res = await fetch(`${API_BASE}/student-earnings/earning-cards`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch earning cards ${res.status} (${res.statusText})`
      );
    }

    const data: StEarningStateResponse = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("getUpcomingCourses Error:", error.message);
      throw error;
    }
    throw new Error("Unknown error occurred while fetching upcoming courses");
  }
}

// End get Earning State

// Start get Earning Usd Charts

export interface EarningsChartItem {
  month: string;
  earning: number;
}

export interface EarningsChartData {
  currency: "USD" | "BDT";
  total: number;
  chart_data: EarningsChartItem[];
}

export interface EarningsChartApiResponse {
  success: boolean;
  message: string;
  code: number;
  data: EarningsChartData;
}

export async function getStudentEarningUsdChart(): Promise<EarningsChartApiResponse> {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  if (!accessToken) {
    throw new Error("Unauthorized: No access token found");
  }
  try {
    const res = await fetch(`${API_BASE}/student-earnings/usd-chart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch USD chart ${res.status} (${res.statusText})`
      );
    }

    const data: EarningsChartApiResponse = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("getUpcomingCourses Error:", error.message);
      throw error;
    }
    throw new Error("Unknown error occurred while fetching upcoming courses");
  }
}
// End get Earning Usd Charts

// Start get Earning Bdt Charts
export async function getStudentEarningBdtChart(): Promise<EarningsChartApiResponse> {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  if (!accessToken) {
    throw new Error("Unauthorized: No access token found");
  }
  try {
    const res = await fetch(`${API_BASE}/student-earnings/bdt-chart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch BDT chart ${res.status} (${res.statusText})`
      );
    }

    const data: EarningsChartApiResponse = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("getUpcomingCourses Error:", error.message);
      throw error;
    }
    throw new Error("Unknown error occurred while fetching upcoming courses");
  }
}
// End get Earning Bdt Charts

// get Student Earning List
export interface StudentEarningItem {
  id: number;
  marketplace_name: string;
  payment_method: string;
  job_title: string;
  amount_bdt: number;
  amount_usd: number;
  earning_images: string[];
  earned_at: string; // "YYYY-MM-DD HH:mm:ss"
  status: number; // 0 | 1
}
export interface StudentEarningsData {
  total_earnings: number;
  earnings: StudentEarningItem[];
  pagination: PaginationType;
}

export interface StudentEarningsApiResponse {
  success: boolean;
  message: string;
  code: number;
  data: StudentEarningsData;
}
export async function getStudentEarningList({
  params = {},
}: {
  params?: Record<string, unknown>;
}): Promise<StudentEarningsApiResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  if (!token) {
    throw new Error("Unauthorized: Access token not found");
  }
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      urlParams.append(key, String(value));
    }
  });

  const queryString = urlParams.toString();
  try {
    const res = await fetch(`${API_BASE}/student-earnings?${queryString}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(
        `StudentEarnings API Error: ${res.status} ${res.statusText}`
      );
    }

    const data: StudentEarningsApiResponse = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("getStudentEarnings Error:", error.message);
      throw error;
    }

    throw new Error("Unknown error occurred while fetching student earnings");
  }
}
// End get Student Earning List

// start delete student earning
export interface DeleteStudentEarningResponse {
  success: boolean;
  message: string;
  code: number;
  data?: null;
}

export async function deleteStudentEarning(
  id: number
): Promise<DeleteStudentEarningResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  if (!token) {
    throw new Error("Unauthorized: Access token not found");
  }

  try {
    const response = await fetch(`${API_BASE}/student-earnings/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete student earning ${response.status} (${response.statusText})`
      );
    }

    const data: DeleteStudentEarningResponse = await response.json();
    return data;
  } catch (error: unknown) {
    console.error("deleteStudentEarning Error:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(
        "An unknown error occurred while deleting student earning"
      );
    }
  }
}
// end delete student earning

// Start get Student Payment Histories
export interface PaymentDetails {
  id: number;
  title: string | null;
  image?: string | null;
  price: number | null;
  installment_type: string;
  paid_amount: number;
  payment_date: string;
  due: number;
  status: string;
}

export interface PaymentHistoryItem {
  payment_details: PaymentDetails;
}
export interface PaymentHistoryItemData {
  payment_histories: PaymentHistoryItem[];
  pagination: PaginationType;
}

export interface StudentPaymentHistoryApiResponse {
  success: boolean;
  message: string;
  code: number;
  data: PaymentHistoryItemData;
  errors?: Record<string, string[]>;
}

export async function getStudentPaymentHistories({
  params = {},
}: {
  params?: Record<string, unknown>;
}): Promise<StudentPaymentHistoryApiResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("Unauthorized: Access token not found");
  }

  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      urlParams.append(key, String(value));
    }
  });

  const queryString = urlParams.toString();
  try {
    const res = await fetch(
      `${API_BASE}/student-panel/payment-histories?${queryString}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `PaymentHistories API Error: ${res.status} ${res.statusText}`
      );
    }

    const data: StudentPaymentHistoryApiResponse = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("getStudentPaymentHistories Error:", error.message);
      throw error;
    }
    throw new Error("Unknown error occurred while fetching payment histories");
  }
}
// End get Student Payment Histories

// Start get Course Wise Due Payments
export interface CourseWiseDuePayment {
  id: number;
  course_title: string;
  course_image?: string | null;
  price: number;
  total_paid: number;
  due_amount: number;
}
export interface CourseWiseDuePaymentData {
  due_payments: CourseWiseDuePayment[];
}
export interface CourseWiseDuePaymentsApiResponse {
  success: boolean;
  message: string;
  code: number;
  data: CourseWiseDuePaymentData;
  errors?: Record<string, string[]>;
}

export async function getCourseWiseDuePayments(): Promise<CourseWiseDuePaymentsApiResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("Unauthorized: Access token not found");
  }
  try {
    const res = await fetch(
      `${API_BASE}/student-panel/course-wise-due-payments`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `CourseWiseDuePayments API Error: ${res.status} ${res.statusText}`
      );
    }

    const data: CourseWiseDuePaymentsApiResponse = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("getCourseWiseDuePayments Error:", error.message);
      throw error;
    }

    throw new Error(
      "Unknown error occurred while fetching course-wise due payments"
    );
  }
}
// End get Course Wise Due Payments

// Start get Student My Courses
export interface StudentCourseInfo {
  id: number;
  title: string;
  slug: string;
  featured_image?: string | null;
  ratings: number;
}
export interface StudentCoursesBatch {
  id: number;
  name: string;
}
export interface StudentMyCourse {
  id: number;
  status: "Pending" | "Active" | "Completed" | string;
  payment_status: number;
  total_completed_lessons: string;
  total_lessons: number;
  progress_percentage: number;
  progress_text: string;
  batch: StudentCoursesBatch;
  course: StudentCourseInfo;
}
export interface StudentMyCoursesData {
  courses: StudentMyCourse[];
  pagination: PaginationType;
}
export interface StudentMyCoursesResponse {
  success: boolean;
  message: string;
  code: number;
  data: StudentMyCoursesData;
  errors?: Record<string, string[]>;
}

export async function getStudentMyCourses({
  params = {},
}: {
  params?: Record<string, unknown>;
}): Promise<StudentMyCoursesResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("Unauthorized: Access token not found");
  }
  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      urlParams.append(key, String(value));
    }
  });

  const queryString = urlParams.toString();
  try {
    const res = await fetch(
      `${API_BASE}/student-panel/my-courses?${queryString}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `MyCoursesResponse API Error: ${res.status} ${res.statusText}`
      );
    }

    const data: StudentMyCoursesResponse = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("getStudentMyCourses Error:", error.message);
      throw error;
    }
    throw new Error("Unknown error occurred while fetching student my courses");
  }
}

// End get Student My Courses

// Start get Free Seminar by Slug
export interface FreeSeminar {
  id: number;
  title: string;
  slug: string;
  about: string;
  class_topic: string;
  seminar_type: number;
  seminar_type_text: string;
  description: string;
  location: string;
  seminar_date: string;
  seminar_time: string;
  seminar_time_formatted: string;
  seminar_link: string | null;
  image?: string | null;
  branch: SeminarBranch;
  instructors: Instructor[];
}
export interface SeminarBranch {
  id: number;
  name: string;
}
export interface Instructor {
  id: number;
  name: string;
  email: string;
  designation: string;
  experience: string;
  profile_image?: string | null;
  instructors_tools: InstructorTool[];
}
export interface InstructorTool {
  id: number;
  image?: string | null;
}
export interface FreeSeminarBySlugResponse {
  success: boolean;
  message: string;
  code: number;
  data: FreeSeminar;
}
export async function getFreeSeminarBySlug(
  slug: string
): Promise<FreeSeminarBySlugResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("Unauthorized: Access token not found");
  }

  try {
    const response = await fetch(
      `${API_BASE}/student-panel/free-seminars/${slug}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch free seminar (${response.status} ${response.statusText})`
      );
    }

    const data: FreeSeminarBySlugResponse = await response.json();
    return data;
  } catch (error: unknown) {
    console.error("getFreeSeminarBySlug Error:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred while fetching free seminar");
  }
}
