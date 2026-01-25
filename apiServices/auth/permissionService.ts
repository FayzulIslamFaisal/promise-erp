export interface PermissionResponse {
    success: boolean;
    message: string;
    code: number;
    data: {
        user: {
            id: number;
            name: string;
            email: string;
        };
        roles: string[];
        permissions: string[];
        total_permissions: number;
    };
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export async function fetchMyPermissions(token: string): Promise<PermissionResponse> {
    try {
        const res = await fetch(`${API_BASE}/my-permissions`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store", // Ensure we always get fresh data
        });

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        const result: PermissionResponse = await res.json();
        return result;
    } catch (error) {
        console.error("fetchMyPermissions Error:", error);
        throw error;
    }
}
