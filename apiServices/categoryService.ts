"use server"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { cacheTag } from 'next/cache'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1"

export interface Category {
  id: number;
  name: string;
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  data: {
    categories: Category[];
  };
}

async function getCategoriesCached(token: string): Promise<CategoryResponse> {
  "use cache"
  cacheTag("categories-list")

  const res = await fetch(`${API_BASE}/course-categories`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  // if (!res.ok) {
  //   throw new Error(`Failed to fetch categories: ${res.statusText}`)
  // }

  return res.json()
}

export async function getCategories(): Promise<CategoryResponse> {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken
  if (!token) throw new Error("No valid session or access token found.")

  return getCategoriesCached(token)
}
