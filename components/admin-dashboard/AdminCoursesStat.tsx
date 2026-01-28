import AdminStatCard from './AdminStatCard'
import { Warehouse } from 'lucide-react'

const AdminCoursesStat = () => {
  return (
    <AdminStatCard
      title="Branches"
      bgClass="bg-primary"
      icon={
        <span className="p-2 rounded-lg bg-white text-black">
          <Warehouse className="h-6 w-6 font-bold" />
        </span>
      }
    >
      <div className="space-y-1 text-base">
        <div className="flex justify-between text-white">
          <span className="font-bold">Total Branches</span>
          <span className="font-bold">72</span>
        </div>
        <div className="flex justify-between text-white">
          <span className="">Avg Students</span>
          <span className="font-bold">250 – 280</span>
        </div>
        <div className="flex justify-between text-white">
          <span className="">Avg Instructors </span>
          <span className="font-bold">18 – 22</span>
        </div>
        <div className="flex justify-between text-white">
          <span className="">Active Courses</span>
          <span className="font-bold">8 – 12</span>
        </div>
        <div className="flex justify-between text-white">
          <span className="">Monthly New Enrollments:</span>
          <span className="font-bold">1,420</span>
        </div>
      </div>
    </AdminStatCard>
  )
}

export default AdminCoursesStat
