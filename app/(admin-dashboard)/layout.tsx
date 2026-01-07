import { Suspense } from "react"
import { SidebarProvider, SidebarTrigger, SidebarInset, } from "@/components/ui/sidebar"
import AppSidebar from "@/components/admin/AppSidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const session = await getServerSession(authOptions)

  if (!session?.user || !session?.accessToken) {
    redirect("/login")
  }

  const userRole = session?.user?.roles ?? null
  const adminRoles = ["super-admin", "admin", "manager"]
  
  // Check if role is array or string
  const roles = Array.isArray(userRole) ? userRole : userRole ? [userRole] : []
  const isAdmin = roles.some(role => adminRoles.includes(role))

  if (!isAdmin) {
    redirect("/")
  }

  return (
    <SidebarProvider>
      <Suspense fallback={<div className="w-64 h-screen bg-muted animate-pulse" />}>
        <AppSidebar />
      </Suspense>
      <main className="w-full">
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="">{children}</div>
        </SidebarInset>
      </main>
    </SidebarProvider>
  )
}