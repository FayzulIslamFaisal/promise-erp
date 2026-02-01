// app/(protected)/NextAuthGuard.tsx
import { ReactNode, cache } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { fetchMyPermissions } from "@/apiServices/auth/permissionService";

import { Session } from "next-auth";

interface AuthGuardProps {
  children: ReactNode;
  requiredPermissions?: string[];
}

/**
 * Cached function to fetch session and permissions once per request.
 * This prevents multiple API calls if NextAuthGuard is used multiple times in a single page.
 */
const getAuthenticatedAppData = cache(async (): Promise<{
  session: Session | null;
  permissions: string[];
  error: string | null;
}> => {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session?.accessToken) {
    return { session: null, permissions: [], error: null };
  }

  try {
    // You can also use session.user.permissions if they are already up to date
    const { data } = await fetchMyPermissions(session.accessToken);
    return {
      session,
      permissions: data?.permissions ?? [],
      error: null
    };
  } catch (error) {
    console.error("Guard fetch error:", error);
    return {
      session,
      permissions: [],
      error: "Failed to fetch permissions"
    };
  }
});

export default async function NextAuthGuard({
  children,
  requiredPermissions = [],
}: AuthGuardProps) {
  const { session, permissions, error } = await getAuthenticatedAppData();

  // Redirect if not logged in
  if (!session) {
    redirect("/login");
  }

  // Redirect if there was an error fetching permissions
  if (error) {
    redirect("/login");
  }

  // check required permissions
  if (
    requiredPermissions.length > 0 &&
    !requiredPermissions.every((p) => permissions.includes(p))
  ) {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
