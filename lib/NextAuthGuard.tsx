// app/(protected)/NextAuthGuard.tsx
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { fetchMyPermissions } from "@/apiServices/auth/permissionService";

interface AuthGuardProps {
  children: ReactNode;
  requiredPermissions?: string[];
}

export default async function NextAuthGuard({
  children,
  requiredPermissions = [],
}: AuthGuardProps) {
  // "use cache";
  const session = await getServerSession(authOptions);

  // not logged in
  if (!session?.user || !session?.accessToken) {
    redirect("/login");
  }

  // get permissions (cached)
  let perms: string[] = [];
  try {
    const { data } = await fetchMyPermissions(session.accessToken);
    perms = data?.permissions ?? [];
  } catch (error) {
    console.error("Guard fetch error:", error);
    redirect("/login");
  }

  // check required
  if (
    requiredPermissions.length > 0 &&
    !requiredPermissions.every((p) => perms.includes(p))
  ) {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
