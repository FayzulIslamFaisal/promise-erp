// lib/NextAuthGuard.tsx
// "use client"

// import { useSession } from "next-auth/react"
// import { useRouter } from "next/navigation"
// import { useEffect, ReactNode } from "react"

// interface AuthGuardProps {
//   children: ReactNode
//   allowedRoles?: string[]
//   requiredPermissions?: string[]
// }

// const NextAuthGuard = ({ children, allowedRoles = [], requiredPermissions = [] }: AuthGuardProps) => {
//   const { data: session, status } = useSession()
//   const router = useRouter()

//   useEffect(() => {
//     if (status === "loading") return

//     if (!session?.accessToken) {
//       router.replace("/login")
//       return
//     }

//     const userRole = session?.user?.roles ?? null
//     const userPermissions = session?.user?.permissions || []

//     if (allowedRoles.length > 0 && (!userRole || !allowedRoles.includes(userRole))) {
//       router.replace("/unauthorized")
//       return
//     }

//     if (requiredPermissions.length > 0) {
//       const hasAllPermissions = requiredPermissions.every((perm) => userPermissions.includes(perm))
//       if (!hasAllPermissions) {
//         router.replace("/unauthorized")
//         return
//       }
//     }
//   }, [status, session?.accessToken, session?.user?.roles, session?.user?.permissions, router, allowedRoles, requiredPermissions])

//   if (status === "loading") return null
//   if (!session?.accessToken) return null

//   return <>{children}</>
// }

// export default NextAuthGuard

// lib/NextAuthGuard.tsx
import { ReactNode } from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { unstable_noStore as noStore } from "next/cache"


interface AuthGuardProps {
  children: ReactNode
  allowedRoles?: string[]
  requiredPermissions?: string[]
}

export default async function NextAuthGuard({
  children,
  allowedRoles = [],
  requiredPermissions = [],
}: AuthGuardProps) {
  // Opt out of component caching so getServerSession runs per-request
  noStore();
  const session = await getServerSession(authOptions)

  if (!session?.user || !session?.accessToken) {
    redirect("/login")
  }

  const userRole = session?.user?.roles ?? null
  const userPermissions = session?.user?.permissions ?? []

  if (allowedRoles.length > 0 && (!userRole || !allowedRoles.includes(userRole))) {
    redirect("/unauthorized")
  }

  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every((perm) =>
      userPermissions.includes(perm)
    )
    if (!hasAllPermissions) {
      redirect("/unauthorized")
    }
  }

  return <>{children}</>
}

