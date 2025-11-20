"use server"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1"

export interface Chapter {
    id: number;
    title: string;
    bn_title: string;
}

export interface ChapterResponse {
  success: boolean
  message: string
  data: {
    chapters: Chapter[]
  }
}

// Get chapters
export async function getChapters(): Promise<ChapterResponse> {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken

  if (!token) {
    throw new Error("No valid session or access token found.")
  }

  const res = await fetch(`${API_BASE}/chapters`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(`Message: ${errorData.message || "Unknown error"}`)
  }

  return res.json()
}
