import TableSkeleton from "@/components/TableSkeleton";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const EarningAllListHead = dynamic(
  () => import("@/components/student-dashboard/EarningAllListHead")
);
const EarningAllListTable = dynamic(
  () => import("@/components/student-dashboard/EarningAllListTable")
);

const AllListPage = () => {
  return (
    <section className="py-4 px-4">
      <h1 className="text-2xl text-center font-bold text-secondary">
        All Earnings History
      </h1>
      <div className="py-4 px-4">
        <Suspense fallback={<div className="text-center py-10">Loading earnings filter...</div>}>
          <EarningAllListHead />
        </Suspense>
        <Suspense fallback={<TableSkeleton columns={9} rows={15} className="mt-4" />}>
          <EarningAllListTable />
        </Suspense>
      </div>
    </section>
  );
};

export default AllListPage;
