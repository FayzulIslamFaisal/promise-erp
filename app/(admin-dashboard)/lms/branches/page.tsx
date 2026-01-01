// app/lms/branches/page.tsx
import BranchesData from "@/components/lms/branches/BranchesData";
import BranchFilterData from "@/components/lms/branches/BranchFilterData";
import TableSkeleton from "@/components/TableSkeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function BranchesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined }
}) {
  return (
    <div className="mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Branches</h1>
        <Link href="/lms/branches/add">
          <Button className="gap-2">
            <PlusCircle className="w-4 h-4" />
            Add Branch
          </Button>
        </Link>
      </div>

      {/* Branch Filters */}
      <Suspense fallback={<div>Loading filters...</div>}>
        <BranchFilterData />
      </Suspense>

      {/* Branch Table */}
      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <BranchesData searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
