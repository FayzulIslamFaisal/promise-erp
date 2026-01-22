// import NextAuthGuard from "@/lib/NextAuthGuard";
import { Suspense } from "react";

export default function DivisionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-4">
      <Suspense fallback={null}>
        {/* <NextAuthGuard
          allowedRoles={[
            "super-admin",
            "admin",
            "manager",
            "teacher",
            "student",
          ]}
          requiredPermissions={[
            "view-dashboard",
            "view-reports",
            "export-reports",
            "view-users",
            "create-users",
            "edit-users",
            "delete-users",
            "view-courses",
            "manage-courses",
            "view-certificates",
            "revoke-certificates",
            "view-enrollments",
            "manage-enrollments",
            "view-finance",
            "manage-finance",
            "view-organizations",
            "manage-organizations",
            "manage-student-earnings",
            "manage-settings",
            "manage-certificates",
            "manage-coupons",
            "manage-reviews",
            "manage-attendances",
            "manage-skills",
            "manage-project-questions",
            "manage-batches",
            "manage-groups",
            "manage-free-seminars",
            "view-roles",
            "manage-roles",
            "view-logs",
          ]}
        > */}
          {children}
        {/* </NextAuthGuard> */}
      </Suspense>
    </div>
  );
}
