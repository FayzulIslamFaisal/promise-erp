"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { fetchMyPermissions } from "@/apiServices/auth/permissionService";

export function usePermission() {
    const { data: session, status } = useSession();
    const [permissions, setPermissions] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();

    const isLoadingSession = status === "loading";

    useEffect(() => {
        // add useTransition
        startTransition(async () => {
            try {
                if (status === "authenticated" && session?.accessToken) {
                    const permissions = await fetchMyPermissions(session.accessToken);
                    setPermissions(permissions?.data?.permissions ?? []);
                }
            } catch (error) {
                console.error("Failed to fetch permissions", error);
            }
        });
    }, [status, session?.accessToken]);

    // Combined loading state
    const loading = isLoadingSession || (status === "authenticated" && isPending);

    const hasPermission = (requiredPermission: string | string[]) => {
        if (loading) return false;
        if (!permissions || permissions.length === 0) return false;
        if (Array.isArray(requiredPermission)) {
            return requiredPermission.every((perm) => permissions.includes(perm));
        }

        return permissions.includes(requiredPermission);
    };

    const hasAnyPermission = (requiredPermissions: string[]) => {
        if (loading) return false;
        if (!permissions || permissions.length === 0) return false;
        return requiredPermissions.some((perm) => permissions.includes(perm));
    }

    return {
        loading,
        permissions,
        hasPermission,
        hasAnyPermission
    };
}
