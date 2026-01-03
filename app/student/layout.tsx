
import HeaderContent, { NavLink } from "@/components/common/HeaderContent";
import { StudentSidebar } from "@/components/student-dashboard/StudentSidebar";
import {
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const studentNavLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/course", hasDropdown: true },
    { name: "Instructors", href: "/instructors" },
    { name: "Branch", href: "/branch" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <SidebarHeader className="w-full border-b bg-background py-3 px-4 z-50 sticky top-0">
          <HeaderContent navLinks={studentNavLinks} />
      </SidebarHeader>
      <SidebarProvider>
        <StudentSidebar />
        <SidebarInset>
          <div className="w-full">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
