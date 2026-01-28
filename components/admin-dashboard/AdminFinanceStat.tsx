import AdminStatCard from './AdminStatCard'
import { User } from 'lucide-react'

const AdminFinanceStat = () => {
  return (
    <AdminStatCard
      title="Employees"
      bgClass="bg-primary"
      icon={
        <span className="p-2 rounded-lg bg-white text-black">
          <User className="h-6 w-6 font-bold" />
        </span>
      }
    >
      <div className="space-y-1 text-base">
        <div className="flex justify-between text-white">
          <span className="font-bold">Total Employees:</span>
          <span className="font-bold">500</span>
        </div>
        <div className="flex justify-between text-white">
          <span className="">Active Instructors:</span>
          <span className="font-bold">320</span>
        </div>
        <div className="flex justify-between text-white">
          <span className="">Admin & Support Staff:</span>
          <span className="font-bold">200</span>
        </div>
        <div className="flex justify-between text-white">
          <span className="">Employee Growth (YoY):</span>
          <span className="font-bold">1.4%</span>
        </div>
        <div className="flex justify-between text-white">
          <span className="">Instructor Retention Rate:</span>
          <span className="font-bold">96%</span>
        </div>
      </div>
    </AdminStatCard>
  )
}

export default AdminFinanceStat
