import { Clock, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StUpcomingClass } from "@/apiServices/studentDashboardService";
interface UpcomingClassesProps {
  classesData: StUpcomingClass[];
}
const UpcomingClasses = ({classesData}:UpcomingClassesProps) => {
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-secondary">
          Upcoming Classes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {classesData.slice(0, 2).map((classList, index) => (
          <div key={index} className="rounded-lg border border-gray-200 p-4">
            {/* Batch Name */}
            <div className="mb-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-white">
              {classList.course_title}
            </div>

            {/* Lesson Title */}
            <h3 className="mb-2 font-semibold text-secondary">
              {classList.lesson_title}
            </h3>

            {/* Schedule Info */}
            <div className="flex items-center gap-4 text-sm text-secondary">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-secondary" />
                {classList.schedule_date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-secondary" />
                {classList.schedule_time}
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4 text-secondary" />
                {classList.venue}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingClasses;
