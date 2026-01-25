"use client";

import { usePermission } from "@/hooks/usePermission";
import { ReactNode } from "react";

interface PermissionGuardProps {
    children: ReactNode;
    requiredPermission: string | string[];
    fallback?: ReactNode;
}

export default function PermissionGuard({
    children,
    requiredPermission,
    fallback = null,
}: PermissionGuardProps) {
    const { hasPermission, loading } = usePermission();

    if (loading) {
        return null;
    }

    if (hasPermission(requiredPermission)) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
}
