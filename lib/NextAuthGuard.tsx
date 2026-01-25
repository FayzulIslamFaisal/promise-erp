
import { ReactNode } from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { fetchMyPermissions } from "@/apiServices/auth/permissionService";


interface AuthGuardProps {
  children: ReactNode
  requiredPermissions?: string[]
}

export default async function NextAuthGuard({
  children,
  requiredPermissions = [],
}: AuthGuardProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user || !session?.accessToken) {
    redirect("/login")
  }

  let freshPermissions: string[] = [];

  try {
    const response = await fetchMyPermissions(session.accessToken);
    if (response?.data?.permissions) {
      freshPermissions = response.data.permissions;
    }
  } catch (error) {
    console.error("NextAuthGuard Permission Fetch Error:", error);
    redirect("/login");
  }

  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every((perm) =>
      freshPermissions.includes(perm)
    )

    if (!hasAllPermissions) {
      redirect("/unauthorized")
    }
  }

  return <>{children}</>
}

