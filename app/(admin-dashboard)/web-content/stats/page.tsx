// app/lms/stats/page.tsx
import StatsData from "@/components/web-content/stats/StatsData";
import StatsFilterData from "@/components/web-content/stats/StatsFilterData";
import TableSkeleton from "@/components/TableSkeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export interface StatsSearchParamsProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function StatsPage({ searchParams }: StatsSearchParamsProps) {
  

  return (
    <div className="mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Statistics</h1>
        <Button asChild>
          <Link href="/web-content/stats/add">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Statistics
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div>Loading filters...</div>}>
        <StatsFilterData />
      </Suspense>

      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <StatsData />
      </Suspense>
    </div>
  );
}
