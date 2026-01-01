"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  CheckCircle,
  CreditCard,
  TrendingUp,
  TrendingDown,
  LucideIcon,
} from "lucide-react";
import { StDashboardCards } from "@/apiServices/studentDashboardService";

/* ------------------ CONFIG ------------------ */
interface StatConfig {
  title: string;
  gradient: string;
  icon: LucideIcon;
  type?: "earning";
  render: (cards: StDashboardCards) => {
    value: string | number;
    subtitle?: string;
    badge?: string;
    badgeLabel?: string;
  };
}

const statsConfig: StatConfig[] = [
  {
    title: "Total Enrolled Courses",
    icon: BookOpen,
    gradient: "from-green-500 to-green-600",
    render: (cards) => ({
      value: cards.total_enrolled_courses,
      subtitle: `${cards.running_courses} Running Courses`,
    }),
  },
  {
    title: "Completed Courses",
    icon: CheckCircle,
    gradient: "from-indigo-800 to-indigo-900",
    render: (cards) => ({
      value: cards.completed_courses,
    }),
  },
  {
    title: "Total Due Payment",
    icon: CreditCard,
    gradient: "from-purple-400 to-purple-500",
    render: (cards) => ({
      value: `৳ ${cards.total_due_payment}`,
      subtitle: `Due in ${cards.due_in_courses} courses`,
    }),
  },
  {
    title: "This Month’s Earning",
    icon: TrendingUp, // default
    type: "earning",
    gradient: "from-blue-500 to-blue-600",
    render: (cards) => ({
      value: `$ ${cards.this_month_earning_usd}`,
      badge: `${cards.earning_percentage}%`,
      badgeLabel: "USD",
    }),
  },
];

interface DashboardStatsGridProps {
  cards: StDashboardCards;
}

const DashboardStatsGrid = ({ cards }: DashboardStatsGridProps) => {
  return (
    <div className="px-4 py-4 lg:py-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {statsConfig.map((stat, index) => {
          const data = stat.render(cards);
          let Icon = stat.icon;
          if (stat.type === "earning") {
            Icon =
              cards.earning_change === "increase" ? TrendingUp : TrendingDown;
          }

          return (
            <Card
              key={index}
              className={`border-none bg-linear-to-br ${stat.gradient} text-white shadow-lg`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium opacity-90">
                      <Icon className="h-4 w-4" />
                      {stat.title}
                    </div>

                    <div className="text-4xl font-bold">{data.value}</div>

                    {data.subtitle && (
                      <div className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
                        {data.subtitle}
                      </div>
                    )}

                    {data.badge && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium">
                          {data.badge}
                        </span>
                        <span className="text-xs font-medium">
                          {data.badgeLabel}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* RIGHT BIG ICON */}
                  <Icon className="h-16 w-16 opacity-20" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardStatsGrid;
