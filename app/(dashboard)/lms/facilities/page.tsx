import FacilitiesData from "@/components/lms/facilities/FacilitiesData";
import FacilitiesFilterData from "@/components/lms/facilities/FacilitiesFilterData";
import TableSkeleton from "@/components/TableSkeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function FacilitiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <div className="mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Facilities</h1>

        <Button asChild>
          <Link href="/lms/facilities/add">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Facility
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div>Loading filters...</div>}>
        <FacilitiesFilterData />
      </Suspense>

      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <FacilitiesData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
