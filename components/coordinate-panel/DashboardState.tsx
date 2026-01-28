import {
  BookOpen,
  Box,
  Calendar,
  DollarSign,
  Eye,
  Receipt,
  Users,
  Utensils,
} from "lucide-react";
import DashboardStateItem from "./DashboardStateItem";

const dashboardStats = {
  totalStudents: {
    icon: Users,
    value: "5000",
    label: "Total Students",
    variant: "green",
    subStats: {
      currentStudents: { label: "Current", value: "16" },
      passedStudents: { label: "Passed", value: "4500" },
    },
  },

  runningCourses: {
    icon: BookOpen,
    value: "8",
    label: "Running Courses",
    variant: "purple",
    subStats: {
      paidCourses: { label: "Paid", value: "6" },
      governmentCourses: { label: "Government", value: "2" },
    },
  },

  courseSales: {
    icon: DollarSign,
    value: "৳ 6000000",
    label: "Course Sales",
    variant: "green",
    subStats: {
      paidAmount: { label: "Paid", value: "৳3000000" },
      dueAmount: { label: "Due", value: "৳3000000" },
    },
  },

  todayAttendance: {
    icon: Calendar,
    value: "250",
    label: "Today's Attendance",
    variant: "navy",
    subStats: {
      students: { label: "Students", value: "200" },
      staff: { label: "Staff", value: "50" },
    },
  },

  totalAssets: {
    icon: Box,
    value: "1000",
    label: "Total Assets",
    variant: "blue",
    subStats: {
      labEquipments: { label: "Lab", value: "500" },
      itEquipments: { label: "IT", value: "500" },
    },
  },

  todayVisitors: {
    icon: Eye,
    value: "28",
    label: "Today's Visitors",
    variant: "purple",
    subStats: {
      enrolled: { label: "Enrolled", value: "15" },
      notEnrolled: { label: "Did Not Enroll", value: "13" },
    },
  },

  todayCostSmall: {
    icon: Utensils,
    value: "৳ 3000",
    label: "Today's Cost",
    variant: "green",
    subStats: {
      foodCost: { label: "Food", value: "৳2500" },
      utilityCost: { label: "Utility", value: "৳500" },
    },
  },

  todayCostLarge: {
    icon: Receipt,
    value: "৳ 300000",
    label: "Today's Cost",
    variant: "navy",
    subStats: {
      foodCost: { label: "Food", value: "৳250000" },
      utilityCost: { label: "Utility", value: "৳50000" },
    },
  },
};

const DashboardState = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
      <DashboardStateItem {...dashboardStats.totalStudents} />
      <DashboardStateItem {...dashboardStats.runningCourses} />
      <DashboardStateItem {...dashboardStats.courseSales} />
      <DashboardStateItem {...dashboardStats.todayAttendance} />
      <DashboardStateItem {...dashboardStats.totalAssets} />
      <DashboardStateItem {...dashboardStats.todayVisitors} />
      <DashboardStateItem {...dashboardStats.todayCostSmall} />
      <DashboardStateItem {...dashboardStats.todayCostLarge} />
    </div>
  );
};

export default DashboardState;
