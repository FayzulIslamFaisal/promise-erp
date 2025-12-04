import NextAuthGuard from "@/lib/NextAuthGuard"
import { Suspense } from "react"

export default function DistrictsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-4">
      <Suspense fallback={null}>
        <NextAuthGuard
          allowedRoles={['super-admin', 'admin', 'manager', 'teacher', 'student']}
          requiredPermissions={['view-courses', 'create-courses', 'edit-courses', 'create-categories', 'edit-categories', 'view-categories', 'view-enrollments', 'view-reports', 'manage-enrollments']}>
          {children}
        </NextAuthGuard>
      </Suspense>
    </div>
  )
}
