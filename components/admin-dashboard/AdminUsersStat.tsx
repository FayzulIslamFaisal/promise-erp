import { Hotel } from "lucide-react";
import AdminStatCard from "./AdminStatCard";

const AdminUsersStat = () => {
  return (
    <AdminStatCard
      title="Districts"
      bgClass="bg-secondary"
      icon={
        <span className="p-2 rounded-lg bg-white text-black">
          <Hotel className="h-6 w-6 font-bold" />
        </span>
      }
    >
      <div className="space-y-1 text-base">
        <div className="flex justify-between text-white">
          <span className="font-bold ">Total Districts</span>
          <span className="font-bold">48</span>
        </div>
        <div className="flex justify-between text-white">
          <span className="">Total Branches:</span>
          <span className="font-bold">72</span>
        </div>
        <div className="flex justify-between text-white">
          <span className="">Active Students</span>
          <span className="font-bold">18,200</span>
        </div>
        <div className="flex justify-between text-white">
          <span className="">Active Instructors:</span>
          <span className="font-bold">1,420</span>
        </div>
        <div className="flex justify-between text-white">
          <span className="">Active Courses</span>
          <span className="font-bold">50+ </span>
        </div>
      </div>
    </AdminStatCard>
  );
};

export default AdminUsersStat;
