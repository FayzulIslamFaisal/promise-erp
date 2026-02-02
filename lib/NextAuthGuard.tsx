// app/(protected)/NextAuthGuard.tsx
import { ReactNode } from "react";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { fetchMyPermissions } from "@/apiServices/auth/permissionService";

import { Session } from "next-auth";

interface AuthGuardProps {
  children: ReactNode;
  requiredPermissions?: string[];
}

const getAuthenticatedAppData = async (): Promise<{
  session: Session | null;
  permissions: string[];
  error: string | null;
}> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !session?.accessToken) {
      return { session: null, permissions: [], error: null };
    }

    // Pass session permissions if available, otherwise fetch
    const { data } = await fetchMyPermissions(session.accessToken);
    return {
      session,
      permissions: data?.permissions ?? [],
      error: null
    };
  } catch (error) {
    console.error("Guard fetch error:", error);
    return {
      session: null,
      permissions: [],
      error: "Failed to fetch permissions"
    };
  }
};

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
