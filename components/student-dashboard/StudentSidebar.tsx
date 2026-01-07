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
  Award,
  CreditCard,
  Bell,
  Clock,
  GraduationCap,
  DollarSign,
  Calendar,
  LogOut,
  User,
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
    title: "Profile",
    url: "/student/profile",
    icon: User,
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
      <SidebarRail />
    </Sidebar>
  );
}
