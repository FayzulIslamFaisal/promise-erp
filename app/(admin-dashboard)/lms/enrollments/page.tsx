import EnrollmentsData from "@/components/lms/enrollments/EnrollmentsData";
import NextAuthGuardWrapper from "@/components/auth/NextAuthGuardWrapper";
import EnrollmentFilterData from "@/components/lms/enrollments/EnrollmentFilterData";
import TableSkeleton from "@/components/TableSkeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function EnrollmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  return (
    <NextAuthGuardWrapper requiredPermissions={["view-enrollments"]}>
      <div className="mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tight">Enrollments</h1>
          <Button asChild>
            <Link href="/lms/enrollments/add">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Enrollment
            </Link>
          </Button>
        </div>

        <Suspense fallback={<div>Loading filters...</div>}>
          <EnrollmentFilterData />
        </Suspense>

        <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
          <EnrollmentsData searchParams={params} />
        </Suspense>
      </div>
    </NextAuthGuardWrapper>
  );
}
