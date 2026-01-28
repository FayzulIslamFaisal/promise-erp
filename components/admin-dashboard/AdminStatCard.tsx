import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  title: string;
  bgClass?: string;
  children: ReactNode;
}

const AdminStatCard = ({ icon, title, bgClass, children }: StatCardProps) => {
  return (
     <Card className={`shadow hover:shadow-lg ${bgClass}`}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          {icon}
          <span className="text-lg font-bold uppercase text-white">
            {title}
          </span>
        </div>
        {children}
      </CardContent>
    </Card>
  )
}

export default AdminStatCard
