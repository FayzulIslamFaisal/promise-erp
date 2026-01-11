import EnrollmentsData from "@/components/lms/enrollments/EnrollmentsData";
import EnrollmentFilterData from "@/components/lms/enrollments/EnrollmentFilterData";
import TableSkeleton from "@/components/TableSkeleton";
import { Suspense } from "react";

export default async function EnrollmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  return (
    <div className="mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Enrollments</h1>
      </div>

      <Suspense fallback={<div>Loading filters...</div>}>
        <EnrollmentFilterData />
      </Suspense>

      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <EnrollmentsData searchParams={params} />
      </Suspense>
    </div>
  );
}
