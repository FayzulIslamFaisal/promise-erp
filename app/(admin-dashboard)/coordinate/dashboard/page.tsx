import DashboardCourseSalesChart from "@/components/coordinate-panel/DashboardCourseSalesChart";
import DashboardRunningBatches from "@/components/coordinate-panel/DashboardRunningBatches";
import DashboardState from "@/components/coordinate-panel/DashboardState";
import DashBoardVisitorChart from "@/components/coordinate-panel/DashBoardVisitorChart";
import { Suspense } from "react";

const CoordinateDashboardPage = () => {
  return (
    <section className="py-4 px-4">
      <h1 className="text-xl lg:text-2xl text-secondary font-semibold tracking-tight capitalize mb-2">
        Coordinate Dashboard
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardState />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 py-8">
          <DashboardCourseSalesChart />
          <DashBoardVisitorChart />
        </div>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardRunningBatches />
      </Suspense>

    </section>
  );
};

export default CoordinateDashboardPage;
