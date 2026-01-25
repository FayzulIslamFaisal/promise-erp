"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { useSession } from "next-auth/react";
import { fetchMyPermissions } from "@/apiServices/auth/permissionService";

interface PermissionContextType {
    permissions: string[];
    loading: boolean;
    refreshPermissions: () => Promise<void>;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export function PermissionProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();

    const [permissions, setPermissions] = useState<string[]>([]);

    const fetchPermissions = async () => {
        if (!session?.accessToken) return;
        try {
            const { data } = await fetchMyPermissions(session.accessToken);
            setPermissions(data?.permissions ?? []);
        } catch (error) {
            console.error("fetchPermissions Error:", error);
            setPermissions([]);
        }
    };

    useEffect(() => {
        if (status === "authenticated" && session?.accessToken) {
            fetchPermissions();
        }

        if (status === "unauthenticated") {
            setPermissions([]);
        }
    }, [status, session?.accessToken]);

    const loading = status === "loading"

    return (
        <PermissionContext.Provider value={{ permissions, loading, refreshPermissions: fetchPermissions }}>
            {children}
        </PermissionContext.Provider>
    );
}

export function usePermissionContext() {
    const context = useContext(PermissionContext);
    if (context === undefined) {
        throw new Error("usePermissionContext must be used within a PermissionProvider");
    }
    return context;
}
