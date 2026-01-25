"use client";

import { usePermissionContext } from "@/providers/PermissionProvider";

export function usePermission() {
    const { permissions, loading } = usePermissionContext();

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
