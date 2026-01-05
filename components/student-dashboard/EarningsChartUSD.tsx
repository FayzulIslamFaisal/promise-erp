"use client";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  EarningsChartItem,
  getStudentEarningUsdChart,
} from "@/apiServices/studentDashboardService";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import SectionLoadingSkeleton from "../common/SectionLoadingSkeleton";

const EarningsChartUSD = () => {
  const [earningsDataUSD, setEarningsDataUSD] = useState<EarningsChartItem[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await getStudentEarningUsdChart();
        if (!response?.success) {
          toast.error("Failed to fetch USD earnings data");
        } else {
          setEarningsDataUSD(response?.data?.chart_data || []);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching USD earnings data:", error.message);
          toast.error("Something went wrong");
        } else {
          console.error("Unknown error fetching USD earnings data");
        }
      }
    });
  }, []);

  if (isPending) return <SectionLoadingSkeleton />;

  if (earningsDataUSD.length === 0)
    return null;

  return (
    <Card className="">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          Earnings Overview(USD)
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={earningsDataUSD}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUSD" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--secondary)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--secondary)"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--black)", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--black)", fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
                dx={-10}
              />
              {/* Tooltip Added */}
              <Tooltip
                formatter={(value: number) => `$ ${value}`}
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  border: "1px solid var(--secondary)",
                }}
                itemStyle={{ color: "var(--secondary)" }}
              />
              <Area
                type="monotone"
                dataKey="earning"
                stroke="var(--secondary)"
                strokeWidth={2.5}
                fill="url(#colorUSD)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsChartUSD;
