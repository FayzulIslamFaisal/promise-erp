"use client";
import { LayoutGrid } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const batches = [
  {
    sl: 1,
    course: "React JS",
    batch: "Batch A",
    startDate: "01-Jan-23",
    endDate: "31-Jan-23",
    totalStudents: 20,
    presentToday: 18,
  },
  {
    sl: 2,
    course: "Next.js",
    batch: "Batch B",
    startDate: "05-Jan-23",
    endDate: "04-Feb-23",
    totalStudents: 15,
    presentToday: 15,
  },
  {
    sl: 3,
    course: "Node JS",
    batch: "Batch C",
    startDate: "10-Jan-23",
    endDate: "09-Feb-23",
    totalStudents: 25,
    presentToday: 20,
  },
  {
    sl: 4,
    course: "TypeScript",
    batch: "Batch D",
    startDate: "12-Jan-23",
    endDate: "11-Feb-23",
    totalStudents: 18,
    presentToday: 16,
  },
  {
    sl: 5,
    course: "Tailwind CSS",
    batch: "Batch E",
    startDate: "15-Jan-23",
    endDate: "14-Feb-23",
    totalStudents: 12,
    presentToday: 12,
  },
  {
    sl: 6,
    course: "Prisma",
    batch: "Batch F",
    startDate: "20-Jan-23",
    endDate: "19-Feb-23",
    totalStudents: 10,
    presentToday: 9,
  },
];
const DashboardRunningBatches = () => {
  return (
    <Card>
      {/* Card Header */}
      <CardHeader className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="p-2 bg-stat-purple-bg rounded-lg">
          <LayoutGrid className="w-5 h-5 text-stat-purple" />
        </div>
        <div>
          <CardTitle className="text-lg">Running Batches</CardTitle>
          <p className="text-sm text-muted-foreground">
            List of Running Batches
          </p>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-0">
        <Table className="px-2">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">#SL</TableHead>
              <TableHead className="font-semibold">Course</TableHead>
              <TableHead className="font-semibold">Batch</TableHead>
              <TableHead className="font-semibold">Start Date</TableHead>
              <TableHead className="font-semibold">End Date</TableHead>
              <TableHead className="font-semibold text-center">
                Total Students
              </TableHead>
              <TableHead className="font-semibold text-center">
                Present Today
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="px-2">
            {batches.map((batch) => (
              <TableRow key={batch.sl} className="hover:bg-muted/30">
                <TableCell className="text-muted-foreground">
                  {batch.sl}
                </TableCell>
                <TableCell className="font-medium">{batch.course}</TableCell>
                <TableCell className="text-primary">{batch.batch}</TableCell>
                <TableCell className="text-muted-foreground">
                  {batch.startDate}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {batch.endDate}
                </TableCell>
                <TableCell className="text-center">
                  {batch.totalStudents}
                </TableCell>
                <TableCell className="text-center">
                  <span className="badge-green">{batch.presentToday}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="flex items-center justify-between border-t border-border p-4">
        <p className="text-sm text-muted-foreground">Showing Rows 1-6 of 8</p>
      </CardFooter>
    </Card>
  );
};

export default DashboardRunningBatches;
