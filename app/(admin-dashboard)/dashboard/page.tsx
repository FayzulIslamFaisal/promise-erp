import NextAuthGuardWrapper from "@/components/auth/NextAuthGuardWrapper"

const DashboardPage = () => {
  return (
    <NextAuthGuardWrapper requiredPermissions={["view-dashboard"]}>
      <div className=" flex items-center justify-center">
        <div className="text-center">
          <h1>Dashboard Page</h1>
        </div>
      </div>
    </NextAuthGuardWrapper>
  )
}

export default DashboardPage
