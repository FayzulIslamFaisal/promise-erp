import BranchesData from "@/components/lms/branches/BranchesData";
import TableSkeleton from "@/components/TableSkeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function BranchesPage() {
  return (
    <div className="mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Branches</h1>
        <Link href="/lms/branches/add">
        <Button className="gap-2">
          <PlusCircle className="w-4 h-4" />
          Add Branch
        </Button>
        </Link>
      </div>

      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <BranchesData />
      </Suspense>
    </div>
  );
}
