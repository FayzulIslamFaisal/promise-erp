"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Paid Courses", value: 65 },
  { name: "Govt Courses", value: 35 },
];

const COLORS = ["hsl(217, 91%, 60%)", "hsl(210, 16%, 82%)"]; // Primary & Secondary

const AdminCourseTypeChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm uppercase text-muted-foreground font-bold">
          Govt vs Paid Courses
        </CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-between gap-6 relative">
        {/* Donut Chart */}
        <div className="w-32 h-32 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={2}
                cornerRadius={8}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value}%`, name]}
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 13%, 91%)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-bold">312</span>
            <span className="text-[10px] uppercase text-secondary">
              Total Courses
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3 text-xs">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[i] }}
              />
              <span className="font-medium">{d.name}</span>
              <span className="text-muted-foreground">({d.value}%)</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminCourseTypeChart;
