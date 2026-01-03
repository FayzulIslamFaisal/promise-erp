"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
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
    Calendar
} from "lucide-react";
import HeaderContent, { NavLink } from "../common/HeaderContent";

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
            <SidebarHeader className="h-18"></SidebarHeader>
            <SidebarContent>
                <NavStudentDashboard items={studentNavItems} />
            </SidebarContent>
        </Sidebar>
    );
}
