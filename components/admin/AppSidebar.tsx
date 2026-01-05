"use client";

import * as React from "react";
import {
  BadgeAlert,
  Banknote,
  BookMarked,
  BookOpen,
  BookOpenCheck,
  BoxesIcon,
  BriefcaseBusiness,
  Calendar,
  ChartLine,
  DollarSign,
  DollarSignIcon,
  GalleryVerticalEnd,
  GraduationCap,
  History,
  HouseIcon,
  ImagePlay,
  LayoutDashboard,
  LocationEdit,
  LockIcon,
  MessageSquare,
  School,
  Settings,
  ShieldCheck,
  ShoppingCartIcon,
  User2Icon,
  UserCheck,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/admin/NavMain";
import { NavUser } from "@/components/admin/NavUser";
import { TeamSwitcher } from "@/components/admin/TeamSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import NavHr from "./NavHr";
import NavExpense from "./NavExpense";
import NavPurchases from "./NavPurchases";
import NavAccount from "./NavAccount";
import NavInventory from "./NavInventory";
import NavSales from "./NavSales";
import NavSettings from "./NavSettings";
import NavUserManage from "./NavUserManage";
import NavRolePermission from "./NavRolePermission";
import NavDivision from "./NavDivision";
import NavDistrict from "./NavDistrict";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "EL ERP System",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Student Management",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Students",
          url: "/lms/students",
        },
      ],
    },
    {
      title: "Course Management",
      url: "#",
      icon: GraduationCap,
      // isActive: true,
      items: [
        {
          title: "Categories",
          url: "/lms/categories",
        },
        {
          title: "Courses",
          url: "/lms/courses",
        },
        {
          title: "Batches",
          url: "/lms/batches",
        },
        {
          title: "Projects",
          url: "/lms/projects",
        },
        {
          title: "Groups",
          url: "/lms/groups",
        },
       
        {
          title: "Facilities",
          url: "/lms/facilities",
        },

        {
          title: "FAQs",
          url: "/lms/faqs",
        },
        {
          title: "Coupons",
          url: "/lms/coupons",
        },
        {
          title: "Who Can Join",
          url: "/lms/who-can-join",
        },
        {
          title: "Course Reviews",
          url: "/lms/reviews",
        },
      ],
    },

    {
      title: "Teacher Management",
      url: "#",
      icon: UserCheck, // or use an appropriate icon like UserCircle or Chalkboard
      items: [
        {
          title: "Teachers",
          url: "/lms/teachers",
        },
        {
          title: "Active Teachers",
          url: "#",
        },
        {
          title: "Pending Approvals",
          url: "#",
        },
        {
          title: "Teacher Attendance",
          url: "#",
        },
        {
          title: "Teacher Payments",
          url: "#",
        },
        {
          title: "Performance Reports",
          url: "#",
        },
      ],
    },

    {
      title: "Enrollments & Payments",
      url: "#",
      icon: DollarSignIcon,
      items: [
        {
          title: "Enrollments",
          url: "#",
        },
        {
          title: "Invoices",
          url: "#",
        },
        {
          title: "Coupons",
          url: "#",
        },
        {
          title: "Certificates",
          url: "#",
        },
        {
          title: "Subscription Plans",
          url: "#",
        },
      ],
    },

    {
      title: "Assessments",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Quizs",
          url: "#",
        },
        {
          title: "Questions",
          url: "#",
        },
        {
          title: "Assignment",
          url: "#",
        },
        {
          title: "Results",
          url: "#",
        },
      ],
    },
    {
      title: "Contents Management",
      url: "#",
      icon: ImagePlay,
      items: [
        {
          title: "Statistics",
          url: "/lms/stats",
        },
        {
          title: "Departments",
          url: "#",
        },
        {
          title: "Offers List",
          url: "#",
        },
        {
          title: "Blog Categories",
          url: "#",
        },
        {
          title: "Blog Posts",
          url: "#",
        },
        {
          title: "Notices",
          url: "#",
        },
        {
          title: "Hero Sections",
          url: "/web-content/hero-section",
        },
        {
          title: "Common Sections",
          url: "#",
        },
        {
          title: "FAQs",
          url: "#",
        },
        {
          title: "Video Gallery",
          url: "/web-content/video-galleries",
        },
        {
          title: "Image Gallery",
          url: "#",
        },
      ],
    },
    {
      title: "Communications",
      url: "#",
      icon: MessageSquare,
      items: [
        {
          title: "Notifications",
          url: "#",
        },
        {
          title: "Reviews",
          url: "#",
        },
        {
          title: "Free Consultations",
          url: "#",
        },
        {
          title: "Newsletter Subscriptions",
          url: "#",
        },
      ],
    },
    {
      title: "Progress Reports",
      url: "#",
      icon: ChartLine,
      items: [
        {
          title: "Completed Lessons",
          url: "#",
        },
        {
          title: "Wishlists",
          url: "#",
        },
        {
          title: "Tags",
          url: "#",
        },
      ],
    },
    {
      title: "Careers Management",
      url: "#",
      icon: BriefcaseBusiness,
      items: [
        {
          title: "Jobs List",
          url: "#",
        },
        {
          title: "Job Applications",
          url: "#",
        },
        {
          title: "Interviews",
          url: "#",
        },
      ],
    },
    {
      title: "Requisition Management",
      url: "#",
      icon: HouseIcon,
      items: [
        {
          title: "Your Requisition",
          url: "#",
        },
        {
          title: "All Branches",
          url: "#",
        },
        {
          title: "Head office",
          url: "#",
        },
      ],
    },
  ],

  navHr: [
    {
      title: "Requirement Onboarding",
      url: "#",
      icon: User2Icon,
      items: [
        {
          title: "Job Circular",
          url: "#",
        },
        {
          title: "Application Tracking",
          url: "#",
        },
        {
          title: "Interview Schedule",
          url: "#",
        },
        {
          title: "Candidate Evaluation",
          url: "#",
        },
        {
          title: "Offer Letter",
          url: "#",
        },
        {
          title: "Onboarding / Joining",
          url: "#",
        },
      ],
    },
    {
      title: "Attendance",
      url: "#",
      icon: User2Icon,
      items: [
        {
          title: "Manual Attendance",
          url: "#",
        },
        {
          title: "Biometric",
          url: "#",
        },
        {
          title: "Device (Optional)",
          url: "#",
        },
        {
          title: "Late Report",
          url: "#",
        },
        {
          title: "Early Leave Report",
          url: "#",
        },
        {
          title: "Attendance Summary",
          url: "#",
        },
        {
          title: "Attendance Report",
          url: "#",
          children: [
            {
              title: "Weekly",
              url: "#",
            },
            {
              title: "Monthly",
              url: "#",
            },
            {
              title: "Yearly",
              url: "#",
            },
          ],
        },
      ],
    },
    {
      title: "Payroll",
      url: "#",
      icon: User2Icon,
      items: [
        {
          title: "Salary Structure",
          url: "#",
        },
        {
          title: "Salary Processing",
          url: "#",
        },
        {
          title: "Overtime Calculation",
          url: "#",
        },
        {
          title: "Pay Slip Generation",
          url: "#",
        },
        {
          title: "Tax Deduction",
          url: "#",
        },
        {
          title: "Salary Report",
          url: "#",
        },
        {
          title: "Advance Salary",
          url: "#",
        },
        {
          title: "Salary Certificate",
          url: "#",
        },
        {
          title: "Incentive",
          url: "#",
        },
        {
          title: "Medical Allowance",
          url: "#",
        },
        {
          title: "Convenance Allowance",
          url: "#",
        },
        {
          title: "Bonus",
          url: "#",
        },
      ],
    },
    {
      title: "Holiday & Leave ",
      url: "#",
      icon: User2Icon,
      items: [
        {
          title: "Leave Application ",
          url: "#",
        },
        {
          title: "Leave Application Rules",
          url: "#",
        },
        {
          title: "Leave Approval Process",
          url: "#",
        },
        {
          title: "Leave Report (Y/M)",
          url: "#",
        },
        {
          title: "Leave Encashment",
          url: "#",
        },
        {
          title: "Leave Summary",
          url: "#",
        },
      ],
    },
    {
      title: "Increment & Promotion",
      url: "#",
      icon: User2Icon,
      items: [
        {
          title: "Individual Person Promotion",
          url: "#",
        },
        {
          title: "Demotion with Reason",
          url: "#",
        },
        {
          title: "Employee Suspend",
          url: "#",
        },
        {
          title: "Increment / Decrement with Reason",
          url: "#",
        },
      ],
    },
    {
      title: "Provident Fund",
      url: "#",
      icon: User2Icon,
      items: [
        {
          title: "Provident Fund Configuration",
          url: "#",
        },
        {
          title: "PF Opening",
          url: "#",
        },
        {
          title: "Loan Against PR",
          url: "#",
        },
        {
          title: "Loan Adjustment",
          url: "#",
        },
        {
          title: "PR Settlement",
          url: "#",
        },
        {
          title: "Interest on PF",
          url: "#",
        },
        {
          title: "PF Ledger",
          url: "#",
        },
        {
          title: "PF Report",
          url: "#",
        },
      ],
    },
    {
      title: "HR Configuration",
      url: "#",
      icon: User2Icon,
      items: [
        {
          title: "Notice Board",
          url: "#",
        },
        {
          title: "HR Policy / Rules",
          url: "#",
        },
        {
          title: "Manage Company Info",
          url: "#",
        },
        {
          title: "Designation & Department Setup",
          url: "#",
        },
        {
          title: "Roaster Schedule",
          url: "#",
        },
        {
          title: "Employee Class Management",
          url: "#",
        },
        {
          title: "Work Station & Front Desk Manage",
          url: "#",
        },
        {
          title: "Grade System for Salary",
          url: "#",
        },
      ],
    },
  ],
  navExpenses: [
    {
      title: "Expenses Management",
      url: "#",
      icon: DollarSign,
      items: [
        {
          title: "List Expenses",
          url: "#",
        },
        {
          title: "Add Expense",
          url: "#",
        },
        {
          title: "Expense Categories",
          url: "#",
        },
      ],
    },
  ],
  navPurchase: [
    {
      title: "Purchases Management",
      url: "#",
      icon: DollarSign,
      items: [
        {
          title: "Purchases List",
          url: "#",
        },
        {
          title: "Add Purchases",
          url: "#",
        },
        {
          title: "List Purchase Return",
          url: "#",
        },
        {
          title: "Stock Transfers List",
          url: "#",
        },
        {
          title: "Add Stock Transfer",
          url: "#",
        },
        {
          title: "Stock Adjustments List",
          url: "#",
        },
        {
          title: "Add Stock Adjustment",
          url: "#",
        },
      ],
    },
  ],
  navAccount: [
    {
      title: "Account Management",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Accounts List",
          url: "#",
        },
        {
          title: "Balance Sheet",
          url: "#",
        },
        {
          title: "Trial Balance",
          url: "#",
        },
        {
          title: "Cash Flow",
          url: "#",
        },
        {
          title: "Payment Account Report",
          url: "#",
        },
      ],
    },
  ],
  navInventory: [
    {
      title: "Inventory Management",
      url: "#",
      icon: BoxesIcon, // you can use any Lucide icon you prefer, e.g. PackageIcon or WarehouseIcon
      items: [
        {
          title: "Dashboard",
          url: "#",
        },
        {
          title: "Requisitions",
          url: "#",
        },
        {
          title: "Requisition Overview",
          url: "#",
        },
        {
          title: "Requisition Accepts",
          url: "#",
        },
        {
          title: "Purchase",
          url: "#",
        },
        {
          title: "Manual Entry Form / POS",
          url: "#",
        },
        {
          title: "Item Management",
          url: "#",
        },
        {
          title: "Stock Management",
          url: "#",
        },
        {
          title: "Supplier / Vendor Management",
          url: "#",
        },
        {
          title: "Warehouse Management",
          url: "#",
        },
      ],
    },
  ],

  navSales: [
    {
      title: "Sales Management",
      url: "#",
      icon: ShoppingCartIcon, // You can change to any Lucide icon you prefer, e.g. DollarSignIcon, ReceiptIcon, or ChartLineIcon
      items: [
        {
          title: "Dashboard",
          url: "#",
        },
        {
          title: "Customer Management",
          url: "#",
        },
        {
          title: "Product / Item Management",
          url: "#",
        },
        {
          title: "Delivery Management",
          url: "#",
        },
        {
          title: "Sales Report",
          url: "#",
        },
        {
          title: "Orders Management",
          url: "#",
        },
        {
          title: "Quotation & Proposal",
          url: "#",
        },
        {
          title: "Invoice & Billing",
          url: "#",
        },
        {
          title: "Payment Collection / Due Management",
          url: "#",
        },
        {
          title: "Sales Return / Exchange Policy",
          url: "#",
        },
        {
          title: "Sales Target",
          url: "#",
        },
      ],
    },
  ],
  navSettings: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  userManagement: [
    {
      title: "User Management",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Users List",
          url: "#",
        },
        {
          title: "User Roles",
          url: "#",
        },
        {
          title: "User Permissions",
          url: "#",
        },
        {
          title: "User Activity Logs",
          url: "#",
        },
        {
          title: "User Profile Settings",
          url: "#",
        },
      ],
    },
  ],
  navDivision: [
    {
      title: "Division List",
      url: "#",
      icon: LocationEdit,
      items: [
        {
          title: "Divisions",
          url: "/divisions",
        },
      ],
    },
  ],
  navDistrict: [
    {
      title: "District List",
      url: "#",
      icon: LockIcon,
      items: [
        {
          title: "Districts",
          url: "/districts",
        },
      ],
    },
  ],
  navRolePermission: [
    {
      title: "Role & Permission",
      url: "#",
      icon: ShieldCheck,
      items: [
        {
          title: "Roles List",
          url: "#",
        },
        {
          title: "Add Role",
          url: "#",
        },
        {
          title: "Permissions List",
          url: "#",
        },
        {
          title: "Assign Permissions",
          url: "#",
        },
      ],
    },
  ],

};

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavHr items={data.navHr} />
        <NavInventory items={data.navInventory} />
        <NavSales items={data.navSales} />
        <NavExpense items={data.navExpenses} />
        <NavPurchases items={data.navPurchase} />
        <NavAccount items={data.navAccount} />
        <NavSettings items={data.navSettings} />
        <NavDivision items={data.navDivision} />
        <NavDistrict items={data.navDistrict} />
        <NavRolePermission items={data.navRolePermission} />
        <NavUserManage items={data.userManagement} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
