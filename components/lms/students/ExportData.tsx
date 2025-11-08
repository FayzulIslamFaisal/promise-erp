"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { File, Printer, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export default function ExportData({ data }: { data: any[] }) {
  const simplifiedData = data.map((student) => ({
    ID: student.id,
    Name: student.name,
    Email: student.email,
    Phone: student.phone,
    Branch: student.branches,
    Divisions: student.divisions,
    "Enrolled Status": student.enrollment_status,
  }));

  const handleExport = (format: "csv" | "pdf" | "excel") => {
    if (format === "csv") {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        [
          Object.keys(simplifiedData[0]),
          ...simplifiedData.map((item) => Object.values(item)),
        ]
          .map((e) => e.join(","))
          .join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "students.csv");
      document.body.appendChild(link);
      link.click();
    } else if (format === "pdf") {
      const doc = new jsPDF();
      (doc as any).autoTable({
        head: [Object.keys(simplifiedData[0])],
        body: simplifiedData.map((item) => Object.values(item)),
      });
      doc.save("students.pdf");
    } else if (format === "excel") {
      const ws = XLSX.utils.json_to_sheet(simplifiedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Students");
      XLSX.writeFile(wb, "students.xlsx");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <File className="w-4 h-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("csv")}>
          <File className="w-4 h-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("pdf")}>
          <Printer className="w-4 h-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("excel")}>
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Export as Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
