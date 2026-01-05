"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import NavStudentDashboard from "./NavStudentDashboard";
import {
  LayoutDashboard,
  BookOpen,
  Settings,
  Award,
  CreditCard,
  Bell,
  Clock,
  GraduationCap,
  DollarSign,
  Calendar,
  LogOut,
} from "lucide-react";
import Image from "next/image";

import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

const studentNavItems = [
  {
    title: "Dashboard",
    url: "/student/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "My Courses",
    url: "/student/mycourses",
    icon: BookOpen,
    isActive: false,
  },
  {
    title: "Free Classes",
    url: "/student/freeclass",
    icon: GraduationCap,
    isActive: false,
  },
  {
    title: "Upcoming Courses",
    url: "/student/upcomingcourses",
    icon: Calendar,
    isActive: false,
  },
  {
    title: "My Earnings",
    url: "/student/myearnings",
    icon: DollarSign,
    isActive: false,
  },
  {
    title: "Certificates",
    url: "/student/certificate",
    icon: Award,
    isActive: false,
  },
  {
    title: "Due Payments",
    url: "/student/duepayment",
    icon: CreditCard,
    isActive: false,
  },
  {
    title: "Payment History",
    url: "/student/paymenthistory",
    icon: Clock,
    isActive: false,
  },
  {
    title: "Notifications",
    url: "/student/notifications",
    icon: Bell,
    isActive: false,
  },
  {
    title: "Settings",
    url: "/student/settings",
    icon: Settings,
    isActive: false,
  },
];

export function StudentSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/" className="p-2">
          <Image src="/images/logo.svg" alt="Logo" width={200} height={36} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavStudentDashboard items={studentNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2">
          <Image
            src="/avatar.png"
            alt="avatar"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium">John Doe</span>
          <Button variant="outline" size="icon">
            <LogOut
              className="w-4 h-4"
              onClick={() => signOut({ callbackUrl: "/" })}
            />
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
