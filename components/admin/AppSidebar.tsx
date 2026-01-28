"use client";

import * as React from "react";
import {
  BookOpen,
  BoxesIcon,
  BriefcaseBusiness,
  ChartLine,
  DollarSign,
  DollarSignIcon,
  GalleryVerticalEnd,
  GraduationCap,
  HouseIcon,
  ImagePlay,
  LocationEdit,
  LockIcon,
  MessageSquare,
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
import NavCoordinateManagment from "./NavCoordinateManagment";

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
          permissions: ["view-students"],
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
          permissions: ["view-course-categories"],
        },
        {
          title: "Courses",
          url: "/lms/courses",
          permissions: ["view-courses"],
        },
        {
          title: "Batches",
          url: "/lms/batches",
          permissions: ["view-batches"],
        },
        {
          title: "Projects",
          url: "/lms/projects",
          permissions: ["view-course-projects"],
        },
        {
          title: "Groups",
          url: "/lms/groups",
          permissions: ["view-groups"],
        },

        {
          title: "Facilities",
          url: "/lms/facilities",
          permissions: ["view-course-facilities"],
        },

        {
          title: "FAQs",
          url: "/lms/faqs",
          permissions: ["view-course-faqs"],
        },
        {
          title: "Coupons",
          url: "/lms/coupons",
          permissions: ["view-coupons"],
        },
        {
          title: "Who Can Join",
          url: "/lms/who-can-join",
          permissions: ["view-course-joins"],
        },
        {
          title: "Course Reviews",
          url: "/lms/reviews",
          permissions: ["view-reviews"],
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
          permissions: ["view-teachers"],
        },
        {
          title: "Active Teachers",
          url: "#",
          permissions: ["view-teachers"],
        },
        {
          title: "Pending Approvals",
          url: "#",
          permissions: ["create-teachers"],
        },
        {
          title: "Teacher Attendance",
          url: "#",
          permissions: ["view-attendances"],
        },
        {
          title: "Teacher Payments",
          url: "#",
          permissions: ["view-payment-histories"],
        },
        {
          title: "Performance Reports",
          url: "#",
          permissions: ["view-teacher-stats"],
        },
      ],
    },

    {
      title: "Enroll & Payments",
      url: "#",
      icon: DollarSignIcon,
      items: [
        {
          title: "Enrollments",
          url: "/lms/enrollments",
          permissions: ["view-enrollments"],
        },
        {
          title: "Invoices",
          url: "#",
          permissions: ["view-invoices"],
        },
        {
          title: "Coupons",
          url: "#",
          permissions: ["view-coupons"],
        },
        {
          title: "Certificates",
          url: "#",
          permissions: ["view-certificates"],
        },
        {
          title: "Subscription Plans",
          url: "#",
          permissions: ["view-subscriptions"],
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
          url: "/web-content/stats",
          permissions: ["view-stats"],
        },
        {
          title: "Departments",
          url: "#",
          permissions: ["view-divisions"],
        },
        {
          title: "Offers List",
          url: "#",
          permissions: ["view-sections"],
        },
        {
          title: "Blog Categories",
          url: "#",
          permissions: ["view-blog-categories"],
        },
        {
          title: "Blog Posts",
          url: "#",
          permissions: ["view-blogs"],
        },
        {
          title: "Notices",
          url: "#",
          permissions: ["view-news-feeds"],
        },
        {
          title: "Hero Sections",
          url: "/web-content/hero-section",
          permissions: ["view-hero-sections"],
        },
        {
          title: "Common Sections",
          url: "/web-content/common-sections",
          permissions: ["view-sections"],
        },
        {
          title: "Opportunities",
          url: "/web-content/opportunities",
          permissions: ["view-opportunities"],
        },
        {
          title: "Video Gallery",
          url: "/web-content/video-galleries",
          permissions: ["view-video-galleries"],
        },
        {
          title: "Our Partners",
          url: "/web-content/our-partners",
          permissions: ["view-partners"],
        },
        {
          title: "News & Updates",
          url: "/web-content/news-feeds",
          permissions: ["view-news-feeds"],
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
          permissions: ["view-notifications"],
        },
        {
          title: "Reviews",
          url: "#",
          permissions: ["view-reviews"],
        },
        {
          title: "Free Consultations",
          url: "#",
          permissions: ["view-contact-queries"],
        },
        {
          title: "Newsletter Subscriptions",
          url: "#",
          permissions: ["view-newsletters"],
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
      title: "Requisition Manage",
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
      title: "Requirement Onboar",
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
          permissions: ["view-expense"],
        },
        {
          title: "Add Expense",
          url: "#",
          permissions: ["create-expense"],
        },
        {
          title: "Expense Categories",
          url: "#",
          permissions: ["view-expense-category"],
        },
      ],
    },
  ],
  navPurchase: [
    {
      title: "Purchases Manage",
      url: "#",
      icon: DollarSign,
      items: [
        {
          title: "Purchases List",
          url: "#",
          // permissions: ["view-purchases"], // Not found in list
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
          permissions: ["view-invoices"],
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
          permissions: ["view-users"],
        },
        {
          title: "User Roles",
          url: "#",
          permissions: ["view-role-users"],
        },
        {
          title: "User Permissions",
          url: "#",
          permissions: ["view-user-permissions"], // Assuming logic, but listing doesn't explicitly show 'view-user-permissions', only 'view-permissions' and 'assign-user-roles'. 'view-role-permissions' exists. 
        },
        {
          title: "User Activity Logs",
          url: "#",
          permissions: ["view-logs"],
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
          permissions: ["view-divisions"],
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
          permissions: ["view-districts"],
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
          url: "/access-control/roles",
          permissions: ["view-roles"],
        },
        {
          title: "Permissions List",
          url: "/access-control/permissions",
          permissions: ["view-permissions"],
        },
      ],
    },
  ],
  coordinatManagement: [
    {
      title: "Coordinate Manage",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Dashboard",
          url: "/coordinate/dashboard",
          permissions: ["view-dashboard"],
        },
        {
          title: "Students",
          url: "/coordinate/students",
          permissions: ["view-dashboard"],
        },
        {
          title: "Enrollments",
          url: "/coordinate/enrollments",
          permissions: ["view-dashboard"],
        },
        {
          title: "Payments",
          url: "/coordinate/payments",
          permissions: ["view-dashboard"],
        },
        {
          title: "Courses",
          url: "/coordinate/courses",
          permissions: ["view-dashboard"],
        },
        {
          title: "Attendance",
          url: "/coordinate/attendance",
          permissions: ["view-dashboard"],
        },
        {
          title: "Assets",
          url: "/coordinate/assets",
          permissions: ["view-dashboard"],
        },
        {
          title: "Foods",
          url: "/coordinate/foods",
          permissions: ["view-dashboard"],
        },
        {
          title: "Earning Reports",
          url: "/coordinate/earning-reports",
          permissions: ["view-dashboard"],
        },
        {
          title: "Visitors",
          url: "/coordinate/visitors",
          permissions: ["view-dashboard"],
        },
        {
          title: "Feetbacks",
          url: "/coordinate/feetbacks",
          permissions: ["view-dashboard"],
        },
        {
          title: "Events",
          url: "/coordinate/events",
          permissions: ["view-dashboard"],
        },
        {
          title: "Reports",
          url: "/coordinate/reports",
          permissions: ["view-dashboard"],
        },
        {
          title: "Settings",
          url: "/coordinate/settings",
          permissions: ["view-dashboard"],
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
        <NavCoordinateManagment items={data.coordinatManagement} />
        <NavHr items={data.navHr} />
        <NavInventory items={data.navInventory} />
        <NavSales items={data.navSales} />
        <NavExpense items={data.navExpenses} />
        <NavPurchases items={data.navPurchase} />
        <NavAccount items={data.navAccount} />
        <NavSettings items={data.navSettings} />
        <NavDivision items={data.navDivision} />
        <NavDistrict items={data.navDistrict} />
        <NavUserManage items={data.userManagement} />
        <NavRolePermission items={data.navRolePermission} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
