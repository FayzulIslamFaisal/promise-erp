import RolesWrapper from "@/components/access-control/RolesWrapper";
import NextAuthGuardWrapper from "@/components/auth/NextAuthGuardWrapper";

export default function RolesPage() {
  return (
    <NextAuthGuardWrapper requiredPermissions={["view-roles"]}>
      <RolesWrapper />
    </NextAuthGuardWrapper>
  );
}

