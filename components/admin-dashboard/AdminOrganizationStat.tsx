import AdminStatCard from "./AdminStatCard";
import { Landmark } from "lucide-react";

const AdminOrganizationStat = () => {
  return (
    <AdminStatCard
      title="Revenues"
      bgClass="bg-secondary"
      icon={
        <span className="p-2 rounded-lg bg-white text-black">
          <Landmark className="h-6 w-6 font-bold" />
        </span>
      }
    >
      <div className="space-y-1 text-base">
        <div className="flex justify-between text-white">
          <span className="font-bold">Total Revenue (YTD):</span>
          <span className="font-bold">৳১৫.২ কোটি</span>
        </div>
        <div className="flex justify-between text-white">
          <span className="">Collection Rate:</span>
          <span className="font-bold">98.1%</span>
        </div>
        <div className="flex justify-between text-white">
          <span className="">Total Expenses (YTD):</span>
          <span className="font-bold">৳ 9.3 কোটি</span>
        </div>
        <div className="flex justify-between text-white">
          <span className="">Net Operating Surplus:</span>
          <span className="font-bold">৳ ১৫.২ কোটি</span>
        </div>
        <div className="flex justify-between text-white">
          <span className="">Pending Payments:</span>
          <span className="font-bold">৳ 1.1 কোটি</span>
        </div>
      </div>
    </AdminStatCard>
  );
};

export default AdminOrganizationStat;
